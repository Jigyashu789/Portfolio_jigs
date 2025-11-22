import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rate-limit"
import { GoogleGenerativeAI } from "@google/generative-ai"

const SYSTEM_PROMPTS = {
    financial: `You are an educational financial mentor. You help users understand budgeting, saving, compounding, planning, and money habits. You never give direct investment recommendations. All information is educational only.`,
    trade: `You explain trading psychology, risk management, stop-loss, position size, trend concepts, and trading discipline. You must never give buy/sell signals. Always warn users that trading is risky.`,
    software: `You are a senior software + ML engineer expert in Python, TypeScript, GenAI, RAG, LLM integration, cloud architectures, and scalable systems. Provide clean explanations, diagrams (ASCII if needed), best practices, and code snippets.`,
}

type AgentType = keyof typeof SYSTEM_PROMPTS

export async function POST(
    req: Request,
    { params }: { params: Promise<{ agentType: string }> }
) {
    try {
        // Rate Limiting
        const ip = "127.0.0.1" // Placeholder
        if (!rateLimit(ip)) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 })
        }

        const { agentType } = await params
        const body = await req.json()
        const { messages, user_message, session_id } = body

        if (!Object.keys(SYSTEM_PROMPTS).includes(agentType)) {
            return NextResponse.json({ error: "Invalid agent type" }, { status: 400 })
        }

        const systemPrompt = SYSTEM_PROMPTS[agentType as AgentType]

        let conversationId = session_id
        if (!conversationId) {
            const conv = await prisma.conversation.create({
                data: {
                    sessionId: "default-session",
                    agentType,
                },
            })
            conversationId = conv.id
        }

        await prisma.message.create({
            data: {
                conversationId,
                role: "user",
                content: user_message,
            },
        })

        let reply = ""
        if (process.env.GEMINI_API_KEY) {
            try {
                console.log("Initializing Gemini API...")
                const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

                // Build conversation history
                const chatHistory = messages.slice(0, -1).map((m: any) => ({
                    role: m.role === "assistant" ? "model" : "user",
                    parts: [{ text: m.content }],
                }))

                console.log(`Starting chat with ${chatHistory.length} history messages`)

                // Prepend system prompt to first user message
                const promptWithSystem = messages.length === 1
                    ? `${systemPrompt}\n\nUser: ${user_message}`
                    : user_message

                console.log("Sending message to Gemini...")
                const result = await model.generateContent(promptWithSystem)
                const response = await result.response
                reply = response.text() || "Sorry, I couldn't generate a response."
                console.log("Gemini response received successfully")
            } catch (e: any) {
                console.error("Gemini API Error Details:", {
                    message: e.message,
                    stack: e.stack,
                    response: e.response?.data
                })
                reply = `Error connecting to AI service. Please check your API key and try again. Error: ${e.message || 'Unknown error'}`
            }
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            reply = `[MOCK RESPONSE from ${agentType} Agent]\n\nI received your message: "${user_message}".\n\nSince I am running in demo mode (no API key configured), I cannot generate a real AI response. However, I would normally answer based on my expertise.\n\nTo enable real AI responses, please add your GEMINI_API_KEY to the .env file.`
        }

        await prisma.message.create({
            data: {
                conversationId,
                role: "assistant",
                content: reply,
            },
        })

        return NextResponse.json({ reply, updated_messages: [...messages, { role: "assistant", content: reply }] })
    } catch (error) {
        console.error("Chat API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
