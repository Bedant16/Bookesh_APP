import { Calendar, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

export const EventCard = ({ id, title, date, time, venue, type, imageUrl, price }: EventCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-card transition-smooth">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
            {type}
          </span>
        </div>
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
          <Button variant="default" size="sm">
            Book Tickets
          </Button>
        </div>
      </div>
    </Card>
  );
};
