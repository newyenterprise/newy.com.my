# Quick Resend Setup Guide

## The Issue
The contact form is showing an error because the Resend API key is not configured. Here's how to fix it:

## Step 1: Get Resend API Key

1. **Sign up at Resend**: Go to [resend.com](https://resend.com) and create a free account
2. **Get your API key**: 
   - Go to your Resend dashboard
   - Click on "API Keys" in the sidebar
   - Click "Create API Key"
   - Copy the API key (starts with `re_`)

## Step 2: Update Environment Variables

1. **Open your `.env.local` file** in `apps/web/.env.local`
2. **Replace the placeholder** with your actual API key:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

## Step 3: Restart Development Server

After updating the `.env.local` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 4: Test the Contact Form

1. Go to `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit it
4. Check that you receive the success message

## Optional: Domain Verification

For production, you'll want to verify your domain:
1. In Resend dashboard, go to "Domains"
2. Add `digitallinked.com.au`
3. Follow the DNS verification steps

## Troubleshooting

- **Still getting errors?** Make sure you restarted the dev server after adding the API key
- **API key not working?** Check that you copied the entire key correctly
- **Need help?** Check the full setup guide in `EMAIL_SETUP.md`

## Next Steps

Once the API key is working:
1. Test with a real email address
2. Check that both admin and user emails are sent
3. Verify the email templates look good
