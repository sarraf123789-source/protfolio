import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // This is where you would integrate with an email service like Resend, SendGrid, etc.
    // For now, we'll just log the message to the console.
    console.log("New Contact Form Submission:", { name, email, message })

    return NextResponse.json({ message: "Success" }, { status: 200 })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
