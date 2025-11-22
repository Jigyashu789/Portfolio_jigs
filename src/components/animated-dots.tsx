"use client"

import { useEffect, useRef } from "react"

type Dot = {
    x: number
    y: number
    baseX: number
    baseY: number
    color: string
    vx: number
    vy: number
    phase: number
}

export function AnimatedDots() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        const mouse = { x: 0, y: 0, vx: 0, vy: 0, prevX: 0, prevY: 0 }
        const dots: Dot[] = []

        const colors = [
            "#60a5fa", // blue
            "#818cf8", // indigo
            "#a78bfa", // purple
            "#c084fc", // violet
            "#e879f9", // fuchsia
            "#f472b6", // pink
            "#fb7185", // rose
            "#2dd4bf", // teal
            "#34d399", // emerald
        ]

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initDots()
        }

        const initDots = () => {
            dots.length = 0
            const spacing = 35
            const cols = Math.ceil(canvas.width / spacing)
            const rows = Math.ceil(canvas.height / spacing)

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: i * spacing,
                        y: j * spacing,
                        baseX: i * spacing,
                        baseY: j * spacing,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        vx: 0,
                        vy: 0,
                        phase: Math.random() * Math.PI * 2,
                    })
                }
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.vx = (e.clientX - mouse.prevX) * 0.5
            mouse.vy = (e.clientY - mouse.prevY) * 0.5
            mouse.prevX = e.clientX
            mouse.prevY = e.clientY
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        let time = 0
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time += 0.01

            // Decay mouse velocity
            mouse.vx *= 0.9
            mouse.vy *= 0.9

            dots.forEach((dot) => {
                // Distance to mouse
                const dx = mouse.x - dot.x
                const dy = mouse.y - dot.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Mouse influence (flow)
                const maxDistance = 250
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance
                    dot.vx += mouse.vx * force * 0.5
                    dot.vy += mouse.vy * force * 0.5

                    // Slight attraction to cursor for "following" feel
                    dot.vx += (dx / distance) * force * 0.2
                    dot.vy += (dy / distance) * force * 0.2
                }

                // Spring back to base
                const springX = dot.baseX - dot.x
                const springY = dot.baseY - dot.y
                dot.vx += springX * 0.05
                dot.vy += springY * 0.05

                // Random drift
                dot.vx += Math.sin(time + dot.phase) * 0.02
                dot.vy += Math.cos(time + dot.phase) * 0.02

                // Friction
                dot.vx *= 0.85
                dot.vy *= 0.85

                // Update position
                dot.x += dot.vx
                dot.y += dot.vy

                // Draw dot
                ctx.fillStyle = dot.color
                ctx.globalAlpha = 0.6
                ctx.beginPath()
                ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2)
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        resize()
        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", handleMouseMove)
        animate()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.7 }}
        />
    )
}
