import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cart } from "@/components/Cart";
import { ChevronLeft, Armchair, MapPin, Clock, Calendar, Check } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

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

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  imageUrl: string;
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

  // Mock movie data
  const movie: Movie = {
    id: id || "1",
    title: "Galactic Heist",
    genre: "Sci-Fi, Action",
    duration: "2h 30m",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
  };

  // Mock cinema data
  const cinemas: Cinema[] = [
    {
      id: "1",
      name: "Cineplex Downtown",
      location: "123 Main Street, Downtown",
      distance: "2.5 km",
      showtimes: ["10:00 AM", "1:30 PM", "4:45 PM", "8:00 PM", "10:30 PM"],
    },
    {
      id: "2",
      name: "Metro IMAX",
      location: "456 Commerce Plaza, City Center",
      distance: "3.8 km",
      showtimes: ["11:00 AM", "2:15 PM", "5:30 PM", "9:00 PM"],
    },
    {
      id: "3",
      name: "Star Cinemas",
      location: "789 Park Avenue, Uptown",
      distance: "5.2 km",
      showtimes: ["10:30 AM", "1:00 PM", "4:00 PM", "7:15 PM", "10:00 PM"],
    },
    {
      id: "4",
      name: "Royal Theatre",
      location: "321 Boulevard Street, West End",
      distance: "4.1 km",
      showtimes: ["12:00 PM", "3:30 PM", "6:45 PM", "9:30 PM"],
    },
  ];

  const dates = ["Today", "Tomorrow", "Dec 22", "Dec 23", "Dec 24"];

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

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    if (!selectedCinema || !selectedShowtime) {
      toast.error("Please select a cinema and showtime");
      return;
    }

    // Add to cart
    addItem({
      id: `movie-${id}-${Date.now()}`,
      type: "movie",
      title: movie.title,
      details: `${selectedCinema.name} • ${selectedDate} • ${selectedShowtime} • ${selectedSeats.join(", ")}`,
      price: totalPrice,
      quantity: 1,
    });

    toast.success(`${selectedSeats.length} seats added to cart!`);
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

          {/* Tabs for Cinema Selection and Seat Selection */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="cinema" className="flex items-center gap-2">
                {selectedCinema && <Check className="h-4 w-4" />}
                Select Cinema & Time
              </TabsTrigger>
              <TabsTrigger value="seats" disabled={!selectedCinema}>
                {selectedSeats.length > 0 && <Check className="h-4 w-4" />}
                Select Seats
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
                onClick={handleBooking}
                disabled={selectedSeats.length === 0}
              >
                Proceed to Payment
              </Button>
                </div>
              </Card>
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
