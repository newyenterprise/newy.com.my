"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@digitallinked/ui";
import { X, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/auth-context";

interface InstantQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProjectType = 'website' | 'apps' | 'ai_automation' | 'marketing';

interface FormData {
  projectType: ProjectType | '';
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectDescription: string;
  budgetRange: string;
  timeline: string;
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
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    { id: 'website', label: 'Website', description: 'Custom websites and web applications' },
    { id: 'apps', label: 'Apps', description: 'Mobile and web applications' },
    { id: 'ai_automation', label: 'AI Automation', description: 'Intelligent automation solutions' },
    { id: 'marketing', label: 'Marketing', description: 'Digital marketing campaigns' }
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

  const handleNext = () => {
    if (step < 3) {
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
      const { error } = await supabase
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
            status: 'pending'
          }
        ]);

      if (error) {
        console.error('Error submitting quote:', error);
        // In a real app, you'd show an error message to the user
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
          timeline: ''
        });
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
      timeline: ''
    });
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-purple-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-display mb-4">Quote Request Submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest! We'll review your requirements and get back to you 
              within 24 hours with a detailed quote.
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
                    Project Type - What type of project are you looking for? (Step {step} of 3)
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
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      onClick={handleNext} 
                      disabled={!formData.fullName || !formData.email}
                      className="btn-primary"
                    >
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-lg font-semibold mb-4">Project details:</h3>
                  <div className="space-y-4">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Budget Range</label>
                        <select
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Timeline</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                        >
                          <option value="">Select timeline</option>
                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>{timeline}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.projectDescription}
                      className="btn-primary"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        'Get Quote'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
