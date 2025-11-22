import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { achievements } from "@/lib/data"
import { Trophy } from "lucide-react"

export default function AchievementsPage() {
    return (
        <div className="container py-12 md:py-24">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Achievements</h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-[800px]">
                Recognitions and awards from hackathons and competitions.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
                {achievements.map((achievement, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold">{achievement.title}</CardTitle>
                            <Trophy className="h-5 w-5 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium text-lg mt-2">{achievement.event}</p>
                            <p className="text-muted-foreground mt-1">{achievement.description}</p>
                            <p className="text-sm text-muted-foreground mt-4 font-mono">{achievement.date}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
