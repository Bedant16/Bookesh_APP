import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MovieCard } from "@/components/MovieCard";
import { EventCard } from "@/components/EventCard";
import { FoodCard } from "@/components/FoodCard";
import { Cart } from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { HeroCarousel } from "@/components/HeroCarousel";
import heroImage from "@/assets/galactic-heist-hero.jpg";
import concertImage from "@/assets/concert-event.jpg";

const Index = () => {
  const { items, removeItem, isCartOpen, setIsCartOpen } = useCart();

  const heroItems = [
    {
      id: "hero-1",
      type: "movie" as const,
      title: "Galactic Heist",
      description: "A thrilling sci-fi adventure that takes you beyond the stars. Experience the ultimate heist in space.",
      imageUrl: heroImage,
      genre: "Sci-Fi, Action",
      link: "/movie/1",
    },
    {
      id: "hero-2",
      type: "event" as const,
      title: "Rock Legends Live",
      description: "An unforgettable night with the greatest rock bands. Experience live music like never before.",
      imageUrl: concertImage,
      date: "Dec 25, 2024",
      venue: "Arena Stadium",
      link: "/events",
    },
    {
      id: "hero-3",
      type: "movie" as const,
      title: "Urban Legends",
      description: "Uncover the mysteries hidden in the city. A gripping thriller that will keep you on the edge of your seat.",
      imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop",
      genre: "Thriller, Mystery",
      link: "/movie/2",
    },
    {
      id: "hero-4",
      type: "event" as const,
      title: "Jazz Evening",
      description: "Smooth jazz performances in an intimate setting. Perfect for a sophisticated night out.",
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&h=1080&fit=crop",
      date: "Jan 15, 2025",
      venue: "Blue Note Club",
      link: "/events",
    },
  ];

  const featuredMovies = [
    {
      id: "1",
      title: "Galactic Heist",
      rating: 8.5,
      duration: "2h 30m",
      genre: "Sci-Fi, Action",
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop",
    },
    {
      id: "2",
      title: "Urban Legends",
      rating: 7.8,
      duration: "2h 15m",
      genre: "Thriller, Mystery",
      imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1200&fit=crop",
    },
    {
      id: "3",
      title: "Summer Romance",
      rating: 8.2,
      duration: "1h 55m",
      genre: "Romance, Drama",
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=1200&fit=crop",
    },
    {
      id: "4",
      title: "The Last Stand",
      rating: 8.9,
      duration: "2h 45m",
      genre: "Action, War",
      imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=1200&fit=crop",
    },
  ];

  const trendingEvents = [
    {
      id: "1",
      title: "Circus Maximus",
      date: "Nov 19, 2025",
      time: "7:00 PM",
      venue: "Mahalaxmi Race Course, Mumbai",
      type: "Concert",
      imageUrl: "/travis.jpg",
      price: "₹6,999",
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
    },
  ];

  const foodVendors = [
    {
      id: "1",
      name: "Cinema Snacks Hub",
      rating: 4.5,
      deliveryTime: "15-20 min",
      cuisine: "Snacks, Beverages",
      imageUrl: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&h=600&fit=crop",
      isCinemaVendor: true,
    },
    {
      id: "3",
      name: "Burger Bros",
      rating: 4.6,
      deliveryTime: "20-25 min",
      cuisine: "American, Burgers",
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
      isCinemaVendor: true,
    },
    {
      id: "5",
      name: "Sweet Treats",
      rating: 4.7,
      deliveryTime: "15-20 min",
      cuisine: "Desserts, Beverages",
      imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop",
      isCinemaVendor: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={items.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container py-6">
        <div className="flex gap-6">
          <Sidebar />
          
          <main className="flex-1 space-y-12">
            {/* Hero Carousel */}
            <HeroCarousel items={heroItems} />

            {/* Featured Movies */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Featured Movies</h2>
                  <p className="text-muted-foreground">Catch the latest blockbusters</p>
                </div>
                <Link to="/movies">
                  <Button variant="ghost">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredMovies.map((movie) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
            </section>

            {/* Trending Events */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Trending Events</h2>
                  <p className="text-muted-foreground">Don't miss out on these experiences</p>
                </div>
                <Link to="/events">
                  <Button variant="ghost">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            </section>

            {/* Food For You */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Food For You</h2>
                  <p className="text-muted-foreground">Order to your seat or home</p>
                </div>
                <Link to="/food">
                  <Button variant="ghost">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodVendors.map((vendor) => (
                  <FoodCard key={vendor.id} {...vendor} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onRemoveItem={removeItem}
      />
    </div>
  );
};

export default Index;
