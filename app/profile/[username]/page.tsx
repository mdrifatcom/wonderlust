import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, BadgeCheck, Users, MapPinned } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This needs to be a Server Component to use generateStaticParams
export const dynamic = 'force-static'

export async function generateStaticParams() {
  // In a real app, this would come from your database or API
  // For now, we'll hardcode some example usernames
  return [
    { username: 'nita' },
    { username: 'john' },
    { username: 'sarah' }
  ]
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  // In a real app, fetch user data based on username
  const user = {
    name: "Nita",
    username: params.username,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
    initials: "NR",
    level: "Expert Traveler",
    isVerified: true,
    stats: {
      trips: 24,
      followers: 1.2,
      following: 843
    },
    recentTrips: [
      {
        id: 1,
        title: "Kuala Lumpur - Ipoh",
        country: "Malaysia",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=400",
        startDate: "Nov 17",
        duration: "4 Days"
      }
    ]
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
          <div className="flex items-start gap-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {user.isVerified && (
                  <BadgeCheck className="h-6 w-6 text-orange-500" />
                )}
              </div>
              <p className="text-muted-foreground mb-4">{user.level}</p>
              
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.stats.trips}</p>
                  <p className="text-sm text-muted-foreground">Trips</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.stats.followers}K</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.stats.following}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600">
              <Users className="mr-2 h-4 w-4" />
              Follow
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Recent Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.recentTrips.map((trip) => (
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
                          <div className="mt-2">
                            <p className="text-sm font-medium">{trip.startDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}