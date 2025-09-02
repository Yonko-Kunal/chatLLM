# Deployment Guide

This guide covers deploying your Chat LLM application to various platforms, with detailed instructions for Vercel (recommended), Netlify, and other hosting providers.

## 🚀 Vercel Deployment (Recommended)

Vercel is the recommended platform for Next.js applications due to its seamless integration and excellent performance.

### Prerequisites

- GitHub account
- Vercel account
- Google AI API key

### Step-by-Step Deployment

#### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import your repository** from the list
5. **Configure the project**:
   - Project Name: `chat-llm` (or your preferred name)
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

#### 3. Set Environment Variables

In the Vercel dashboard:

1. **Go to your project settings**
2. **Navigate to "Environment Variables"**
3. **Add the following variable**:
   ```
   Name: GOOGLE_API_KEY
   Value: your_google_api_key_here
   Environment: Production, Preview, Development
   ```

#### 4. Deploy

1. **Click "Deploy"**
2. **Wait for the build to complete** (usually 2-3 minutes)
3. **Your app will be live** at `https://your-project-name.vercel.app`

### Vercel CLI Deployment (Alternative)

You can also deploy using the Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add GOOGLE_API_KEY

# Deploy to production
vercel --prod
```

### Custom Domain (Optional)

1. **Go to your project settings** in Vercel
2. **Navigate to "Domains"**
3. **Add your custom domain**
4. **Follow the DNS configuration instructions**

## 🌐 Netlify Deployment

### Prerequisites

- GitHub account
- Netlify account
- Google AI API key

### Deployment Steps

#### 1. Build Configuration

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Click "New site from Git"**
3. **Connect your GitHub repository**
4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Set environment variables**:
   - Go to Site settings → Environment variables
   - Add `GOOGLE_API_KEY` with your API key
6. **Deploy**

## 🐳 Docker Deployment

### Create Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Update next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
};

export default nextConfig;
```

### Build and Run

```bash
# Build the Docker image
docker build -t chat-llm .

# Run the container
docker run -p 3000:3000 -e GOOGLE_API_KEY=your_api_key chat-llm
```

## ☁️ AWS Deployment

### AWS Amplify

1. **Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)**
2. **Click "New app" → "Host web app"**
3. **Connect your GitHub repository**
4. **Configure build settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. **Set environment variables**:
   - `GOOGLE_API_KEY`: your API key
6. **Deploy**

### AWS EC2

1. **Launch an EC2 instance** (t2.micro for testing)
2. **Install Node.js and npm**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Clone your repository**:
   ```bash
   git clone https://github.com/your-username/chatLLM.git
   cd chatLLM
   ```
4. **Install dependencies and build**:
   ```bash
   npm install
   npm run build
   ```
5. **Set environment variables**:
   ```bash
   export GOOGLE_API_KEY=your_api_key_here
   ```
6. **Start the application**:
   ```bash
   npm start
   ```

## 🚂 Railway Deployment

1. **Go to [railway.app](https://railway.app)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Set environment variables**:
   - `GOOGLE_API_KEY`: your API key
7. **Deploy**

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_API_KEY` | Your Google AI Studio API key | `AIzaSyB...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `3000` |

## 📊 Performance Optimization

### Build Optimization

1. **Enable static optimization**:
   ```typescript
   // next.config.ts
   const nextConfig: NextConfig = {
     output: 'export', // for static sites
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };
   ```

2. **Optimize images**:
   - Use Next.js Image component
   - Compress images before upload
   - Use appropriate formats (WebP for modern browsers)

3. **Bundle analysis**:
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

### Runtime Optimization

1. **Enable compression** (handled by most platforms)
2. **Use CDN** for static assets
3. **Implement caching strategies**
4. **Monitor performance** with tools like Vercel Analytics

## 🔍 Monitoring and Analytics

### Vercel Analytics

1. **Enable Vercel Analytics** in your project settings
2. **Add the analytics script** to your layout:
   ```typescript
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### Error Monitoring

Consider adding error monitoring services:

- **Sentry**: For error tracking
- **LogRocket**: For session replay
- **Vercel Speed Insights**: For performance monitoring

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Environment Variables**:
   - Ensure variables are set correctly
   - Check variable names (case-sensitive)
   - Verify API key is valid

3. **API Errors**:
   - Test API key with Google AI Studio
   - Check rate limits
   - Verify CORS settings

4. **Performance Issues**:
   - Enable compression
   - Optimize images
   - Use CDN for static assets

### Debug Commands

```bash
# Test build locally
npm run build

# Check for linting errors
npm run lint

# Test production build
npm start

# Analyze bundle size
npm run analyze
```

## 📈 Scaling Considerations

### For High Traffic

1. **Use a CDN** for static assets
2. **Implement caching** at multiple levels
3. **Consider serverless functions** for API routes
4. **Monitor API rate limits**
5. **Use database** for conversation history (if needed)

### Cost Optimization

1. **Monitor API usage** and costs
2. **Implement request queuing** to stay within rate limits
3. **Use image compression** to reduce bandwidth
4. **Consider caching** frequently asked questions

## 🔐 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for sensitive data
3. **Implement rate limiting** to prevent abuse
4. **Validate all inputs** on both client and server
5. **Use HTTPS** for all communications
6. **Regular security updates** for dependencies

## 📞 Support

If you encounter deployment issues:

1. **Check the platform's documentation**
2. **Review build logs** for specific errors
3. **Test locally** with production settings
4. **Open an issue** on GitHub with deployment details
5. **Check community forums** for similar issues

---

For platform-specific help:
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Railway Documentation](https://docs.railway.app/)
