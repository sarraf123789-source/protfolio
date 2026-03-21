import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "src/lib/data.json")

export async function GET() {
    try {
        const data = await fs.readFile(DATA_PATH, "utf8")
        return NextResponse.json(JSON.parse(data))
    } catch (error) {
        return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        // Simple password check for demo purposes
        const authHeader = req.headers.get("authorization")
        if (authHeader !== "Bearer portfolio-admin-2026") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf8")
        return NextResponse.json({ message: "Data updated successfully" })
    } catch (error) {
        return NextResponse.json({ error: "Failed to update data" }, { status: 500 })
    }
}
