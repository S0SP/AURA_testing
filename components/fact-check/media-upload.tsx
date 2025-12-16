"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Loader2, ImageIcon, FileVideo, X, Search } from "lucide-react"

interface MediaUploadProps {
  onSubmit: (claim: string) => void
  isLoading: boolean
}

export function MediaUpload({ onSubmit, isLoading }: MediaUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState<string | null>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/"))) {
      processFile(droppedFile)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const processFile = (file: File) => {
    setFile(file)
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
    // Simulate OCR/text extraction
    setTimeout(() => {
      setExtractedText(
        "Sample extracted text from the uploaded media. In production, this would use OCR for images or speech-to-text for videos.",
      )
    }, 1000)
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setExtractedText(null)
  }

  const handleSubmit = () => {
    if (extractedText) {
      onSubmit(extractedText)
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <Card
          className="border-2 border-dashed cursor-pointer hover:border-primary/50 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <label className="cursor-pointer block text-center">
              <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileSelect} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Drop an image or video here</h3>
              <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" /> PNG, JPG, WebP
                </span>
                <span className="flex items-center gap-1">
                  <FileVideo className="h-4 w-4" /> MP4, WebM
                </span>
              </div>
            </label>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {preview && (
                <img src={preview || "/placeholder.svg"} alt="Preview" className="w-24 h-24 object-cover rounded-lg" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium truncate">{file.name}</span>
                  <Button variant="ghost" size="icon" onClick={clearFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                {extractedText ? (
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Extracted text:</p>
                    <p className="text-sm">{extractedText}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Extracting text...
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button onClick={handleSubmit} disabled={!extractedText || isLoading} className="w-full rounded-full" size="lg">
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <Search className="h-5 w-5 mr-2" />
            Verify Content
          </>
        )}
      </Button>
    </div>
  )
}
