export type EventType = "Concert" | "Sports" | "Stand up" | "Event";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: EventType;
  imageUrl: string;
  price: string;
  description: string;
}

export const eventsData: Event[] = [
  {
    id: "1",
    title: "Circus Maximus",
    date: "Nov 19, 2025",
    time: "7:00 PM",
    venue: "Mahalaxmi Race Course, Mumbai",
    type: "Concert",
    imageUrl: "/travis.jpg",
    price: "₹6,999",
    description: "SQUADDDDD. Cactus Jack is coming to India. Experience the ultimate music festival with top artists from around the world.",
  },
  {
    id: "2",
    title: "Messi GOAT Tour, India",
    date: "Dec 13, 2025",
    time: "6:30 PM",
    venue: "Eden Gardens, Kolkata",
    type: "Sports",
    imageUrl: "/messi.jpg",
    price: "₹7999",
    description: "The GOAT is coming. Witness football legend Lionel Messi in action at this exclusive exhibition match.",
  },
  {
    id: "3",
    title: "Lollapalooza",
    date: "Jan 24, 2026",
    time: "7:00 PM",
    venue: "Mahalaxmi Race Course, Mumbai",
    type: "Concert",
    imageUrl: "/lolla.jpg",
    price: "₹4999",
    description: "The iconic music festival returns to India with an incredible lineup of international and local artists.",
  },
  {
    id: "4",
    title: "Rolling Loud",
    date: "Jan 10, 2025",
    time: "6:00 PM",
    venue: "DY Patil, Navi Mumbai",
    type: "Concert",
    imageUrl: "/rollingloud.jpg",
    price: "₹6,299",
    description: "The world's largest hip-hop festival comes to India featuring the biggest names in rap and hip-hop.",
  },
  {
    id: "5",
    title: "Vir Das India Tour",
    date: "Jan 15, 2025",
    time: "6:30 PM",
    venue: "Chennai",
    type: "Stand up",
    imageUrl: "/virdas.jpg",
    price: "₹1,499",
    description: "Emmy-winning comedian Vir Das brings his latest stand-up special to cities across India.",
  },
  {
    id: "6",
    title: "Royal Enfield Motoverse",
    date: "Jan 20, 2025",
    time: "5:00 PM",
    venue: "Goa",
    type: "Event",
    imageUrl: "/re.jpg",
    price: "₹999",
    description: "The ultimate celebration of motorcycling culture with rides, exhibitions, and live music.",
  },
];
