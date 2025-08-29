"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@digitallinked/ui";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

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

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
     const [messages, setMessages] = useState<Message[]>([
     {
       id: '1',
       content: 'Hey there! 👋 I\'m AskLinked, your digital solutions expert. I can help you with quotes, pricing, and info about Digital Linked\'s services!\n\nWhat can I help you with today?\n• Website development quote\n• Mobile app pricing\n• AI automation info\n• Digital marketing services\n• Just browsing - tell me more!',
       sender: 'assistant',
       timestamp: new Date()
     }
   ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
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

  // Typing indicator effect
  useEffect(() => {
    if (isTyping) {
      const dots = ['', '.', '..', '...'];
      let index = 0;
      const interval = setInterval(() => {
        setTypingText(dots[index]);
        index = (index + 1) % dots.length;
      }, 500);
      return () => clearInterval(interval);
    } else {
      setTypingText('');
    }
  }, [isTyping]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

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
    setIsLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        sender: msg.sender,
        content: msg.content
      }));

      // Call AI API with context and timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: conversationHistory,
          context: conversationContext
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update conversation context
      if (data.context) {
        setConversationContext(data.context);
      }
      
      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat API error:', error);
      
      // Determine the type of error and provide appropriate fallback
      let fallbackMessage = "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to contact us directly at hello@digitallinked.com.au for immediate assistance.";
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          fallbackMessage = "I'm taking a bit longer than usual to respond. Please try again, or contact us directly at hello@digitallinked.com.au for immediate assistance.";
        } else if (error.message.includes('Failed to fetch')) {
          fallbackMessage = "I'm having trouble connecting to our servers. Please check your internet connection and try again, or contact us directly at hello@digitallinked.com.au.";
        }
      }
      
      // Add fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackMessage,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
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

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageWithOptions = (content: string) => {
    // Split content by bullet points to find options
    const parts = content.split('\n');
    const messageLines: string[] = [];
    const options: string[] = [];
    
    let foundOptions = false;
    
    for (const line of parts) {
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        foundOptions = true;
        const option = line.replace(/^[•\-]\s*/, '').trim();
        if (option) options.push(option);
      } else if (!foundOptions) {
        messageLines.push(line);
      } else if (line.trim() && !line.trim().startsWith('•') && !line.trim().startsWith('-')) {
        messageLines.push(line);
      }
    }
    
    return {
      message: messageLines.join('\n').trim(),
      options: options
    };
  };

  const handleSpecialOptionClick = (option: string) => {
    // Check if it's an email option
    if (option.toLowerCase().includes('email') && option.includes('@')) {
      const emailMatch = option.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (emailMatch) {
        window.open(`mailto:${emailMatch[1]}`, '_blank');
        return;
      }
    }
    
    // Check if it's a phone option
    if (option.toLowerCase().includes('call') || option.toLowerCase().includes('phone')) {
      const phoneMatch = option.match(/(\d{4}\s?\d{3}\s?\d{3}|\+?\d{1,4}[\s-]?\d{3,4}[\s-]?\d{3,4}[\s-]?\d{3,4})/);
      if (phoneMatch) {
        window.open(`tel:${phoneMatch[1].replace(/\s/g, '')}`, '_blank');
        return;
      }
    }
    
    // Check if it's a website/portfolio link
    if (option.includes('http')) {
      const urlMatch = option.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        window.open(urlMatch[1], '_blank');
        return;
      }
    }
    
    // Default behavior - send as chat message
    handleSendMessage(option);
  };

  const handleOptionClick = (option: string) => {
    // Just send the message, handleSendMessage will add it to the state
    handleSendMessage(option);
  };

  const getContextualQuickReplies = () => {
    if (conversationContext.interestedService) {
      switch (conversationContext.interestedService) {
        case 'website':
          return ['Get Website Quote', 'View Portfolio', 'Discuss Requirements', 'Contact Team'];
        case 'app':
          return ['Get App Quote', 'View Portfolio', 'Discuss Requirements', 'Contact Team'];
        case 'ai':
          return ['Get AI Quote', 'View Portfolio', 'Discuss Requirements', 'Contact Team'];
        case 'marketing':
          return ['Get Marketing Quote', 'View Portfolio', 'Discuss Requirements', 'Contact Team'];
        default:
          return quickReplies;
      }
    }
    return quickReplies;
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg z-[9999] animate-pulse cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-8rem)] sm:h-[500px] max-h-[600px] bg-background border border-purple-500/20 rounded-2xl shadow-2xl z-[9999] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
                             <div>
                 <h3 className="font-semibold">AskLinked</h3>
                 <p className="text-xs text-muted-foreground">Got a question? Just ask.</p>
               </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
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
                    {message.sender === 'assistant' ? (
                      <>
                        {(() => {
                          const { message: messageText, options } = renderMessageWithOptions(message.content);
                          return (
                            <>
                              <div className="whitespace-pre-wrap">{messageText}</div>
                              {options.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  {options.map((option, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handleSpecialOptionClick(option)}
                                      className="block w-full text-left px-3 py-2 text-xs bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors duration-200 text-purple-700 hover:text-purple-800"
                                      disabled={isLoading}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </>
                    ) : (
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    )}
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-purple-100' : 'text-muted-foreground'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
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
                     <div className="flex items-center space-x-1">
                       <span className="text-muted-foreground">AskLinked is thinking</span>
                     <div className="flex space-x-1">
                       <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                       <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                       <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 1 && (
            <div className="px-3 sm:px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {getContextualQuickReplies().map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    disabled={isLoading}
                    className="px-2 sm:px-3 py-1 text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-purple-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                                 placeholder={isLoading ? "AskLinked is thinking..." : "Ask something..."}
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-background border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
                         <p className="text-xs text-muted-foreground mt-2 text-center">
               AskLinked • Ask about our services, pricing, or process
             </p>
          </div>
        </div>
      )}
    </>
  );
}
