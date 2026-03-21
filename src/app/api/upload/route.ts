import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import fs from "fs/promises"
import path from "path"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

        // 1. Try Supabase Storage first
        const { data, error } = await supabase.storage
            .from('portfolio')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: true
            })

        if (!error && data) {
            // Get Public URL from Supabase
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio')
                .getPublicUrl(filename)
            return NextResponse.json({ url: publicUrl })
        }

        // 2. Fallback: save to /public/uploads/ if Supabase fails
        console.warn("Supabase Storage failed, using local fallback:", error?.message)
        const uploadsDir = path.join(process.cwd(), "public", "uploads")
        await fs.mkdir(uploadsDir, { recursive: true })
        await fs.writeFile(path.join(uploadsDir, filename), buffer)
        const localUrl = `/uploads/${filename}`
        return NextResponse.json({ url: localUrl })

    } catch (error) {
        console.error("Upload Catch Error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
