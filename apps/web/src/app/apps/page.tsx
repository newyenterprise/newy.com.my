import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Zap, TrendingUp, Check, Star, Code, Palette, Database, Shield, Cloud, Layers, Smartphone as Mobile, Cpu, Server, Wifi, Lock, Zap as Lightning, Award, Users, Clock, Target, Monitor, Tablet, Smartphone as Phone, Smartphone as App, Smartphone as Device } from "lucide-react";
import { ScrollReveal } from "../../components/scroll-reveal";
import { MagneticButton } from "../../components/magnetic-button";
import { ParallaxHero } from "../../components/parallax-hero";
import { HoverCard } from "../../components/hover-card";
import { AppDevelopmentVisual } from "../../components/app-development-visual";

export default function AppsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">Innovative App Development</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                We build custom mobile and web applications that engage users, solve problems, and 
                drive business growth. From native mobile apps to progressive web applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                  Discuss Your App Idea
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/portfolio">See App Projects</Link>
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
                  <h3 className="text-2xl font-semibold gradient-text">App Innovation</h3>
                  <p className="text-muted-foreground">Building the future, one app at a time</p>
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
            <h2 className="text-4xl font-bold font-display mb-4">Our App Development Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We specialize in creating a wide range of applications, from sophisticated enterprise 
              solutions to engaging consumer apps. Our proven approach ensures success:
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6" stagger={0.1}>
              {[
                "Native iOS & Android App Development",
                "Cross-Platform App Development (React Native, Flutter)",
                "Progressive Web App (PWA) Development",
                "Backend Development & API Integration",
                "UI/UX Design for Engaging Experiences",
                "App Store Submission & Post-Launch Support"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <MagneticButton asChild className="btn-primary">
                  <Link href="/portfolio">See App Projects</Link>
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
            <h2 className="text-4xl font-bold font-display mb-4">Our Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We leverage cutting-edge technologies and frameworks to create fast, scalable, and 
              maintainable applications across all platforms.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {/* Mobile Development */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Mobile Development</h3>
                <p className="text-muted-foreground">Native and cross-platform mobile solutions</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "React Native", type: "Cross-platform", partner: false },
                  { name: "Flutter", type: "Cross-platform", partner: false },
                  { name: "Swift", type: "iOS Native", partner: false },
                  { name: "Kotlin", type: "Android Native", partner: false },
                  { name: "Expo", type: "Development Platform", partner: false },
                  { name: "Xamarin", type: "Cross-platform", partner: false }
                ].map((tech, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Mobile className="h-8 w-8 text-purple-400 mx-auto mb-2" />
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

            {/* Web & Backend Technologies */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Web & Backend Technologies</h3>
                <p className="text-muted-foreground">Robust backend and web application development</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Next.js", type: "Framework", partner: false },
                  { name: "React", type: "Library", partner: false },
                  { name: "Node.js", type: "Runtime", partner: false },
                  { name: "TypeScript", type: "Language", partner: false },
                  { name: "Python", type: "Language", partner: false },
                  { name: "Django", type: "Framework", partner: false }
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

            {/* Cloud & Infrastructure */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Cloud & Infrastructure</h3>
                <p className="text-muted-foreground">Scalable cloud solutions and backend services</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "AWS", type: "Cloud Platform", partner: false },
                  { name: "Firebase", type: "Backend Service", partner: false },
                  { name: "Supabase", type: "Backend Service", partner: false },
                  { name: "Vercel", type: "Hosting", partner: false },
                  { name: "Docker", type: "Containerization", partner: false },
                  { name: "Kubernetes", type: "Orchestration", partner: false }
                ].map((tech, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Cloud className="h-8 w-8 text-purple-400 mx-auto mb-2" />
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

            {/* Additional Technologies */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Additional Technologies</h3>
                <p className="text-muted-foreground">Supporting technologies for enhanced functionality</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "Stripe", category: "Payments" },
                  { name: "SendGrid", category: "Email" },
                  { name: "Twilio", category: "Communication" },
                  { name: "MongoDB", category: "Database" },
                  { name: "Redis", category: "Caching" },
                  { name: "GraphQL", category: "API" }
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
              We're not just developers – we're your digital partners committed to your app's success
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                icon: <Award className="h-8 w-8 text-purple-400" />,
                title: "Proven Track Record",
                description: "50+ successful apps launched with millions of downloads"
              },
              {
                icon: <Users className="h-8 w-8 text-purple-400" />,
                title: "Dedicated Team",
                description: "Direct access to our development team throughout your project"
              },
              {
                icon: <Clock className="h-8 w-8 text-purple-400" />,
                title: "Fast Delivery",
                description: "Average app completion in 8-16 weeks depending on complexity"
              },
              {
                icon: <Target className="h-8 w-8 text-purple-400" />,
                title: "Results-Driven",
                description: "Focus on user engagement, retention, and business metrics"
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

      {/* App Types Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Types of Apps We Build</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple utility apps to complex enterprise solutions, we have the expertise to bring your vision to life
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "E-commerce Apps",
                description: "Full-featured mobile stores with payment processing, inventory management, and customer accounts.",
                icon: <Mobile className="h-8 w-8 text-purple-400" />,
                features: ["Payment gateways", "Inventory sync", "Push notifications", "Order tracking"]
              },
              {
                title: "Social Media Apps",
                description: "Engaging social platforms with real-time messaging, content sharing, and user interactions.",
                icon: <Users className="h-8 w-8 text-purple-400" />,
                features: ["Real-time chat", "Content sharing", "User profiles", "Analytics"]
              },
              {
                title: "Business Apps",
                description: "Enterprise solutions that streamline operations and improve team productivity.",
                icon: <Database className="h-8 w-8 text-purple-400" />,
                features: ["User management", "Data synchronization", "Reporting", "Security"]
              },
              {
                title: "Utility Apps",
                description: "Practical tools that solve specific problems and improve daily workflows.",
                icon: <Zap className="h-8 w-8 text-purple-400" />,
                features: ["Offline functionality", "Data backup", "Customization", "Integration"]
              },
              {
                title: "Entertainment Apps",
                description: "Engaging content platforms with streaming, gaming, and interactive features.",
                icon: <TrendingUp className="h-8 w-8 text-purple-400" />,
                features: ["Content streaming", "User engagement", "Analytics", "Monetization"]
              },
              {
                title: "Health & Fitness Apps",
                description: "Wellness applications that track health metrics and provide personalized guidance.",
                icon: <Target className="h-8 w-8 text-purple-400" />,
                features: ["Health tracking", "Personalization", "Data privacy", "Wearable integration"]
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

      {/* Cross-Platform Development */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold font-display mb-6">Cross-Platform Development</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Build once, deploy everywhere. Our cross-platform solutions ensure your app works 
                seamlessly across iOS, Android, and web platforms.
              </p>
              <div className="space-y-4">
                {[
                  "Single codebase for multiple platforms",
                  "Native performance on all devices",
                  "Consistent user experience",
                  "Faster development and deployment",
                  "Cost-effective solution"
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
                    <Phone className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20">
                    <App className="h-12 w-12 text-purple-400" />
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
                description: "We analyze your requirements, target audience, and business goals to create a comprehensive app strategy.",
                duration: "1-2 weeks"
              },
              {
                step: "02",
                title: "Design & Prototyping",
                description: "Our designers create wireframes, UI/UX designs, and interactive prototypes for your approval.",
                duration: "2-3 weeks"
              },
              {
                step: "03",
                title: "Development",
                description: "Our developers build your app using modern technologies and best practices for optimal performance.",
                duration: "6-12 weeks"
              },
              {
                step: "04",
                title: "Testing & Launch",
                description: "We thoroughly test your app, submit to app stores, and provide post-launch support and maintenance.",
                duration: "2-3 weeks"
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

      {/* Transform Your Idea Into a Reality */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <ScrollReveal className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Transform Your Idea Into a Reality</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have an app idea? Let's collaborate to bring it to life and make it a success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
              <Link href="/contact">Get a Free App Consultation</Link>
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
              Don't just take our word for it – hear from businesses we've helped transform with custom apps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                rating: 5,
                text: "Digital Linked built our e-commerce app from scratch and it's been a game-changer for our business. User engagement increased by 60% and sales went up 40% in the first quarter!",
                author: "Alex Rodriguez",
                company: "Fashion Forward",
                project: "E-commerce Mobile App"
              },
              {
                rating: 5,
                text: "The team at Digital Linked delivered our fitness app on time and within budget. The app has over 10,000 downloads and maintains a 4.8-star rating on the App Store.",
                author: "Sarah Kim",
                company: "FitLife Solutions",
                project: "Health & Fitness App"
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
              Get answers to the most common questions about our app development services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the typical timeline for an app development project?",
                answer: "App development timelines vary based on complexity and features. Simple apps take 8-12 weeks, while complex enterprise apps can take 4-6 months. We'll provide a detailed timeline during our consultation."
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer: "Yes! We offer comprehensive support packages including bug fixes, feature updates, app store submissions, and performance monitoring. We can also provide training for your team."
              },
              {
                question: "Can you integrate with my existing business systems?",
                answer: "Absolutely! We specialize in creating apps that integrate seamlessly with your existing business systems, APIs, databases, and third-party services."
              },
              {
                question: "What makes you different from other app development agencies?",
                answer: "We combine technical expertise with business acumen. We don't just build apps – we create digital solutions that drive real business results and user engagement."
              },
              {
                question: "Do you handle app store submissions?",
                answer: "Yes, we handle the entire app store submission process for both iOS App Store and Google Play Store, including app store optimization and compliance requirements."
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
            <h2 className="text-4xl font-bold font-display mb-4">Learn More About App Development</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends and insights in mobile app development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Top 5 Trends in App Development for 2024",
                description: "Discover the latest trends shaping the world of app development and how your business can benefit from them.",
                readTime: "6 min read"
              },
              {
                title: "Maximizing ROI with App Development",
                description: "Learn strategies to ensure your investment in app development delivers maximum returns for your business.",
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
