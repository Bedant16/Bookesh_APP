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
      title: "Rock Legends Live",
      date: "Dec 25, 2024",
      time: "7:00 PM",
      venue: "Arena Stadium, Downtown",
      type: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
      price: "₹1,999",
    },
    {
      id: "2",
      title: "Comedy Night Special",
      date: "Dec 28, 2024",
      time: "8:30 PM",
      venue: "Laugh House Theatre",
      type: "Comedy",
      imageUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&h=600&fit=crop",
      price: "₹799",
    },
    {
      id: "3",
      title: "Digital Marketing Workshop",
      date: "Jan 5, 2025",
      time: "10:00 AM",
      venue: "Tech Hub Convention Center",
      type: "Workshop",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      price: "₹499",
    },
    {
      id: "4",
      title: "Shakespeare's Hamlet",
      date: "Jan 10, 2025",
      time: "6:00 PM",
      venue: "Royal Theatre",
      type: "Theatre",
      imageUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
      price: "₹1,299",
    },
    {
      id: "5",
      title: "Jazz & Blues Evening",
      date: "Jan 15, 2025",
      time: "7:30 PM",
      venue: "Blue Note Club",
      type: "Concert",
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
      price: "₹1,499",
    },
    {
      id: "6",
      title: "Stand-Up Marathon",
      date: "Jan 20, 2025",
      time: "9:00 PM",
      venue: "Comedy Central Hall",
      type: "Comedy",
      imageUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop",
      price: "₹899",
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
