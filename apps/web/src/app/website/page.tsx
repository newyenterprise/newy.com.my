import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, Globe, Zap, TrendingUp, Check, Star, Code, Palette, Database, Shield } from "lucide-react";
import { ScrollReveal } from "../../components/scroll-reveal";
import { MagneticButton } from "../../components/magnetic-button";
import { ParallaxHero } from "../../components/parallax-hero";

export default function WebsitePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3}></ParallaxHero>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Custom Website Development</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                We build beautiful, responsive, and high-performing websites that not only look great 
                but also drive results for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                  Get a Website Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/portfolio">View Our Portfolio</Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ParallaxHero className="relative" speed={0.2}>
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center max-w-lg mx-auto">
                <div className="text-4xl font-bold text-muted-foreground/30">600 × 400</div>
              </div>
            </ParallaxHero>
          </div>
        </div>
      </section>

      {/* Our Web Development Approach */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Web Development Approach</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Digital Linked, we combine cutting-edge technology with creative design to deliver 
              web solutions that are perfectly aligned with your brand identity and business 
              objectives. Our process includes:
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6" stagger={0.1}>
              {[
                "In-depth discovery and strategic planning",
                "User-centric UX/UI design and prototyping",
                "Agile development with clean, scalable code",
                "Rigorous testing and quality assurance",
                "Search engine optimization and performance",
                "Ongoing support and maintenance options"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <MagneticButton asChild className="btn-primary">
                  <Link href="/portfolio">View Our Portfolio</Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center max-w-lg mx-auto">
                <div className="text-4xl font-bold text-muted-foreground/30">600 × 400</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Websites We Build */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Types of Websites We Build</h2>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "E-commerce Stores",
                description: "Full-featured solutions for e-commerce stores to achieve specific business outcomes.",
                icon: <Globe className="h-8 w-8 text-purple-400" />
              },
              {
                title: "Corporate Websites",
                description: "Tailored solutions for corporate websites to achieve specific business outcomes.",
                icon: <Code className="h-8 w-8 text-purple-400" />
              },
              {
                title: "Portfolio Sites",
                description: "Tailored solutions for portfolio sites to achieve specific business outcomes.",
                icon: <Palette className="h-8 w-8 text-purple-400" />
              },
              {
                title: "Landing Pages",
                description: "Tailored solutions for landing pages to achieve specific business outcomes.",
                icon: <Zap className="h-8 w-8 text-purple-400" />
              },
              {
                title: "Web Applications",
                description: "Tailored solutions for web applications to achieve specific business outcomes.",
                icon: <Database className="h-8 w-8 text-purple-400" />
              },
              {
                title: "Blogs & Content Hubs",
                description: "Tailored solutions for blogs & content hubs to achieve specific business outcomes.",
                icon: <TrendingUp className="h-8 w-8 text-purple-400" />
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-4 border border-purple-500/20">
                    {service.icon}
                  </div>
                  <CardTitle className="group-hover:text-purple-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription>
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Ready to Build Your Online Presence? */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <ScrollReveal className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Ready to Build Your Online Presence?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and how we can create a website that sets 
            you apart.
          </p>
          <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
            Schedule a Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
        </ScrollReveal>
      </section>

      {/* Client Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">What Our Clients Say About Our Website Development Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                rating: 5,
                text: "Great experience working on our website development project! Highly recommend.",
                author: "John Doe"
              },
              {
                rating: 4,
                text: "Very knowledgeable team. Our website development results were impressive.",
                author: "Jane Smith"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                  <div className="text-sm text-muted-foreground">
                    <div className="font-semibold">— {testimonial.author}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">(More client reviews will be added here)</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Frequently Asked Questions about Website Development</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the typical timeline for a website development project?",
                answer: "Website development timelines vary based on complexity and features. Simple websites take 2-4 weeks, while complex e-commerce or custom applications can take 8-12 weeks. We'll provide a detailed timeline during our consultation."
              },
              {
                question: "How do you measure success for website development services?",
                answer: "We measure success through various metrics including page load speed, user engagement, conversion rates, search engine rankings, and achievement of your specific business objectives."
              },
              {
                question: "Can you integrate your website development solutions with our existing systems?",
                answer: "Absolutely! We specialize in creating websites that integrate seamlessly with your existing business systems, CRM platforms, e-commerce solutions, and third-party APIs."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">(More FAQs specific to website development will be added here)</p>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Learn More About Website Development</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Top 5 Trends in Website Development for 2024",
                description: "Discover the latest trends shaping the world of website development and how your business can benefit."
              },
              {
                title: "Maximizing ROI with Website Development",
                description: "Learn strategies to ensure your investment in website development delivers maximum returns."
              }
            ].map((article, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-t-lg border-b border-purple-500/20 flex items-center justify-center">
                  <div className="text-2xl font-bold text-muted-foreground/30">600 × 400</div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">(More blog posts and resources related to website development will be featured here. Blog functionality to be implemented.)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
