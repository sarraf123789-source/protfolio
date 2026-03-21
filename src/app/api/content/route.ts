import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"
import fs from "fs/promises"
import path from "path"
import { supabase } from "@/lib/supabase"

const DATA_PATH = path.join(process.cwd(), "src/lib/data.json")

export async function GET() {
    try {
        // 1. Load defaults from data.json first
        const localDataRaw = await fs.readFile(DATA_PATH, "utf8")
        const content = JSON.parse(localDataRaw)

        // 2. Try fetching from Supabase and merge
        const { data: supabaseData, error } = await supabase
            .from('portfolio_content')
            .select('*')
        
        if (!error && supabaseData && supabaseData.length > 0) {
            supabaseData.forEach(row => {
                content[row.key] = row.data
            })
        }

        return NextResponse.json(content, {
            headers: { "Cache-Control": "no-store, max-age=0" }
        })
    } catch (error) {
        return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const authHeader = req.headers.get("authorization")
        if (authHeader !== "Bearer portfolio-admin-2026") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // 1. Update Supabase (Section by Section)
        const sections = Object.keys(body)
        const upsertPromises = sections.map(key => 
            supabase
                .from('portfolio_content')
                .upsert({ key: key, data: body[key] }, { onConflict: 'key' })
        )
        
        await Promise.all(upsertPromises)

        // 2. Also save to local data.json for backup/local dev
        await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf8")
        
        return NextResponse.json({ message: "Data updated successfully in Cloud & Local" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
    }
}
