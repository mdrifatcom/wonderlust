'use client'

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusCircle, MapPin, BadgeCheck } from "lucide-react"
import Image from "next/image"
import { TripGallery } from "@/components/trip-gallery"
import { FriendsMap } from "@/components/friends-map"
import Link from "next/link"

export default function Home() {
  const upcomingTrips = [
    {
      id: 1,
      title: "Kuala Lumpur - Ipoh",
      country: "Malaysia",
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=400",
      startDate: "Nov 17",
      duration: "4 Days",
      budget: "$1,200"
    },
    {
      id: 2,
      title: "Sapa - Ninh Binh",
      country: "Vietnam",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=400",
      startDate: "Dec 24",
      duration: "12 Days",
      budget: "$890"
    }
  ]

  const recommendations = [
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
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-white/10 supports-[backdrop-filter]:bg-white/60">
        <div className="flex h-16 items-center px-4">
          <MobileNav />
          <div className="flex items-center space-x-4">
            <MapPin className="h-6 w-6" />
            <span className="text-xl font-bold">Wanderlust</span>
          </div>
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      
      <main className="flex-1 space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Good Morning, Cecillia 👋</h1>
            <p className="text-muted-foreground">Remember your upcoming trips!</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Trip
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <TripGallery />
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Upcoming Trips</h2>
                <Button variant="link">View All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingTrips.map((trip) => (
                  <Link href={`/trips/${trip.id}`} key={trip.id}>
                  <Card className="overflow-hidden group cursor-pointer">
                    <div className="relative h-64">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 rounded-full bg-orange-500/20 backdrop-blur-sm text-xs font-medium">
                            {trip.duration}
                          </span>
                        </div>
                        <div>
                      <h3 className="font-semibold">{trip.title}</h3>
                      <p className="text-sm text-white/80">{trip.country}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{trip.startDate}</p>
                        </div>
                        <p className="text-sm font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          {trip.budget}
                        </p>
                        </div>
                      </div>
                      </div>
                    </div>
                  </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <FriendsMap />
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Recommended Places</h2>
            <Button variant="link">See More</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((place) => (
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
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/tags/${tag.toLowerCase()}`;
                          }}
                          key={tag}
                          className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-2 py-1 text-xs cursor-pointer hover:bg-white/30 transition-colors"
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
        </section>
      </main>
    </div>
  )
}