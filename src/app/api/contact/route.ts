import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, message } = body

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('contact_messages')
            .insert([
                { name, email, message, created_at: new Date().toISOString() }
            ])

        if (error) {
            console.error("Supabase error:", error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Contact API error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization")
        if (authHeader !== "Bearer portfolio-admin-2026") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization")
        if (authHeader !== "Bearer portfolio-admin-2026") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Missing id" }, { status: 400 })
        }

        const { error } = await supabase
            .from('contact_messages')
            .delete()
            .eq('id', id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
