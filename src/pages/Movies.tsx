import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MovieCard } from "@/components/MovieCard";
import { Cart } from "@/components/Cart";
import { useCart } from "@/contexts/CartContext";

const Movies = () => {
  const { items, removeItem, isCartOpen, setIsCartOpen } = useCart();

  const movies = [
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
    {
      id: "5",
      title: "Laugh Out Loud",
      rating: 7.5,
      duration: "1h 45m",
      genre: "Comedy",
      imageUrl: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=800&h=1200&fit=crop",
    },
    {
      id: "6",
      title: "Midnight Mystery",
      rating: 8.0,
      duration: "2h 10m",
      genre: "Horror, Thriller",
      imageUrl: "https://images.unsplash.com/photo-1574267432644-f65c78b74820?w=800&h=1200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={items.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container py-6">
        <div className="flex gap-6">
          <Sidebar />
          
          <main className="flex-1">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Now Showing</h1>
                <p className="text-muted-foreground">Book your tickets for the latest movies</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
            </div>
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

export default Movies;
