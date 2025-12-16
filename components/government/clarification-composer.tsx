"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Upload, Send, Twitter, MessageCircle, Facebook, Newspaper, Smartphone, Globe } from "lucide-react"

const platforms = [
  { id: "twitter", name: "X (Twitter)", icon: Twitter, limit: 280 },
  { id: "whatsapp", name: "WhatsApp", icon: MessageCircle, limit: 4096 },
  { id: "facebook", name: "Facebook", icon: Facebook, limit: 63206 },
  { id: "press", name: "Press Release", icon: Newspaper, limit: null },
  { id: "sms", name: "SMS Alert", icon: Smartphone, limit: 160 },
  { id: "web", name: "Website", icon: Globe, limit: null },
]

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "mr", name: "Marathi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
]

export function ClarificationComposer() {
  const [title, setTitle] = useState("")
  const [statement, setStatement] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "whatsapp"])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en", "hi"])
  const [generateAudio, setGenerateAudio] = useState(false)
  const [aiAssist, setAiAssist] = useState(false)

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const toggleLanguage = (code: string) => {
    setSelectedLanguages((prev) => (prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Issue Clarification</h1>
        <p className="text-muted-foreground">Compose and spread official responses to misinformation</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Compose Statement
                <Button variant="outline" size="sm" className="bg-transparent" onClick={() => setAiAssist(!aiAssist)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Assist {aiAssist ? "On" : "Off"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Clarification Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Official Statement on EVM Security"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="statement">Official Statement</Label>
                <Textarea
                  id="statement"
                  placeholder="Write your official response..."
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  className="mt-1 min-h-48"
                />
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{statement.length} characters</span>
                  {aiAssist && (
                    <Button variant="link" size="sm" className="text-primary">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generate AI Draft
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label>Supporting Evidence</Label>
                <div className="mt-2 p-8 border-2 border-dashed rounded-xl text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drop documents, images, or URLs here</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 50MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spread Channels */}
          <Card>
            <CardHeader>
              <CardTitle>Spread Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? "bg-primary/10 border-primary"
                        : "bg-secondary/30 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox checked={selectedPlatforms.includes(platform.id)} />
                      <platform.icon className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">{platform.name}</p>
                        {platform.limit && <p className="text-xs text-muted-foreground">{platform.limit} chars max</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Options */}
        <div className="space-y-6">
          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`p-3 rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                    selectedLanguages.includes(lang.code) ? "bg-primary/10" : "bg-secondary/30 hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-sm">{lang.name}</span>
                  <Checkbox checked={selectedLanguages.includes(lang.code)} />
                </div>
              ))}
              <p className="text-xs text-muted-foreground">AI will translate your statement to selected languages</p>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card>
            <CardHeader>
              <CardTitle>AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Generate Audio</p>
                  <p className="text-xs text-muted-foreground">AI narration in selected languages</p>
                </div>
                <Switch checked={generateAudio} onCheckedChange={setGenerateAudio} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-Translate</p>
                  <p className="text-xs text-muted-foreground">Translate to all selected languages</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Simplify Language</p>
                  <p className="text-xs text-muted-foreground">Make content accessible</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="font-medium text-sm mb-2">{title || "Clarification Title"}</p>
                <p className="text-xs text-muted-foreground line-clamp-4">
                  {statement || "Your statement will appear here..."}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedPlatforms.map((id) => {
                  const platform = platforms.find((p) => p.id === id)
                  return platform ? (
                    <Badge key={id} variant="secondary">
                      <platform.icon className="h-3 w-3 mr-1" />
                      {platform.name}
                    </Badge>
                  ) : null
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full" size="lg">
              <Send className="h-4 w-4 mr-2" />
              Publish Now
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Schedule for Later
            </Button>
            <Button variant="ghost" className="w-full">
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
