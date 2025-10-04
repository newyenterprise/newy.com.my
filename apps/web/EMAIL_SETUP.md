# Email Setup with Resend

This document explains how the contact form email functionality is set up using Resend.

## Overview

The contact form now sends emails to both:
1. **Admin notification** - Sent to `hello@newy.com.my` when someone submits the form
2. **User confirmation** - Sent to the user's email address as a confirmation

## Setup Requirements

### 1. Resend Account
- Sign up at [resend.com](https://resend.com)
- Get your API key from the dashboard

### 2. Domain Verification
- Add your domain (`digitallinked.com.au`) to Resend
- Verify domain ownership
- Set up SPF, DKIM, and DMARC records

### 3. Environment Variables
Add the following to your `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key_here
```

## API Endpoint

The email functionality is handled by the `/api/send-email` endpoint:

- **Method**: POST
- **Content-Type**: application/json
- **Body**: 
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "messageType": "general",
    "subject": "Inquiry about services",
    "message": "Hello, I'm interested in..."
  }
  ```

## Email Templates

### Admin Notification Email
- **From**: `DigitalLinked Contact Form <noreply@digitallinked.com.au>`
- **To**: `hello@newy.com.my`
- **Subject**: `New Contact Form Submission: [subject]`
- **Content**: Includes contact details and message in a formatted HTML template

### User Confirmation Email
- **From**: `DigitalLinked <noreply@digitallinked.com.au>`
- **To**: User's email address
- **Subject**: `Thank you for contacting DigitalLinked`
- **Content**: Confirmation message with message summary

## Database Storage

Contact form submissions are also stored in the Supabase `contact_messages` table for record keeping, even if email sending fails.

## Error Handling

- Validates required fields (fullName, email, subject, message)
- Returns appropriate HTTP status codes
- Logs errors to console for debugging
- Shows user-friendly error messages

## Testing

To test the email functionality:

1. Set up your Resend API key
2. Submit a contact form
3. Check both admin and user emails are received
4. Verify the emails are properly formatted

## Troubleshooting

### Common Issues

1. **"Failed to send email" error**
   - Check RESEND_API_KEY is set correctly
   - Verify domain is verified in Resend
   - Check Resend dashboard for any errors

2. **Emails not received**
   - Check spam/junk folders
   - Verify email addresses are correct
   - Check Resend sending logs

3. **Domain verification issues**
   - Ensure DNS records are properly configured
   - Wait for DNS propagation (can take up to 48 hours)
   - Contact Resend support if issues persist

## Security Considerations

- API key is stored server-side only
- Input validation prevents injection attacks
- Rate limiting should be implemented in production
- Consider adding CAPTCHA for spam prevention

## Future Enhancements

- Add email templates with React components
- Implement email tracking
- Add email preferences management
- Set up email automation workflows
