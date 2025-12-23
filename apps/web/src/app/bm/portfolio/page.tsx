"use client";

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import { ArrowRight, ExternalLink, Github, Globe, Smartphone, Brain, TrendingUp, Check } from "lucide-react";
import { ScrollReveal } from "../../../components/scroll-reveal";
import { MagneticButton } from "../../../components/magnetic-button";
import { ParallaxHero } from "../../../components/parallax-hero";
import { HoverCard } from "../../../components/hover-card";
import { useTranslations } from "@/hooks/use-translations";
import { LocalizedLink } from "@/lib/i18n/link";

export default function PortfolioPage() {
  const { t } = useTranslations();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxHero className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
                <span className="gradient-text">{t("portfolio.title")}</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                {t("portfolio.subtitle")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </ParallaxHero>

      {/* Coming Soon Section */}
      <section className="py-24">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold font-display mb-4">Akan Datang</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Kami sedang bekerja pada beberapa projek yang menakjubkan. Sila kembali tidak lama lagi untuk melihat kerja terkini kami!
            </p>
            <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
              <LocalizedLink href="/contact">Mari Bekerja Bersama</LocalizedLink>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-display mb-4">Projek Pilihan</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Berikut adalah pratonton jenis projek yang kami kerjakan. Kajian kes penuh akan datang tidak lama lagi!
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal stagger={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Pembaharuan Platform E-dagang",
                  description: "Pembaharuan dan pembangunan lengkap platform e-dagang moden dengan pengalaman pengguna yang dipertingkatkan.",
                  type: "Pembangunan Laman Web",
                  technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                  status: "Selesai",
                  icon: Globe,
                  results: ["Peningkatan 150% dalam penukaran", "Pengurangan 40% dalam kadar pentalan"]
                },
                {
                  title: "Bot Perkhidmatan Pelanggan Berkuasa AI",
                  description: "Pembangunan sistem chatbot pintar dengan keupayaan pemprosesan bahasa semula jadi.",
                  type: "Automasi AI",
                  technologies: ["Python", "TensorFlow", "OpenAI API", "Node.js"],
                  status: "Selesai",
                  icon: Brain,
                  results: ["Kadar ketepatan 95%", "Sokongan pelanggan 24/7"]
                },
                {
                  title: "Aplikasi Penjejakan Kecergasan Mudah Alih",
                  description: "Aplikasi mudah alih merentas platform untuk penjejakan kecergasan dengan ciri sosial.",
                  type: "Pembangunan Aplikasi",
                  technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
                  status: "Selesai",
                  icon: Smartphone,
                  results: ["50k+ muat turun", "Penilaian 4.8 di app store"]
                },
                {
                  title: "Automasi Kempen Pemasaran Digital",
                  description: "Sistem automasi pemasaran komprehensif yang meningkatkan penjanaan petunjuk sebanyak 300%.",
                  type: "Pemasaran Digital",
                  technologies: ["HubSpot", "Google Analytics", "Facebook Ads", "Python"],
                  status: "Selesai",
                  icon: TrendingUp,
                  results: ["Peningkatan 300% dalam petunjuk", "Peningkatan ROI 250%"]
                }
              ].map((project, index) => (
                <HoverCard key={index} className="group border-purple-500/20 hover:border-purple-500/40">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/20`}>
                        <project.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-500/30">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-purple-400 transition-colors mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mb-4">
                      {project.description}
                    </CardDescription>
                    <Badge variant="secondary" className="mb-4">
                      {project.type}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Teknologi:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Hasil:</h4>
                        <ul className="space-y-1">
                          {project.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </HoverCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <ScrollReveal className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Bersedia untuk Memulakan Projek Anda?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mari kita bincangkan bagaimana kami boleh membantu anda mencapai matlamat digital anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
              <LocalizedLink href="/contact">Hubungi Kami</LocalizedLink>
            </MagneticButton>
            <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
              <LocalizedLink href="/pricing">Lihat Harga</LocalizedLink>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
