import { Film, Calendar, MapPin, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Sidebar = () => {
  const categories = [
    { icon: Film, label: "Action", count: 24 },
    { icon: Film, label: "Drama", count: 18 },
    { icon: Film, label: "Comedy", count: 32 },
    { icon: Film, label: "Thriller", count: 15 },
    { icon: Calendar, label: "This Weekend", count: 12 },
    { icon: MapPin, label: "Near You", count: 8 },
  ];

  return (
    <aside className="hidden lg:block w-64 space-y-4">
      <Card className="p-4 bg-gradient-card border-border">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Quick Filters</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.label}
              className="w-full flex items-center justify-between p-2 rounded-md hover:bg-accent transition-smooth text-left"
            >
              <div className="flex items-center space-x-2">
                <category.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{category.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{category.count}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-gradient-card border-border">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Special Offers</h3>
        <div className="space-y-2">
          <div className="p-3 rounded-md bg-primary/10 border border-primary/20">
            <Tag className="h-4 w-4 text-primary mb-1" />
            <p className="text-xs font-medium text-foreground">Weekend Deal</p>
            <p className="text-xs text-muted-foreground">Get 20% off on bookings</p>
          </div>
        </div>
      </Card>
    </aside>
  );
};
