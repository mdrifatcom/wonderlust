"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lightbox } from "@/components/ui/lightbox"
import Image from "next/image"
import { BadgeCheck } from "lucide-react"
import Link from "next/link"

interface GalleryItem {
  id: number
  image: string
  type: "image" | "video"
  level: string
  isVerified: boolean
  user: {
    name: string
    avatar: string
    initials: string
  }
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=400",
    type: "image",
    level: "Expert Traveler",
    isVerified: true,
    user: {
      name: "Nita",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
      initials: "NR"
    }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400",
    type: "image",
    level: "Adventurer",
    isVerified: false,
    user: {
      name: "El Primo",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100",
      initials: "EP"
    }
  }
]

function GalleryCard({ item, onSelect }: { item: GalleryItem; onSelect: (item: GalleryItem) => void }) {
  return (
    <div
      className="relative min-w-[200px] rounded-xl overflow-hidden cursor-pointer"
      onClick={() => onSelect(item)}
    >
      <Image
        src={item.image}
        alt="Trip photo"
        width={200}
        height={200}
        className="object-cover aspect-square"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-2 left-2 flex items-center space-x-2">
        <Link href={`/profile/${item.user.name.toLowerCase()}`}>
          <Avatar className="border-2 border-white hover:border-orange-500 transition-colors">
            <AvatarImage src={item.user.avatar} />
            <AvatarFallback>{item.user.initials}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="text-white">
          <div className="flex items-center space-x-1">
            <span className="font-medium text-sm">{item.user.name}</span>
            {item.isVerified && (
              <BadgeCheck className="h-4 w-4 text-orange-500" />
            )}
          </div>
          <p className="text-xs text-white/80">{item.level}</p>
        </div>
      </div>
    </div>
  )
}

export function TripGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {galleryItems.map((item) => (
          <GalleryCard
            key={item.id}
            item={item}
            onSelect={setSelectedItem}
          />
        ))}
      </div>
      
      {selectedItem && (
        <Lightbox
          isOpen={true}
          onClose={() => setSelectedItem(null)}
          src={selectedItem.image}
          type={selectedItem.type}
        />
      )}
    </>
  )
}