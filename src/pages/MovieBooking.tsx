import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Armchair } from "lucide-react";
import { toast } from "sonner";

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

const MovieBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    toast.success(`${selectedSeats.length} seats booked successfully!`);
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Galactic Heist</h1>
            <p className="text-muted-foreground">Select your seats</p>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
