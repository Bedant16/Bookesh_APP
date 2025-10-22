export interface Movie {
  id: string;
  title: string;
  rating: number;
  duration: string;
  genre: string;
  imageUrl: string;
  description: string;
}

export const moviesData: Movie[] = [
  {
    id: "1",
    title: "DUDE",
    rating: 8.5,
    duration: "2h 30m",
    genre: "Comedy, Romance",
    imageUrl: "/dude1.jpg",
    description: "Childhood friends Agan and Kural are inseparable. When Kural encounters romantic troubles, Agan must balance his hidden feelings for her with his desire to ensure her happiness.",
  },
  {
    id: "2",
    title: "F1 The Movie",
    rating: 7.8,
    duration: "2h 15m",
    genre: "Drama",
    imageUrl: "/f12.jpg",
    description: "In the 1990s, Sonny Hayes was Formula 1's most promising driver until an accident on the track nearly ended his career. Thirty years later, he returns to the sport as a mentor.",
  },
  {
    id: "3",
    title: "Saiyaara",
    rating: 8.2,
    duration: "1h 55m",
    genre: "Romance, Drama",
    imageUrl: "/saiyaara.jpg",
    description: "A heartwarming tale of love, loss, and second chances set against the vibrant backdrop of modern India.",
  },
  {
    id: "4",
    title: "WAR 2",
    rating: 8.9,
    duration: "2h 45m",
    genre: "Action, War",
    imageUrl: "/WAR2.jpg",
    description: "The epic sequel returns with high-octane action and gripping espionage as elite agents face their greatest challenge yet.",
  },
  {
    id: "5",
    title: "Coolie",
    rating: 7.5,
    duration: "1h 45m",
    genre: "Comedy",
    imageUrl: "/coolie.jpg",
    description: "A hilarious comedy about a railway porter who dreams of becoming something more and the adventures that follow.",
  },
  {
    id: "6",
    title: "Conjuring: Last Rites",
    rating: 8.0,
    duration: "2h 10m",
    genre: "Horror, Thriller",
    imageUrl: "/conjuring.jpg",
    description: "The final chapter in the Conjuring saga brings the Warrens face to face with their most terrifying case yet.",
  },
];
