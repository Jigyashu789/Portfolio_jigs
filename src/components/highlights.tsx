import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Brain, Cloud } from "lucide-react"

export function Highlights() {
    return (
        <section className="container py-12 md:py-24 lg:py-32">
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Education</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">B.Tech CSE</div>
                        <p className="text-xs text-muted-foreground">
                            AI & ML Specialization
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            VIT Bhopal University
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Specialization</CardTitle>
                        <Brain className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Generative AI</div>
                        <p className="text-xs text-muted-foreground">
                            LLMs, RAG, Multi-Agent Systems
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cloud</CardTitle>
                        <Cloud className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">AWS Certified</div>
                        <p className="text-xs text-muted-foreground">
                            Cloud Architecture & Deployment
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
