import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function MiniPreviews() {
    return (
        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
            <div className="flex flex-col items-center justify-center gap-4 text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Explore My Work
                </h2>
                <p className="max-w-[700px] text-muted-foreground">
                    Check out my latest projects, achievements, and interact with my AI advisors.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Projects</CardTitle>
                        <CardDescription>
                            Showcase of AI/ML applications including RAG and SaaS.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <Link href="/projects">
                            <Button className="w-full gap-2" variant="secondary">
                                View Projects <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                        <CardDescription>
                            Hackathon wins and national level recognitions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <Link href="/achievements">
                            <Button className="w-full gap-2" variant="secondary">
                                View Achievements <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>AI Advisors Hub</CardTitle>
                        <CardDescription>
                            Get advice from my custom-trained AI agents.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                        <Link href="/ai-advisors">
                            <Button className="w-full gap-2" variant="default">
                                Talk to Advisors <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
