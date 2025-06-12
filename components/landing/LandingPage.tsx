"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, ChevronRight, FileText, LogIn, Menu, Video, X } from 'lucide-react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Animation refs for each section
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl">Learner</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href={'/dashboard'}>
            <Button variant="outline" size="sm" className="ml-4 group">
              <LogIn className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              Login
            </Button>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                href="#how-it-works" 
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#features" 
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#testimonials" 
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link href={'/dashboard'}>
              <Button variant="outline" size="sm" className="w-full justify-center">
              
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative overflow-hidden py-20 md:py-32"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)`,
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-primary/10"
                  style={{
                    width: `${Math.random() * 300 + 50}px`,
                    height: `${Math.random() * 300 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `translateY(${scrollY * (Math.random() * 0.2)}px)`,
                    opacity: Math.random() * 0.5 + 0.1,
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center space-y-8"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold tracking-tight"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                Unlock Your Learning Potential
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.8,
                      delay: 0.2,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                From onboarding to personalized study topics, interactive tests, and engaging video lessons – experience education reimagined.
              </motion.p>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.8,
                      delay: 0.4,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                <Link href={'/dashboard'}>
                <Button size="lg" className="mt-8 group">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Animated shapes */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none" 
              className="w-full h-16 md:h-24"
              fill="hsl(var(--background))"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
            </svg>
          </div>
        </section>

        {/* How It Works Section */}
        <section 
          id="how-it-works" 
          ref={howItWorksRef}
          className="py-20 md:py-32"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              animate={howItWorksInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our streamlined learning process guides you from start to finish
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-5 gap-8 relative"
              initial="hidden"
              animate={howItWorksInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {/* Connection lines */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
              
              {/* Step 1 */}
              <motion.div 
                className="relative z-10 flex flex-col items-center text-center"
                variants={stepVariants}
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Onboarding</h3>
                <p className="text-sm text-muted-foreground">
                  Provide your details and learning preferences
                </p>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                className="relative z-10 flex flex-col items-center text-center"
                variants={stepVariants}
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Personalized Topics</h3>
                <p className="text-sm text-muted-foreground">
                  Get a curated list of study topics based on your inputs
                </p>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                className="relative z-10 flex flex-col items-center text-center"
                variants={stepVariants}
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Entrance Test</h3>
                <p className="text-sm text-muted-foreground">
                  Take a short test to assess your current knowledge
                </p>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div 
                className="relative z-10 flex flex-col items-center text-center"
                variants={stepVariants}
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Video Lessons</h3>
                <p className="text-sm text-muted-foreground">
                  Watch engaging videos with interactive captions
                </p>
              </motion.div>
              
              {/* Step 5 */}
              <motion.div 
                className="relative z-10 flex flex-col items-center text-center"
                variants={stepVariants}
              >
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-xl font-bold">5</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Final Exam</h3>
                <p className="text-sm text-muted-foreground">
                  AI-generated questions from video content
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button variant="outline" size="lg">
                Learn More About Our Process
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          id="features" 
          ref={featuresRef}
          className="py-20 md:py-32 bg-muted/30"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover what makes our learning platform unique
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {/* Feature 1 */}
              <motion.div 
                className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Learning Paths</h3>
                <p className="text-muted-foreground">
                  Customized study plans based on your goals, preferences, and skill level
                </p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Tests</h3>
                <p className="text-muted-foreground">
                  Engaging assessments that adapt to your knowledge level and learning pace
                </p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Video Lessons</h3>
                <p className="text-muted-foreground">
                  High-quality video content with interactive captions and bookmarking
                </p>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div 
                className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Generated Exams</h3>
                <p className="text-muted-foreground">
                  Intelligent questions derived from video content using advanced AI
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
     

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Ready to Transform Your Learning Experience?
              </motion.h2>
              
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join thousands of learners who have accelerated their education journey with our platform.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                 <Link href={'/dashboard'}>
                <Button size="lg" className="group">
                  Get Started Now
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                 </Link>
                <Button variant="outline" size="lg">
                  Schedule a Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="font-bold text-xl">Learner</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Transforming education through personalized learning experiences and cutting-edge technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Learner. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
