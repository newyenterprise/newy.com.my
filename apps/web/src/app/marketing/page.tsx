import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, TrendingUp, Target, BarChart, Search, Check, Star, Globe, Mail, Share2, Eye, Award, Users, Clock, Smartphone, Monitor, Tablet, Cpu, Server, Database, Cloud, Settings, MessageSquare, ShoppingCart, Users as Team, Activity, Zap, Calendar, FileText, Camera, Video, Headphones, Mic, PenTool, Palette, Layers, Filter, PieChart, LineChart, TrendingDown, TrendingUp as Growth, Target as Bullseye, Award as Trophy, Users as Audience, Globe as World, Mail as Email, Share2 as Social, Eye as Analytics2 } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { ParallaxHero } from "@/components/parallax-hero";
import { HoverCard } from "@/components/hover-card";

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Strategic Digital Marketing</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Amplify your brand, engage your audience, and drive measurable results with our 
                comprehensive digital marketing services. From SEO to social media, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                  Boost Your Marketing ROI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/portfolio">View Case Studies</Link>
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
                  <h3 className="text-2xl font-semibold gradient-text">Growth Marketing</h3>
                  <p className="text-muted-foreground">Driving results through strategic campaigns</p>
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
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-display mb-4">Our Data-Driven Marketing Approach</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We believe in strategies backed by data and creativity that converts. Our digital 
                marketing services are designed to help you achieve sustainable growth and measurable results.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {[
                  "Search Engine Optimization (SEO)",
                  "Pay-Per-Click (PPC) Advertising",
                  "Social Media Marketing & Management",
                  "Content Creation & Marketing",
                  "Email Marketing Campaigns",
                  "Analytics & Performance Reporting"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
                <div className="mt-8">
                  <MagneticButton asChild className="btn-primary">
                    <Link href="/portfolio">View Case Studies</Link>
                  </MagneticButton>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center">
                  <div className="text-6xl font-bold text-muted-foreground/30">600 × 400</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Marketing Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We leverage the most powerful marketing platforms and tools to create campaigns that 
              deliver exceptional results and measurable ROI.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {/* SEO & Analytics Tools */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">SEO & Analytics Tools</h3>
                <p className="text-muted-foreground">Professional tools for search optimization and performance tracking</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Google Analytics", type: "Analytics", partner: false },
                  { name: "Google Search Console", type: "SEO", partner: false },
                  { name: "SEMrush", type: "SEO Tool", partner: false },
                  { name: "Ahrefs", type: "SEO Tool", partner: false },
                  { name: "Moz Pro", type: "SEO Tool", partner: false },
                  { name: "Screaming Frog", type: "Technical SEO", partner: false }
                ].map((tool, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Analytics2 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">{tool.name}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {tool.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Advertising Platforms */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Advertising Platforms</h3>
                <p className="text-muted-foreground">Paid advertising platforms for maximum reach and conversions</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Google Ads", type: "PPC", partner: false },
                  { name: "Facebook Ads", type: "Social Ads", partner: false },
                  { name: "Instagram Ads", type: "Social Ads", partner: false },
                  { name: "LinkedIn Ads", type: "B2B Ads", partner: false },
                  { name: "TikTok Ads", type: "Social Ads", partner: false },
                  { name: "Microsoft Ads", type: "PPC", partner: false }
                ].map((platform, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">{platform.name}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {platform.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Social Media & Content Tools */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Social Media & Content Tools</h3>
                <p className="text-muted-foreground">Tools for content creation, scheduling, and social media management</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Hootsuite", category: "Social Management" },
                  { name: "Buffer", category: "Social Scheduling" },
                  { name: "Canva", category: "Design" },
                  { name: "Adobe Creative Suite", category: "Design" },
                  { name: "Mailchimp", category: "Email Marketing" },
                  { name: "ConvertKit", category: "Email Marketing" }
                ].map((tool, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Social className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">{tool.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {tool.category}
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
              We're not just marketers – we're your growth partners committed to your success
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                icon: <Award className="h-8 w-8 text-purple-400" />,
                title: "Proven Track Record",
                description: "200+ successful campaigns with average 40% ROI improvement"
              },
              {
                icon: <Users className="h-8 w-8 text-purple-400" />,
                title: "Dedicated Team",
                description: "Direct access to our marketing specialists throughout your campaign"
              },
              {
                icon: <Clock className="h-8 w-8 text-purple-400" />,
                title: "Fast Results",
                description: "Initial results visible within 30-60 days of campaign launch"
              },
              {
                icon: <Target className="h-8 w-8 text-purple-400" />,
                title: "Results-Driven",
                description: "Focus on measurable outcomes: leads, conversions, and revenue growth"
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

      {/* Our Marketing Services */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Marketing Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From search engine optimization to social media management, we offer comprehensive 
              digital marketing solutions that drive real business results
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Search Engine Optimization (SEO)",
                description: "Improve your website's visibility in search results and drive organic traffic to your business.",
                icon: <Search className="h-8 w-8 text-purple-400" />,
                features: ["Keyword research", "On-page optimization", "Technical SEO", "Link building"]
              },
              {
                title: "Pay-Per-Click (PPC) Advertising",
                description: "Create targeted advertising campaigns that generate immediate traffic and conversions.",
                icon: <Target className="h-8 w-8 text-purple-400" />,
                features: ["Google Ads management", "Facebook/Instagram ads", "Remarketing campaigns", "Conversion tracking"]
              },
              {
                title: "Social Media Marketing",
                description: "Build your brand presence and engage with your audience across all social platforms.",
                icon: <Social className="h-8 w-8 text-purple-400" />,
                features: ["Content creation", "Community management", "Paid social ads", "Analytics reporting"]
              },
              {
                title: "Content Marketing",
                description: "Create valuable, engaging content that attracts and converts your target audience.",
                icon: <PenTool className="h-8 w-8 text-purple-400" />,
                features: ["Blog writing", "Video content", "Infographics", "Content strategy"]
              },
              {
                title: "Email Marketing",
                description: "Nurture leads and drive sales with personalized email campaigns and automation.",
                icon: <Email className="h-8 w-8 text-purple-400" />,
                features: ["Email campaigns", "Automation workflows", "A/B testing", "List management"]
              },
              {
                title: "Analytics & Reporting",
                description: "Track performance and optimize campaigns with comprehensive analytics and insights.",
                icon: <BarChart className="h-8 w-8 text-purple-400" />,
                features: ["Performance tracking", "ROI analysis", "Custom dashboards", "Monthly reports"]
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

      {/* Multi-Channel Marketing */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold font-display mb-6">Multi-Channel Marketing Strategy</h2>
              <p className="text-xl text-muted-foreground mb-8">
                We create integrated marketing campaigns that reach your audience across all channels 
                – from search engines to social media – ensuring maximum visibility and engagement.
              </p>
              <div className="space-y-4">
                {[
                  "Cross-platform campaign coordination",
                  "Consistent brand messaging",
                  "Unified analytics and reporting",
                  "Optimized budget allocation",
                  "Seamless customer journey mapping"
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
                    <Search className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20">
                    <Social className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20">
                    <Email className="h-12 w-12 text-purple-400" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Marketing Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A strategic approach that ensures your marketing campaigns deliver maximum results
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                step: "01",
                title: "Discovery & Research",
                description: "We analyze your market, competitors, and target audience to create a data-driven strategy.",
                duration: "1-2 weeks"
              },
              {
                step: "02",
                title: "Strategy Development",
                description: "We design comprehensive marketing campaigns tailored to your business goals and budget.",
                duration: "1-2 weeks"
              },
              {
                step: "03",
                title: "Implementation",
                description: "We launch and manage your campaigns across all channels with continuous optimization.",
                duration: "Ongoing"
              },
              {
                step: "04",
                title: "Analysis & Optimization",
                description: "We track performance, analyze results, and continuously improve your campaigns.",
                duration: "Monthly"
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

      {/* Ready to Grow Your Business Online */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold font-display mb-4">Ready to Grow Your Business Online?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's craft a marketing strategy that delivers exceptional results and drives sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                Get a Free Marketing Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </MagneticButton>
              <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4">
                Get Instant Quote
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-display mb-4">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Don't just take our word for it – hear from businesses we've helped grow with strategic marketing
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal stagger={0.1}>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  rating: 5,
                  text: "Digital Linked transformed our online presence completely. Our organic traffic increased by 150% and we're generating 3x more leads than before!",
                  author: "Jennifer Martinez",
                  company: "EcoTech Solutions",
                  project: "SEO & Content Marketing"
                },
                {
                  rating: 5,
                  text: "The PPC campaigns they managed for us delivered a 400% ROI in the first quarter. Their expertise in Google Ads is unmatched.",
                  author: "Robert Kim",
                  company: "TechStart Inc",
                  project: "PPC Advertising"
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
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-display mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get answers to the most common questions about our digital marketing services
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal stagger={0.1}>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What is the typical timeline for seeing results from digital marketing?",
                  answer: "Digital marketing is an ongoing process. You can see initial results within 30-60 days, but significant growth typically occurs over 3-6 months of consistent effort. We'll provide a detailed timeline based on your specific goals."
                },
                {
                  question: "Do you provide ongoing support and campaign management?",
                  answer: "Yes! We offer comprehensive campaign management including regular optimization, performance monitoring, and monthly reporting. We're your long-term marketing partner."
                },
                {
                  question: "Can you integrate with my existing business systems?",
                  answer: "Absolutely! We integrate with popular CRM systems, analytics platforms, e-commerce solutions, and marketing automation tools to ensure seamless data flow and comprehensive reporting."
                },
                {
                  question: "What makes you different from other marketing agencies?",
                  answer: "We focus on data-driven strategies that deliver measurable ROI. We don't just create campaigns – we build sustainable growth engines that scale with your business."
                },
                {
                  question: "How do you measure the success of marketing campaigns?",
                  answer: "We track various KPIs including website traffic, lead generation, conversion rates, ROI, brand awareness, and engagement metrics. Success metrics are customized based on your business objectives."
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
          </ScrollReveal>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-display mb-4">Learn More About Digital Marketing</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay updated with the latest trends and insights in digital marketing
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal stagger={0.1}>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Top 5 Trends in Digital Marketing for 2024",
                  description: "Discover the latest trends shaping the world of digital marketing and how your business can benefit from them.",
                  readTime: "6 min read"
                },
                {
                  title: "Maximizing ROI with Digital Marketing",
                  description: "Learn strategies to ensure your investment in digital marketing delivers maximum returns for your business.",
                  readTime: "8 min read"
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
                      <MagneticButton variant="ghost" className="p-0 h-auto text-purple-400 hover:text-purple-300">
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </MagneticButton>
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    </div>
                  </CardContent>
                </HoverCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
