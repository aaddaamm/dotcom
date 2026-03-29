# Resend Email Setup Instructions

## 1. Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com) and sign up/login
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Click "Create API Key"
4. Give it a name like "adamrobinson.tech contact form"
5. Copy the API key (starts with `re_`)

## 2. Set Up Environment Variables

### For Local Development:

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace `re_xxxxxxxxx` with your actual API key:
   ```env
   RESEND_API_KEY=re_your_actual_key_here
   ```

### For Vercel Production:

1. Go to your Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add a new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_actual_key_here`
   - **Environments**: Production, Preview, Development

## 3. Configure Your Domain (For Production)

### Option A: Use Resend's Domain (Quick Start)

- You can start sending emails immediately using `onboarding@resend.dev`
- Update the "from" email in `/src/routes/api/contact/+server.ts`:
  ```javascript
  from: 'onboarding@resend.dev',  // Use this for testing
  ```

### Option B: Use Your Custom Domain (Recommended)

1. In Resend dashboard, go to [Domains](https://resend.com/domains)
2. Add your domain: `adamrobinson.tech`
3. Add the required DNS records to your domain provider
4. Verify the domain
5. Update the "from" email to use your domain:
   ```javascript
   from: 'contact@adamrobinson.tech',  // Your custom domain
   ```

## 4. Test the Setup

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Go to `/contact` and submit a test form
3. Check the console logs for email sending confirmation
4. Check your email for the notification

## 5. What Happens When Someone Submits the Form

1. **You receive** a nicely formatted email with:
   - Contact details (name, email, phone, budget)
   - Project type and message
   - Timestamp and submission details

2. **The prospect receives** an auto-responder email with:
   - Professional thank you message
   - Clear next steps
   - Helpful tips based on their budget selection
   - Links to your work and blog

## 6. Troubleshooting

- If emails aren't sending, check the Vercel Function logs
- Verify your API key is correctly set in environment variables
- Make sure your domain is verified (if using custom domain)
- Check Resend dashboard for sending statistics and any errors

## Notes

- The form will work even if Resend fails (graceful degradation)
- All form submissions are logged to the console as backup
- The system sends both a notification to you AND an auto-responder to the prospect
