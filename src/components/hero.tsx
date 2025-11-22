"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

export function Hero() {
    const controls = useAnimation()

    useEffect(() => {
        const handleRightClick = (e: MouseEvent) => {
            e.preventDefault()
            controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
        }

        window.addEventListener("contextmenu", handleRightClick)
        return () => window.removeEventListener("contextmenu", handleRightClick)
    }, [controls])

    return (
        <div className="flex flex-col items-center justify-center gap-8 text-center">
            {/* Draggable & Floating Profile Image */}
            <motion.div
                drag
                dragElastic={0.2}
                animate={controls}
                whileHover={{ scale: 1.05, cursor: "grab" }}
                whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                className="relative z-50 touch-none"
            >
                <div className="relative animate-float">
                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl" />
                        <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white/20 backdrop-blur-sm shadow-2xl">
                            <Image
                                src="/profile.jpg"
                                alt="Jigyashu Saxena"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Jigyashu Saxena
                </h1>
                <p className="mx-auto max-w-[500px] text-gray-500 md:text-lg dark:text-gray-400">
                    AI/ML Engineer | Generative AI | Cloud (AWS)
                </p>
            </div>
            <p className="mx-auto max-w-[500px] text-base text-muted-foreground">
                "I build intelligent systems and AI-powered experiences."
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/projects">
                    <Button size="default" className="gap-2">
                        View Projects <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
                <Link href="/ai-advisors">
                    <Button size="default" variant="outline">
                        Talk to AI Advisors
                    </Button>
                </Link>
            </div>
            <div className="flex items-center gap-4 mt-2">
                <Link href="https://github.com/Jigyashu789" target="_blank">
                    <Button variant="ghost" size="icon">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/jigyashu-saxena-163693213/" target="_blank">
                    <Button variant="ghost" size="icon">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
