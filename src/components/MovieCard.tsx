import { Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: string;
  title: string;
  rating: number;
  duration: string;
  genre: string;
  imageUrl: string;
}

export const MovieCard = ({ id, title, rating, duration, genre, imageUrl }: MovieCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-card transition-smooth">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{rating}/10</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{genre}</p>
        <Link to={`/movie/${id}`}>
          <Button variant="default" size="sm" className="w-full">
            Book Now
          </Button>
        </Link>
      </div>
    </Card>
  );
};
