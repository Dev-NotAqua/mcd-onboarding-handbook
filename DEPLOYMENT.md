# Deployment Guide - MC&D Onboarding Handbook

## Quick Deploy to Vercel (Recommended) 🚀

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))
- Your code pushed to a GitHub repository

### Step-by-Step Deployment

1. **Push to GitHub** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit - MC&D Onboarding Handbook"
   git branch -M main
   git remote add origin https://github.com/yourusername/mcd-onboarding-handbook.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Custom Domain (Optional)**
   - In Vercel dashboard, go to your project
   - Navigate to "Settings" → "Domains"
   - Add your custom domain

### Environment Variables
If you add any API keys or secrets later, add them in:
- Vercel Dashboard → Your Project → Settings → Environment Variables

## Alternative: GitHub Pages

### Setup for Static Export

1. **Update next.config.mjs**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };
   
   export default nextConfig;
   ```

2. **Add GitHub Actions Workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         - run: npm ci
         - run: npm run build
         - uses: actions/deploy-pages@v2
           with:
             artifact_name: github-pages
             path: ./out
   ```

3. **Enable GitHub Pages**
   - Repository Settings → Pages
   - Source: GitHub Actions

## Build Commands Reference

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Performance Optimization

- ✅ Next.js App Router (already configured)
- ✅ Tailwind CSS optimization
- ✅ Component lazy loading
- ✅ Image optimization (Vercel)
- ✅ Static generation where possible

## Monitoring & Analytics

### Vercel Analytics (Recommended)
- Automatic with Vercel deployment
- Real-time performance metrics
- Core Web Vitals tracking

### Google Analytics (Optional)
Add to `app/layout.tsx`:
```typescript
import Script from 'next/script'

// Add to head section
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check TypeScript errors: `npm run lint`
   - Verify all imports are correct
   - Ensure all dependencies are installed

2. **Images Not Loading**
   - For GitHub Pages: Set `images.unoptimized: true`
   - For Vercel: Use Next.js Image component

3. **Routing Issues**
   - Ensure file-based routing is correct
   - Check for case sensitivity in file names

### Support
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Recommendation**: Use Vercel for the best developer experience and performance. It's specifically designed for Next.js applications and provides automatic optimizations, preview deployments, and excellent analytics.