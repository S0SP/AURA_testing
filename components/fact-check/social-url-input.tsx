"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Loader2, ExternalLink, Twitter, Youtube, Facebook, MessageCircle } from "lucide-react"

const platforms = [
  { id: "twitter", name: "X (Twitter)", icon: Twitter, color: "text-foreground" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "text-verdict-false" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "text-aura-rose" },
  { id: "telegram", name: "Telegram", icon: MessageCircle, color: "text-accent" },
]

interface SocialUrlInputProps {
  onSubmit: (claim: string) => void
  isLoading: boolean
}

export function SocialUrlInput({ onSubmit, isLoading }: SocialUrlInputProps) {
  const [url, setUrl] = useState("")
  const [preview, setPreview] = useState<{
    platform: string
    author: string
    content: string
    engagement: string
  } | null>(null)

  const detectPlatform = (url: string) => {
    if (url.includes("twitter.com") || url.includes("x.com")) return "twitter"
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube"
    if (url.includes("facebook.com")) return "facebook"
    if (url.includes("t.me")) return "telegram"
    return null
  }

  const handleUrlChange = (value: string) => {
    setUrl(value)
    // Simulate preview fetch (in production, this would call your API)
    if (value.length > 20 && detectPlatform(value)) {
      setTimeout(() => {
        setPreview({
          platform: detectPlatform(value) || "unknown",
          author: "@anonymous_user",
          content: "This is a preview of the social media post content that would be extracted and verified...",
          engagement: "12.5K shares",
        })
      }, 500)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = () => {
    if (preview) {
      onSubmit(preview.content)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Paste social media URL</label>
        <Input
          placeholder="https://twitter.com/... or https://facebook.com/..."
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="font-mono text-sm"
        />
      </div>

      {/* Supported Platforms */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Supported:</span>
        <div className="flex gap-2">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`p-2 rounded-lg bg-secondary ${detectPlatform(url) === platform.id ? "ring-2 ring-primary" : ""}`}
              title={platform.name}
            >
              <platform.icon className={`h-4 w-4 ${platform.color}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Preview Card */}
      {preview && (
        <Card className="bg-secondary/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-medium">{preview.author}</span>
              <span className="text-xs text-muted-foreground">{preview.engagement}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{preview.content}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary flex items-center gap-1"
            >
              View original <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      )}

      <Button onClick={handleSubmit} disabled={!preview || isLoading} className="w-full rounded-full" size="lg">
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <Search className="h-5 w-5 mr-2" />
            Verify Post
          </>
        )}
      </Button>
    </div>
  )
}
