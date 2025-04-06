'use client'

import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface Activity {
  id: string
  title: string
  location: string
  date: string
  time: string
}

export default function PlannerPage() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: "Visit Petronas Towers",
      location: "Kuala Lumpur City Centre",
      date: "2024-04-17",
      time: "10:00"
    },
    {
      id: '2',
      title: "Street Food Tour",
      location: "Jalan Alor",
      date: "2024-04-17",
      time: "19:00"
    }
  ])

  const [newActivity, setNewActivity] = useState({
    title: "",
    location: "",
    date: "",
    time: ""
  })

  const removeActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id))
  }

  const addActivity = () => {
    if (newActivity.title && newActivity.location && newActivity.date && newActivity.time) {
      setActivities([...activities, {
        id: Date.now().toString(),
        ...newActivity
      }])
      setNewActivity({ title: "", location: "", date: "", time: "" })
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Trip Planner</h1>
              <p className="text-muted-foreground">Plan your perfect journey</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Activity</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Activity Title</Label>
                    <Input
                      id="title"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      placeholder="Visit Petronas Towers"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                      placeholder="Kuala Lumpur City Centre"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newActivity.date}
                        onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newActivity.time}
                        onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={addActivity}
                  >
                    Add Activity
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.id} className="p-4 glassmorphism">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">{activity.title}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
                    onClick={() => removeActivity(activity.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {activity.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {activity.time}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}