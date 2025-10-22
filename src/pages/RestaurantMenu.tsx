import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Cart } from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Plus, Star, Clock, MapPin, ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addItem, removeItem, isCartOpen, setIsCartOpen } = useCart();
  const [deliveryType, setDeliveryType] = useState<"home" | "cinema">("home");
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<any>(null);

  // Mock restaurant data
  const restaurant = {
    id: id || "1",
    name: "Cinema Snacks Hub",
    rating: 4.5,
    deliveryTime: "15-20 min",
    cuisine: "Snacks, Beverages",
    imageUrl: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=800&h=600&fit=crop",
    isCinemaVendor: true,
  };

  const menuItems = [
    { id: "f1", name: "Popcorn (Large)", price: 250, category: "Snacks", image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop" },
    { id: "f2", name: "Nachos with Cheese", price: 300, category: "Snacks", image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop" },
    { id: "f3", name: "Hot Dog", price: 180, category: "Snacks", image: "https://images.unsplash.com/photo-1612392062798-2dbae8f9f7fc?w=400&h=300&fit=crop" },
    { id: "f4", name: "Coke (Large)", price: 120, category: "Beverages", image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop" },
    { id: "f5", name: "Pizza Slice", price: 150, category: "Food", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
    { id: "f6", name: "French Fries", price: 140, category: "Snacks", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400&h=300&fit=crop" },
  ];

  const handleAddToCart = (item: any) => {
    if (restaurant.isCinemaVendor) {
      setSelectedFoodItem(item);
      setShowDeliveryDialog(true);
    } else {
      addToCartWithType(item, "home");
    }
  };

  const addToCartWithType = (item: any, type: "home" | "cinema") => {
    const cartItem = {
      id: `${item.id}-${type}`,
      type: "food" as const,
      title: item.name,
      details: `${restaurant.name} • ${type === "cinema" ? "Cinema Seat Delivery" : "Home Delivery"}`,
      price: item.price,
      quantity: 1,
      deliveryType: type,
    };
    addItem(cartItem);
    setShowDeliveryDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={items.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container py-6">
        <main className="space-y-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {/* Restaurant Info */}
            <Card className="p-6 bg-gradient-card border-border">
              <div className="flex items-start gap-6">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">{restaurant.name}</h1>
                  <p className="text-muted-foreground">{restaurant.cuisine}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-foreground">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{restaurant.deliveryTime}</span>
                    </div>
                    {restaurant.isCinemaVendor && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-primary">Cinema Delivery Available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Menu Items */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Menu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden bg-gradient-card border-border hover:shadow-card transition-smooth">
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                        <span className="text-lg font-bold text-primary">₹{item.price}</span>
                      </div>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => handleAddToCart(item)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
        </main>
      </div>

      {/* Delivery Type Dialog */}
      <Dialog open={showDeliveryDialog} onOpenChange={setShowDeliveryDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Choose Delivery Type</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <RadioGroup value={deliveryType} onValueChange={(value) => setDeliveryType(value as "home" | "cinema")}>
              <div className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:bg-muted transition-smooth cursor-pointer">
                <RadioGroupItem value="cinema" id="cinema" />
                <Label htmlFor="cinema" className="flex-1 cursor-pointer">
                  <div className="font-medium text-foreground">Cinema Seat Delivery</div>
                  <div className="text-sm text-muted-foreground">Delivered directly to your seat during the show</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:bg-muted transition-smooth cursor-pointer">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home" className="flex-1 cursor-pointer">
                  <div className="font-medium text-foreground">Home Delivery</div>
                  <div className="text-sm text-muted-foreground">Delivered to your address</div>
                </Label>
              </div>
            </RadioGroup>
            <Button
              variant="default"
              className="w-full"
              onClick={() => selectedFoodItem && addToCartWithType(selectedFoodItem, deliveryType)}
            >
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onRemoveItem={removeItem}
      />
    </div>
  );
};

export default RestaurantMenu;
