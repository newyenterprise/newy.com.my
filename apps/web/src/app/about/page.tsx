"use client";

import { Button } from "@digitallinked/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@digitallinked/ui";
import { ArrowRight, Users, Target, Award, Globe, Lightbulb, Handshake, Rocket, Wrench, Building, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MagneticButton } from "../../components/magnetic-button";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/media/About_us-Digitallinked.jpeg"
            alt="Digital Linked founder in the office with company signage"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative container">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-8 text-white leading-tight">
              From Engineering to Digital Innovation
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl">
              A journey that spans engineering, business, and digital transformation. 
              Digital Linked was born from real-world experience and a passion for solving 
              business challenges through technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticButton 
                size="lg" 
                className="btn-primary text-lg px-8 py-4 animate-glow"
                asChild
              >
                <Link href="/contact">
                  Let's Build Together
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </MagneticButton>
              <MagneticButton 
                size="lg" 
                variant="outline" 
                className="btn-outline border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4"
                asChild
              >
                <Link href="/services">Our Services</Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Journey Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                The Journey Behind Digital Linked
              </h2>
              <p className="text-xl text-muted-foreground">
                From mechanical engineering to digital innovation - a story of persistence, learning, and growth.
              </p>
            </div>

            <div className="space-y-12">
              {/* Engineering Background */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20">
                    <Wrench className="h-12 w-12 text-blue-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Engineering Foundation</h3>
                    <p className="text-muted-foreground mb-4">
                      Our founder holds a <strong>Bachelor's in Mechanical Aeronautic Engineering</strong> and began 
                      his career as a Design Engineer at Hitachi (2007–2009). This engineering discipline forms 
                      the backbone of our structured, problem-solving approach.
                    </p>
                    <p className="text-muted-foreground">
                      But ambitions went beyond engineering. In 2009, he ventured into logistics, shipping, 
                      and transportation, building hands-on experience in running and scaling businesses.
                    </p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative">
                    <Building className="h-32 w-32 text-blue-400 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 h-8 w-8 bg-blue-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              {/* Business Experience */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="relative">
                    <Target className="h-32 w-32 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 h-8 w-8 bg-purple-500 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
                    <Target className="h-12 w-12 text-purple-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Business Evolution</h3>
                    <p className="text-muted-foreground mb-4">
                      By 2013, he established an <strong>engineering services company</strong>, gaining deeper 
                      understanding of business challenges across industries. Like many entrepreneurs, 
                      he faced ups and downs.
                    </p>
                    <p className="text-muted-foreground">
                      In 2017, after closing one venture, he made a pivotal decision — moving to Australia 
                      to pursue further business studies while working in tile manufacturing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Discovery Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-16">
              <Zap className="h-16 w-16 text-yellow-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Discovering Digital
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                The digital journey started much earlier — back in <strong>2011</strong>, while trying to build 
                a website using WordPress. That single step sparked a passion.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="text-left">
                <CardHeader>
                  <Globe className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle>Self-Learning Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    What began as curiosity turned into years of self-learning, online courses, 
                    and practical projects. Building and experimenting with multiple eCommerce 
                    websites for his own ventures.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardHeader>
                  <Users className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>Client Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Naturally progressing into creating websites, apps, and digital marketing 
                    solutions for clients. Discovering the same problem everywhere: businesses 
                    struggling with fragmented digital solutions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4">That's When Digital Linked Was Born</h3>
              <p className="text-lg text-muted-foreground">
                Born from the need to solve fragmented digital solutions, too many tools, 
                and not enough clarity for businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Digital Linked Represents */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              What Digital Linked Represents
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine unique perspectives to deliver solutions that truly understand both business and digital worlds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Wrench className="h-12 w-12 text-blue-500" />,
                title: "Engineering Discipline",
                description: "Structured processes, problem-solving mindset, and systematic approaches to every challenge.",
              },
              {
                icon: <Building className="h-12 w-12 text-purple-500" />,
                title: "Business Experience",
                description: "Real-world understanding of what SMEs and companies go through in their daily operations.",
              },
              {
                icon: <Zap className="h-12 w-12 text-yellow-500" />,
                title: "Digital Expertise",
                description: "Websites, apps, AI, and marketing built with hands-on experience and continuous learning.",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-primary/20 text-center">
            <h3 className="text-2xl font-bold mb-4">We're Not Just a Tech Provider</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a <strong>partner who understands both business and digital worlds</strong>. 
              This unique blend means we deliver solutions that actually work for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Our Commitment
              </h2>
              <p className="text-xl text-muted-foreground">
                Three core principles that guide every interaction and project.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Lightbulb className="h-16 w-16 text-yellow-500" />,
                  title: "Clarity over Complexity",
                  description: "We simplify digital for you. No jargon, no confusion - just clear solutions that make sense.",
                },
                {
                  icon: <Handshake className="h-16 w-16 text-blue-500" />,
                  title: "True Partnership",
                  description: "Built on trust, transparency, and collaboration. We succeed when you succeed.",
                },
                {
                  icon: <Rocket className="h-16 w-16 text-purple-500" />,
                  title: "Growth Mindset",
                  description: "Every solution is designed to drive real results and scale with your business.",
                },
              ].map((commitment, index) => (
                <div key={index} className="text-center">
                  <div className="mb-6 flex justify-center">
                    {commitment.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{commitment.title}</h3>
                  <p className="text-muted-foreground">{commitment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Who We Work With
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We help businesses of all sizes with practical, cost-effective solutions 
              and tailored, scalable digital strategies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="text-left">
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-500 mb-4" />
                  <CardTitle className="text-2xl">Small & Medium Businesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    We help SMEs who need practical, cost-effective solutions that deliver real results 
                    without breaking the budget.
                  </CardDescription>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Affordable website and app development</li>
                    <li>• Digital marketing that actually works</li>
                    <li>• AI automation to save time and money</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="text-left">
                <CardHeader>
                  <Building className="h-12 w-12 text-purple-500 mb-4" />
                  <CardTitle className="text-2xl">Larger Organizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    We work with larger organizations who require tailored, scalable digital strategies 
                    and enterprise-level solutions.
                  </CardDescription>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Custom enterprise applications</li>
                    <li>• Scalable digital transformation</li>
                    <li>• Advanced AI and automation systems</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4">The Perfect Balance</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Clients choose us because we're not <strong>"too corporate"</strong> to care, and not 
                <strong>"too small"</strong> to deliver. We bring the right balance of 
                <strong>personal attention</strong> and <strong>professional execution</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Road Ahead */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              The Road Ahead
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Digital Linked is more than a digital agency — it's a story of <strong>persistence, learning, and growth</strong>. 
              We're here to help businesses like yours navigate digital challenges with confidence, 
              turning complexity into opportunity.
            </p>
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border border-primary/20 mb-12">
              <h3 className="text-2xl font-bold mb-4">Because at the heart of it...</h3>
              <p className="text-xl text-muted-foreground">
                <strong>Digital Linked is about creating connections that matter.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Let's Build Something Meaningful Together
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ready to transform your digital presence? Let's start with a conversation 
            about your goals and how we can help you achieve them.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <MagneticButton 
              size="lg" 
              className="btn-primary text-lg px-8 py-4 animate-glow bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/contact?action=strategy-call">Book a Free Strategy Call</Link>
            </MagneticButton>
            <MagneticButton 
              size="lg" 
              variant="outline" 
              className="btn-outline text-lg px-8 py-4 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openQuoteModal'));
              }}
            >
              Request an Instant Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-90">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-90">Years Combined Experience</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
