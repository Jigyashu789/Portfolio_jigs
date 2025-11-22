"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

type NewsArticle = {
    id: string
    title: string
    description: string
    source: string
    url: string
    publishedAt: string
    category: string
}

export function NewsSection() {
    const [news, setNews] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        setLoading(true)
        try {
            // Using mock data since NewsAPI requires a key and has CORS issues
            const mockNews: NewsArticle[] = [
                {
                    id: "1",
                    title: "AI Breakthrough in Natural Language Processing",
                    description: "New transformer models achieve unprecedented accuracy in understanding context.",
                    source: "Tech News",
                    url: "#",
                    publishedAt: new Date().toISOString(),
                    category: "AI"
                },
                {
                    id: "2",
                    title: "Cloud Computing Trends for 2025",
                    description: "Edge computing and serverless architectures dominate the landscape.",
                    source: "Cloud Weekly",
                    url: "#",
                    publishedAt: new Date().toISOString(),
                    category: "Cloud"
                },
                {
                    id: "3",
                    title: "Machine Learning in Healthcare",
                    description: "AI-powered diagnostics showing promising results in early detection.",
                    source: "MedTech Today",
                    url: "#",
                    publishedAt: new Date().toISOString(),
                    category: "ML"
                },
                {
                    id: "4",
                    title: "Quantum Computing Advances",
                    description: "Major tech companies racing to achieve quantum supremacy.",
                    source: "Science Daily",
                    url: "#",
                    publishedAt: new Date().toISOString(),
                    category: "Tech"
                }
            ]
            setNews(mockNews)
        } catch (error) {
            console.error("Error fetching news:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
        }
    }

    const shuffleNews = () => {
        setNews([...news].sort(() => Math.random() - 0.5))
    }

    const getCardTransform = (index: number, cardRef: HTMLDivElement | null) => {
        if (!cardRef) return {}

        const rect = cardRef.getBoundingClientRect()
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height / 2

        const containerRect = containerRef.current?.getBoundingClientRect()
        if (!containerRect) return {}

        const relativeX = cardCenterX - containerRect.left
        const relativeY = cardCenterY - containerRect.top

        const dx = mousePos.x - relativeX
        const dy = mousePos.y - relativeY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            const moveX = -dx * force * 0.15
            const moveY = -dy * force * 0.15
            const rotate = (dx * force) * 0.05

            return {
                transform: `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`,
                zIndex: 10
            }
        }

        return {
            transform: 'translate(0px, 0px) rotate(0deg)',
            zIndex: 1
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="space-y-4"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Latest News</h2>
                <Button onClick={shuffleNews} variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
            <div className="space-y-3">
                {news.map((article, index) => (
                    <Card
                        key={article.id}
                        ref={(el) => {
                            if (el) {
                                const styles = getCardTransform(index, el)
                                Object.assign(el.style, styles)
                                el.style.transition = 'transform 0.2s ease-out, z-index 0.2s'
                            }
                        }}
                        className="cursor-pointer hover:shadow-lg"
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-sm line-clamp-2">{article.title}</CardTitle>
                                <Badge variant="secondary" className="shrink-0">{article.category}</Badge>
                            </div>
                            <CardDescription className="text-xs line-clamp-2">
                                {article.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{article.source}</span>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
