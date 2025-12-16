import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TransparencyArchive } from "@/components/transparency/transparency-archive"

export const metadata = {
  title: "Transparency Archive - AURA",
  description:
    "Explore fact-checked claims on an interactive globe. See misinformation hotspots worldwide with evidence chains and knowledge graphs.",
}

export default function TransparencyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <TransparencyArchive />
      </main>
      <Footer />
    </div>
  )
}
