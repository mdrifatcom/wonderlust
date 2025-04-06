import TripPageClient from './trip-page-client'

export function generateStaticParams() {
  // Generate static pages for trips with IDs 1-5
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ]
}

export default function TripPage({ params }: { params: { id: string } }) {
  // In a real app, this would be where you fetch the data server-side
  const trip = {
    id: parseInt(params.id),
    title: "Kuala Lumpur - Ipoh",
    country: "Malaysia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1600",
    startDate: "Nov 17",
    duration: "4 Days",
    budget: "$1,200",
    description: "Experience the perfect blend of modern city life and cultural heritage as we journey from the bustling streets of Kuala Lumpur to the charming historical town of Ipoh.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kuala Lumpur",
        activities: ["Check-in at Hotel", "Visit Petronas Towers", "Street Food Tour"]
      },
      {
        day: 2,
        title: "KL Exploration",
        activities: ["Batu Caves", "Central Market", "Jalan Alor Night Market"]
      }
    ]
  }

  return <TripPageClient trip={trip} />
}