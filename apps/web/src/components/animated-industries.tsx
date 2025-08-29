"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
import { getGsap, prefersReducedMotion } from "@/lib/gsap";
import { Card, CardHeader, CardTitle } from "@digitallinked/ui";
import { 
  Building2, 
  ShoppingCart, 
  Heart, 
  GraduationCap, 
  Users, 
  Truck, 
  UtensilsCrossed, 
  Briefcase,
  Palette,
  Globe,
  Zap,
  Target
} from "lucide-react";

interface Industry {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const industries: Industry[] = [
  { name: "Real Estate", icon: Building2 },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "Healthcare", icon: Heart },
  { name: "Education", icon: GraduationCap },
  { name: "Startups", icon: Users },
  { name: "Logistics", icon: Truck },
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "Portfolios", icon: Briefcase },
  { name: "Creative", icon: Palette },
  { name: "Technology", icon: Globe },
  { name: "AI & Automation", icon: Zap },
  { name: "Marketing", icon: Target },
];

export function AnimatedIndustries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    
    let ctx: any;
    (async () => {
      const mod = await getGsap();
      if (!mod || !containerRef.current || !scrollRef.current) return;
      
      const { gsap } = mod;
      
      ctx = gsap.context(() => {
        const cards = scrollRef.current!.children;
        const cardWidth = 176; // Card width (w-44 = 176px)
        const gap = 2; // Minimal gap
        const totalCardWidth = cardWidth + gap;
        const animationSpacing = cardWidth + 4; // Very close spacing for animation
        const centerX = window.innerWidth / 2;
        
        // Set initial positions - cards start from left
        gsap.set(cards, {
          x: (i) => i * totalCardWidth,
          scale: 0.8,
          opacity: 0.6
        });

        // Initial entrance animation
        gsap.to(cards, {
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out"
        });

        // Create continuous auto-scroll animation
        const tl = gsap.timeline({
          repeat: -1, // Infinite loop
          ease: "none",
          delay: 1 // Start after entrance animation
        });

        // Animate cards moving from left to right continuously
        tl.to(cards, {
          x: (i) => (i - industries.length) * animationSpacing,
          duration: industries.length * 1.5, // Faster movement
          ease: "none",
          onUpdate: function() {
            // Update scale and opacity based on position
            Array.from(cards).forEach((card, index) => {
              const cardX = gsap.getProperty(card, "x") as number;
              const cardCenterX = cardX + cardWidth / 2;
              const distanceFromCenter = Math.abs(cardCenterX - centerX);
              const maxDistance = window.innerWidth / 2;
              
              // Calculate scale and opacity based on distance from center
              const scale = Math.max(0.85, 1 - (distanceFromCenter / maxDistance) * 0.3);
              const opacity = Math.max(0.7, 1 - (distanceFromCenter / maxDistance) * 0.4);
              
              gsap.set(card, {
                scale,
                opacity
              });
            });
          }
        });

        // Create seamless infinite scroll by duplicating the entire set
        const allCards = Array.from(cards);
        const duplicatedCards = allCards.map((card, index) => {
          const clone = card.cloneNode(true) as HTMLElement;
          clone.style.position = 'absolute';
          clone.style.left = `${(index + industries.length) * animationSpacing}px`;
          scrollRef.current!.appendChild(clone);
          return clone;
        });

        // Combine original and duplicated cards
        const combinedCards = [...allCards, ...duplicatedCards];

        // Animate all cards together for seamless loop
        tl.to(combinedCards, {
          x: (i) => (i - industries.length * 2) * animationSpacing,
          duration: industries.length * 1.5,
          ease: "none",
          onUpdate: function() {
            // Update scale and opacity for all cards
            combinedCards.forEach((card, index) => {
              const cardX = gsap.getProperty(card, "x") as number;
              const cardCenterX = cardX + cardWidth / 2;
              const distanceFromCenter = Math.abs(cardCenterX - centerX);
              const maxDistance = window.innerWidth / 2;
              
              // Calculate scale and opacity based on distance from center
              const scale = Math.max(0.85, 1 - (distanceFromCenter / maxDistance) * 0.3);
              const opacity = Math.max(0.7, 1 - (distanceFromCenter / maxDistance) * 0.4);
              
              gsap.set(card, {
                scale,
                opacity
              });
            });
          }
        });

        // Add hover effects with focus for all cards
        combinedCards.forEach((card) => {
          card.addEventListener("mouseenter", () => {
            // Pause the animation
            tl.pause();
            
            // Focus the hovered card
            gsap.to(card, {
              scale: 1.2,
              duration: 0.3,
              ease: "power2.out"
            });
            
            // Add glow effect to focused card
            gsap.set(card, {
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)"
            });
            
            // Slightly dim other cards
            combinedCards.forEach((otherCard) => {
              if (otherCard !== card) {
                gsap.to(otherCard, {
                  opacity: 0.4,
                  scale: 0.7,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            });
          });
          
          card.addEventListener("mouseleave", () => {
            // Resume the animation
            tl.resume();
            
            // Reset all cards to their normal state
            combinedCards.forEach((otherCard) => {
              const cardX = gsap.getProperty(otherCard, "x") as number;
              const cardCenterX = cardX + cardWidth / 2;
              const distanceFromCenter = Math.abs(cardCenterX - centerX);
              const maxDistance = window.innerWidth / 2;
              
              const scale = Math.max(0.85, 1 - (distanceFromCenter / maxDistance) * 0.3);
              const opacity = Math.max(0.7, 1 - (distanceFromCenter / maxDistance) * 0.4);
              
              gsap.to(otherCard, {
                scale,
                opacity,
                duration: 0.3,
                ease: "power2.out"
              });
              
              // Remove glow effect
              gsap.set(otherCard, {
                boxShadow: "none"
              });
            });
          });
        });
      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="py-20 bg-secondary/30 overflow-hidden relative">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Serving Diverse Industries
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We adapt our expertise to meet the unique challenges and opportunities of various sectors, 
            delivering tailored digital solutions that drive success.
          </p>
        </div>
        
        <div className="overflow-visible py-8">
          <div 
            ref={scrollRef} 
            className="flex gap-0.5 justify-start items-center min-h-[200px] px-4"
            style={{ width: `${industries.length * 356}px` }}
          >
          {industries.map((industry, index) => (
            <Card 
              key={index} 
              className="text-center w-44 h-44 flex-shrink-0 cursor-pointer transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader className="h-full flex flex-col justify-center items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <industry.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{industry.name}</CardTitle>
              </CardHeader>
            </Card>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
