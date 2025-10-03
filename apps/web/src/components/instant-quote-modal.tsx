"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@newy/ui";
import { X, ArrowRight, ArrowLeft, CheckCircle, Sparkles, DollarSign, Clock, Star } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/auth-context";

interface InstantQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProjectType = 'website' | 'apps' | 'ai_automation' | 'marketing';
type Complexity = 'basic' | 'standard' | 'advanced' | 'enterprise';

interface FormData {
  projectType: ProjectType | '';
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  complexity: Complexity | '';
}

interface QuoteEstimate {
  minPrice: number;
  maxPrice: number;
  duration: string;
  features: string[];
  complexity: Complexity;
}

export function InstantQuoteModal({ isOpen, onClose }: InstantQuoteModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectDescription: '',
    budgetRange: '',
    timeline: '',
    complexity: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteEstimate, setQuoteEstimate] = useState<QuoteEstimate | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const projectTypes = [
    { id: 'website', label: 'Website', description: 'Custom websites and web applications' },
    { id: 'apps', label: 'Apps', description: 'Mobile and web applications' },
    { id: 'ai_automation', label: 'AI Automation', description: 'Intelligent automation solutions' },
    { id: 'marketing', label: 'Marketing', description: 'Digital marketing campaigns' }
  ];

  const complexityLevels = [
    { 
      id: 'basic', 
      label: 'Basic', 
      description: 'Simple, straightforward project',
      icon: '⭐'
    },
    { 
      id: 'standard', 
      label: 'Standard', 
      description: 'Moderate complexity with custom features',
      icon: '⭐⭐'
    },
    { 
      id: 'advanced', 
      label: 'Advanced', 
      description: 'Complex features and integrations',
      icon: '⭐⭐⭐'
    },
    { 
      id: 'enterprise', 
      label: 'Enterprise', 
      description: 'Large-scale, multi-platform solution',
      icon: '⭐⭐⭐⭐'
    }
  ];

  const budgetRanges = [
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+'
  ];

  const timelines = [
    '1-2 months',
    '3-4 months',
    '5-6 months',
    '6+ months',
    'Flexible'
  ];

  // Pricing logic based on project type and complexity
  const calculateQuote = (): QuoteEstimate => {
    const { projectType, complexity, timeline } = formData;
    
    let basePrice = 0;
    let duration = '';
    let features: string[] = [];

    // Base pricing by project type
    switch (projectType) {
      case 'website':
        basePrice = 8000;
        features = [
          'Responsive Design',
          'SEO Optimization',
          'Content Management System',
          'Contact Forms',
          'Analytics Integration'
        ];
        break;
      case 'apps':
        basePrice = 15000;
        features = [
          'Cross-platform Development',
          'User Authentication',
          'Push Notifications',
          'Offline Functionality',
          'App Store Deployment'
        ];
        break;
      case 'ai_automation':
        basePrice = 12000;
        features = [
          'AI Integration',
          'Process Automation',
          'Data Analytics',
          'API Development',
          'Custom Algorithms'
        ];
        break;
      case 'marketing':
        basePrice = 6000;
        features = [
          'Strategy Development',
          'Content Creation',
          'Social Media Management',
          'PPC Campaigns',
          'Performance Tracking'
        ];
        break;
      default:
        basePrice = 8000;
    }

    // Complexity multiplier
    let complexityMultiplier = 1;
    switch (complexity) {
      case 'basic':
        complexityMultiplier = 0.7;
        break;
      case 'standard':
        complexityMultiplier = 1.0;
        break;
      case 'advanced':
        complexityMultiplier = 1.5;
        break;
      case 'enterprise':
        complexityMultiplier = 2.5;
        break;
    }

    // Timeline adjustment
    let timelineMultiplier = 1;
    switch (timeline) {
      case '1-2 months':
        timelineMultiplier = 1.2; // Rush fee
        break;
      case '3-4 months':
        timelineMultiplier = 1.0;
        break;
      case '5-6 months':
        timelineMultiplier = 0.9; // Discount for longer timeline
        break;
      case '6+ months':
        timelineMultiplier = 0.8;
        break;
      case 'Flexible':
        timelineMultiplier = 0.9;
        break;
    }

    const adjustedPrice = basePrice * complexityMultiplier * timelineMultiplier;
    const minPrice = Math.round(adjustedPrice * 0.8);
    const maxPrice = Math.round(adjustedPrice * 1.2);

    // Duration calculation
    switch (complexity) {
      case 'basic':
        duration = '2-4 weeks';
        break;
      case 'standard':
        duration = '1-2 months';
        break;
      case 'advanced':
        duration = '2-3 months';
        break;
      case 'enterprise':
        duration = '3-6 months';
        break;
    }

    return {
      minPrice,
      maxPrice,
      duration,
      features,
      complexity: complexity as Complexity
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProjectTypeSelect = (type: ProjectType) => {
    setFormData(prev => ({
      ...prev,
      projectType: type
    }));
  };

  const handleComplexitySelect = (complexity: Complexity) => {
    setFormData(prev => ({
      ...prev,
      complexity
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      if (step === 3) {
        // Calculate quote before moving to final step
        const estimate = calculateQuote();
        setQuoteEstimate(estimate);
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error: supabaseError } = await supabase
        .from('quotes')
        .insert([
          {
            user_id: user?.id || null,
            project_type: formData.projectType,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            project_description: formData.projectDescription,
            budget_range: formData.budgetRange || null,
            timeline: formData.timeline || null,
            complexity: formData.complexity || null,
            estimated_price_min: quoteEstimate?.minPrice || null,
            estimated_price_max: quoteEstimate?.maxPrice || null,
            estimated_duration: quoteEstimate?.duration || null,
            status: 'pending'
          }
        ]);

      if (supabaseError) {
        console.error('Error submitting quote to database:', supabaseError);
      }

      // Send email notification
      try {
        console.log('Sending email notification...');
        const emailData = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          projectDescription: formData.projectDescription,
          complexity: formData.complexity,
          estimatedPriceMin: quoteEstimate?.minPrice,
          estimatedPriceMax: quoteEstimate?.maxPrice,
          estimatedDuration: quoteEstimate?.duration,
          features: quoteEstimate?.features
        };
        
        console.log('Email data:', emailData);
        
        const emailResponse = await fetch('/api/send-quote-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        const emailResult = await emailResponse.json();
        console.log('Email response:', emailResult);

        if (!emailResponse.ok) {
          console.error('Error sending email notification:', emailResult);
        } else {
          console.log('Email sent successfully!');
        }
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setStep(1);
        setFormData({
          projectType: '',
          fullName: '',
          email: '',
          phone: '',
          company: '',
          projectDescription: '',
          budgetRange: '',
          timeline: '',
          complexity: ''
        });
        setQuoteEstimate(null);
        onClose();
      }, 5000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setIsSubmitting(false);
      // In a real app, you'd show an error message to the user
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      projectType: '',
      fullName: '',
      email: '',
      phone: '',
      company: '',
      projectDescription: '',
      budgetRange: '',
      timeline: '',
      complexity: ''
    });
    setIsSubmitted(false);
    setQuoteEstimate(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-background border border-purple-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform-none"
      >
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-display mb-4">Quote Request Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest! We'll review your requirements and get back to you 
              within 24 hours with a detailed quote. We've also sent a copy to your email.
            </p>
            <Button onClick={handleClose} className="btn-primary">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Instant Project Quote</h2>
                  <p className="text-sm text-muted-foreground">
                    {step === 1 && 'Project Type - What type of project are you looking for?'}
                    {step === 2 && 'Contact Information - Tell us about yourself'}
                    {step === 3 && 'Complexity - How complex is your project?'}
                    {step === 4 && 'Your Instant Quote - Pricing & Timeline'}
                    (Step {step} of 4)
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select a project type:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => handleProjectTypeSelect(type.id as ProjectType)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.projectType === type.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-purple-500/20 hover:border-purple-500/40'
                        }`}
                      >
                        <h4 className="font-semibold mb-1">{type.label}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button 
                      onClick={handleNext} 
                      disabled={!formData.projectType}
                      className="btn-primary"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Tell us about yourself:</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="john@example.com"
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company"
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Description *</label>
                      <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="Describe your project requirements..."
                        className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handleNext} 
                      disabled={!formData.fullName || !formData.email || !formData.projectDescription}
                      className="btn-primary"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select project complexity:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {complexityLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => handleComplexitySelect(level.id as Complexity)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          formData.complexity === level.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-purple-500/20 hover:border-purple-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{level.icon}</span>
                          <h4 className="font-semibold">{level.label}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handleNext} 
                      disabled={!formData.complexity}
                      className="btn-primary"
                    >
                      Get Instant Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && quoteEstimate && (
                <div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Your Instant Quote</h3>
                    <p className="text-muted-foreground">Based on your project requirements</p>
                  </div>

                  {/* Project Summary */}
                  <div className="bg-purple-500/10 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-2">Project Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <span className="ml-2 font-medium">{projectTypes.find(t => t.id === formData.projectType)?.label}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Complexity:</span>
                        <span className="ml-2 font-medium">{complexityLevels.find(c => c.id === formData.complexity)?.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold mb-2">Estimated Investment</h4>
                      <div className="text-3xl font-bold text-purple-500 mb-2">
                        ${quoteEstimate.minPrice.toLocaleString()} - ${quoteEstimate.maxPrice.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">USD</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-blue-500/10 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-semibold">Estimated Timeline</h4>
                        <p className="text-sm text-muted-foreground">{quoteEstimate.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">What's Included</h4>
                    <div className="space-y-2">
                      {quoteEstimate.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn-primary"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        'Request Detailed Quote'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

