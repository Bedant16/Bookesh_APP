import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { FoodCard } from "@/components/FoodCard";
import { Cart } from "@/components/Cart";
import { useCart } from "@/contexts/CartContext";

const Food = () => {
  const { items, removeItem, isCartOpen, setIsCartOpen } = useCart();

  const restaurants = [
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
      id: "2",
      name: "Pizza Paradise",
      rating: 4.3,
      deliveryTime: "25-30 min",
      cuisine: "Italian, Fast Food",
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
      isCinemaVendor: false,
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
      id: "4",
      name: "Wok & Roll",
      rating: 4.4,
      deliveryTime: "30-35 min",
      cuisine: "Chinese, Asian",
      imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop",
      isCinemaVendor: false,
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
    {
      id: "6",
      name: "Spice Route",
      rating: 4.5,
      deliveryTime: "35-40 min",
      cuisine: "Indian, North Indian",
      imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
      isCinemaVendor: false,
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Food For You</h1>
                <p className="text-muted-foreground">Order food for home or cinema delivery</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <FoodCard key={restaurant.id} {...restaurant} />
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

export default Food;
