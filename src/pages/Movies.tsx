import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { Cart } from "@/components/Cart";
import { useCart } from "@/contexts/CartContext";
import { moviesData } from "@/data/moviesData";

const Movies = () => {
  const { items, removeItem, isCartOpen, setIsCartOpen } = useCart();

  const movies = moviesData;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={items.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container py-6">
        <main>
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
