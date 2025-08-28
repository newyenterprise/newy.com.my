import { Button } from "@digitallinked/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@digitallinked/ui";
import { ArrowRight, Users, Target, Award, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-foreground mb-6">
              About Digital Linked
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We are a passionate team of digital experts dedicated to transforming businesses 
              through innovative technology solutions and strategic digital growth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To empower businesses with cutting-edge digital solutions that drive growth, 
                enhance user experiences, and create lasting competitive advantages in the digital landscape.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                We believe that every business deserves access to world-class digital tools and strategies 
                that can transform their operations and accelerate their success.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="gradient-secondary rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20 animate-float">
              <div className="text-center space-y-6">
                <div className="relative">
                  <Users className="h-20 w-20 text-purple-400 mx-auto animate-pulse" />
                  <div className="absolute -top-2 -right-2 h-6 w-6 bg-pink-500 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-semibold gradient-text">Our Team</h3>
                <p className="text-muted-foreground">Passionate experts driving digital innovation</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">100+</div>
                    <div className="text-sm text-muted-foreground">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">500+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 pt-4">
                  <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do and shape how we deliver value to our clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We constantly explore new technologies and methodologies to deliver cutting-edge solutions that keep our clients ahead of the curve.",
              },
              {
                title: "Excellence",
                description: "We maintain the highest standards in every project, ensuring quality, reliability, and exceptional user experiences.",
              },
              {
                title: "Partnership",
                description: "We work closely with our clients as trusted partners, understanding their unique needs and goals to deliver tailored solutions.",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of experts brings together years of experience in web development, 
              mobile apps, AI automation, and digital marketing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Web Development",
                description: "Expert frontend and backend developers creating responsive, high-performance websites and web applications.",
              },
              {
                name: "Mobile Development",
                description: "Native and cross-platform mobile app specialists delivering intuitive user experiences across all devices.",
              },
              {
                name: "AI & Automation",
                description: "AI engineers and automation specialists streamlining processes and unlocking new efficiencies.",
              },
            ].map((team, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{team.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{team.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss how Digital Linked can help transform your business 
            and achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
