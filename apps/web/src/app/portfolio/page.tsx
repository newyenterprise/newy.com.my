import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@digitallinked/ui";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Calendar, Users, Zap, Globe, Smartphone, Brain, TrendingUp } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="gradient-text">Our Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover a selection of projects that demonstrate our commitment to quality, 
              innovation, and delivering results across diverse digital landscapes.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Coming Soon</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're currently working on some amazing projects. Check back 
            soon to see our latest work!
          </p>
          <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
            <Link href="/contact">Let's Work Together</Link>
          </Button>
        </div>
      </section>

      {/* Featured Projects Preview (Static for now) */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Here's a preview of the types of projects we work on. Full case studies coming soon!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform Redesign",
                description: "Complete redesign and development of a modern e-commerce platform with enhanced user experience.",
                type: "Website Development",
                technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                status: "Completed",
                icon: Globe,
                results: ["150% increase in conversions", "40% reduction in bounce rate"]
              },
              {
                title: "AI-Powered Customer Service Bot",
                description: "Development of an intelligent chatbot system with natural language processing capabilities.",
                type: "AI Automation",
                technologies: ["Python", "TensorFlow", "OpenAI API", "Node.js"],
                status: "Completed",
                icon: Brain,
                results: ["95% accuracy rate", "24/7 customer support"]
              },
              {
                title: "Mobile Fitness Tracking App",
                description: "Cross-platform mobile application for fitness tracking with social features.",
                type: "App Development",
                technologies: ["React Native", "Firebase", "Node.js", "MongoDB"],
                status: "Completed",
                icon: Smartphone,
                results: ["50k+ downloads", "4.8 app store rating"]
              },
              {
                title: "Digital Marketing Campaign Automation",
                description: "Comprehensive marketing automation system that increased lead generation by 300%.",
                type: "Digital Marketing",
                technologies: ["HubSpot", "Google Analytics", "Facebook Ads", "Python"],
                status: "Completed",
                icon: TrendingUp,
                results: ["300% increase in leads", "250% ROI improvement"]
              }
            ].map((project, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <project.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                  <Badge variant="outline" className="w-fit mt-2 border-purple-500/30 text-purple-300">
                    {project.type}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Key Results:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {project.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              These are just a few examples of our work. Full case studies with detailed breakdowns, 
              client testimonials, and project insights will be available soon.
            </p>
            <Button variant="outline" className="btn-outline" asChild>
              <Link href="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Types of Projects We Handle</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We work across various industries and project types, delivering tailored solutions 
              that meet specific business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Website Development",
                description: "Custom websites, e-commerce platforms, and web applications",
                icon: Globe,
                count: "15+ Projects"
              },
              {
                title: "Mobile Apps",
                description: "Native and cross-platform mobile applications",
                icon: Smartphone,
                count: "8+ Projects"
              },
              {
                title: "AI Automation",
                description: "Intelligent automation solutions and AI integrations",
                icon: Brain,
                count: "12+ Projects"
              },
              {
                title: "Digital Marketing",
                description: "Comprehensive marketing campaigns and strategies",
                icon: TrendingUp,
                count: "20+ Campaigns"
              }
            ].map((type, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border-purple-500/20 hover:border-purple-500/40">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {type.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We have experience working with clients across various industries, 
              bringing specialized knowledge and tailored solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              "Real Estate",
              "E-commerce", 
              "Healthcare",
              "Education",
              "Startups"
            ].map((industry, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                  <Users className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="font-semibold">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to life and deliver 
            exceptional results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8 py-4 animate-glow" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-outline text-lg px-8 py-4">
              Get Instant Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
