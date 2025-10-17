import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MovieCard } from "@/components/MovieCard";
import { EventCard } from "@/components/EventCard";
import { FoodCard } from "@/components/FoodCard";
import { Cart } from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroImage from "@/assets/galactic-heist-hero.jpg";

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

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
      title: "Rock Legends Live",
      date: "Dec 25, 2024",
      time: "7:00 PM",
      venue: "Arena Stadium",
      type: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
      price: "₹1,999",
    },
    {
      id: "2",
      title: "Comedy Night",
      date: "Dec 28, 2024",
      time: "8:30 PM",
      venue: "Laugh House",
      type: "Comedy",
      imageUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&h=600&fit=crop",
      price: "₹799",
    },
    {
      id: "3",
      title: "Jazz Evening",
      date: "Jan 15, 2025",
      time: "7:30 PM",
      venue: "Blue Note Club",
      type: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
      price: "₹1,499",
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
      <Header cartItemsCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container py-6">
        <div className="flex gap-6">
          <Sidebar />
          
          <main className="flex-1 space-y-12">
            {/* Hero Section */}
            <section className="relative h-[500px] rounded-2xl overflow-hidden shadow-glow">
              <img
                src={heroImage}
                alt="Galactic Heist"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="container max-w-2xl space-y-6 p-8">
                  <h1 className="text-5xl font-bold text-foreground">Galactic Heist</h1>
                  <p className="text-lg text-muted-foreground">
                    A thrilling sci-fi adventure that takes you beyond the stars. Experience the ultimate heist in space.
                  </p>
                  <div className="flex gap-4">
                    <Link to="/movie/1">
                      <Button variant="hero" size="lg">
                        <Play className="mr-2 h-5 w-5" />
                        Book Tickets
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg">
                      Order Food to Seat
                    </Button>
                  </div>
                </div>
              </div>
            </section>

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
        items={cartItems}
        onRemoveItem={(id) => setCartItems(cartItems.filter((item) => item.id !== id))}
      />
    </div>
  );
};

export default Index;
