import { Hero } from "@/components/hero"
import { NewsSection } from "@/components/news-section"
import { AskMeAnything } from "@/components/ask-me-anything"

export default function Home() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr_350px] gap-6 items-start">
        {/* Left: News Section */}
        <div className="lg:sticky lg:top-20 max-h-[calc(100vh-8rem)] overflow-auto">
          <NewsSection />
        </div>

        {/* Center: Hero Section */}
        <div className="flex items-center justify-center">
          <Hero />
        </div>

        {/* Right: Ask Me Anything */}
        <div className="lg:sticky lg:top-20 h-[600px]">
          <AskMeAnything />
        </div>
      </div>
    </div>
  );
}
