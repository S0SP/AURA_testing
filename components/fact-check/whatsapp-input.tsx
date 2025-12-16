"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Loader2, QrCode, MessageCircle, Clipboard } from "lucide-react"

interface WhatsAppInputProps {
  onSubmit: (claim: string) => void
  isLoading: boolean
}

export function WhatsAppInput({ onSubmit, isLoading }: WhatsAppInputProps) {
  const [mode, setMode] = useState<"paste" | "qr" | "bot">("paste")
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    if (message.trim().length >= 10) {
      onSubmit(message)
    }
  }

  return (
    <div className="space-y-4">
      {/* Mode Selector */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={mode === "paste" ? "default" : "outline"}
          className={`flex flex-col h-auto py-4 ${mode !== "paste" ? "bg-transparent" : ""}`}
          onClick={() => setMode("paste")}
        >
          <Clipboard className="h-5 w-5 mb-1" />
          <span className="text-xs">Paste Message</span>
        </Button>
        <Button
          variant={mode === "qr" ? "default" : "outline"}
          className={`flex flex-col h-auto py-4 ${mode !== "qr" ? "bg-transparent" : ""}`}
          onClick={() => setMode("qr")}
        >
          <QrCode className="h-5 w-5 mb-1" />
          <span className="text-xs">Scan QR</span>
        </Button>
        <Button
          variant={mode === "bot" ? "default" : "outline"}
          className={`flex flex-col h-auto py-4 ${mode !== "bot" ? "bg-transparent" : ""}`}
          onClick={() => setMode("bot")}
        >
          <MessageCircle className="h-5 w-5 mb-1" />
          <span className="text-xs">Chat Bot</span>
        </Button>
      </div>

      {/* Mode Content */}
      {mode === "paste" && (
        <div className="space-y-4">
          <Textarea
            placeholder="Paste the WhatsApp forward message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-32 resize-none"
            maxLength={5000}
          />
          <p className="text-xs text-muted-foreground">
            Tip: We automatically detect forwarded messages and extract the core claim for verification.
          </p>
        </div>
      )}

      {mode === "qr" && (
        <Card className="bg-secondary/50">
          <CardContent className="p-6 text-center">
            <div className="w-48 h-48 mx-auto bg-background rounded-xl flex items-center justify-center mb-4 border">
              <QrCode className="h-32 w-32 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Scan this QR code with WhatsApp to forward suspicious messages directly to our verification bot.
            </p>
          </CardContent>
        </Card>
      )}

      {mode === "bot" && (
        <Card className="bg-aura-emerald-muted border-aura-emerald/30">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-aura-emerald" />
            <h3 className="font-semibold mb-2">Chat with AURA Bot</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add our WhatsApp bot to get instant fact-checks in your chat.
            </p>
            <Button className="rounded-full bg-aura-emerald hover:bg-aura-emerald/90">
              <MessageCircle className="h-4 w-4 mr-2" />
              Open WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground mt-4">Bot number: +91-XXXX-XXXX</p>
          </CardContent>
        </Card>
      )}

      {mode === "paste" && (
        <Button
          onClick={handleSubmit}
          disabled={message.trim().length < 10 || isLoading}
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
              Verify Message
            </>
          )}
        </Button>
      )}
    </div>
  )
}
