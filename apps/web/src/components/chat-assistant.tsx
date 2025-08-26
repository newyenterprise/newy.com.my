"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@digitallinked/ui";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am Digital Linked Assistant. How can I help you with our services or answer your questions about Digital Linked?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Website Services',
    'App Development', 
    'AI Automation',
    'Get a Quote'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAssistantResponse(message),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAssistantResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
      return "Great! We specialize in custom website development. We build beautiful, responsive websites that drive results. Would you like to know more about our web development process or get a quote for your project?";
    }
    
    if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
      return "Excellent! We develop both native and cross-platform mobile applications. Our apps are designed to engage users and drive business growth. What type of app are you considering?";
    }
    
    if (lowerMessage.includes('ai') || lowerMessage.includes('automation')) {
      return "Perfect! AI automation is one of our specialties. We help businesses streamline processes, reduce costs, and improve efficiency with intelligent automation solutions. What processes would you like to automate?";
    }
    
    if (lowerMessage.includes('marketing') || lowerMessage.includes('seo')) {
      return "Wonderful! Our digital marketing services help amplify your brand and drive measurable results. We offer SEO, PPC, social media marketing, and more. What are your marketing goals?";
    }
    
    if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "I'd be happy to help you get a quote! You can use our instant quote form for a quick estimate, or contact our team directly for a detailed consultation. What type of project are you planning?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
      return "You can reach us at hello@digitallinked.com.au or call us at +60138994478. Our office is located at 38, Jalan 3/24, Bandar Baru Bangi, Selangor. We're available Monday-Friday 9AM-6PM. How would you prefer to connect?";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello there! Welcome to Digital Linked. I'm here to help you learn about our services and answer any questions you might have. What can I assist you with today?";
    }
    
    return "Thank you for your question! I'd be happy to help you learn more about Digital Linked's services. We specialize in website development, app development, AI automation, and digital marketing. Is there a specific service you're interested in, or would you like to speak with our team directly?";
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg z-40 animate-pulse"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-background border border-purple-500/20 rounded-2xl shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Digital Linked Assistant</h3>
                <p className="text-xs text-muted-foreground">Online • Typically replies instantly</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-purple-500' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-3 w-3 text-white" />
                    ) : (
                      <Bot className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className={`px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-muted border border-purple-500/20'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                  <div className="px-3 py-2 bg-muted border border-purple-500/20 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-purple-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask something..."
                className="flex-1 px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-sm"
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
