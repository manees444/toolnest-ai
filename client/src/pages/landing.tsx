import { useState, useEffect } from "react";
import { Link } from "wouter";
import { updatePageSEO, SEO_CONFIG } from "@/lib/seo";
import { 
  Brain, Shield, ArrowRight, CheckCircle, Clock, Lock, Zap, 
  FileText, Users, Sparkles, Moon, Sun, ExternalLink, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export default function Landing() {
  const { theme, toggleTheme } = useTheme();

  // Update SEO for homepage
  useEffect(() => {
    updatePageSEO(SEO_CONFIG.homepage.title, SEO_CONFIG.homepage.description);
  }, []);

  const tools = [
    {
      id: "therapist-ai",
      name: "Therapist AI – Session Summariser",
      description: "Instantly generate clinical session summaries and care plans from rough notes using AI.",
      category: "Mental Health",
      status: "live",
      href: "/tools/therapist-ai",
      icon: Brain,
      features: ["HIPAA-compliant design", "3 tone options", "Export to PDF/TXT", "No data storage"],
      keywords: "AI therapist tools, mental health session summariser, therapy note generator"
    }
  ];

  const comingSoonTools = [
    {
      name: "Educator AI – Lesson Planner",
      description: "Generate comprehensive lesson plans and learning objectives from topic outlines.",
      category: "Education",
      icon: FileText
    },
    {
      name: "Creator AI – Content Brief Generator", 
      description: "Transform ideas into detailed content briefs for articles, videos, and social media.",
      category: "Content Creation",
      icon: Sparkles
    },
    {
      name: "Coach AI – Session Notes Organizer",
      description: "Structure coaching session notes into actionable insights and progress tracking.",
      category: "Professional Coaching",
      icon: Users
    }
  ];

  return (
    <div className="bg-background min-h-screen font-sans">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ToolNest AI</h1>
                <p className="text-xs text-muted-foreground">Professional AI Tools</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            AI Tools Built for{" "}
            <span className="text-primary">Niche Professionals</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            A growing collection of privacy-first, time-saving tools for therapists, creators, 
            educators, and more — powered by Claude AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <a href="#tools">
                Explore AI Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              <span>No signup required • Privacy-first design</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Professional AI Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each tool is specifically designed for real professional workflows, focusing on 
              the AI tools for professionals that save time and improve work quality.
            </p>
          </div>

          {/* Live Tools */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {tools.map((tool) => (
              <div key={tool.id} className="card-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Live
                      </span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">{tool.name}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
                
                <div className="space-y-3 mb-6">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href={tool.href}>
                    Open Tool
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Coming Soon Tools */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              What's Coming Next
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonTools.map((tool, index) => (
                <div key={index} className="card-background rounded-xl p-6 shadow-sm opacity-75">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-muted text-muted-foreground p-2 rounded-lg">
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h4>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Our Tools Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every free therapist documentation app and professional tool follows the same 
              simple, privacy-first approach.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Paste Your Notes</h3>
              <p className="text-muted-foreground">
                Simply paste your rough notes, ideas, or content directly into the tool. 
                No formatting required.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">2. AI Generates</h3>
              <p className="text-muted-foreground">
                Claude AI processes your input and generates professional, polished content 
                tailored to your specific profession.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-muted text-muted-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Copy & Use</h3>
              <p className="text-muted-foreground">
                Export as PDF, copy to clipboard, or download as text. Use immediately in 
                your professional workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for professionals who need reliable, privacy-first AI tools for professionals 
              that integrate seamlessly into existing workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Logins Required</h3>
              <p className="text-sm text-muted-foreground">
                Start using any tool immediately. No accounts, no passwords, no friction.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Data Stored</h3>
              <p className="text-sm text-muted-foreground">
                Your content never touches our servers. Complete privacy and HIPAA-compliant design.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Designed for Real Work</h3>
              <p className="text-sm text-muted-foreground">
                Each tool solves specific professional challenges with industry-appropriate output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary text-primary-foreground p-1.5 rounded">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="font-semibold text-foreground">ToolNest AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional AI tools built for niche industries. Privacy-first, no-signup, 
                ready-to-use solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Available Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/tools/therapist-ai" className="hover:text-foreground transition-colors">
                    Therapist AI – Session Summariser
                  </Link>
                </li>
                <li className="text-muted-foreground/50">Educator AI – Coming Soon</li>
                <li className="text-muted-foreground/50">Creator AI – Coming Soon</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-muted text-xs rounded">AI therapist tools</span>
                <span className="px-2 py-1 bg-muted text-xs rounded">mental health session summariser</span>
                <span className="px-2 py-1 bg-muted text-xs rounded">therapy note generator</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>© 2025 ToolNest AI</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Privacy-First Architecture</span>
              </span>
            </div>
            <div className="mt-4 sm:mt-0 text-xs text-muted-foreground/70">
              Powered by Claude AI • No data stored • HIPAA-compliant design
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}