# Deploying ToolNest AI to Vercel

## Prerequisites
1. A GitHub account
2. A Vercel account (free tier available)
3. Your Anthropic API key

## Step 1: Prepare Your Repository

1. **Create a GitHub Repository**
   ```bash
   # Initialize git in your project directory
   git init
   git add .
   git commit -m "Initial commit: ToolNest AI platform"
   
   # Create a new repository on GitHub and push
   git remote add origin https://github.com/yourusername/toolnest-ai.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Build Configuration

1. **Create `vercel.json` in your project root:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist/public",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "functions": {
       "dist/index.js": {
         "runtime": "nodejs18.x"
       }
     },
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/dist/index.js"
       },
       {
         "src": "/(.*)",
         "dest": "/dist/public/$1"
       }
     ],
     "env": {
       "NODE_ENV": "production"
     }
   }
   ```

2. **Update package.json scripts if needed:**
   ```json
   {
     "scripts": {
       "build": "npm run build:client && npm run build:server",
       "build:client": "vite build --outDir dist/public",
       "build:server": "esbuild server/index.ts --bundle --platform=node --outfile=dist/index.js --external:express",
       "start": "node dist/index.js",
       "dev": "NODE_ENV=development tsx server/index.ts"
     }
   }
   ```

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