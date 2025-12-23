"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { ArrowRight, Zap, Brain, Bot, Workflow, Check, Star, Code, BarChart, Shield, Clock, Award, Users, Target, MessageSquare, Settings, Database, Cloud, Smartphone, Mail, ShoppingCart, TrendingUp } from "lucide-react";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { MagneticButton } from "../../../components/magnetic-button";
import { ParallaxHero } from "../../../components/parallax-hero";
import { HoverCard } from "../../../components/hover-card";
import { AIAutomationVisual } from "../../../components/ai-automation-visual";
import { useTranslations } from "@/hooks/use-translations";
import { LocalizedLink } from "@/lib/i18n/link";

export default function AIAutomationPage() {
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
                <span className="gradient-text">{t("aiAutomation.hero.title")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                {t("aiAutomation.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
                  <LocalizedLink href="/pricing">
                    {t("aiAutomation.hero.cta")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </LocalizedLink>
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <LocalizedLink href="/portfolio">{t("aiAutomation.hero.viewProjects")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ParallaxHero className="relative" speed={0.2}>
              <div className="gradient-secondary rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20 animate-float">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Workflow className="h-20 w-20 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-semibold gradient-text">Automasi Pintar</h3>
                  <p className="text-muted-foreground">Memudahkan aliran kerja, menguatkan hasil</p>
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

      {/* How Automation Can Transform Your Business */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">{t("aiAutomation.transform.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("aiAutomation.transform.subtitle")}
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6" stagger={0.1}>
              {[
                "Automasi penangkapan petunjuk dan proses susulan",
                "Memudahkan pemasaran e-mel dan komunikasi pelanggan",
                "Integrasi CRM dan automasi saluran jualan",
                "Mencipta chatbot pintar untuk sokongan pelanggan 24/7",
                "Automasi penghantaran media sosial dan penglibatan",
                "Mengoptimumkan aliran kerja pengumpulan data dan pelaporan"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <MagneticButton asChild className="btn-primary">
                  <LocalizedLink href="/portfolio">{t("aiAutomation.hero.viewProjects")}</LocalizedLink>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <AIAutomationVisual />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Automation Services */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Perkhidmatan Automasi Kami</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dari automasi aliran kerja mudah hingga chatbot AI yang kompleks, kami mempunyai kepakaran untuk memudahkan proses perniagaan anda
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Automasi Penjanaan Petunjuk",
                description: "Automasi penangkapan, kelayakan, dan proses susulan petunjuk untuk tidak pernah terlepas pelanggan berpotensi.",
                icon: Users,
                features: ["Penyerahan borang", "Pemarkahan petunjuk", "Urutan e-mel", "Integrasi CRM"]
              },
              {
                title: "Automasi Pemasaran E-mel",
                description: "Cipta kempen e-mel peribadi yang memupuk petunjuk dan mendorong penukaran secara automatik.",
                icon: Mail,
                features: ["Urutan selamat datang", "E-mel troli ditinggalkan", "Automasi newsletter", "Ujian A/B"]
              },
              {
                title: "Chatbot Sokongan Pelanggan",
                description: "Lancarkan chatbot pintar yang menyediakan sokongan segera dan mengendalikan pertanyaan biasa 24/7.",
                icon: MessageSquare,
                features: ["Pengendalian FAQ", "Pembuatan tiket", "Penyerahan sembang langsung", "Sokongan pelbagai bahasa"]
              },
              {
                title: "Automasi Media Sosial",
                description: "Automasi kehadiran media sosial anda dengan siaran berjadual dan aliran kerja penglibatan.",
                icon: TrendingUp,
                features: ["Penjadualan siaran", "Kurasi kandungan", "Penjejakan penglibatan", "Pelaporan analitik"]
              },
              {
                title: "Pengumpulan Data & Pelaporan",
                description: "Automasi pengumpulan data dari pelbagai sumber dan menjana laporan komprehensif.",
                icon: BarChart,
                features: ["Pengagregatan data", "Penjanaan laporan", "Pembuatan papan pemuka", "Sistem amaran"]
              },
              {
                title: "Automasi E-dagang",
                description: "Memudahkan operasi kedai dalam talian anda dengan automasi inventori dan pengurusan pesanan.",
                icon: ShoppingCart,
                features: ["Pemprosesan pesanan", "Kemaskini inventori", "Notifikasi pelanggan", "Permintaan ulasan"]
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

      {/* Platforms We Use */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Platform Automasi Kami</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kami pakar dalam platform automasi terkemuka untuk memudahkan aliran kerja perniagaan anda
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                name: "n8n",
                description: "Platform automasi aliran kerja sumber terbuka yang berkuasa",
                icon: Workflow,
                features: ["Sumber terbuka", "Integrasi luas", "Aliran kerja visual"]
              },
              {
                name: "Make",
                description: "Platform automasi tanpa kod untuk menyambungkan aplikasi",
                icon: Zap,
                features: ["Tanpa kod", "Templat", "Automasi kompleks"]
              },
              {
                name: "Zapier",
                description: "Platform automasi popular untuk integrasi aplikasi",
                icon: Settings,
                features: ["Integrasi mudah", "Zaps", "Automasi berulang"]
              },
              {
                name: "Chatbot AI",
                description: "Penyelesaian chatbot pintar untuk sokongan pelanggan",
                icon: Bot,
                features: ["Pembelajaran mesin", "Pemprosesan bahasa semula jadi", "Integrasi mudah"]
              }
            ].map((platform, index) => (
              <HoverCard key={index} className="group border-purple-500/20 hover:border-purple-500/40">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 border border-purple-500/20">
                    <platform.icon className="h-8 w-8 text-purple-400" />
                  </div>
                  <CardTitle className="group-hover:text-purple-400 transition-colors">
                    {platform.name}
                  </CardTitle>
                  <CardDescription>
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {platform.features.map((feature, featureIndex) => (
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
          <h2 className="text-4xl font-bold font-display mb-4">Bersedia untuk Memudahkan Operasi Anda?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mari kita bincangkan bagaimana automasi boleh membantu perniagaan anda menjimatkan masa dan meningkatkan kecekapan.
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
