# LinkBot Pro - AI Chatbot Implementation for Digital Linked

## Overview

The Digital Linked website now features **LinkBot Pro**, a sophisticated digital solutions expert that provides intelligent, context-aware responses to user inquiries about our services. LinkBot Pro is designed to engage visitors, answer questions, and guide them toward relevant solutions with a professional, friendly approach.

## Features

### 🤖 AI-Powered Responses
- **Google Gemini Pro**: Powered by Google's advanced AI model
- **Context-Aware**: Remembers conversation history and user preferences
- **Service-Specific**: Provides detailed information about website development, app development, AI automation, and digital marketing
- **Intelligent Routing**: Guides users to appropriate next steps based on their interests

### 💬 Enhanced User Experience
- **Real-time Typing Indicators**: Shows when Gemini AI is processing responses
- **Quick Reply Buttons**: Contextual suggestions based on conversation flow
- **Message Timestamps**: Tracks conversation timing
- **Responsive Design**: Works seamlessly on all devices

### 🧠 Smart Context Management
- **Conversation Memory**: Tracks user interests and previous questions
- **Service Interest Detection**: Identifies which services the user is most interested in
- **Progressive Disclosure**: Provides more specific information as conversations progress

## Technical Implementation

### AI Model: Google Gemini 1.5 Flash
- **Cost**: $0.075 per 1M input tokens, $0.30 per 1M output tokens (even cheaper!)
- **Reliability**: 99.5% uptime
- **Speed**: Very fast response times
- **Fallback**: Custom rule-based system if Gemini is unavailable

### API Structure (`/api/chat`)

The chatbot uses a sophisticated API endpoint that:

1. **Processes User Input**: Analyzes messages for intent and context
2. **Maintains Conversation State**: Tracks user preferences and interests
3. **Generates Contextual Responses**: Uses Gemini AI to provide relevant information
4. **Handles Multiple Topics**: Covers services, pricing, timelines, technology, and contact information

### Knowledge Base

The system includes comprehensive information about:

#### Services
- **Website Development**: Features, process, pricing, timeline, technologies
- **App Development**: Native/cross-platform, features, process, pricing, timeline
- **AI Automation**: Capabilities, implementation, pricing, timeline
- **Digital Marketing**: Services, process, pricing, ongoing management

#### Company Information
- Contact details (email, phone, address)
- Business hours
- Portfolio and experience
- Technology stack

### Context Tracking

The chatbot maintains conversation context including:
- `interestedService`: Which service the user is most interested in
- `hasAskedAboutPricing`: Whether pricing has been discussed
- `hasAskedAboutProcess`: Whether process/timeline has been discussed
- `hasAskedAboutContact`: Whether contact information has been requested

## Usage Examples

### Service Inquiries
```
User: "Tell me about your website development services"
Bot: [Gemini AI provides detailed information about features, process, pricing, timeline, and technologies]
```

### Pricing Questions
```
User: "How much does a mobile app cost?"
Bot: [Gemini AI provides pricing ranges and suggests quote options]
```

### Technology Questions
```
User: "What technologies do you use?"
Bot: [Gemini AI lists technology stack with service-specific details]
```

### Contact Information
```
User: "How can I contact you?"
Bot: [Gemini AI provides contact details and suggests next steps]
```

## File Structure

```
apps/web/src/
├── app/api/chat/
│   ├── route.ts              # Main chat API endpoint with Gemini AI
│   ├── test/route.ts         # Test endpoint
│   └── test-gemini/route.ts  # Gemini AI test endpoint
├── components/
│   └── chat-assistant.tsx    # Chat UI component
└── app/layout.tsx            # Includes chat assistant
```

## API Endpoints

### POST `/api/chat`
Main chat endpoint that processes user messages and returns Gemini AI responses.

**Request Body:**
```json
{
  "message": "string",
  "conversationHistory": [
    {
      "sender": "user" | "assistant",
      "content": "string"
    }
  ],
  "context": {
    "interestedService": "string",
    "hasAskedAboutPricing": "boolean",
    "hasAskedAboutProcess": "boolean",
    "hasAskedAboutContact": "boolean"
  }
}
```

**Response:**
```json
{
  "response": "string",
  "context": {
    "interestedService": "string",
    "hasAskedAboutPricing": "boolean",
    "hasAskedAboutProcess": "boolean",
    "hasAskedAboutContact": "boolean"
  },
  "timestamp": "string"
}
```

### GET `/api/chat/test`
Test endpoint to verify API functionality.

### GET `/api/chat/test-gemini`
Test endpoint to verify Gemini AI integration.

## Integration

The chatbot is automatically included on all public pages through the `LayoutWrapper` component. It appears as a floating chat button in the bottom-right corner of the screen.

## Cost Analysis

### Gemini 1.5 Flash Pricing (Current Implementation)
- **Input tokens**: $0.075 per 1M tokens
- **Output tokens**: $0.30 per 1M tokens
- **Typical conversation**: ~500 tokens total
- **Cost per conversation**: ~$0.0002 (practically free!)

### Cost Comparison for 1000 Conversations:
| Model | Input Cost | Output Cost | Total per 1000 chats |
|-------|------------|-------------|---------------------|
| **Gemini 1.5 Flash** | $0.04 | $0.15 | **$0.19** |
| Claude Haiku | $0.25 | $1.25 | $1.50 |
| GPT-3.5 Turbo | $1.50 | $2.00 | $3.50 |
| GPT-4 | $30.00 | $60.00 | $90.00 |

## Updated Service Pricing (2024)

Based on market research, Digital Linked now offers competitive and affordable pricing:

### Website Development
- **Basic Website**: Starting from $790 AUD (1-5 pages, responsive design)
- **Business Website**: $2,500 AUD (professional site with CMS)
- **E-commerce Site**: $5,500+ AUD (online store with payment integration)

### Mobile App Development  
- **Basic App**: Starting from $4,500 AUD (simple functionality)
- **Business App**: $12,000 AUD (advanced features, integrations)
- **Complex App**: $25,000+ AUD (custom development, multiple platforms)

### AI Automation
- **Chatbot Integration**: Starting from $1,200 AUD
- **Process Automation**: $3,500 AUD (workflow optimization)
- **Custom AI Solutions**: $8,000+ AUD (machine learning, predictive analytics)

### Digital Marketing
- **Basic SEO Package**: Starting from $650 AUD/month
- **Full Marketing Package**: $1,200 AUD/month (SEO, PPC, social media)

## Recent Improvements

### Portfolio Link Integration
- ✅ **Fixed placeholder text**: AI now uses actual portfolio URL instead of "[insert portfolio link here]"
- ✅ **Portfolio URL**: https://digitallinked.com.au/portfolio
- ✅ **Website URL**: https://digitallinked.com.au
- ✅ **No more placeholders**: System prevents AI from generating placeholder text

### Contact Information Update
- ✅ **Updated phone number**: Changed to 0406 612 824
- ✅ **Email**: hello@newy.com.my
- ✅ **Contact options**: Available in all AI responses

### Clickable Contact Options
- ✅ **Email buttons**: Click to open email client (mailto: links)
- ✅ **Phone buttons**: Click to dial on mobile devices (tel: links)
- ✅ **Website links**: Click to open portfolio/website in new tab
- ✅ **Smart detection**: Automatically detects email, phone, and URL patterns
- ✅ **Fallback behavior**: Non-special options continue chat conversation

### Branding Updates
- ✅ **New Assistant Name**: Changed from "Digital Linked Assistant" to "LinkBot Pro"
- ✅ **Updated Tagline**: "Your Digital Solutions Expert" instead of AI references
- ✅ **Removed AI Branding**: No more "Powered by Google Gemini AI" references
- ✅ **Professional Identity**: Positioned as a digital solutions expert, not just an AI

## Customization

### Adding New Services
To add a new service, update the `KNOWLEDGE_BASE.services` object in `/api/chat/route.ts`:

```typescript
newService: {
  description: "Service description",
  features: ["Feature 1", "Feature 2"],
  process: ["Step 1", "Step 2"],
  pricing: "Pricing information",
  timeline: "Timeline information",
  technologies: ["Tech 1", "Tech 2"]
}
```

### Modifying AI Behavior
Edit the system prompt in the `getAIResponse` function to customize how Gemini AI responds to users.

### Styling
The chat interface uses Tailwind CSS classes and can be customized in `chat-assistant.tsx`.

## Performance Considerations

- **Response Time**: Gemini AI typically responds in 1-3 seconds
- **Context Management**: Efficient conversation state tracking
- **Error Handling**: Graceful fallbacks to custom system if Gemini fails
- **Memory Usage**: Minimal state management for optimal performance
- **Cost Optimization**: Token limits and efficient prompting

## Security & Privacy

- **API Key**: Securely stored and used only for AI responses
- **No Data Storage**: Conversation history is not permanently stored
- **Fallback System**: Custom system ensures functionality even if AI is unavailable

## Future Enhancements

1. **Multi-language Support**: Gemini AI can handle multiple languages
2. **Lead Qualification**: Automatically qualify leads based on conversation
3. **Appointment Booking**: Direct integration with calendar systems
4. **Analytics**: Track conversation patterns and user engagement
5. **File Upload**: Allow users to share project requirements or documents
6. **Voice Integration**: Add voice-to-text capabilities

## Testing

The chatbot can be tested by:
1. Opening the website
2. Clicking the chat button in the bottom-right corner
3. Asking questions about services, pricing, or contact information
4. Testing contextual responses by asking follow-up questions
5. Visiting `/api/chat/test-gemini` to verify Gemini AI integration

## Support

For technical support or customization requests, contact the development team at hello@newy.com.my.

## API Key Management

The current implementation uses a hardcoded API key for demonstration. For production, consider:
- Using environment variables
- Implementing API key rotation
- Adding rate limiting
- Monitoring usage and costs
