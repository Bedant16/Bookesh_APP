import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { EventCard } from "@/components/EventCard";
import { Cart } from "@/components/Cart";
import { useCart } from "@/contexts/CartContext";

const Events = () => {
  const { items, removeItem, isCartOpen, setIsCartOpen } = useCart();

  const events = [
    {
      id: "1",
      title: "Circux Maximus",
      date: "Nov 19, 2025",
      time: "7:00 PM",
      venue: "Mahalaxmi Race Course, Mumbai",
      type: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
      price: "₹6,999",
    },
    {
      id: "2",
      title: "Messi GOAT Tour, India",
      date: "Dec 13, 2025",
      time: "6:30 PM",
      venue: "Eden Gardens, Kolkata",
      type: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&h=600&fit=crop",
      price: "₹7999",
    },
    {
      id: "3",
      title: "Lollapalooza",
      date: "Jan 24, 2026",
      time: "7:00 PM",
      venue: "Mahalaxmi Race Course, Mumbai",
      type: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      price: "₹4999",
    },
    {
      id: "4",
      title: "Rolling Loud",
      date: "Jan 10, 2025",
      time: "6:00 PM",
      venue: "DY Patil, Navi Mumbai",
      type: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
      price: "₹6,299",
    },
    {
      id: "5",
      title: "Vir Das India Tour",
      date: "Jan 15, 2025",
      time: "6:30 PM",
      venue: "Chennai",
      type: "Stand up",
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
      price: "₹1,499",
    },
    {
      id: "6",
      title: "Royal Enfield Motoverse",
      date: "Jan 20, 2025",
      time: "5:00 PM",
      venue: "Goa",
      type: "Event",
      imageUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop",
      price: "₹999",
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Trending Events</h1>
                <p className="text-muted-foreground">Discover concerts, shows, and workshops near you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} {...event} />
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

export default Events;
