"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { ArrowRight, Globe, Zap, TrendingUp, Check, Star, Code, Palette, Database, Shield, Award, Users, Clock, Target, Smartphone, Monitor, Tablet } from "lucide-react";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { MagneticButton } from "../../../components/magnetic-button";
import { ParallaxHero } from "../../../components/parallax-hero";
import { HoverCard } from "../../../components/hover-card";
import { WebDevelopmentProcessVisual } from "../../../components/web-development-visual";
import { useTranslations } from "@/hooks/use-translations";
import { LocalizedLink } from "@/lib/i18n/link";

export default function WebsitePage() {
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
                <span className="gradient-text">{t("website.hero.title")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                {t("website.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
                  <LocalizedLink href="/pricing">
                    {t("website.hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </LocalizedLink>
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <LocalizedLink href="/portfolio">{t("website.hero.viewPortfolio")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ParallaxHero className="relative" speed={0.2}>
              <div className="gradient-secondary rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20 animate-float">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Globe className="h-20 w-20 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-semibold gradient-text">Kecemerlangan Web</h3>
                  <p className="text-muted-foreground">Mencipta pengalaman digital yang menukar</p>
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

      {/* Our Web Development Approach */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">{t("website.approach.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("website.approach.subtitle")}
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6" stagger={0.1}>
              {[
                "Penemuan mendalam dan perancangan strategik",
                "Reka bentuk UX/UI berpusatkan pengguna dan prototaip",
                "Pembangunan tangkas dengan kod yang bersih dan boleh ditingkatkan",
                "Ujian yang ketat dan jaminan kualiti",
                "Pengoptimuman enjin carian dan prestasi",
                "Pilihan sokongan dan penyelenggaraan berterusan"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <MagneticButton asChild className="btn-primary">
                  <LocalizedLink href="/portfolio">{t("website.hero.viewPortfolio")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <WebDevelopmentProcessVisual />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Stack Teknologi Kami</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kami memanfaatkan teknologi dan platform terkini untuk mencipta laman web yang pantas, selamat, dan boleh ditingkatkan. Kepakaran kami merangkumi dari pembangunan tersuai hingga pembina laman web popular.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Pembangunan Tersuai</h3>
                <p className="text-muted-foreground">Membina dari awal dengan rangka kerja moden</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Next.js", type: "framework" },
                  { name: "React", type: "framework" },
                  { name: "TypeScript", type: "bahasa" },
                  { name: "Node.js", type: "runtime" },
                  { name: "PostgreSQL", type: "pangkalan data" },
                  { name: "Supabase", type: "backend" }
                ].map((tech, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Code className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">{tech.name}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {tech.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Types of Websites */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">{t("website.types.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("website.types.subtitle")}
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Kedai E-dagang",
                description: "Kedai dalam talian penuh dengan pemprosesan pembayaran, pengurusan inventori, dan akaun pelanggan.",
                icon: Globe,
                features: ["Gerbang pembayaran", "Pengurusan inventori", "Akaun pelanggan", "Penjejakan pesanan"]
              },
              {
                title: "Laman Web Korporat",
                description: "Laman web profesional yang mewujudkan kredibiliti dan menjana petunjuk untuk perniagaan anda.",
                icon: Code,
                features: ["Maklumat syarikat", "Halaman perkhidmatan", "Borang hubungan", "Integrasi blog"]
              },
              {
                title: "Laman Portfolio",
                description: "Pamerkan kerja anda dan tarik pelanggan baharu dengan laman web portfolio yang menakjubkan.",
                icon: Palette,
                features: ["Galeri projek", "Bahagian tentang", "Borang hubungan", "Integrasi sosial"]
              },
              {
                title: "Laman Pendaratan",
                description: "Laman pendaratan penukaran tinggi yang direka untuk menangkap petunjuk dan mendorong tindakan tertentu.",
                icon: Zap,
                features: ["Penangkapan petunjuk", "Ujian A/B", "Analitik", "Muat pantas"]
              },
              {
                title: "Aplikasi Web",
                description: "Aplikasi web tersuai yang memudahkan proses perniagaan anda dan meningkatkan kecekapan.",
                icon: Database,
                features: ["Pengesahan pengguna", "Pengurusan data", "Integrasi API", "Kemaskini masa nyata"]
              },
              {
                title: "Blog & Hab Kandungan",
                description: "Laman web berasaskan kandungan yang mewujudkan kepimpinan pemikiran dan mendorong trafik organik.",
                icon: TrendingUp,
                features: ["Pengurusan kandungan", "Pengoptimuman SEO", "Perkongsian sosial", "Integrasi newsletter"]
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
          <h2 className="text-4xl font-bold font-display mb-4">Bersedia untuk Membina Kehadiran Dalam Talian Anda?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mari kita bincangkan projek anda dan bagaimana kami boleh mencipta laman web yang membezakan anda daripada pesaing.
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
