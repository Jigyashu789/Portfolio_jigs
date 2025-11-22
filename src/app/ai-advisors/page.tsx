"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, RefreshCw, Sparkles, Terminal, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type Message = {
    role: "user" | "assistant"
    content: string
}

type AgentType = "financial" | "trade" | "software"

const agents = [
    {
        id: "financial",
        name: "Financial Advisor",
        icon: DollarSign,
        description: "Budgeting, saving, and financial planning mentor.",
        color: "text-green-500",
    },
    {
        id: "trade",
        name: "Trade Advisor",
        icon: TrendingUp,
        description: "Trading psychology and risk management expert.",
        color: "text-blue-500",
    },
    {
        id: "software",
        name: "Software Advisor",
        icon: Terminal,
        description: "Senior software engineer and system architect.",
        color: "text-purple-500",
    },
]

export default function AIAdvisorsPage() {
    const [selectedAgent, setSelectedAgent] = useState<AgentType>("software")
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch(`/api/chat/${selectedAgent}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    user_message: userMessage.content,
                }),
            })

            if (!response.ok) throw new Error("Failed to get response")

            const data = await response.json()
            setMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
        } catch (error) {
            toast.error("Failed to get response from AI agent.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleClearChat = () => {
        setMessages([])
    }

    const currentAgent = agents.find((a) => a.id === selectedAgent)

    return (
        <div className="container py-6 md:py-12 h-[calc(100vh-3.5rem)] flex flex-col">
            <div className="flex flex-col md:flex-row gap-6 h-full">
                {/* Sidebar */}
                <Card className="w-full md:w-80 flex flex-col h-fit md:h-full">
                    <div className="p-4 border-b">
                        <h2 className="font-semibold flex items-center gap-2">
                            <Bot className="h-5 w-5" /> AI Advisors
                        </h2>
                    </div>
                    <div className="p-2 flex-1 overflow-auto">
                        <div className="space-y-2">
                            {agents.map((agent) => (
                                <button
                                    key={agent.id}
                                    onClick={() => {
                                        setSelectedAgent(agent.id as AgentType)
                                        setMessages([])
                                    }}
                                    className={cn(
                                        "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors hover:bg-accent",
                                        selectedAgent === agent.id ? "bg-accent" : ""
                                    )}
                                >
                                    <div className={cn("p-2 rounded-md bg-background border", agent.color)}>
                                        <agent.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium">{agent.name}</div>
                                        <div className="text-xs text-muted-foreground line-clamp-2">
                                            {agent.description}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Chat Area */}
                <Card className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b flex items-center justify-between bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-md bg-background border", currentAgent?.color)}>
                                {currentAgent && <currentAgent.icon className="h-5 w-5" />}
                            </div>
                            <div>
                                <h3 className="font-semibold">{currentAgent?.name}</h3>
                                <p className="text-xs text-muted-foreground">Always here to help</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleClearChat} title="Clear Chat">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                            {messages.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground mt-20">
                                    <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                                    <p>Start a conversation with the {currentAgent?.name}.</p>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex gap-3 max-w-[80%]",
                                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border",
                                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                    )}>
                                        {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className={cn(
                                        "rounded-lg p-3 text-sm",
                                        msg.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3 max-w-[80%]">
                                    <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 border bg-muted">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="bg-muted rounded-lg p-3 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t bg-background">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSend()
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={isLoading || !input.trim()}>
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}
