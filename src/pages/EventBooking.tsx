import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cart } from "@/components/Cart";
import { ChevronLeft, Calendar, MapPin, Clock, Check, Users } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

type EventType = "Concert" | "Sports" | "Stand up" | "Event";
type TicketTier = {
  id: string;
  name: string;
  price: number;
  available: number;
};

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: EventType;
  imageUrl: string;
  description: string;
}

const EventBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addItem, removeItem, isCartOpen, setIsCartOpen } = useCart();
  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

  // Mock event data - in real app, fetch based on id
  const event: EventData = {
    id: id || "1",
    title: "Circus Maximus",
    date: "Nov 19, 2025",
    time: "7:00 PM",
    venue: "Mahalaxmi Race Course, Mumbai",
    type: "Concert",
    imageUrl: "/travis.jpg",
    description: "Experience the ultimate music festival with top artists from around the world.",
  };

  // Ticket tiers based on event type
  const getTicketTiers = (type: EventType): TicketTier[] => {
    switch (type) {
      case "Concert":
        return [
          { id: "vip", name: "VIP", price: 15999, available: 50 },
          { id: "premium", name: "Premium", price: 9999, available: 200 },
          { id: "general", name: "General", price: 6999, available: 500 },
          { id: "standing", name: "Standing", price: 4999, available: 1000 },
        ];
      case "Sports":
        return [
          { id: "platinum", name: "Platinum (Center)", price: 12999, available: 100 },
          { id: "gold", name: "Gold (Side)", price: 8999, available: 300 },
          { id: "silver", name: "Silver (Corner)", price: 5999, available: 500 },
          { id: "bronze", name: "Bronze (Upper)", price: 3999, available: 800 },
        ];
      case "Stand up":
        return [
          { id: "front", name: "Front Row", price: 2999, available: 20 },
          { id: "premium", name: "Premium", price: 1999, available: 100 },
          { id: "standard", name: "Standard", price: 1499, available: 300 },
          { id: "balcony", name: "Balcony", price: 999, available: 200 },
        ];
      default:
        return [
          { id: "vip", name: "VIP", price: 4999, available: 50 },
          { id: "general", name: "General", price: 2999, available: 500 },
        ];
    }
  };

  const ticketTiers = getTicketTiers(event.type);

  const updateTicketQuantity = (tierId: string, delta: number) => {
    setSelectedTickets((prev) => {
      const tier = ticketTiers.find((t) => t.id === tierId);
      if (!tier) return prev;

      const current = prev[tierId] || 0;
      const newQuantity = Math.max(0, Math.min(tier.available, current + delta));
      
      if (newQuantity === 0) {
        const { [tierId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [tierId]: newQuantity };
    });
  };

  const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(selectedTickets).reduce((sum, [tierId, qty]) => {
    const tier = ticketTiers.find((t) => t.id === tierId);
    return sum + (tier?.price || 0) * qty;
  }, 0);

  const handleAddToCart = () => {
    if (totalTickets === 0) {
      return;
    }

    const ticketDetails = Object.entries(selectedTickets)
      .map(([tierId, qty]) => {
        const tier = ticketTiers.find((t) => t.id === tierId);
        return `${qty}x ${tier?.name}`;
      })
      .join(", ");

    addItem({
      id: `event-${id}-${Date.now()}`,
      type: "event",
      title: event.title,
      details: `${event.date} • ${event.time} • ${event.venue} • ${ticketDetails}`,
      price: totalPrice,
      quantity: 1,
    });

    setIsCartOpen(true);
  };

  // Render venue layout based on event type
  const renderVenueLayout = () => {
    switch (event.type) {
      case "Concert":
        return (
          <div className="space-y-8">
            {/* Stage */}
            <div className="flex flex-col items-center mb-12">
              <div className="w-full max-w-2xl h-4 bg-gradient-primary rounded-full mb-2" />
              <p className="text-sm text-muted-foreground font-medium">STAGE</p>
            </div>

            {/* Concert Layout */}
            <div className="grid gap-6">
              {/* VIP Section */}
              <div className="relative p-6 border-2 border-vip rounded-lg bg-vip/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-vip">VIP SECTION</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  {[...Array(8)].map((_, i) => (
                    <Users key={i} className="h-6 w-6 text-vip" />
                  ))}
                </div>
              </div>

              {/* Premium Section */}
              <div className="relative p-8 border-2 border-premium rounded-lg bg-premium/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-premium">PREMIUM SECTION</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  {[...Array(24)].map((_, i) => (
                    <Users key={i} className="h-5 w-5 text-premium" />
                  ))}
                </div>
              </div>

              {/* General Section */}
              <div className="relative p-10 border-2 border-primary rounded-lg bg-primary/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-primary">GENERAL SECTION</span>
                </div>
                <div className="grid grid-cols-16 gap-1">
                  {[...Array(48)].map((_, i) => (
                    <Users key={i} className="h-4 w-4 text-primary" />
                  ))}
                </div>
              </div>

              {/* Standing Area */}
              <div className="relative p-12 border-2 border-accent rounded-lg bg-accent/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-foreground">STANDING AREA</span>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {[...Array(80)].map((_, i) => (
                    <Users key={i} className="h-3 w-3 text-muted-foreground" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "Sports":
        return (
          <div className="space-y-8">
            {/* Field */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-full max-w-3xl aspect-video border-4 border-primary rounded-lg bg-primary/5 flex items-center justify-center">
                <p className="text-lg font-bold text-foreground">FIELD</p>
              </div>
            </div>

            {/* Stadium Sections */}
            <div className="grid grid-cols-2 gap-6">
              {/* Platinum Center */}
              <div className="col-span-2 relative p-6 border-2 border-vip rounded-lg bg-vip/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-vip">PLATINUM (CENTER VIEW)</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  {[...Array(24)].map((_, i) => (
                    <Users key={i} className="h-5 w-5 text-vip" />
                  ))}
                </div>
              </div>

              {/* Gold Side Sections */}
              <div className="relative p-6 border-2 border-premium rounded-lg bg-premium/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-premium">GOLD (LEFT SIDE)</span>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {[...Array(32)].map((_, i) => (
                    <Users key={i} className="h-4 w-4 text-premium" />
                  ))}
                </div>
              </div>

              <div className="relative p-6 border-2 border-premium rounded-lg bg-premium/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-premium">GOLD (RIGHT SIDE)</span>
                </div>
                <div className="grid grid-cols-8 gap-2">
                  {[...Array(32)].map((_, i) => (
                    <Users key={i} className="h-4 w-4 text-premium" />
                  ))}
                </div>
              </div>

              {/* Silver Corner Sections */}
              <div className="relative p-6 border-2 border-primary rounded-lg bg-primary/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-primary">SILVER (CORNER)</span>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {[...Array(40)].map((_, i) => (
                    <Users key={i} className="h-3 w-3 text-primary" />
                  ))}
                </div>
              </div>

              <div className="relative p-6 border-2 border-primary rounded-lg bg-primary/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-primary">SILVER (CORNER)</span>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {[...Array(40)].map((_, i) => (
                    <Users key={i} className="h-3 w-3 text-primary" />
                  ))}
                </div>
              </div>

              {/* Bronze Upper Sections */}
              <div className="col-span-2 relative p-8 border-2 border-accent rounded-lg bg-accent/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-foreground">BRONZE (UPPER DECK)</span>
                </div>
                <div className="grid grid-cols-20 gap-1">
                  {[...Array(60)].map((_, i) => (
                    <Users key={i} className="h-3 w-3 text-muted-foreground" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "Stand up":
        return (
          <div className="space-y-8">
            {/* Stage */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-64 h-3 bg-gradient-primary rounded-full mb-2" />
              <p className="text-sm text-muted-foreground font-medium">STAGE</p>
            </div>

            {/* Arena Layout */}
            <div className="space-y-6">
              {/* Front Row */}
              <div className="relative p-4 border-2 border-vip rounded-lg bg-vip/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-vip">FRONT ROW</span>
                </div>
                <div className="flex justify-center gap-2">
                  {[...Array(10)].map((_, i) => (
                    <Users key={i} className="h-5 w-5 text-vip" />
                  ))}
                </div>
              </div>

              {/* Premium Section */}
              <div className="relative p-6 border-2 border-premium rounded-lg bg-premium/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-premium">PREMIUM SECTION</span>
                </div>
                <div className="grid grid-cols-10 gap-2">
                  {[...Array(30)].map((_, i) => (
                    <Users key={i} className="h-4 w-4 text-premium" />
                  ))}
                </div>
              </div>

              {/* Standard Section */}
              <div className="relative p-8 border-2 border-primary rounded-lg bg-primary/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-primary">STANDARD SECTION</span>
                </div>
                <div className="grid grid-cols-12 gap-2">
                  {[...Array(48)].map((_, i) => (
                    <Users key={i} className="h-4 w-4 text-primary" />
                  ))}
                </div>
              </div>

              {/* Balcony */}
              <div className="relative p-6 border-2 border-accent rounded-lg bg-accent/10">
                <div className="absolute -top-3 left-4 px-2 bg-background">
                  <span className="text-xs font-bold text-foreground">BALCONY SECTION</span>
                </div>
                <div className="grid grid-cols-14 gap-1">
                  {[...Array(42)].map((_, i) => (
                    <Users key={i} className="h-3 w-3 text-muted-foreground" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Select your ticket tier below</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={items.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container py-6 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="space-y-6">
          {/* Event Info Header */}
          <div className="flex items-start gap-6">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-32 h-48 rounded-lg object-cover shadow-card"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{event.title}</h1>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {event.date}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {event.venue}
                </Badge>
                <Badge variant="default">{event.type}</Badge>
              </div>
            </div>
          </div>

          {/* Venue Layout Visualization */}
          <Card className="p-8 bg-gradient-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Venue Layout</h2>
            {renderVenueLayout()}
          </Card>

          {/* Ticket Selection */}
          <Card className="p-6 bg-gradient-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Select Tickets</h2>
            <div className="space-y-4">
              {ticketTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-smooth"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tier.available} tickets available
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-primary">₹{tier.price.toLocaleString()}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateTicketQuantity(tier.id, -1)}
                        disabled={!selectedTickets[tier.id]}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-medium text-foreground">
                        {selectedTickets[tier.id] || 0}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateTicketQuantity(tier.id, 1)}
                        disabled={(selectedTickets[tier.id] || 0) >= tier.available}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Booking Summary */}
          {totalTickets > 0 && (
            <Card className="p-6 bg-gradient-card border-border">
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Total Tickets:</span>
                  <span className="font-bold text-foreground">{totalTickets}</span>
                </div>
                <div className="flex justify-between text-2xl">
                  <span className="font-bold text-foreground">Total Price:</span>
                  <span className="font-bold text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </Card>
          )}
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

export default EventBooking;