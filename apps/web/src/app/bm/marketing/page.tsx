"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { ArrowRight, TrendingUp, Target, BarChart, Search, Check, Star, Globe, Mail, Share2, Eye, Award, Users, Clock, PenTool, PieChart, LineChart } from "lucide-react";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { MagneticButton } from "../../../components/magnetic-button";
import { ParallaxHero } from "../../../components/parallax-hero";
import { HoverCard } from "../../../components/hover-card";
import { MarketingVisual } from "../../../components/marketing-visual";
import { useTranslations } from "@/hooks/use-translations";
import { LocalizedLink } from "@/lib/i18n/link";

export default function MarketingPage() {
  const { t } = useTranslations();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">{t("marketing.hero.title")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                {t("marketing.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
                  <LocalizedLink href="/pricing">
                    {t("marketing.hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </LocalizedLink>
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <LocalizedLink href="/portfolio">{t("marketing.hero.viewCases")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ParallaxHero className="relative" speed={0.2}>
              <div className="gradient-secondary rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20 animate-float">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <TrendingUp className="h-20 w-20 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-semibold gradient-text">Pemasaran Pertumbuhan</h3>
                  <p className="text-muted-foreground">Mendorong hasil melalui kempen strategik</p>
                  <div className="flex justify-center space-x-4 pt-4">
                    <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse delay-75"></div>
                    <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </ParallaxHero>
          </div>
        </div>
      </section>

      {/* Our Data-Driven Marketing Approach */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">{t("marketing.approach.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("marketing.approach.subtitle")}
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6" stagger={0.1}>
              {[
                "Pengoptimuman Enjin Carian (SEO)",
                "Pengiklanan Bayar-Per-Klik (PPC)",
                "Pemasaran & Pengurusan Media Sosial",
                "Penciptaan & Pemasaran Kandungan",
                "Kempen Pemasaran E-mel",
                "Analitik & Pelaporan Prestasi"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <MagneticButton asChild className="btn-primary">
                  <LocalizedLink href="/portfolio">{t("marketing.hero.viewCases")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <MarketingVisual />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Marketing Services */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Perkhidmatan Pemasaran Kami</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dari pengoptimuman enjin carian hingga pengurusan media sosial, kami menawarkan penyelesaian pemasaran digital komprehensif yang mendorong hasil perniagaan sebenar
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Pengoptimuman Enjin Carian (SEO)",
                description: "Tingkatkan keterlihatan laman web anda dalam hasil carian dan dorong trafik organik ke perniagaan anda.",
                icon: Search,
                features: ["Penyelidikan kata kunci", "Pengoptimuman pada halaman", "SEO teknikal", "Pembinaan pautan"]
              },
              {
                title: "Pengiklanan Bayar-Per-Klik (PPC)",
                description: "Cipta kempen pengiklanan sasaran yang menjana trafik dan penukaran segera.",
                icon: Target,
                features: ["Pengurusan Google Ads", "Iklan Facebook/Instagram", "Kempen pemasaran semula", "Penjejakan penukaran"]
              },
              {
                title: "Pemasaran Media Sosial",
                description: "Bina kehadiran jenama anda dan libatkan audiens anda di semua platform sosial.",
                icon: Share2,
                features: ["Penciptaan kandungan", "Pengurusan komuniti", "Iklan sosial berbayar", "Pelaporan analitik"]
              },
              {
                title: "Pemasaran Kandungan",
                description: "Cipta kandungan berharga dan menarik yang menarik dan menukar audiens sasaran anda.",
                icon: PenTool,
                features: ["Penulisan blog", "Kandungan video", "Infografik", "Strategi kandungan"]
              },
              {
                title: "Pemasaran E-mel",
                description: "Pupuk petunjuk dan dorong jualan dengan kempen e-mel peribadi dan automasi.",
                icon: Mail,
                features: ["Kempen e-mel", "Aliran kerja automasi", "Ujian A/B", "Pengurusan senarai"]
              },
              {
                title: "Analitik & Pelaporan",
                description: "Jejak prestasi dan optima kempen dengan analitik dan pandangan komprehensif.",
                icon: BarChart,
                features: ["Penjejakan prestasi", "Analisis ROI", "Papan pemuka tersuai", "Laporan bulanan"]
              }
            ].map((service, index) => (
              <HoverCard key={index} className="group border-purple-500/20 hover:border-purple-500/40">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 border border-purple-500/20">
                    <service.icon className="h-8 w-8 text-purple-400" />
                  </div>
                  <CardTitle className="group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription>
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </HoverCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <ScrollReveal className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Bersedia untuk Meningkatkan Kehadiran Digital Anda?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mari kita bincangkan bagaimana strategi pemasaran digital kami boleh membantu perniagaan anda berkembang dan mencapai matlamat anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
              <LocalizedLink href="/contact">Jadualkan Perundingan Percuma</LocalizedLink>
            </MagneticButton>
            <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
              <LocalizedLink href="/pricing">Dapatkan Sebut Harga Segera</LocalizedLink>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
