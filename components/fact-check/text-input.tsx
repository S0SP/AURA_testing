"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Loader2, Sparkles } from "lucide-react"

const languages = [
  { code: "auto", name: "Auto-detect" },
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "mr", name: "Marathi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "gu", name: "Gujarati" },
]

const suggestions = [
  "5G towers spread COVID-19",
  "Drinking warm water kills coronavirus",
  "The vaccine contains microchips",
]

interface TextInputProps {
  onSubmit: (claim: string) => void
  isLoading: boolean
}

export function TextInput({ onSubmit, isLoading }: TextInputProps) {
  const [claim, setClaim] = useState("")
  const [language, setLanguage] = useState("auto")

  const handleSubmit = () => {
    if (claim.trim().length >= 10) {
      onSubmit(claim)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Enter your claim</label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Type or paste the claim you want to verify..."
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        className="min-h-32 resize-none"
        maxLength={2000}
      />

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{claim.length}/2000 characters</span>
        <span className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          AI-powered verification
        </span>
      </div>

      {/* Quick Suggestions */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">Try these examples:</label>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => setClaim(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={claim.trim().length < 10 || isLoading}
        className="w-full rounded-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <Search className="h-5 w-5 mr-2" />
            Verify Claim
          </>
        )}
      </Button>
    </div>
  )
}
