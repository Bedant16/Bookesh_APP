import { Star, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FoodCardProps {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  imageUrl: string;
  isCinemaVendor?: boolean;
}

export const FoodCard = ({ id, name, rating, deliveryTime, cuisine, imageUrl, isCinemaVendor }: FoodCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-card transition-smooth">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        {isCinemaVendor && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
              Cinema Delivery
            </span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{rating}/5</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{deliveryTime}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{cuisine}</p>
        <Link to={`/food/${id}`}>
          <Button variant="default" size="sm" className="w-full">
            View Menu
          </Button>
        </Link>
      </div>
    </Card>
  );
};
