import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Film, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

export const Header = ({ cartItemsCount = 0, onCartClick }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Film className="h-7 w-7 text-primary" />
          <span className="text-2xl font-extrabold bg-gradient-primary bg-clip-text text-transparent">
            Bookesh
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/movies" className="text-base font-bold hover:text-primary transition-smooth">
            Movies
          </Link>
          <Link to="/events" className="text-base font-bold hover:text-primary transition-smooth">
            Events
          </Link>
          <Link to="/food" className="text-base font-bold hover:text-primary transition-smooth">
            Food
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search movies, events..."
                className="pl-8 w-64 bg-card border-border"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs flex items-center justify-center text-primary-foreground">
                {cartItemsCount}
              </span>
            )}
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:block">
                {user.email}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="icon" title="Sign In">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
