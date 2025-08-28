import { NextRequest, NextResponse } from 'next/server';

// Knowledge base for Digital Linked services
const KNOWLEDGE_BASE = {
  services: {
    website: {
      description: "Custom website development including responsive design, e-commerce solutions, and content management systems",
      features: ["Responsive Design", "SEO Optimization", "E-commerce Integration", "Content Management", "Performance Optimization"],
      process: ["Discovery & Planning", "Design & Prototyping", "Development", "Testing & QA", "Launch & Support"],
      pricing: "Starting from $790 AUD for basic websites, $2,500 for business sites, $5,500+ for e-commerce",
      timeline: "2-8 weeks depending on complexity",
      technologies: ["React", "Next.js", "WordPress", "Shopify", "Custom CMS"]
    },
    app: {
      description: "Mobile app development for iOS and Android platforms, including cross-platform solutions",
      features: ["Native iOS/Android", "Cross-platform (React Native)", "Push Notifications", "Offline Capability", "App Store Deployment"],
      process: ["Requirements Analysis", "UI/UX Design", "Development", "Testing", "App Store Submission"],
      pricing: "Starting from $4,500 AUD for basic apps, $12,000 for business apps, $25,000+ for complex apps",
      timeline: "6-20 weeks depending on complexity",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
    },
    ai: {
      description: "AI automation solutions to streamline business processes and improve efficiency",
      features: ["Process Automation", "Chatbot Integration", "Data Analysis", "Predictive Analytics", "Custom AI Solutions"],
      process: ["Process Assessment", "Solution Design", "Development", "Integration", "Training & Support"],
      pricing: "Starting from $1,200 AUD for chatbots, $3,500 for process automation, $8,000+ for custom AI",
      timeline: "2-12 weeks depending on complexity",
      technologies: ["Python", "TensorFlow", "OpenAI API", "Custom ML Models", "API Integrations"]
    },
    marketing: {
      description: "Digital marketing services including SEO, PPC, social media, and content marketing",
      features: ["SEO Optimization", "PPC Management", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
      process: ["Strategy Development", "Implementation", "Monitoring", "Optimization", "Reporting"],
      pricing: "Starting from $650 AUD/month for basic SEO, $1,200/month for full marketing packages",
      timeline: "Ongoing with initial setup in 2-3 weeks",
      technologies: ["Google Analytics", "Google Ads", "Facebook Ads", "SEO Tools", "Social Media Platforms"]
    }
  },
  company: {
    name: "Digital Linked",
    email: "hello@digitallinked.com.au",
    phone: "0406 612 824",
    address: "Newcastle, NSW, Australia",
    hours: "Monday-Friday 9AM-6PM",
    website: "https://digitallinked.com.au",
    portfolio: "https://digitallinked.com.au/portfolio",
    founded: "2023",
    team: "Experienced developers, designers, and digital strategists"
  }
};

// Conversation context tracking
interface ConversationContext {
  interestedService?: string;
  budget?: string;
  timeline?: string;
  projectType?: string;
  industry?: string;
  hasAskedAboutPricing?: boolean;
  hasAskedAboutProcess?: boolean;
  hasAskedAboutContact?: boolean;
}

// Timeout wrapper for API calls
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ]);
}

// Try to use Gemini if available, otherwise fall back to custom system
async function getAIResponse(message: string, conversationHistory: any[], context: ConversationContext): Promise<{ response: string; updatedContext: ConversationContext }> {
  // Use the provided Gemini API key
  const geminiApiKey = "AIzaSyCUlmtWR4jvL1VpWBgQYWkn7TtrdjA1zy8";
  
  if (geminiApiKey) {
    try {
      console.log('Attempting to use Gemini AI...');
      
      // Use Google Gemini Pro with timeout
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Prepare conversation for Gemini
      const systemPrompt = `You are Digital Linked's friendly AI assistant. Keep responses SHORT (under 80 words), conversational, and human-like.

SERVICES & PRICING:
• Website Development: ${KNOWLEDGE_BASE.services.website.pricing} (${KNOWLEDGE_BASE.services.website.timeline})
• Mobile Apps: ${KNOWLEDGE_BASE.services.app.pricing} (${KNOWLEDGE_BASE.services.app.timeline})  
• AI Automation: ${KNOWLEDGE_BASE.services.ai.pricing} (${KNOWLEDGE_BASE.services.ai.timeline})
• Digital Marketing: ${KNOWLEDGE_BASE.services.marketing.pricing}

CONTACT: ${KNOWLEDGE_BASE.company.email} | ${KNOWLEDGE_BASE.company.phone}
PORTFOLIO: ${KNOWLEDGE_BASE.company.portfolio}
WEBSITE: ${KNOWLEDGE_BASE.company.website}

RESPONSE STYLE:
- Keep under 80 words
- Be friendly & conversational (like texting a friend)
- Ask ONE follow-up question
- Offer 2-3 clickable options using bullet points (•)
- Use 1-2 emojis max 😊
- NEVER use placeholder text like [insert link here] - always use actual URLs provided above
- When mentioning portfolio, use: https://digitallinked.com.au/portfolio
- For contact options, format as: "Email us: hello@digitallinked.com.au" and "Call us: 0406 612 824"
- Include contact info in clickable options when users ask about contacting or quotes

OPTION FORMAT:
"Brief answer here!

What interests you most?
• Website quote
• Mobile app info  
• Get pricing details"

Context: ${conversationHistory.map(msg => `${msg.sender}: ${msg.content}`).join('\n')}

User's current question: ${message}`;

      console.log('Sending request to Gemini AI...');
      const result = await withTimeout(model.generateContent(systemPrompt), 10000); // 10 second timeout
      const aiResponse = result.response.text() || "I apologize, but I'm having trouble generating a response right now. Please try again or contact us directly.";
      
      console.log('Gemini AI response received successfully');
      console.log('Response length:', aiResponse.length);

      // Update context based on the message
      const updatedContext = { ...context };
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
        updatedContext.interestedService = 'website';
      } else if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
        updatedContext.interestedService = 'app';
      } else if (lowerMessage.includes('ai') || lowerMessage.includes('automation')) {
        updatedContext.interestedService = 'ai';
      } else if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('ppc')) {
        updatedContext.interestedService = 'marketing';
      }

      return { response: aiResponse, updatedContext };
    } catch (error) {
      console.error('Gemini API error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        name: error instanceof Error ? error.name : 'Unknown'
      });
      // Fall back to custom system
    }
  }

  console.log('Using fallback custom system...');
  // Fallback to custom system
  return generateCustomResponse(message, conversationHistory, context);
}

// Enhanced response generation with context awareness (fallback system)
function generateCustomResponse(userMessage: string, conversationHistory: any[] = [], context: ConversationContext = {}): { response: string; updatedContext: ConversationContext } {
  const lowerMessage = userMessage.toLowerCase();
  const updatedContext = { ...context };
  
  // Extract context from conversation history
  const recentMessages = conversationHistory.slice(-5);
  const hasDiscussedService = recentMessages.some(msg => 
    msg.sender === 'user' && (
      msg.content.toLowerCase().includes('website') ||
      msg.content.toLowerCase().includes('app') ||
      msg.content.toLowerCase().includes('ai') ||
      msg.content.toLowerCase().includes('marketing')
    )
  );

  // Update context based on current message
  if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
    updatedContext.interestedService = 'website';
  } else if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
    updatedContext.interestedService = 'app';
  } else if (lowerMessage.includes('ai') || lowerMessage.includes('automation')) {
    updatedContext.interestedService = 'ai';
  } else if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('ppc')) {
    updatedContext.interestedService = 'marketing';
  }

  // Budget indicators
  if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    updatedContext.hasAskedAboutPricing = true;
  }

  // Timeline indicators
  if (lowerMessage.includes('timeline') || lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
    updatedContext.hasAskedAboutProcess = true;
  }

  // Contact indicators
  if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
    updatedContext.hasAskedAboutContact = true;
  }

  // Service-specific inquiries with enhanced responses
  if (lowerMessage.includes('website') || lowerMessage.includes('web development')) {
    const service = KNOWLEDGE_BASE.services.website;
    return {
      response: `Great question about our website development services! ${service.description}

Key features we offer:
${service.features.map(f => `• ${f}`).join('\n')}

Our process:
${service.process.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Timeline: ${service.timeline}
Pricing: ${service.pricing}

Technologies we use: ${service.technologies.join(', ')}

Would you like to discuss your specific website needs or get a detailed quote?`,
      updatedContext
    };
  }

  if (lowerMessage.includes('app') || lowerMessage.includes('mobile') || lowerMessage.includes('ios') || lowerMessage.includes('android')) {
    const service = KNOWLEDGE_BASE.services.app;
    return {
      response: `Excellent! Our mobile app development services are comprehensive and tailored to your needs.

${service.description}

What we deliver:
${service.features.map(f => `• ${f}`).join('\n')}

Our development process:
${service.process.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Timeline: ${service.timeline}
Investment: ${service.pricing}

Technologies: ${service.technologies.join(', ')}

What type of app are you envisioning? I can help you understand the best approach for your project.`,
      updatedContext
    };
  }

  if (lowerMessage.includes('ai') || lowerMessage.includes('automation') || lowerMessage.includes('artificial intelligence')) {
    const service = KNOWLEDGE_BASE.services.ai;
    return {
      response: `AI automation is one of our specialties! We help businesses transform their operations with intelligent solutions.

${service.description}

Our AI capabilities:
${service.features.map(f => `• ${f}`).join('\n')}

Implementation approach:
${service.process.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Timeline: ${service.timeline}
Pricing: ${service.pricing}

Technologies: ${service.technologies.join(', ')}

What specific processes or workflows would you like to automate? I can help identify opportunities for AI integration.`,
      updatedContext
    };
  }

  if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('ppc') || lowerMessage.includes('social media')) {
    const service = KNOWLEDGE_BASE.services.marketing;
    return {
      response: `Perfect! Our digital marketing services are designed to drive real results and grow your business.

${service.description}

Our marketing services include:
${service.features.map(f => `• ${f}`).join('\n')}

Our proven process:
${service.process.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Timeline: ${service.timeline}
Investment: ${service.pricing}

Technologies: ${service.technologies.join(', ')}

What are your primary marketing goals? Are you looking to increase brand awareness, generate leads, or drive sales?`,
      updatedContext
    };
  }

  // Pricing and quote inquiries with context awareness
  if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
    let response = `I'd be happy to help you get a quote! Our pricing varies based on project complexity and requirements.

Here's a general overview:
• Website Development: Starting from $2,000 AUD
• Mobile App Development: Starting from $5,000 AUD  
• AI Automation: Custom pricing based on requirements
• Digital Marketing: Starting from $1,500 AUD/month`;

    if (updatedContext.interestedService) {
      const service = KNOWLEDGE_BASE.services[updatedContext.interestedService as keyof typeof KNOWLEDGE_BASE.services];
      response += `\n\nFor ${updatedContext.interestedService} specifically: ${service.pricing}`;
    }

    response += `\n\nFor the most accurate quote, I recommend:
1. Using our instant quote form for a quick estimate
2. Booking a free strategy call for detailed consultation
3. Sharing your specific requirements so I can provide more targeted pricing

What type of project are you planning? I can guide you to the best option.`;

    return { response, updatedContext };
  }

  // Contact information with context
  if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    const company = KNOWLEDGE_BASE.company;
    let response = `Here's how you can reach us:

📧 Email: ${company.email}
📞 Phone: ${company.phone}
📍 Address: ${company.address}
🕒 Hours: ${company.hours}

You can also:
• Book a free strategy call through our website
• Use our instant quote form for quick estimates
• Schedule a consultation to discuss your project in detail`;

    if (updatedContext.interestedService) {
      response += `\n\nSince you're interested in ${updatedContext.interestedService} services, I'd recommend booking a strategy call to discuss your specific needs in detail.`;
    }

    response += `\n\nWhat's the best way for you to connect?`;

    return { response, updatedContext };
  }

  // Project timeline inquiries
  if (lowerMessage.includes('timeline') || lowerMessage.includes('duration') || lowerMessage.includes('how long') || lowerMessage.includes('timeframe')) {
    let response = `Great question about project timelines! Here's what you can expect:

Website Development:
• Simple website: 2-4 weeks
• E-commerce site: 4-8 weeks
• Complex custom site: 8-12 weeks

Mobile App Development:
• Basic app: 6-10 weeks
• Complex app: 12-20 weeks
• Enterprise app: 20+ weeks

AI Automation:
• Simple automation: 2-4 weeks
• Complex AI solution: 6-12 weeks

Digital Marketing:
• Setup and initial strategy: 2-3 weeks
• Ongoing optimization and management

Timelines can vary based on project complexity and requirements.`;

    if (updatedContext.interestedService) {
      const service = KNOWLEDGE_BASE.services[updatedContext.interestedService as keyof typeof KNOWLEDGE_BASE.services];
      response += `\n\nFor your ${updatedContext.interestedService} project: ${service.timeline}`;
    }

    response += `\n\nWould you like to discuss your specific project timeline?`;

    return { response, updatedContext };
  }

  // Technology stack inquiries
  if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('framework') || lowerMessage.includes('platform')) {
    let response = `We use modern, reliable technologies to build robust solutions:

Web Development:
• Frontend: React, Next.js, Vue.js
• Backend: Node.js, Python, PHP
• Databases: PostgreSQL, MongoDB, MySQL
• CMS: WordPress, Strapi, Custom solutions

Mobile Development:
• Native: Swift (iOS), Kotlin (Android)
• Cross-platform: React Native, Flutter
• Backend: Node.js, Firebase, AWS

AI & Automation:
• Python, TensorFlow, PyTorch
• Natural Language Processing
• Machine Learning models
• API integrations

We choose the best technology stack based on your specific requirements and goals.`;

    if (updatedContext.interestedService) {
      const service = KNOWLEDGE_BASE.services[updatedContext.interestedService as keyof typeof KNOWLEDGE_BASE.services];
      response += `\n\nFor ${updatedContext.interestedService} projects, we typically use: ${service.technologies.join(', ')}`;
    }

    response += `\n\nWhat type of project are you considering?`;

    return { response, updatedContext };
  }

  // Portfolio and experience inquiries
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('projects')) {
    return {
      response: `We have extensive experience across various industries and project types:

Industries we serve:
• E-commerce & Retail
• Healthcare & Medical
• Education & Training
• Real Estate
• Finance & Banking
• Startups & SaaS

Project examples:
• Custom e-commerce platforms
• Healthcare management systems
• Educational learning platforms
• Real estate listing websites
• AI-powered business automation
• Mobile apps for various industries

You can view our portfolio at ${KNOWLEDGE_BASE.company.website}/portfolio to see examples of our work.

What industry or type of project interests you?`,
      updatedContext
    };
  }

  // Greeting responses with context awareness
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
    let response = `Hello! Welcome to ${KNOWLEDGE_BASE.company.name}. I'm your AI assistant, here to help you learn about our services and answer any questions you might have.

We specialize in:
• Website Development
• Mobile App Development  
• AI Automation
• Digital Marketing`;

    if (hasDiscussedService) {
      response += `\n\nI see we've been discussing our services. Is there anything specific you'd like to know more about?`;
    } else {
      response += `\n\nWhat can I help you with today? Feel free to ask about our services, pricing, process, or anything else!`;
    }

    return { response, updatedContext };
  }

  // Default response with context awareness
  if (hasDiscussedService) {
    return {
      response: `Thank you for your question! Based on our conversation, I can provide more specific information about any of our services.

Would you like to:
• Get a detailed quote for your project?
• Schedule a consultation call?
• Learn more about our development process?
• Discuss specific requirements?

Just let me know what would be most helpful!`,
      updatedContext
    };
  }

  return {
    response: `Thank you for reaching out to ${KNOWLEDGE_BASE.company.name}! I'm here to help you understand our services and find the best solution for your needs.

Our core services include:
• Website Development - Custom, responsive websites that convert
• Mobile App Development - Native and cross-platform applications
• AI Automation - Intelligent solutions to streamline your business
• Digital Marketing - Data-driven strategies to grow your presence

What would you like to learn more about? I can provide detailed information about any of our services, pricing, or process.`,
    updatedContext
  };
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, context = {} } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    console.log('Chat API called with message:', message.substring(0, 50) + '...');

    // Generate AI response (Gemini if available, custom system as fallback)
    const { response, updatedContext } = await getAIResponse(message, conversationHistory, context);

    console.log('Response generated successfully, length:', response.length);

    // Simulate processing time for more realistic experience
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    return NextResponse.json({
      response,
      context: updatedContext,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
