import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Events from "./pages/Events";
import Food from "./pages/Food";
import RestaurantMenu from "./pages/RestaurantMenu";
import MovieBooking from "./pages/MovieBooking";
import EventBooking from "./pages/EventBooking";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              <Route path="/food" element={<ProtectedRoute><Food /></ProtectedRoute>} />
              <Route path="/food/:id" element={<ProtectedRoute><RestaurantMenu /></ProtectedRoute>} />
              <Route path="/movie/:id" element={<ProtectedRoute><MovieBooking /></ProtectedRoute>} />
              <Route path="/event/:id" element={<ProtectedRoute><EventBooking /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
