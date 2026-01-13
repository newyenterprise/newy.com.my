import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@newy/ui";
import Link from "next/link";
import { ArrowRight, Globe, Zap, TrendingUp, Check, Star, Code, Palette, Database, Shield, Award, Users, Clock, Target, Smartphone, Monitor, Tablet } from "lucide-react";
import { ScrollReveal } from "../../components/scroll-reveal";
import { MagneticButton } from "../../components/magnetic-button";
import { ParallaxHero } from "../../components/parallax-hero";
import { HoverCard } from "../../components/hover-card";
import { WebDevelopmentProcessVisual } from "../../components/web-development-visual";

export default function WebsitePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Custom Website Development</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                We build beautiful, responsive, and high-performing websites that not only look great 
                but also drive results for your business. From simple landing pages to complex e-commerce platforms.
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
              <div className="gradient-secondary rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20 animate-float">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Globe className="h-20 w-20 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full animate-ping"></div>
                  </div>
                  <h3 className="text-2xl font-semibold gradient-text">Web Excellence</h3>
                  <p className="text-muted-foreground">Crafting digital experiences that convert</p>
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
            <h2 className="text-4xl font-bold font-display mb-4">Our Web Development Approach</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Newy, we combine cutting-edge technology with creative design to deliver 
              web solutions that are perfectly aligned with your brand identity and business 
              objectives. Our proven process ensures success:
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
            <h2 className="text-4xl font-bold font-display mb-4">Our Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We leverage the latest technologies and platforms to create fast, secure, and scalable websites. 
              Our expertise spans from custom development to popular website builders.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {/* Custom Development */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Custom Development</h3>
                <p className="text-muted-foreground">Building from scratch with modern frameworks</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Next.js", type: "framework" },
                  { name: "React", type: "framework" },
                  { name: "TypeScript", type: "language" },
                  { name: "Node.js", type: "runtime" },
                  { name: "PostgreSQL", type: "database" },
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

            {/* Website Builders & Platforms */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Website Builders & Platforms</h3>
                <p className="text-muted-foreground">Expert implementation on popular platforms</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { name: "WordPress", partner: false },
                  { name: "Webflow", partner: false },
                  { name: "Shopify", partner: true },
                  { name: "Wix", partner: true },
                  { name: "Squarespace", partner: false }
                ].map((platform, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">{platform.name}</h4>
                        {platform.partner && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mt-1">
                            Partner
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Additional Technologies */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Additional Technologies</h3>
                <p className="text-muted-foreground">Supporting technologies for optimal performance</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Tailwind CSS", category: "Styling" },
                  { name: "Framer Motion", category: "Animation" },
                  { name: "Stripe", category: "Payments" },
                  { name: "SendGrid", category: "Email" },
                  { name: "Vercel", category: "Hosting" },
                  { name: "Cloudflare", category: "CDN" }
                ].map((tech, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
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

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Why Choose Digital Linked?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just developers – we're your digital partners committed to your success
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                icon: <Award className="h-8 w-8 text-purple-400" />,
                title: "Proven Track Record",
                description: "100+ successful projects delivered with measurable results"
              },
              {
                icon: <Users className="h-8 w-8 text-purple-400" />,
                title: "Dedicated Team",
                description: "Direct access to our development team throughout your project"
              },
              {
                icon: <Clock className="h-8 w-8 text-purple-400" />,
                title: "Fast Delivery",
                description: "Average project completion in 4-8 weeks depending on complexity"
              },
              {
                icon: <Target className="h-8 w-8 text-purple-400" />,
                title: "Results-Driven",
                description: "Focus on metrics that matter: conversions, engagement, and ROI"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Responsive Design Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold font-display mb-6">Responsive Design That Works Everywhere</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Your website will look and function perfectly on all devices – from mobile phones to desktop computers. 
                We ensure optimal user experience across all screen sizes.
              </p>
              <div className="space-y-4">
                {[
                  "Mobile-first responsive design",
                  "Cross-browser compatibility",
                  "Fast loading on all devices",
                  "Touch-friendly navigation",
                  "Optimized for all screen sizes"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative">
                <div className="flex justify-center items-center space-x-4">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20">
                    <Smartphone className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20">
                    <Tablet className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20">
                    <Monitor className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Types of Websites We Build */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Types of Websites We Build</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple landing pages to complex e-commerce platforms, we have the expertise to bring your vision to life
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "E-commerce Stores",
                description: "Full-featured online stores with payment processing, inventory management, and customer accounts.",
                icon: <Globe className="h-8 w-8 text-purple-400" />,
                features: ["Payment gateways", "Inventory management", "Customer accounts", "Order tracking"]
              },
              {
                title: "Corporate Websites",
                description: "Professional websites that establish credibility and generate leads for your business.",
                icon: <Code className="h-8 w-8 text-purple-400" />,
                features: ["Company information", "Service pages", "Contact forms", "Blog integration"]
              },
              {
                title: "Portfolio Sites",
                description: "Showcase your work and attract new clients with a stunning portfolio website.",
                icon: <Palette className="h-8 w-8 text-purple-400" />,
                features: ["Project galleries", "About sections", "Contact forms", "Social integration"]
              },
              {
                title: "Landing Pages",
                description: "High-converting landing pages designed to capture leads and drive specific actions.",
                icon: <Zap className="h-8 w-8 text-purple-400" />,
                features: ["Lead capture", "A/B testing", "Analytics", "Fast loading"]
              },
              {
                title: "Web Applications",
                description: "Custom web applications that streamline your business processes and improve efficiency.",
                icon: <Database className="h-8 w-8 text-purple-400" />,
                features: ["User authentication", "Data management", "API integration", "Real-time updates"]
              },
              {
                title: "Blogs & Content Hubs",
                description: "Content-driven websites that establish thought leadership and drive organic traffic.",
                icon: <TrendingUp className="h-8 w-8 text-purple-400" />,
                features: ["Content management", "SEO optimization", "Social sharing", "Newsletter integration"]
              }
            ].map((service, index) => (
              <HoverCard key={index} className="group border-purple-500/20 hover:border-purple-500/40">
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

      {/* Process Timeline */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Development Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A transparent, step-by-step process that keeps you informed every step of the way
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description: "We dive deep into your business goals, target audience, and requirements to create a comprehensive project plan.",
                duration: "1-2 weeks"
              },
              {
                step: "02",
                title: "Design & Prototyping",
                description: "Our designers create wireframes and mockups, then build interactive prototypes for your approval.",
                duration: "2-3 weeks"
              },
              {
                step: "03",
                title: "Development",
                description: "Our developers bring the designs to life with clean, scalable code and modern technologies.",
                duration: "3-6 weeks"
              },
              {
                step: "04",
                title: "Launch & Support",
                description: "We thoroughly test your website, deploy it, and provide ongoing support and maintenance.",
                duration: "1-2 weeks"
              }
            ].map((phase, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">{phase.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                    <p className="text-muted-foreground mb-3">{phase.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {phase.duration}
                    </Badge>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-purple-400" />
                  </div>
                )}
              </div>
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
            you apart from the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
              <Link href="/contact">Schedule a Free Consultation</Link>
            </MagneticButton>
            <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
              <Link href="/pricing">Get Instant Quote</Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>

      {/* Client Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it – hear from businesses we've helped transform their online presence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                rating: 5,
                text: "Digital Linked transformed our outdated website into a modern, high-converting platform. Our leads increased by 40% within the first month!",
                author: "Sarah Johnson",
                company: "TechStart Solutions",
                project: "Corporate Website Redesign"
              },
              {
                rating: 5,
                text: "The team at Digital Linked is incredibly professional and skilled. They built our e-commerce store exactly as envisioned, and it's performing beyond expectations.",
                author: "Michael Chen",
                company: "EcoStyle Boutique",
                project: "E-commerce Platform"
              }
            ].map((testimonial, index) => (
              <HoverCard key={index} className="border-purple-500/20">
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
                    <div>{testimonial.company}</div>
                    <div className="text-purple-400">{testimonial.project}</div>
                  </div>
                </CardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get answers to the most common questions about our website development services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the typical timeline for a website development project?",
                answer: "Website development timelines vary based on complexity and features. Simple websites take 2-4 weeks, while complex e-commerce or custom applications can take 8-12 weeks. We'll provide a detailed timeline during our consultation."
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer: "Yes! We offer various support packages including hosting, security updates, content updates, and technical support. We can also provide training for your team to manage content updates."
              },
              {
                question: "Can you integrate with my existing business systems?",
                answer: "Absolutely! We specialize in creating websites that integrate seamlessly with your existing business systems, CRM platforms, e-commerce solutions, and third-party APIs."
              },
              {
                question: "What makes you different from other web development agencies?",
                answer: "We combine technical expertise with business acumen. We don't just build websites – we create digital solutions that drive real business results. Our partnership with Shopify and Wix also gives us unique insights into these platforms."
              },
              {
                question: "Do you provide SEO optimization with website development?",
                answer: "Yes, SEO is built into every website we develop. We implement technical SEO best practices, optimize for local search, and provide guidance on content strategy to improve your search rankings."
              }
            ].map((faq, index) => (
              <HoverCard key={index} className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Learn More About Website Development</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends and insights in web development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Top 5 Trends in Website Development for 2024",
                description: "Discover the latest trends shaping the world of website development and how your business can benefit from them.",
                readTime: "5 min read"
              },
              {
                title: "Maximizing ROI with Website Development",
                description: "Learn strategies to ensure your investment in website development delivers maximum returns for your business.",
                readTime: "7 min read"
              }
            ].map((article, index) => (
              <HoverCard key={index} className="group border-purple-500/20 hover:border-purple-500/40">
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
                  <div className="flex items-center justify-between">
                    <Button variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                </CardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
