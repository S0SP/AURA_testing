"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X } from "lucide-react"
import type { FactCheck } from "./archive-explorer"

interface ArchiveFiltersProps {
  factChecks: FactCheck[]
  onFilter: (filtered: FactCheck[]) => void
}

const verdictOptions = [
  { value: "all", label: "All Verdicts" },
  { value: "TRUE", label: "True" },
  { value: "FALSE", label: "False" },
  { value: "MISLEADING", label: "Misleading" },
  { value: "UNVERIFIABLE", label: "Unverifiable" },
]

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "Health", label: "Health" },
  { value: "Political", label: "Political" },
  { value: "Financial", label: "Financial" },
  { value: "Technology", label: "Technology" },
]

const sourceOptions = [
  { value: "all", label: "All Sources" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Twitter", label: "Twitter" },
  { value: "Facebook", label: "Facebook" },
  { value: "Web", label: "Web" },
]

const sortOptions = [
  { value: "date", label: "Most Recent" },
  { value: "views", label: "Most Viewed" },
  { value: "confidence", label: "Highest Confidence" },
]

export function ArchiveFilters({ factChecks, onFilter }: ArchiveFiltersProps) {
  const [search, setSearch] = useState("")
  const [verdict, setVerdict] = useState("all")
  const [category, setCategory] = useState("all")
  const [source, setSource] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const activeFilters = [verdict !== "all" && verdict, category !== "all" && category, source !== "all" && source]
    .filter(Boolean)
    .map((f) => String(f))

  useEffect(() => {
    let filtered = [...factChecks]

    if (search) {
      filtered = filtered.filter((fc) => fc.claim.toLowerCase().includes(search.toLowerCase()))
    }

    if (verdict !== "all") {
      filtered = filtered.filter((fc) => fc.verdict === verdict)
    }

    if (category !== "all") {
      filtered = filtered.filter((fc) => fc.category === category)
    }

    if (source !== "all") {
      filtered = filtered.filter((fc) => fc.source === source)
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "date") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      if (sortBy === "views") return b.views - a.views
      if (sortBy === "confidence") return b.confidence - a.confidence
      return 0
    })

    onFilter(filtered)
  }, [search, verdict, category, source, sortBy, factChecks, onFilter])

  const clearFilters = () => {
    setSearch("")
    setVerdict("all")
    setCategory("all")
    setSource("all")
    setSortBy("date")
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters Row */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Search claims..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <Select value={verdict} onValueChange={setVerdict}>
          <SelectTrigger className="w-40 transition-all duration-200 hover:border-primary/50">
            <SelectValue placeholder="Verdict" />
          </SelectTrigger>
          <SelectContent>
            {verdictOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40 transition-all duration-200 hover:border-primary/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={source} onValueChange={setSource}>
          <SelectTrigger className="w-40 transition-all duration-200 hover:border-primary/50">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            {sourceOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40 transition-all duration-200 hover:border-primary/50">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="gap-1 transition-all duration-200 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
              onClick={() => {
                if (verdict === filter) setVerdict("all")
                if (category === filter) setCategory("all")
                if (source === filter) setSource("all")
              }}
            >
              {filter}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="transition-all duration-200 hover:text-destructive"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
