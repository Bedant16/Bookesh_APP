import React, { useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  type: string;
  imageUrl: string;
  price: string;
}

const FALLBACK = "/images/placeholder-poster.png"; // ensure this exists in public/images/

export const EventCard = ({
  id,
  title,
  date,
  time,
  venue,
  type,
  imageUrl,
  price,
}: EventCardProps) => {
  const { addItem, setIsCartOpen } = useCart();
  const { toast } = useToast();

  const [loaded, setLoaded] = useState(false);

  const handleBookTickets = () => {
    const priceValue = parseInt(price.replace(/[^\d]/g, ""));
    addItem({
      id: `event-${id}`,
      type: "event",
      title,
      details: `${date} • ${time} • ${venue}`,
      price: priceValue,
      quantity: 1,
    });
    toast({
      title: "Added to cart",
      description: `${title} ticket added to your cart`,
    });
    setIsCartOpen(true);
  };

  function handleImgLoad() {
    setLoaded(true);
  }

  function handleImgError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const img = e.currentTarget;
    const fallbackAbsolute = window.location.origin + FALLBACK;
    if (img.src !== fallbackAbsolute) {
      img.src = FALLBACK;
    }
    setLoaded(true);
  }

  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-card transition-smooth">
      {/* MATCH MOVIE RATIO: change to 2:3 poster style */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          onLoad={handleImgLoad}
          onError={handleImgError}
          loading="lazy"
          className={`w-full h-full object-cover group-hover:scale-105 transition-smooth ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* type badge */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
            {type}
          </span>
        </div>

        {/* optional subtle placeholder shown until image loads (keeps height stable) */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/5 to-black/10">
            <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse opacity-60" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{venue}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{price}</span>
          <Button variant="default" size="sm" onClick={handleBookTickets}>
            Book Tickets
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
