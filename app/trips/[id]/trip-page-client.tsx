'use client'

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Trip {
  id: number
  title: string
  country: string
  image: string
  startDate: string
  duration: string
  budget: string
  description: string
  itinerary: {
    day: number
    title: string
    activities: string[]
  }[]
}

export default function TripPageClient({ trip }: { trip: Trip }) {
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
              src={trip.image}
              alt={trip.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{trip.title}</h1>
              <p className="text-xl text-white/80">{trip.country}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>{trip.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Itinerary</h2>
                {trip.itinerary.map((day) => (
                  <div key={day.day} className="p-4 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                    <h3 className="font-semibold">Day {day.day}: {day.title}</h3>
                    <ul className="mt-2 space-y-1">
                      {day.activities.map((activity, index) => (
                        <li key={index} className="text-sm text-muted-foreground">• {activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg glassmorphism">
                <h2 className="text-lg font-semibold mb-4">Trip Details</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span>{trip.startDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-4 w-4 text-orange-500" />
                    <span>{trip.budget}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Join Trip
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}