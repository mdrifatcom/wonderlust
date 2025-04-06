'use client'

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Search, Filter, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Destination {
  id: number
  title: string
  location: string
  image: string
  rating: number
  reviews: number
  tags: string[]
  description: string
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const destinations: Destination[] = [
    {
      id: 1,
      title: "Central Market",
      location: "Kuala Lumpur",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=400",
      rating: 4.5,
      reviews: 47,
      tags: ["Shopping", "Culture", "Souvenirs"],
      description: "Historic art deco building featuring local arts, crafts & cultural items, plus cafes & performances."
    },
    {
      id: 2,
      title: "Batu Caves",
      location: "Selangor",
      image: "https://images.unsplash.com/photo-1588945989200-89c591bf5c63?q=80&w=400",
      rating: 4.7,
      reviews: 89,
      tags: ["Temple", "Nature", "Culture"],
      description: "Limestone caves and Hindu temple featuring a giant golden statue and steep climb up colorful stairs."
    },
    {
      id: 3,
      title: "Petronas Towers",
      location: "Kuala Lumpur",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400",
      rating: 4.8,
      reviews: 156,
      tags: ["Architecture", "City", "Landmark"],
      description: "Iconic twin skyscrapers offering tours, observation deck & stunning city views."
    }
  ]

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTag = !selectedTag || destination.tags.includes(selectedTag)
    
    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="sticky top-0 z-50 glassmorphism">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="flex items-center space-x-4">
            <MapPin className="h-6 w-6" />
            <span className="text-xl font-bold">Wanderlust</span>
          </Link>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Explore Destinations</h1>
            <p className="text-muted-foreground">Discover amazing places around the world</p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="gap-2 whitespace-nowrap">
              <Search className="h-4 w-4" />
              Filters
            </Button>
            {["Popular", "Nature", "Culture", "Food", "Adventure"].map((tag) => (
              <Button
                key={tag}
                variant="outline"
                className={`hover:bg-orange-500 hover:text-white transition-colors ${
                  selectedTag === tag ? 'bg-orange-500 text-white' : ''
                }`}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination) => (
              <Link href={`/places/${destination.id}`} key={destination.id}>
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-64">
                    <Image
                      src={destination.image}
                      alt={destination.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                      <div className="flex flex-wrap gap-2">
                        {destination.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-semibold">{destination.title}</h3>
                        <p className="text-sm text-white/80">{destination.location}</p>
                        <div className="mt-2 flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-current text-orange-400" />
                          <span className="text-sm font-medium">{destination.rating}</span>
                          <span className="text-sm text-white/80">({destination.reviews} reviews)</span>
                        </div>
                        <p className="mt-2 text-sm text-white/80 line-clamp-2">
                          {destination.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}