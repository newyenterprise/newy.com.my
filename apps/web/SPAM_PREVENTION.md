# Spam Prevention Guide

This document explains the spam prevention measures implemented in the contact form.

## Overview

The contact form includes multiple layers of spam prevention to protect against bots and unwanted submissions while maintaining a good user experience for legitimate users.

## Implemented Spam Prevention Measures

### 1. Rate Limiting
- **Limit**: 3 submissions per 15 minutes per IP address
- **Implementation**: In-memory rate limiting (use Redis/database in production)
- **Response**: Returns 429 status code with "Too many requests" message

### 2. Honeypot Fields
- **Fields**: `website`, `phone`, `company` (hidden from users)
- **Purpose**: Bots often fill all visible fields, including hidden ones
- **Detection**: If any honeypot field is filled, submission is rejected
- **Implementation**: CSS `display: none` with `tabIndex={-1}`

### 3. Client-Side Timing Protection
- **Requirement**: Minimum 3 seconds between form focus and submission
- **Purpose**: Prevents instant form submissions (common bot behavior)
- **Implementation**: Tracks form start time on first focus

### 4. Input Validation
- **Name**: 2-100 characters
- **Email**: Valid email format validation
- **Message**: 10-5000 characters
- **Required fields**: All must be present

### 5. Spam Keyword Detection
- **Keywords**: Common spam terms like "viagra", "casino", "loan", etc.
- **Detection**: Checks subject and message content
- **Action**: Rejects submissions containing spam keywords

### 6. IP Address Tracking
- **Purpose**: Track submissions for rate limiting and logging
- **Headers**: Supports multiple IP detection methods
- **Logging**: IP address included in admin notification emails

## Configuration

### Rate Limiting Settings
```typescript
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 submissions per window
```

### Spam Keywords
```typescript
const spamKeywords = [
  'viagra', 'casino', 'loan', 'debt', 'weight loss', 'diet pills',
  'make money fast', 'work from home', 'earn money online',
  'free money', 'lottery', 'winner', 'urgent', 'limited time',
  'act now', 'click here', 'buy now', 'cheap', 'discount',
  'free trial', 'no cost', 'risk free', 'guaranteed'
];
```

## Production Recommendations

### 1. Use Redis for Rate Limiting
Replace in-memory rate limiting with Redis:
```typescript
// Example with Redis
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);
```

### 2. Add CAPTCHA
Consider adding reCAPTCHA or hCaptcha for additional protection:
```typescript
// Example with reCAPTCHA
const recaptchaResponse = await verifyRecaptcha(token);
if (!recaptchaResponse.success) {
  return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 });
}
```

### 3. Email Domain Validation
Add validation for suspicious email domains:
```typescript
const suspiciousDomains = ['tempmail.com', '10minutemail.com'];
if (suspiciousDomains.some(domain => email.includes(domain))) {
  return NextResponse.json({ error: 'Invalid email domain' }, { status: 400 });
}
```

### 4. Content Analysis
Implement more sophisticated content analysis:
- Check for excessive links
- Detect repetitive text patterns
- Analyze message structure

### 5. Geographic Restrictions
Consider blocking submissions from certain countries or regions if needed.

## Monitoring and Logging

### Admin Email Notifications
Admin emails now include:
- IP address of submitter
- Timestamp of submission
- All form data for review

### Console Logging
- Rate limit violations
- Suspicious submissions
- Spam keyword detection

## Testing Spam Prevention

### Test Rate Limiting
1. Submit form 3 times quickly
2. Fourth submission should be blocked
3. Wait 15 minutes and try again

### Test Honeypot Fields
1. Fill honeypot fields using browser dev tools
2. Submission should be rejected

### Test Timing Protection
1. Submit form immediately after page load
2. Should show timing error message

### Test Spam Keywords
1. Include spam keywords in message
2. Submission should be rejected

## Troubleshooting

### False Positives
If legitimate users are being blocked:
1. Check rate limiting settings
2. Review spam keyword list
3. Adjust timing requirements
4. Check honeypot field implementation

### Bypassing Protection
If spam is still getting through:
1. Add CAPTCHA
2. Implement more sophisticated content analysis
3. Consider geographic restrictions
4. Add email domain validation

## Security Considerations

- Rate limiting data is stored in memory (clears on server restart)
- IP addresses are logged in admin emails
- Honeypot fields are hidden but not encrypted
- Consider GDPR compliance for IP logging in EU

## Future Enhancements

1. **Machine Learning**: Implement ML-based spam detection
2. **Behavioral Analysis**: Track user interaction patterns
3. **Reputation System**: Build IP/email reputation database
4. **Advanced CAPTCHA**: Implement invisible CAPTCHA
5. **Email Verification**: Require email confirmation before processing
