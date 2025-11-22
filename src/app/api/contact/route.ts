import { NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"
import { prisma } from "@/lib/prisma"

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, message } = contactSchema.parse(body)

        // Save to Database
        await prisma.contactMessage.create({
            data: {
                name,
                email,
                message,
            },
        })

        // Send Email
        // Note: In a real app, use environment variables for SMTP settings.
        // This is a placeholder configuration.
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            })

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: "jigyashu.saxena@gmail.com", // Target email
                subject: `New Contact Form Submission from ${name}`,
                text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
            })
        } else {
            console.log("Email credentials not found. Skipping email send.")
            console.log(`Message from ${name} (${email}): ${message}`)
        }

        return NextResponse.json({ success: true, message: "Message sent successfully" })
    } catch (error) {
        console.error("Contact API Error:", error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid input data" }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
