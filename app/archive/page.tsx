import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArchiveExplorer } from "@/components/archive/archive-explorer"

export const metadata = {
  title: "Transparency Archive - AURA",
  description: "Complete archive of all fact-checks with evidence chains and knowledge graphs.",
}

export default function ArchivePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <ArchiveExplorer />
      </main>
      <Footer />
    </div>
  )
}
