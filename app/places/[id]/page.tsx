'use client'

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Clock, Phone, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This needs to be a Server Component to use generateStaticParams
export const dynamic = 'force-static'

export async function generateStaticParams() {
  // In a real app, this would fetch IDs from an API or database
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]
}

export default function PlacePage({ params }: { params: { id: string } }) {
  // In a real app, fetch place data based on params.id
  const place = {
    id: parseInt(params.id),
    title: "Central Market",
    location: "Kuala Lumpur",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600",
    rating: 4.5,
    reviews: 47,
    tags: ["Shopping", "Culture", "Souvenirs"],
    description: "A cultural landmark and shopping destination, Central Market is a haven for Malaysian arts, crafts, and souvenirs. This historic Art Deco building has been a vital part of KL's heritage since 1888.",
    details: {
      openingHours: "10:00 AM - 10:00 PM",
      phone: "+60 3-2031 0399",
      website: "www.centralmarket.com.my"
    }
  }

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
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src={place.image}
              alt={place.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {place.tags.map((tag) => (
                  <Link
                    href={`/tags/${tag.toLowerCase()}`}
                    key={tag}
                    className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-sm text-white hover:bg-white/30 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{place.title}</h1>
              <p className="text-xl text-white/80">{place.location}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Star className="h-5 w-5 text-orange-400 fill-current" />
                <span className="text-white font-medium">{place.rating}</span>
                <span className="text-white/80">({place.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>{place.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg glassmorphism">
                <h2 className="text-lg font-semibold mb-4">Place Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{place.details.openingHours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <span>{place.details.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-orange-500" />
                    <span>{place.details.website}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Add to Trip
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}