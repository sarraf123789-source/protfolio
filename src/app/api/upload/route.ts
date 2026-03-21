import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure public/uploads directory exists
        const uploadDir = path.join(process.cwd(), "public/uploads")
        try {
            await fs.access(uploadDir)
        } catch {
            await fs.mkdir(uploadDir, { recursive: true })
        }

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`
        const filePath = path.join(uploadDir, filename)

        await fs.writeFile(filePath, buffer)

        // Return the public URL
        return NextResponse.json({ url: `/uploads/${filename}` })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
