# MC&D Onboarding Handbook 📚

A comprehensive digital handbook for Marshall, Carter & Dark Ltd. onboarding, featuring interactive tools and quick reference guides.

## 🌟 Features

- **Interactive Format Generator** - Generate properly formatted shift logs and point requests
- **Quick Reference Guide** - Essential commands, point values, and progression tracking
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes for comfortable viewing
- **Modern UI** - Built with Next.js 15 and Tailwind CSS

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📦 Deployment

### Recommended: Vercel (One-Click Deploy)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mcd-onboarding-handbook)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

### Alternative: GitHub Pages

For static hosting, see the GitHub Pages section in [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes
- **TypeScript**: Full type safety

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading UI
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── format-generator.tsx
│   ├── quick-reference.tsx
│   └── ...
├── lib/                  # Utilities
│   ├── constants.ts      # App constants
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Components

### Format Generator
- **Shift Log Generator**: Create formatted shift reports
- **Point Request Generator**: Generate point request forms
- **Copy to Clipboard**: One-click copying functionality

### Quick Reference
- **Essential Commands**: Frequently used commands and shortcuts
- **Point Values**: Comprehensive point system reference
- **Key Channels**: Important Discord channels
- **Rank Progression**: Career advancement tracking

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Add any API keys or configuration here
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Customization

- **Colors**: Edit `tailwind.config.ts` for theme colors
- **Content**: Update constants in `lib/constants.ts`
- **Components**: Modify components in `components/` directory

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced layout for tablets
- **Desktop**: Full-featured desktop experience
- **Touch Friendly**: Large touch targets and gestures

## 🔒 Security Features

- **Content Security Policy**: Configured via Vercel headers
- **XSS Protection**: Built-in security headers
- **HTTPS**: Automatic HTTPS on Vercel
- **No Sensitive Data**: No API keys or secrets in client code

## 🚀 Performance

- **Static Generation**: Pre-rendered pages for fast loading
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Caching**: Optimized caching strategies

## 📊 Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **Core Web Vitals**: Automatic performance tracking
- **Real User Monitoring**: Production performance insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is for internal use at Marshall, Carter & Dark Ltd.

## 🆘 Support

- **Documentation**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues**: Create an issue on GitHub
- **Discord**: Contact via internal channels

---

**Built with ❤️ for the MC&D team**