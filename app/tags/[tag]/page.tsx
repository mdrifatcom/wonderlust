'use client'

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function TagPage({ params }: { params: { tag: string } }) {
  // In a real app, fetch places based on the tag
  const places = [
    {
      id: 1,
      title: "Central Market",
      location: "Kuala Lumpur",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=400",
      rating: 4.5,
      reviews: 47,
      tags: ["Shopping", "Culture", "Souvenirs"]
    },
    {
      id: 2,
      title: "Merdeka Square",
      location: "Kuala Lumpur",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400",
      rating: 4.6,
      reviews: 53,
      tags: ["History", "Architecture", "Photography"]
    }
  ].filter(place => place.tags.map(t => t.toLowerCase()).includes(params.tag.toLowerCase()))

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
            <h1 className="text-3xl font-bold capitalize mb-2">
              {params.tag} Places
            </h1>
            <p className="text-muted-foreground">
              Discover places tagged with {params.tag}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Link href={`/places/${place.id}`} key={place.id}>
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative h-64">
                    <Image
                      src={place.image}
                      alt={place.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                      <div className="flex flex-wrap gap-2">
                        {place.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-semibold">{place.title}</h3>
                        <p className="text-sm text-white/80">{place.location}</p>
                        <div className="mt-2 flex items-center space-x-1">
                          <span className="text-orange-400">★</span>
                          <span className="text-sm font-medium">{place.rating}</span>
                          <span className="text-sm text-white/80">({place.reviews})</span>
                        </div>
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