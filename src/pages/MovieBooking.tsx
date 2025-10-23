import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cart } from "@/components/Cart";
import { ChevronLeft, Armchair, MapPin, Clock, Calendar, Check, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { moviesData } from "@/data/moviesData";

type SeatType = "standard" | "premium" | "vip";
type SeatStatus = "available" | "selected" | "occupied";

interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  status: SeatStatus;
  price: number;
}

interface Cinema {
  id: string;
  name: string;
  location: string;
  distance: string;
  showtimes: string[];
}

const MovieBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addItem, removeItem, isCartOpen, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState("cinema");
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("Today");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [wantsFood, setWantsFood] = useState<boolean | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [foodQuantities, setFoodQuantities] = useState<Record<string, number>>({});

  // Find the movie by ID
  const movie = moviesData.find((m) => m.id === id);

  // Redirect if movie not found
  if (!movie) {
    navigate("/movies");
    return null;
  }

  // Mock cinema data
  const cinemas: Cinema[] = [
    {
      id: "1",
      name: "Rohini Cinemas",
      location: "Koyambedu",
      distance: "2.5 km",
      showtimes: ["10:00 AM", "1:30 PM", "4:45 PM", "8:00 PM", "10:30 PM"],
    },
    {
      id: "2",
      name: "PVR INOX Pallazzo",
      location: "Nexus  Vijaya Forum Mall",
      distance: "3.8 km",
      showtimes: ["11:00 AM", "2:15 PM", "5:30 PM", "9:00 PM"],
    },
    {
      id: "3",
      name: "PVR Sathyam Cinemas",
      location: "Thousand Lights",
      distance: "5.2 km",
      showtimes: ["10:30 AM", "1:00 PM", "4:00 PM", "7:15 PM", "10:00 PM"],
    },
    {
      id: "4",
      name: "PVR Escape",
      location: "Express Avenue, Mall",
      distance: "4.1 km",
      showtimes: ["12:00 PM", "3:30 PM", "6:45 PM", "9:30 PM"],
    },
  ];

  const dates = ["Today", "Tomorrow", "Dec 22", "Dec 23", "Dec 24"];

  // Mock restaurant menu data
  const restaurantMenus: Record<string, Array<{ id: string; name: string; price: number; image: string; description: string }>> = {
    "KFC": [
      { id: "bp1", name: "Classic Burger", price: 250, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", description: "Juicy beef patty with cheese" },
      { id: "bp2", name: "Chicken Burger", price: 230, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300&h=200&fit=crop", description: "Crispy chicken fillet" },
      { id: "bp3", name: "Veggie Burger", price: 200, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=200&fit=crop", description: "Plant-based patty" },
      { id: "bp4", name: "French Fries", price: 100, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop", description: "Crispy golden fries" },
    ],
    "Domino's Pizza": [
      { id: "pc1", name: "Margherita Pizza", price: 350, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop", description: "Classic tomato and mozzarella" },
      { id: "pc2", name: "Pepperoni Pizza", price: 450, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop", description: "Loaded with pepperoni" },
      { id: "pc3", name: "Veggie Supreme", price: 400, image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&h=200&fit=crop", description: "Fresh vegetables galore" },
      { id: "pc4", name: "Garlic Bread", price: 150, image: "https://images.unsplash.com/photo-1573140401552-3fab0b24f9ae?w=300&h=200&fit=crop", description: "Buttery garlic bread" },
    ],
    "PVR": [
      { id: "sh1", name: "Popcorn (Large)", price: 200, image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300&h=200&fit=crop", description: "Buttered or salted" },
      { id: "sh2", name: "Nachos", price: 250, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop", description: "With cheese dip" },
      { id: "sh3", name: "Hot Dog", price: 150, image: "https://images.unsplash.com/photo-1612392062422-ef19b42f74df?w=300&h=200&fit=crop", description: "Classic cinema hot dog" },
      { id: "sh4", name: "Soft Drink", price: 80, image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=300&h=200&fit=crop", description: "Chilled beverages" },
    ],
    "Wow Momo!": [
      { id: "ad1", name: "Chicken Noodles", price: 280, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=300&h=200&fit=crop", description: "Stir-fried noodles" },
      { id: "ad2", name: "Spring Rolls", price: 180, image: "https://images.unsplash.com/photo-1560611588-0c4e3c7e5b51?w=300&h=200&fit=crop", description: "Crispy vegetable rolls" },
      { id: "ad3", name: "Fried Rice", price: 250, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop", description: "Classic fried rice" },
      { id: "ad4", name: "Momos", price: 200, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop", description: "Steamed dumplings" },
    ],
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12;

  const getSeatPrice = (rowIndex: number): { price: number; type: SeatType } => {
    if (rowIndex >= 6) return { price: 500, type: "vip" };
    if (rowIndex >= 3) return { price: 350, type: "premium" };
    return { price: 200, type: "standard" };
  };

  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const occupiedSeats = ["A5", "A6", "B7", "C4", "D8", "E2", "F10"];

    rows.forEach((row, rowIndex) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const { price, type } = getSeatPrice(rowIndex);
        seats.push({
          id: seatId,
          row,
          number: i,
          type,
          status: occupiedSeats.includes(seatId) ? "occupied" : "available",
          price,
        });
      }
    });
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const toggleSeat = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || seat.status === "occupied") return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const getSeatClassName = (seat: Seat) => {
    const isSelected = selectedSeats.includes(seat.id);
    const baseClasses = "w-8 h-8 rounded-t-lg transition-smooth cursor-pointer flex items-center justify-center";
    
    if (seat.status === "occupied") {
      return `${baseClasses} bg-muted text-muted-foreground cursor-not-allowed`;
    }
    
    if (isSelected) {
      if (seat.type === "vip") return `${baseClasses} bg-vip text-vip-foreground hover:bg-vip/90`;
      if (seat.type === "premium") return `${baseClasses} bg-premium text-premium-foreground hover:bg-premium/90`;
      return `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90`;
    }
    
    if (seat.type === "vip") return `${baseClasses} border-2 border-vip/50 hover:bg-vip/20`;
    if (seat.type === "premium") return `${baseClasses} border-2 border-premium/50 hover:bg-premium/20`;
    return `${baseClasses} border-2 border-border hover:bg-accent`;
  };

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    return sum + (seat?.price || 0);
  }, 0);

  const handleCinemaSelect = (cinema: Cinema, showtime: string) => {
    setSelectedCinema(cinema);
    setSelectedShowtime(showtime);
    setActiveTab("seats");
  };

  const handleProceedToFood = () => {
    if (selectedSeats.length === 0) {
      return;
    }
    setActiveTab("food");
  };

  const handleFoodChoice = (choice: boolean) => {
    setWantsFood(choice);
    if (!choice) {
      // Proceed directly to payment if no food wanted
      handleFinalBooking();
    }
  };

  const handleRestaurantSelect = (restaurantName: string) => {
    setSelectedRestaurant(restaurantName);
    setShowMenu(true);
    setFoodQuantities({});
  };

  const updateFoodQuantity = (itemId: string, delta: number) => {
    setFoodQuantities(prev => {
      const current = prev[itemId] || 0;
      const newQuantity = Math.max(0, current + delta);
      if (newQuantity === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const addFoodToCart = () => {
    if (!selectedRestaurant) return;
    
    const menuItems = restaurantMenus[selectedRestaurant];
    let itemsAdded = 0;

    Object.entries(foodQuantities).forEach(([itemId, quantity]) => {
      const item = menuItems.find(m => m.id === itemId);
      if (item && quantity > 0) {
        addItem({
          id: `food-${itemId}-${Date.now()}-${Math.random()}`,
          type: "food",
          title: item.name,
          details: `${selectedRestaurant} • Cinema Delivery`,
          price: item.price,
          quantity,
          deliveryType: "cinema",
        });
        itemsAdded++;
      }
    });

    if (itemsAdded > 0) {
      setShowMenu(false);
    }
  };

  const handleFinalBooking = () => {
    if (!selectedCinema || !selectedShowtime) {
      return;
    }

    // Add movie booking to cart
    addItem({
      id: `movie-${id}-${Date.now()}`,
      type: "movie",
      title: movie.title,
      details: `${selectedCinema.name} • ${selectedDate} • ${selectedShowtime} • ${selectedSeats.join(", ")}`,
      price: totalPrice,
      quantity: 1,
    });

    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={items.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container py-6 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="space-y-6">
          {/* Movie Info Header */}
          <div className="flex items-start gap-6">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-32 h-48 rounded-lg object-cover shadow-card"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{movie.title}</h1>
              <p className="text-muted-foreground mb-4">{movie.genre} • {movie.duration}</p>
              {selectedCinema && (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedCinema.name}
                  </Badge>
                  {selectedShowtime && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {selectedShowtime}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {selectedDate}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Tabs for Cinema Selection, Seat Selection, and Food */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="cinema" className="flex items-center gap-2">
                {selectedCinema && <Check className="h-4 w-4" />}
                Cinema & Time
              </TabsTrigger>
              <TabsTrigger value="seats" disabled={!selectedCinema} className="flex items-center gap-2">
                {selectedSeats.length > 0 && <Check className="h-4 w-4" />}
                Seats
              </TabsTrigger>
              <TabsTrigger value="food" disabled={selectedSeats.length === 0} className="flex items-center gap-2">
                {wantsFood !== null && <Check className="h-4 w-4" />}
                Food & Payment
              </TabsTrigger>
            </TabsList>

            {/* Cinema Selection Tab */}
            <TabsContent value="cinema" className="space-y-4">
              {/* Date Selection */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {dates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    onClick={() => setSelectedDate(date)}
                    className="flex-shrink-0"
                  >
                    {date}
                  </Button>
                ))}
              </div>

              {/* Cinema List */}
              <div className="space-y-4">
                {cinemas.map((cinema) => (
                  <Card key={cinema.id} className="p-6 bg-gradient-card border-border hover:shadow-card transition-smooth">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-foreground">{cinema.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{cinema.location}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {cinema.distance} away
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Available Showtimes:</p>
                        <div className="flex flex-wrap gap-2">
                          {cinema.showtimes.map((showtime) => (
                            <Button
                              key={showtime}
                              variant={
                                selectedCinema?.id === cinema.id && selectedShowtime === showtime
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => handleCinemaSelect(cinema, showtime)}
                              className="min-w-[100px]"
                            >
                              {showtime}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Seat Selection Tab */}
            <TabsContent value="seats">
              <Card className="p-8 bg-gradient-card border-border">
            {/* Screen */}
            <div className="mb-8">
              <div className="h-2 bg-gradient-primary rounded-full mb-2" />
              <p className="text-center text-sm text-muted-foreground">SCREEN</p>
            </div>

            {/* Seat Grid */}
            <div className="space-y-3 mb-8">
              {rows.map((row, rowIndex) => (
                <div key={row} className="flex items-center justify-center gap-2">
                  <span className="w-6 text-sm font-medium text-muted-foreground">{row}</span>
                  <div className="flex gap-1">
                    {seats
                      .filter((seat) => seat.row === row)
                      .map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => toggleSeat(seat.id)}
                          className={getSeatClassName(seat)}
                          disabled={seat.status === "occupied"}
                        >
                          <Armchair className="h-4 w-4" />
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-t-lg border-2 border-border" />
                <span className="text-sm text-muted-foreground">Standard ₹200</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-t-lg border-2 border-premium/50" />
                <span className="text-sm text-muted-foreground">Premium ₹350</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-t-lg border-2 border-vip/50" />
                <span className="text-sm text-muted-foreground">VIP ₹500</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-t-lg bg-muted" />
                <span className="text-sm text-muted-foreground">Occupied</span>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-background/50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Selected Seats:</span>
                <span className="font-semibold text-foreground">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="font-bold text-primary">₹{totalPrice}</span>
              </div>
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleProceedToFood}
                disabled={selectedSeats.length === 0}
              >
                Continue
              </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Food & Payment Tab */}
            <TabsContent value="food" className="space-y-6">
              {wantsFood === null ? (
                <Card className="p-8 bg-gradient-card border-border">
                  <div className="text-center space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Would you like food delivered to your seat?</h2>
                    <p className="text-muted-foreground">Enjoy delicious meals right at your cinema seat!</p>
                    <div className="flex gap-4 justify-center">
                      <Button
                        variant="default"
                        size="lg"
                        onClick={() => handleFoodChoice(true)}
                        className="min-w-[150px]"
                      >
                        Yes, I want food
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleFoodChoice(false)}
                        className="min-w-[150px]"
                      >
                        No, thanks
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : wantsFood ? (
                <div className="space-y-6">
                  {!showMenu ? (
                    <Card className="p-6 bg-gradient-card border-border">
                      <h3 className="text-xl font-bold text-foreground mb-4">Choose a Restaurant</h3>
                      <p className="text-sm text-muted-foreground mb-6">Select a restaurant to order food from</p>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        {[
                          { name: "Burger Palace", cuisine: "Fast Food", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop" },
                          { name: "Pizza Corner", cuisine: "Italian", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" },
                          { name: "Snack Hub", cuisine: "Snacks & Beverages", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop" },
                          { name: "Asian Delights", cuisine: "Asian Fusion", image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop" },
                        ].map((restaurant) => (
                          <Card 
                            key={restaurant.name}
                            className="p-4 cursor-pointer transition-smooth hover:shadow-card border-border hover:border-primary"
                            onClick={() => handleRestaurantSelect(restaurant.name)}
                          >
                            <img 
                              src={restaurant.image} 
                              alt={restaurant.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-bold text-foreground">{restaurant.name}</h4>
                            <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                          </Card>
                        ))}
                      </div>
                    </Card>
                  ) : (
                    <Card className="p-6 bg-gradient-card border-border">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{selectedRestaurant} Menu</h3>
                          <p className="text-sm text-muted-foreground">Add items to your cinema seat order</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setShowMenu(false)}
                        >
                          Change Restaurant
                        </Button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 mb-6">
                        {selectedRestaurant && restaurantMenus[selectedRestaurant]?.map((item) => (
                          <Card key={item.id} className="p-4 border-border">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-bold text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-primary">₹{item.price}</span>
                              <div className="flex items-center gap-2">
                                {(foodQuantities[item.id] || 0) === 0 ? (
                                  <Button
                                    size="sm"
                                    onClick={() => updateFoodQuantity(item.id, 1)}
                                  >
                                    Add
                                  </Button>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-8 w-8"
                                      onClick={() => updateFoodQuantity(item.id, -1)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center font-semibold text-foreground">
                                      {foodQuantities[item.id]}
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-8 w-8"
                                      onClick={() => updateFoodQuantity(item.id, 1)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>

                      <div className="bg-background/50 rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Items Selected:</span>
                          <span className="font-semibold text-foreground">
                            {Object.values(foodQuantities).reduce((sum, qty) => sum + qty, 0)}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="default"
                            size="lg"
                            className="flex-1"
                            onClick={addFoodToCart}
                            disabled={Object.keys(foodQuantities).length === 0}
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={handleFinalBooking}
                          >
                            Skip & Pay
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="p-8 bg-gradient-card border-border">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Booking Summary</h2>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Movie:</span>
                        <span className="font-semibold text-foreground">{movie.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cinema:</span>
                        <span className="font-semibold text-foreground">{selectedCinema?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date & Time:</span>
                        <span className="font-semibold text-foreground">{selectedDate} • {selectedShowtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Seats:</span>
                        <span className="font-semibold text-foreground">{selectedSeats.join(", ")}</span>
                      </div>
                      <div className="flex justify-between text-lg pt-3 border-t border-border">
                        <span className="font-bold text-foreground">Total:</span>
                        <span className="font-bold text-primary">₹{totalPrice}</span>
                      </div>
                    </div>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleFinalBooking}
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
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

export default MovieBooking;
