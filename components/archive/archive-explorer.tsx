"use client"

import { useState } from "react"
import { ArchiveFilters } from "@/components/archive/archive-filters"
import { ArchiveList } from "@/components/archive/archive-list"
import { FactCheckDetail } from "@/components/archive/fact-check-detail"

export interface FactCheck {
  id: string
  claim: string
  verdict: "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIABLE"
  confidence: number
  category: string
  language: string
  source: string
  timestamp: string
  views: number
  summary: string
}

const mockFactChecks: FactCheck[] = [
  {
    id: "1",
    claim: "5G towers spread COVID-19 virus through radio waves",
    verdict: "FALSE",
    confidence: 96,
    category: "Health",
    language: "en",
    source: "WhatsApp",
    timestamp: "2025-01-15T10:30:00Z",
    views: 45230,
    summary:
      "Radio waves cannot transmit biological pathogens. COVID-19 spreads through respiratory droplets, not electromagnetic radiation.",
  },
  {
    id: "2",
    claim: "WHO recommends wearing masks in crowded indoor spaces",
    verdict: "TRUE",
    confidence: 98,
    category: "Health",
    language: "en",
    source: "Twitter",
    timestamp: "2025-01-14T15:45:00Z",
    views: 12890,
    summary:
      "The World Health Organization continues to recommend mask-wearing in crowded, enclosed, and poorly ventilated spaces.",
  },
  {
    id: "3",
    claim: "Drinking warm water with lemon cures COVID-19",
    verdict: "FALSE",
    confidence: 94,
    category: "Health",
    language: "hi",
    source: "WhatsApp",
    timestamp: "2025-01-14T08:20:00Z",
    views: 78450,
    summary:
      "There is no scientific evidence that warm water with lemon has any effect on COVID-19. Proper treatment requires medical care.",
  },
  {
    id: "4",
    claim: "New study shows coffee may reduce risk of certain cancers",
    verdict: "MISLEADING",
    confidence: 72,
    category: "Health",
    language: "en",
    source: "Facebook",
    timestamp: "2025-01-13T12:00:00Z",
    views: 34560,
    summary:
      "While some studies show correlation, the claim overstates the findings. More research is needed for definitive conclusions.",
  },
  {
    id: "5",
    claim: "Government announces free electricity scheme for all households",
    verdict: "UNVERIFIABLE",
    confidence: 45,
    category: "Political",
    language: "hi",
    source: "WhatsApp",
    timestamp: "2025-01-12T18:30:00Z",
    views: 56780,
    summary:
      "No official government announcement found. The claim may be referring to regional schemes but lacks specificity.",
  },
  {
    id: "6",
    claim: "EVMs can be hacked remotely using Bluetooth",
    verdict: "FALSE",
    confidence: 99,
    category: "Political",
    language: "en",
    source: "Twitter",
    timestamp: "2025-01-11T09:15:00Z",
    views: 128900,
    summary:
      "Indian EVMs are standalone machines without any network connectivity. They cannot be accessed remotely via Bluetooth or any wireless technology.",
  },
]

export function ArchiveExplorer() {
  const [selectedFactCheck, setSelectedFactCheck] = useState<FactCheck | null>(null)
  const [filteredChecks, setFilteredChecks] = useState(mockFactChecks)

  return (
    <div className="container mx-auto px-4">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Transparency Archive</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Complete archive of all fact-checks with verification history, evidence chains, and knowledge graphs
        </p>
      </div>

      {/* Filters */}
      <ArchiveFilters factChecks={mockFactChecks} onFilter={setFilteredChecks} />

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* List */}
        <ArchiveList factChecks={filteredChecks} selectedId={selectedFactCheck?.id} onSelect={setSelectedFactCheck} />

        {/* Detail */}
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          {selectedFactCheck ? (
            <FactCheckDetail factCheck={selectedFactCheck} onClose={() => setSelectedFactCheck(null)} />
          ) : (
            <div className="h-full flex items-center justify-center bg-card rounded-xl border border-border">
              <p className="text-muted-foreground">Select a fact-check to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
