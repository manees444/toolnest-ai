# Deploying ToolNest AI to Vercel - Quick Start Guide

## Prerequisites
1. A GitHub account
2. A Vercel account (free tier available at [vercel.com](https://vercel.com))
3. Your Anthropic API key

## Quick Deployment Steps

### Step 1: Push Your Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com) → click "New repository"
   - Name it: `toolnest-ai` (or your preferred name)
   - Make it public
   - Don't initialize with README (since you already have code)

2. **Upload your code:**
   ```bash
   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit: ToolNest AI platform"
   
   # Connect to your GitHub repository
   git remote add origin https://github.com/YOUR_USERNAME/toolnest-ai.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy with Vercel (Web Interface - Easiest Method)

1. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Continue with GitHub" to sign up/login

2. **Import Your Project:**
   - Click "New Project" on Vercel dashboard
   - Import your `toolnest-ai` repository from GitHub
   - Click "Import"

3. **Configure Build Settings:**
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist` 
   - **Install Command:** `npm install`
   - **Development Command:** `npm run dev`

4. **Add Environment Variable:**
   - Before deploying, click "Environment Variables"
   - Add: `ANTHROPIC_API_KEY` = `your_api_key_here`
   - Select: Production, Preview, Development

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app will be live at: `https://your-project-name.vercel.app`

## Step 3: Deploy to Vercel

### Option A: Vercel CLI (Recommended)
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N`
   - Project name: `toolnest-ai` (or your preferred name)
   - In which directory? `./` (current directory)

### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

## Step 4: Environment Variables

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add: `ANTHROPIC_API_KEY` with your API key value
   - Set for: Production, Preview, and Development

2. **Or via CLI:**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   # Enter your API key when prompted
   ```

## Step 5: Custom Domain (Optional)

1. **Purchase a domain** (e.g., from Namecheap, GoDaddy, or directly through Vercel)

2. **Add domain in Vercel:**
   - Go to project settings → Domains
   - Add your domain (e.g., `toolnestai.com`)
   - Follow DNS configuration instructions

3. **Update DNS settings:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or use Vercel nameservers for easier management

## Step 6: SEO and Analytics (Optional)

1. **Google Search Console:**
   - Add and verify your domain
   - Submit sitemap (create one if needed)

2. **Google Analytics:**
   - Add tracking code to your HTML head
   - Consider using Google Tag Manager

## Step 7: Monitoring and Updates

1. **Automatic Deployments:**
   - Every push to main branch triggers deployment
   - Pull requests create preview deployments

2. **Monitor Performance:**
   - Use Vercel Analytics (free tier available)
   - Monitor function execution times
   - Watch for errors in deployment logs

## File Structure for Deployment
```
toolnest-ai/
├── client/
│   ├── src/
│   ├── index.html
│   └── package.json
├── server/
│   ├── index.ts
│   ├── routes.ts
│   └── ...
├── shared/
├── dist/              # Built files (auto-generated)
│   ├── public/        # Client build
│   └── index.js       # Server build
├── vercel.json        # Vercel configuration
├── package.json       # Root package.json
└── README.md

```

## Troubleshooting

**Build Errors:**
- Check Node.js version compatibility
- Ensure all dependencies are in package.json
- Review build logs in Vercel dashboard

**API Errors:**
- Verify ANTHROPIC_API_KEY is set correctly
- Check function timeout limits (max 10s on free tier)
- Review server logs for errors

**Domain Issues:**
- DNS propagation can take 24-48 hours
- Use DNS checkers to verify configuration
- Ensure SSL certificates are issued

## Production Checklist

- [ ] Environment variables configured
- [ ] Custom domain connected (if applicable)
- [ ] SSL certificate active
- [ ] Analytics tracking implemented
- [ ] Error monitoring set up
- [ ] Performance optimization verified
- [ ] SEO meta tags configured
- [ ] Social media sharing tested

Your ToolNest AI platform will be live at `https://your-project-name.vercel.app` or your custom domain!