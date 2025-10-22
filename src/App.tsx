import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Events from "./pages/Events";
import Food from "./pages/Food";
import RestaurantMenu from "./pages/RestaurantMenu";
import MovieBooking from "./pages/MovieBooking";
import EventBooking from "./pages/EventBooking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/events" element={<Events />} />
            <Route path="/food" element={<Food />} />
            <Route path="/food/:id" element={<RestaurantMenu />} />
            <Route path="/movie/:id" element={<MovieBooking />} />
            <Route path="/event/:id" element={<EventBooking />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
