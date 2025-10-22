import { Header } from "@/components/Header";
import { EventCard } from "@/components/EventCard";
import { Cart } from "@/components/Cart";
import { useCart } from "@/contexts/CartContext";
import { eventsData } from "@/data/eventsData";

const Events = () => {
  const { items, removeItem, isCartOpen, setIsCartOpen } = useCart();

  const events = eventsData;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={items.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container py-6">
        <main>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Trending Events</h1>
                <p className="text-muted-foreground">Discover concerts, shows, and workshops near you</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} {...event} />
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

export default Events;
