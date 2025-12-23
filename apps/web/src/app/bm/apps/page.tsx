"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { ArrowRight, Smartphone, Globe, Zap, TrendingUp, Check, Star, Code, Palette, Database, Shield, Cloud, Layers, Cpu, Server, Wifi, Lock, Award, Users, Clock, Target, Monitor, Tablet } from "lucide-react";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { MagneticButton } from "../../../components/magnetic-button";
import { ParallaxHero } from "../../../components/parallax-hero";
import { HoverCard } from "../../../components/hover-card";
import { AppDevelopmentVisual } from "../../../components/app-development-visual";
import { useTranslations } from "@/hooks/use-translations";
import { LocalizedLink } from "@/lib/i18n/link";

export default function AppsPage() {
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
                <span className="gradient-text">{t("apps.hero.title")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                {t("apps.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
                  <LocalizedLink href="/pricing">
                    {t("apps.hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </LocalizedLink>
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <LocalizedLink href="/portfolio">{t("apps.hero.viewProjects")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ParallaxHero className="relative" speed={0.2}>
              <div className="gradient-secondary rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20 animate-float">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Smartphone className="h-20 w-20 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-semibold gradient-text">Inovasi Aplikasi</h3>
                  <p className="text-muted-foreground">Membina masa depan, satu aplikasi pada satu masa</p>
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

      {/* Our App Development Expertise */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">{t("apps.expertise.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("apps.expertise.subtitle")}
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6" stagger={0.1}>
              {[
                "Pembangunan Aplikasi Asli iOS & Android",
                "Pembangunan Aplikasi Merentas Platform (React Native, Flutter)",
                "Pembangunan Aplikasi Web Progresif (PWA)",
                "Pembangunan Backend & Integrasi API",
                "Reka Bentuk UI/UX untuk Pengalaman Menarik",
                "Penyerahan App Store & Sokongan Pasca Pelancaran"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <MagneticButton asChild className="btn-primary">
                  <LocalizedLink href="/portfolio">{t("apps.hero.viewProjects")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <AppDevelopmentVisual />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Stack Teknologi Aplikasi Kami</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kami menggunakan teknologi terkini untuk membina aplikasi yang pantas, selamat, dan boleh ditingkatkan untuk iOS, Android, dan web.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Aplikasi Mudah Alih</h3>
                <p className="text-muted-foreground">Rangka kerja untuk aplikasi asli dan merentas platform</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "React Native", type: "merentas platform" },
                  { name: "Flutter", type: "merentas platform" },
                  { name: "Swift", type: "iOS" },
                  { name: "Kotlin", type: "Android" },
                  { name: "Expo", type: "pembangunan" },
                  { name: "Ionic", type: "hybrid" }
                ].map((tech, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Smartphone className="h-8 w-8 text-purple-400 mx-auto mb-2" />
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

            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Backend & Infrastruktur</h3>
                <p className="text-muted-foreground">Teknologi untuk kuasa dan keselamatan aplikasi anda</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Node.js", category: "runtime" },
                  { name: "Firebase", category: "backend" },
                  { name: "Supabase", category: "backend" },
                  { name: "MongoDB", category: "pangkalan data" },
                  { name: "PostgreSQL", category: "pangkalan data" },
                  { name: "AWS", category: "cloud" }
                ].map((tech, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Server className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">{tech.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {tech.category}
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

      {/* App Types Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Jenis Aplikasi Yang Kami Bina</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dari aplikasi utiliti mudah hingga penyelesaian perusahaan yang kompleks, kami mempunyai kepakaran untuk mewujudkan visi anda
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Aplikasi E-dagang",
                description: "Kedai mudah alih penuh dengan pemprosesan pembayaran, pengurusan inventori, dan akaun pelanggan.",
                icon: Smartphone,
                features: ["Gerbang pembayaran", "Segerak inventori", "Notifikasi push", "Penjejakan pesanan"]
              },
              {
                title: "Aplikasi Media Sosial",
                description: "Platform sosial yang menarik dengan mesej masa nyata, perkongsian kandungan, dan interaksi pengguna.",
                icon: Users,
                features: ["Mesej masa nyata", "Perkongsian kandungan", "Interaksi pengguna", "Notifikasi"]
              },
              {
                title: "Aplikasi Produktiviti",
                description: "Aplikasi yang membantu pengguna menguruskan tugas, projek, dan kerjasama dengan lebih cekap.",
                icon: Target,
                features: ["Pengurusan tugas", "Kolaborasi", "Segerak awan", "Integrasi"]
              },
              {
                title: "Aplikasi Perkhidmatan",
                description: "Aplikasi yang menghubungkan pengguna dengan perkhidmatan seperti pemesanan, penghantaran, dan lebih banyak lagi.",
                icon: Clock,
                features: ["Pemesanan", "Penjejakan", "Pembayaran", "Notifikasi"]
              },
              {
                title: "Aplikasi Perusahaan",
                description: "Penyelesaian tersuai untuk perniagaan yang memudahkan proses dan meningkatkan kecekapan.",
                icon: Database,
                features: ["Automasi", "Analitik", "Integrasi", "Keselamatan"]
              },
              {
                title: "Aplikasi Hiburan",
                description: "Aplikasi yang menghiburkan dan melibatkan pengguna dengan kandungan multimedia dan interaktif.",
                icon: Palette,
                features: ["Kandungan multimedia", "Interaktiviti", "Perkongsian sosial", "Penglibatan"]
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
          <h2 className="text-4xl font-bold font-display mb-4">Bersedia untuk Membina Aplikasi Anda?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mari kita bincangkan idea aplikasi anda dan bagaimana kami boleh membantu anda membawanya ke pasaran.
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
