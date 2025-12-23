"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { ArrowRight, Globe, Smartphone, Zap, TrendingUp, CheckCircle, Users, Building2, GraduationCap, ShoppingCart, Heart, Target, Palette, Code } from "lucide-react";
import { ScrollReveal } from "../../components/scroll-reveal";
import { MagneticButton } from "../../components/magnetic-button";
import { ParallaxHero } from "../../components/parallax-hero";
import { HoverCard } from "../../components/hover-card";
import { AnimatedIndustries } from "../../components/animated-industries";
import { AnimatedExcellenceList } from "../../components/animated-excellence-list";
import { MagneticCard } from "../../components/magnetic-card";
import { useTranslations } from "@/hooks/use-translations";
import { LocalizedLink } from "@/lib/i18n/link";

export default function HomePage() {
  const { t } = useTranslations();
  
  const excellenceItems = [
    {
      title: t("home.services.website.title"),
      description: "",
      icon: <Code className="h-5 w-5 text-primary" />
    },
    {
      title: t("home.services.ai.title"),
      description: "",
      icon: <Zap className="h-5 w-5 text-primary" />
    },
    {
      title: t("home.services.marketing.title"),
      description: "",
      icon: <Target className="h-5 w-5 text-primary" />
    },
    {
      title: t("home.services.apps.title"),
      description: "",
      icon: <Smartphone className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">{t("home.hero.title")}</span>
                <br />
                {t("home.hero.subtitle")}
                <br />
                <span className="text-yellow-400">{t("home.hero.highlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                {t("home.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton 
                  size="lg" 
                  className="btn-primary text-lg px-8 py-4 animate-glow"
                  asChild
                >
                  <LocalizedLink href="/pricing">
                    {t("home.hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </LocalizedLink>
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <LocalizedLink href="/contact">{t("home.hero.contactUs")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ParallaxHero className="relative" speed={0.2}>
              <MagneticCard strength={0.15}>
                <HoverCard className="bg-background/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 animate-glow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t("home.excellence.title")}</h3>
                      <p className="text-muted-foreground">{t("home.excellence.subtitle")}</p>
                    </div>
                  </div>
                  <AnimatedExcellenceList items={excellenceItems} />
                </HoverCard>
              </MagneticCard>
            </ParallaxHero>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              {t("home.services.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("home.services.subtitle")}
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                title: t("home.services.website.title"),
                description: t("home.services.website.description"),
                icon: Globe,
                color: "text-blue-500"
              },
              {
                title: t("home.services.apps.title"),
                description: t("home.services.apps.description"),
                icon: Smartphone,
                color: "text-green-500"
              },
              {
                title: t("home.services.ai.title"),
                description: t("home.services.ai.description"),
                icon: Zap,
                color: "text-purple-500"
              },
              {
                title: t("home.services.marketing.title"),
                description: t("home.services.marketing.description"),
                icon: TrendingUp,
                color: "text-orange-500"
              }
            ].map((service, index) => (
              <HoverCard key={index} className="text-center">
                <CardHeader>
                  <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </HoverCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-3 gap-8" stagger={0.1}>
            {[
              t("home.features.items.0"),
              t("home.features.items.1"),
              t("home.features.items.2"),
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">{feature}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Industries Section */}
      <AnimatedIndustries />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <ScrollReveal className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            {t("home.cta.title")}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t("home.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton 
              size="lg" 
              className="btn-primary text-lg px-8 py-4 animate-glow"
              asChild
            >
              <LocalizedLink href="/contact?action=strategy-call">{t("home.cta.strategyCall")}</LocalizedLink>
            </MagneticButton>
            <MagneticButton 
              size="lg" 
              variant="outline" 
              className="btn-outline text-lg px-8 py-4"
              asChild
            >
              <LocalizedLink href="/pricing">
                {t("home.cta.instantQuote")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </LocalizedLink>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

