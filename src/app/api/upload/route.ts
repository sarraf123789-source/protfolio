import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

        // Upload to Supabase Storage Bucket 'portfolio'
        const { data, error } = await supabase.storage
            .from('portfolio')
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: true
            })

        if (error) {
            console.error("Supabase Storage Error:", error.message)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('portfolio')
            .getPublicUrl(filename)

        return NextResponse.json({ url: publicUrl })
    } catch (error) {
        console.error("Upload Catch Error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
