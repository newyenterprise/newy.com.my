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
import { useTranslations } from "@/hooks/use-translations";

interface Industry {
  nameKey: string;
  icon: React.ComponentType<{ className?: string }>;
}

const industries: Industry[] = [
  { nameKey: "realEstate", icon: Building2 },
  { nameKey: "ecommerce", icon: ShoppingCart },
  { nameKey: "healthcare", icon: Heart },
  { nameKey: "education", icon: GraduationCap },
  { nameKey: "startups", icon: Users },
  { nameKey: "logistics", icon: Truck },
  { nameKey: "restaurants", icon: UtensilsCrossed },
  { nameKey: "portfolios", icon: Briefcase },
  { nameKey: "creative", icon: Palette },
  { nameKey: "technology", icon: Globe },
  { nameKey: "aiAutomation", icon: Zap },
  { nameKey: "marketing", icon: Target },
];

export function AnimatedIndustries() {
  const { t } = useTranslations();

  return (
    <div className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            {t("home.industries.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("home.industries.subtitle")}
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
                <CardTitle className="text-lg">{t(`home.industries.list.${industry.nameKey}`)}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
