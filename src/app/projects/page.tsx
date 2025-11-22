import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { projects } from "@/lib/data"

export default function ProjectsPage() {
    return (
        <div className="container py-12 md:py-24">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Projects</h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-[800px]">
                A showcase of my work in Generative AI, Machine Learning, and Full-Stack Development.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((t) => (
                                    <Badge key={t} variant="secondary" className="text-xs">
                                        {t}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {project.details}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Link href={project.github} target="_blank" className="w-full">
                                <Button className="w-full gap-2" variant="outline">
                                    <Github className="h-4 w-4" /> View on GitHub
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
