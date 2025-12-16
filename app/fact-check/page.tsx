import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FactCheckForm } from "@/components/fact-check/fact-check-form"
import { RecentChecks } from "@/components/fact-check/recent-checks"

export const metadata = {
  title: "Fact-Check - AURA",
  description: "Verify any claim using AI-powered multi-agent fact-checking system.",
}

export default function FactCheckPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Fact-Check Any Claim</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Paste a link, forward a message, or type a claim to verify it using our AI-powered multi-agent system
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <FactCheckForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <RecentChecks />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
