import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { skills } from "@/lib/data"

export default function AboutPage() {
    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col gap-8">
                <section>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">About Me</h1>
                    <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                        <p className="text-lg">
                            I am Jigyashu Saxena, a passionate AI/ML Engineer specializing in Generative AI and Cloud technologies.
                            With a strong foundation in Computer Science and a focus on building intelligent systems, I strive to bridge the gap between cutting-edge AI research and practical, scalable applications.
                        </p>
                        <p className="mt-4">
                            My journey involves working with Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) architectures, and cloud-native solutions on AWS.
                            I enjoy solving complex problems and creating intuitive user experiences powered by AI.
                        </p>
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-6">Skills & Technologies</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Languages & Core</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {skills.languages.map((skill) => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>AI & Machine Learning</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {skills.ai_ml.map((skill) => (
                                    <Badge key={skill} variant="default">{skill}</Badge>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Cloud & DevOps</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {skills.cloud_devops.map((skill) => (
                                    <Badge key={skill} variant="outline">{skill}</Badge>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Web Development</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {skills.web.map((skill) => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Tools</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {skills.tools.map((skill) => (
                                    <Badge key={skill} variant="outline">{skill}</Badge>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <Separator />

                <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-6">Education</h2>
                    <div className="relative border-l border-muted ml-3 pl-6 pb-6">
                        <div className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] border border-background mt-1.5"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">Present</time>
                            <h3 className="text-lg font-semibold text-foreground">B.Tech Computer Science Engineering</h3>
                            <p className="mb-4 text-base font-normal text-muted-foreground">
                                VIT Bhopal University
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Specialization in Artificial Intelligence & Machine Learning
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold tracking-tight mb-6">Certifications</h2>
                    <div className="flex flex-wrap gap-4">
                        <Badge variant="outline" className="text-base py-2 px-4">AWS Certified Cloud Practitioner</Badge>
                        <Badge variant="outline" className="text-base py-2 px-4">DeepLearning.AI GenAI</Badge>
                        {/* Add more placeholders if needed */}
                    </div>
                </section>
            </div>
        </div>
    )
}
