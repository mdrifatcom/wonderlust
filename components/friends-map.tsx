"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Friend {
  id: number
  name: string
  location: string
  avatar: string
  initials: string
}

const friends: Friend[] = [
  {
    id: 1,
    name: "Shelly A.",
    location: "Japan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100",
    initials: "SA"
  },
  {
    id: 2,
    name: "Edgar P.",
    location: "Argentina",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100",
    initials: "EP"
  },
  {
    id: 3,
    name: "Mortis A.",
    location: "Malaysia",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
    initials: "MA"
  }
]

export function FriendsMap() {
  return (
    <Card className="p-4 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Friends Location</h3>
          <p className="text-sm text-muted-foreground">Check on your friends' live location</p>
        </div>
        <Button variant="outline" size="sm">Expand</Button>
      </div>
      
      <div className="relative h-[300px] bg-muted rounded-lg mb-4">
        {/* Map placeholder - In production, integrate with a map service */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Map View
        </div>
        
        {/* Friend indicators would be positioned based on coordinates */}
        <div className="absolute top-1/4 left-1/3">
          <Avatar className="border-2 border-orange-500">
            <AvatarImage src={friends[0].avatar} />
            <AvatarFallback>{friends[0].initials}</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute bottom-1/3 right-1/4">
          <Avatar className="border-2 border-orange-500">
            <AvatarImage src={friends[1].avatar} />
            <AvatarFallback>{friends[1].initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{friend.name}</p>
                <p className="text-xs text-muted-foreground">{friend.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}