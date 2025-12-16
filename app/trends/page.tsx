import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrendExplorer } from "@/components/trends/trend-explorer"

export const metadata = {
  title: "Trend Explorer - AURA",
  description: "Explore global misinformation trends with interactive 3D visualization.",
}

export default function TrendsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <TrendExplorer />
      </main>
      <Footer />
    </div>
  )
}
