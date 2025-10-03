"use client";

import { Card, CardHeader, CardTitle } from "@newy/ui";
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
  return (
    <div className="py-20 bg-secondary/30">
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {industries.map((industry, index) => (
            <Card 
              key={index} 
              className="text-center w-full h-44 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
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
  );
}
