import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, Zap, Brain, Bot, Workflow, Check, Star, Code, BarChart, Shield, Clock, Award, Users, Target, MessageSquare, Settings, Database, Cloud, Smartphone, Monitor, Tablet, Cpu, Server, Globe, Mail, Calendar, FileText, ShoppingCart, Users as Team, TrendingUp, Activity } from "lucide-react";
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
                <span className="gradient-text">Workflow Automation & AI Chatbots</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                Streamline your marketing and business workflows with powerful automation platforms and 
                intelligent chatbots that engage customers 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
                  Explore Automation Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
                <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4" asChild>
                  <Link href="/portfolio">View Automation Projects</Link>
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
                  <h3 className="text-2xl font-semibold gradient-text">Smart Automation</h3>
                  <p className="text-muted-foreground">Streamlining workflows, amplifying results</p>
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
            <h2 className="text-4xl font-bold font-display mb-4">How Automation Can Transform Your Business</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We specialize in workflow automation using platforms like n8n, Make, and Zapier, plus intelligent 
              chatbots that streamline your marketing and business processes. Our proven approach delivers real results:
            </p>
          </ScrollReveal>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6" stagger={0.1}>
              {[
                "Automate lead capture and follow-up processes",
                "Streamline email marketing and customer communication",
                "Integrate CRM and sales pipeline automation",
                "Create intelligent chatbots for 24/7 customer support",
                "Automate social media posting and engagement",
                "Optimize data collection and reporting workflows"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
              <div className="mt-8">
                <MagneticButton asChild className="btn-primary">
                  <Link href="/portfolio">View Automation Projects</Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/20 flex items-center justify-center">
                <div className="text-6xl font-bold text-muted-foreground/30">600 × 400</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Automation Technology Stack</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We leverage the most powerful automation platforms and AI technologies to create seamless 
              workflows that save time and boost productivity.
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {/* Workflow Automation Platforms */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Workflow Automation Platforms</h3>
                <p className="text-muted-foreground">Professional automation platforms for complex workflows</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "n8n", type: "Self-hosted", partner: false },
                  { name: "Make", type: "Cloud Platform", partner: false },
                  { name: "Zapier", type: "Cloud Platform", partner: false },
                  { name: "Integromat", type: "Cloud Platform", partner: false },
                  { name: "Automate.io", type: "Cloud Platform", partner: false },
                  { name: "IFTTT", type: "Cloud Platform", partner: false }
                ].map((platform, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Workflow className="h-8 w-8 text-purple-400 mx-auto mb-2" />
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

            {/* Chatbot & AI Platforms */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Chatbot & AI Platforms</h3>
                <p className="text-muted-foreground">Intelligent conversational AI for customer engagement</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "ChatGPT API", type: "AI Model", partner: false },
                  { name: "Claude AI", type: "AI Model", partner: false },
                  { name: "Dialogflow", type: "Google AI", partner: false },
                  { name: "Botpress", type: "Platform", partner: false },
                  { name: "Landbot", type: "Platform", partner: false },
                  { name: "ManyChat", type: "Platform", partner: false }
                ].map((platform, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Bot className="h-8 w-8 text-purple-400 mx-auto mb-2" />
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

            {/* Integration Platforms */}
            <ScrollReveal>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Integration Platforms</h3>
                <p className="text-muted-foreground">Connect your favorite tools and services seamlessly</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  { name: "HubSpot", category: "CRM" },
                  { name: "Salesforce", category: "CRM" },
                  { name: "Mailchimp", category: "Email" },
                  { name: "Slack", category: "Communication" },
                  { name: "Notion", category: "Productivity" },
                  { name: "Airtable", category: "Database" }
                ].map((platform, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                      <div className="text-center">
                        <Settings className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm">{platform.name}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {platform.category}
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
              We're not just automation experts – we're your digital partners committed to streamlining your workflows
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                icon: <Award className="h-8 w-8 text-purple-400" />,
                title: "Proven Track Record",
                description: "100+ automation workflows built with measurable efficiency gains"
              },
              {
                icon: <Users className="h-8 w-8 text-purple-400" />,
                title: "Dedicated Team",
                description: "Direct access to our automation specialists throughout your project"
              },
              {
                icon: <Clock className="h-8 w-8 text-purple-400" />,
                title: "Fast Implementation",
                description: "Average automation setup in 1-3 weeks depending on complexity"
              },
              {
                icon: <Target className="h-8 w-8 text-purple-400" />,
                title: "Results-Driven",
                description: "Focus on efficiency gains, time savings, and ROI improvement"
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

      {/* Our Automation Services */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Our Automation Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple workflow automation to complex AI chatbots, we have the expertise to streamline your business processes
            </p>
          </ScrollReveal>
          
          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {[
              {
                title: "Lead Generation Automation",
                description: "Automate lead capture, qualification, and follow-up processes to never miss a potential customer.",
                icon: <Users className="h-8 w-8 text-purple-400" />,
                features: ["Form submissions", "Lead scoring", "Email sequences", "CRM integration"]
              },
              {
                title: "Email Marketing Automation",
                description: "Create personalized email campaigns that nurture leads and drive conversions automatically.",
                icon: <Mail className="h-8 w-8 text-purple-400" />,
                features: ["Welcome sequences", "Abandoned cart emails", "Newsletter automation", "A/B testing"]
              },
              {
                title: "Customer Support Chatbots",
                description: "Deploy intelligent chatbots that provide instant support and handle common inquiries 24/7.",
                icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
                features: ["FAQ handling", "Ticket creation", "Live chat handoff", "Multi-language support"]
              },
              {
                title: "Social Media Automation",
                description: "Automate your social media presence with scheduled posts and engagement workflows.",
                icon: <TrendingUp className="h-8 w-8 text-purple-400" />,
                features: ["Post scheduling", "Content curation", "Engagement tracking", "Analytics reporting"]
              },
              {
                title: "Data Collection & Reporting",
                description: "Automate data collection from multiple sources and generate comprehensive reports.",
                icon: <BarChart className="h-8 w-8 text-purple-400" />,
                features: ["Data aggregation", "Report generation", "Dashboard creation", "Alert systems"]
              },
              {
                title: "E-commerce Automation",
                description: "Streamline your online store operations with automated inventory and order management.",
                icon: <ShoppingCart className="h-8 w-8 text-purple-400" />,
                features: ["Order processing", "Inventory updates", "Customer notifications", "Review requests"]
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

      {/* Chatbot Development */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-4xl font-bold font-display mb-6">Intelligent Chatbot Development</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Create AI-powered chatbots that engage customers, answer questions, and drive conversions 
                across your website and social media platforms.
              </p>
              <div className="space-y-4">
                {[
                  "Natural language processing for human-like conversations",
                  "Integration with your existing CRM and support systems",
                  "Multi-platform deployment (website, Facebook, WhatsApp)",
                  "Custom training on your business knowledge",
                  "Analytics and performance tracking"
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
                    <Globe className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20">
                    <MessageSquare className="h-12 w-12 text-purple-400" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/20">
                    <Bot className="h-12 w-12 text-purple-400" />
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
            <h2 className="text-4xl font-bold font-display mb-4">Our Automation Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A streamlined process that gets your automation up and running quickly
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {[
              {
                step: "01",
                title: "Discovery & Analysis",
                description: "We analyze your current workflows and identify automation opportunities for maximum impact.",
                duration: "3-5 days"
              },
              {
                step: "02",
                title: "Strategy & Design",
                description: "We design the automation workflow and create a detailed implementation plan.",
                duration: "2-3 days"
              },
              {
                step: "03",
                title: "Implementation",
                description: "We build and configure your automation workflows using the best platforms for your needs.",
                duration: "5-10 days"
              },
              {
                step: "04",
                title: "Testing & Launch",
                description: "We thoroughly test your automation and provide training for your team.",
                duration: "2-3 days"
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

      {/* Ready to Automate and Innovate */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <ScrollReveal className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Ready to Automate Your Workflows?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how automation can streamline your business processes and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton size="lg" className="btn-primary text-lg px-8 py-4 animate-glow">
              Schedule Automation Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
            <MagneticButton size="lg" variant="outline" className="btn-outline text-lg px-8 py-4">
              Get Instant Quote
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
              Don't just take our word for it – hear from businesses we've helped streamline with automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                rating: 5,
                text: "Digital Linked automated our lead generation process and our conversion rate increased by 35%. The chatbot handles 80% of customer inquiries automatically!",
                author: "Maria Santos",
                company: "TechGrowth Marketing",
                project: "Lead Generation Automation"
              },
              {
                rating: 5,
                text: "The automation workflows they built save us 15 hours per week. Our team can now focus on high-value tasks instead of repetitive manual work.",
                author: "David Chen",
                company: "E-commerce Solutions",
                project: "Workflow Automation"
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
              Get answers to the most common questions about our automation services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the typical timeline for an automation project?",
                answer: "Automation project timelines vary based on complexity. Simple workflows can be set up in 1-2 weeks, while complex chatbot development may take 3-4 weeks. We'll provide a detailed timeline during our consultation."
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer: "Yes! We offer ongoing support packages including workflow monitoring, updates, troubleshooting, and optimization. We can also provide training for your team to manage simple changes."
              },
              {
                question: "Can you integrate with my existing business systems?",
                answer: "Absolutely! We specialize in integrating automation workflows with your existing CRM, email marketing platforms, social media accounts, and other business tools."
              },
              {
                question: "What makes you different from other automation agencies?",
                answer: "We focus on practical, results-driven automation that saves time and money. We don't over-engineer solutions – we build what works for your specific business needs."
              },
              {
                question: "How do you measure the success of automation projects?",
                answer: "We measure success through time savings, efficiency gains, cost reductions, and specific metrics like increased conversion rates, faster response times, and improved customer satisfaction."
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
            <h2 className="text-4xl font-bold font-display mb-4">Learn More About Automation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends and insights in workflow automation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Top 5 Workflow Automation Trends for 2024",
                description: "Discover the latest trends shaping the world of workflow automation and how your business can benefit from them.",
                readTime: "5 min read"
              },
              {
                title: "Maximizing ROI with Business Automation",
                description: "Learn strategies to ensure your investment in automation delivers maximum returns for your business.",
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
