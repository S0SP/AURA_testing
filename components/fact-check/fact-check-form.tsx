"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { TextInput } from "@/components/fact-check/text-input"
import { SocialUrlInput } from "@/components/fact-check/social-url-input"
import { WhatsAppInput } from "@/components/fact-check/whatsapp-input"
import { MediaUpload } from "@/components/fact-check/media-upload"
import { VerdictCard } from "@/components/fact-check/verdict-card"
import { AgentWorkflow } from "@/components/fact-check/agent-workflow"
import { FileText, Link2, MessageCircle, Upload } from "lucide-react"

interface VerificationResult {
  verdict: "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIABLE"
  confidence: number
  claim: string
  reasoning: string
  sources: {
    name: string
    url: string
    type: string
  }[]
  processingTime: number
}

export function FactCheckForm() {
  const [activeTab, setActiveTab] = useState("text")
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [agentPhase, setAgentPhase] = useState<string | null>(null)

  const handleVerify = async (claim: string) => {
    setIsVerifying(true)
    setResult(null)

    // Simulate agent workflow phases
    const phases = ["retriever", "advocate", "skeptic", "judge"]
    for (const phase of phases) {
      setAgentPhase(phase)
      await new Promise((r) => setTimeout(r, 1500))
    }

    // Simulate result (in production, this would call your API)
    setResult({
      verdict: "FALSE",
      confidence: 96,
      claim: claim,
      reasoning:
        "Radio waves, including those used by 5G networks, cannot transmit biological pathogens like viruses. COVID-19 is caused by the SARS-CoV-2 virus, which spreads through respiratory droplets. The electromagnetic spectrum used by 5G (30-300 GHz) is non-ionizing radiation and lacks the ability to interact with viral particles or biological systems in a way that could spread disease.",
      sources: [
        { name: "WHO", url: "https://who.int", type: "official" },
        { name: "CDC", url: "https://cdc.gov", type: "official" },
        { name: "Reuters Fact Check", url: "https://reuters.com/fact-check", type: "factcheck" },
        { name: "Nature Journal", url: "https://nature.com", type: "scientific" },
      ],
      processingTime: 6.2,
    })

    setIsVerifying(false)
    setAgentPhase(null)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Text/Claim</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                <span className="hidden sm:inline">Social URL</span>
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <TextInput onSubmit={handleVerify} isLoading={isVerifying} />
            </TabsContent>

            <TabsContent value="social">
              <SocialUrlInput onSubmit={handleVerify} isLoading={isVerifying} />
            </TabsContent>

            <TabsContent value="whatsapp">
              <WhatsAppInput onSubmit={handleVerify} isLoading={isVerifying} />
            </TabsContent>

            <TabsContent value="upload">
              <MediaUpload onSubmit={handleVerify} isLoading={isVerifying} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Agent Workflow Visualization */}
      {(isVerifying || result) && <AgentWorkflow activePhase={agentPhase} isComplete={!!result} />}

      {/* Verdict Card */}
      {result && <VerdictCard result={result} />}
    </div>
  )
}
