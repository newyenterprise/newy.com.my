import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, Zap, Brain, Bot, Workflow, Check, Star, Code, BarChart, Shield, Clock } from "lucide-react";
import { ScrollReveal } from "../../components/scroll-reveal";
import { MagneticButton } from "../../components/magnetic-button";
import { ParallaxHero } from "../../components/parallax-hero";
import { HoverCard } from "../../components/hover-card";

export default function AIAutomationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <ParallaxHero className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" speed={0.3} />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                <span className="gradient-text">AI-Powered Automation Solutions</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Leverage the power of Artificial Intelligence to automate processes, gain insights, and 
                transform your business operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                  Explore AI Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/portfolio">View AI Projects</Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <ParallaxHero className="relative" speed={0.2}>
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center">
                <div className="text-6xl font-bold text-muted-foreground/30">600 × 400</div>
              </div>
            </ParallaxHero>
          </div>
        </div>
      </section>

      {/* How AI Can Transform Your Business */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">How AI Can Transform Your Business</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leveraging the Google's Gemini AI model, GPT-4, and other AI technologies, we build intelligent 
              solutions that give your business a competitive edge. We help you identify and implement AI solutions that deliver real-world 
              benefits.
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6" stagger={0.1}>
              {[
                "Automate repetitive tasks and workflows",
                "Enhanced customer service with intelligent chatbots",
                "Gain deeper insights from your data with machine learning",
                "Improve decision-making with predictive analytics",
                "Personalize customer experiences at scale",
                "Optimize resource allocation and reduce costs"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center">
                <div className="text-6xl font-bold text-muted-foreground/30">600 × 400</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our AI Automation Services */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our AI Automation Services</h2>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Intelligent Document Processing",
                description: "Automate document analysis, data extraction, and processing workflows.",
                icon: Bot,
                badge: "NLP",
                features: ["OCR & Text Extraction", "Document Classification", "Data Validation", "Workflow Integration"]
              },
              {
                title: "Predictive Analytics & Insights",
                description: "Harness machine learning to predict trends and make data-driven decisions.",
                icon: BarChart,
                badge: "ML",
                features: ["Demand Forecasting", "Risk Assessment", "Customer Behavior Analysis", "Performance Optimization"]
              },
              {
                title: "Conversational AI & Chatbots",
                description: "Implement AI chatbots for customer service, lead generation, and support.",
                icon: Brain,
                badge: "NLP",
                features: ["Natural Language Processing", "Multi-language Support", "CRM Integration", "24/7 Availability"]
              },
              {
                title: "Process Automation & RPA",
                description: "Implementing AI strategy consulting to boost efficiency and innovation.",
                icon: Workflow,
                badge: "RPA",
                features: ["Workflow Automation", "System Integration", "Error Reduction", "Scalable Solutions"]
              },
              {
                title: "Computer Vision & Image Analysis",
                description: "Implementing AI strategy consulting to boost efficiency and innovation.",
                icon: Shield,
                badge: "CV",
                features: ["Image Recognition", "Quality Control", "Security Monitoring", "Automated Inspection"]
              },
              {
                title: "Custom AI Solutions & Consulting",
                description: "Tailored solutions for unique business challenges and strategic consulting.",
                icon: Zap,
                badge: "Custom",
                features: ["Strategy Development", "Custom Model Training", "Integration Planning", "Performance Monitoring"]
              }
            ].map((service, index) => (
              <HoverCard key={index} className="group border-purple-500/20 hover:border-purple-500/40">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </HoverCard>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Ready to Automate and Innovate */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <ScrollReveal className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Ready to Automate and Innovate?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how AI automation can transform your business operations and drive growth.
          </p>
          <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
            Schedule AI Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
        </ScrollReveal>
      </section>

      {/* Client Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">What Our Clients Say About Our AI Automation Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                rating: 5,
                text: "Great experience working on our AI automation project! Highly recommend.",
                author: "John Doe",
                company: "TechCorp Solutions"
              },
              {
                rating: 4,
                text: "Very knowledgeable team. Our AI automation results were impressive.",
                author: "Jane Smith",
                company: "ServiceFirst Inc"
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
                  </div>
                </CardContent>
              </HoverCard>
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
            <h2 className="text-4xl font-bold font-display mb-4">Frequently Asked Questions about AI Automation</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the typical timeline for a AI automation project?",
                answer: "AI automation project timelines vary based on complexity. Simple chatbots can be deployed in 2-4 weeks, while complex machine learning solutions may take 3-6 months. We'll provide a detailed timeline during our consultation."
              },
              {
                question: "How do you measure success for AI automation services?",
                answer: "We measure success through efficiency gains, cost reductions, accuracy improvements, time savings, and ROI metrics. Each project has specific KPIs aligned with your business objectives."
              },
              {
                question: "Can you integrate your AI automation solutions with our existing systems?",
                answer: "Yes, we specialize in seamless integration with existing business systems, databases, CRM platforms, and third-party APIs to ensure smooth workflow automation."
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
          <div className="text-center mt-8">
            <p className="text-muted-foreground">(More FAQs specific to AI automation will be added here)</p>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Learn More About AI Automation</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Top 5 Trends in AI Automation for 2024",
                description: "Discover the latest trends shaping the world of AI automation and how your business can benefit.",
                image: "600 × 400"
              },
              {
                title: "Maximizing ROI with AI Automation",
                description: "Learn strategies to ensure your investment in AI automation delivers maximum returns.",
                image: "600 × 400"
              }
            ].map((article, index) => (
              <HoverCard key={index} className="group border-purple-500/20 hover:border-purple-500/40">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-t-lg border-b border-purple-500/20 flex items-center justify-center">
                  <div className="text-2xl font-bold text-muted-foreground/30">{article.image}</div>
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
              </HoverCard>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground">(More blog posts and resources related to AI automation will be featured here. Blog functionality to be implemented.)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
