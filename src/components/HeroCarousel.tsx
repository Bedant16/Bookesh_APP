import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

interface HeroItem {
  id: string;
  type: "movie" | "event";
  title: string;
  description: string;
  imageUrl: string;
  genre?: string;
  date?: string;
  venue?: string;
  link: string;
}

interface HeroCarouselProps {
  items: HeroItem[];
}

export const HeroCarousel = ({ items }: HeroCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate every 7 seconds
  useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  // Update current slide index
  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true }} className="overflow-hidden rounded-2xl">
        <CarouselContent className="-ml-0">
          {items.map((item) => (
            <CarouselItem key={item.id} className="pl-0">
              <section className="relative h-[500px] overflow-hidden shadow-glow">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container max-w-2xl space-y-6 p-8">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-semibold mb-2">
                      {item.type === "movie" ? "Now Showing" : "Upcoming Event"}
                    </div>
                    <h1 className="text-5xl font-bold text-foreground animate-fade-in">
                      {item.title}
                    </h1>
                    {item.genre && (
                      <p className="text-lg text-muted-foreground">{item.genre}</p>
                    )}
                    {item.date && item.venue && (
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{item.date}</span>
                        </div>
                        <span>•</span>
                        <span>{item.venue}</span>
                      </div>
                    )}
                    <p className="text-lg text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="flex gap-4">
                      <Link to={item.link}>
                        <Button variant="hero" size="lg" className="animate-scale-in">
                          <Play className="mr-2 h-5 w-5" />
                          {item.type === "movie" ? "Book Tickets" : "Get Tickets"}
                        </Button>
                      </Link>
                      {item.type === "movie" && (
                        <Button variant="outline" size="lg">
                          Order Food to Seat
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

        {/* Navigation Buttons - Show on Hover */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} z-20`}>
          <button
            onClick={scrollPrev}
            className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-smooth flex items-center justify-center group/btn"
          >
            <ChevronLeft className="h-6 w-6 text-foreground group-hover/btn:text-primary transition-smooth" />
          </button>
          <button
            onClick={scrollNext}
            className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-smooth flex items-center justify-center group/btn"
          >
            <ChevronRight className="h-6 w-6 text-foreground group-hover/btn:text-primary transition-smooth" />
          </button>
        </div>
      </Carousel>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index 
                ? "w-8 bg-primary" 
                : "w-2 bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
