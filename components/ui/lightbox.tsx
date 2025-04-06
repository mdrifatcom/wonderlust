"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  src: string
  type: "image" | "video"
}

export function Lightbox({ isOpen, onClose, src, type }: LightboxProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent backdrop-blur-xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-50 rounded-full bg-black/20 text-white hover:bg-black/40"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        {type === "image" ? (
          <img src={src} alt="Preview" className="w-full h-full object-contain" />
        ) : (
          <video
            src={src}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        )}
      </DialogContent>
    </Dialog>
  )
}