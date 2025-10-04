# Digital Linked - Monorepo

Your Strategic Partner for Digital Success

A comprehensive monorepo for Digital Linked's web and mobile applications, built with modern technologies and best practices.

## 🏗️ Project Structure

```
digitallinked-monorepo/
├── apps/
│   ├── web/                 # Next.js 15 web application
│   └── mobile/              # Expo SDK 53 mobile application
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── utils/               # Shared utilities and helpers
│   └── config/              # Shared configuration files
├── .env.example             # Environment variables template
├── package.json             # Root package.json with workspaces
├── turbo.json               # Turborepo configuration
├── pnpm-workspace.yaml      # pnpm workspace configuration
└── README.md               # This file
```

## 🚀 Tech Stack

### Web App (`apps/web`)
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS + shadcn/ui + tweakcn
- **Animations**: GSAP for scroll animations
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Payments**: Stripe (checkout & subscriptions)
- **Email**: Resend for transactional emails
- **Notifications**: OneSignal for push notifications
- **Monitoring**: Sentry for error tracking
- **CMS**: MDX + Contentlayer for blog/projects
- **Deployment**: Vercel-ready

### Mobile App (`apps/mobile`)
- **Framework**: Expo SDK 53
- **Styling**: NativeWind (Tailwind for React Native)
- **Navigation**: Expo Router
- **Authentication**: Supabase Auth
- **Notifications**: Expo Notifications + OneSignal
- **Build**: EAS Build ready

### Shared Packages
- **UI Package**: Reusable components with Tailwind, shadcn, tweakcn
- **Utils Package**: Common utilities, validation, formatting
- **Config Package**: Shared ESLint, Prettier, TypeScript configs

## 📋 Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd digitallinked-monorepo

# Install dependencies
pnpm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your actual values
```

Required environment variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration (Resend)
RESEND_API_KEY=re_your_resend_api_key
FROM_EMAIL=noreply@digitallinked.com.au

# Push Notifications (OneSignal)
ONESIGNAL_APP_ID=your_onesignal_app_id
ONESIGNAL_REST_API_KEY=your_onesignal_rest_api_key

# Error Monitoring (Sentry)
SENTRY_DSN=https://your_sentry_dsn@sentry.io/project_id
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Digital Linked
```

### 3. Build Shared Packages

```bash
# Build all shared packages
pnpm build --filter=@digitallinked/ui --filter=@digitallinked/utils --filter=@digitallinked/config
```

## 🏃‍♂️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm web:dev          # Start only web app
pnpm mobile:dev       # Start only mobile app

# Building
pnpm build            # Build all apps and packages
pnpm web:build        # Build only web app
pnpm mobile:build     # Build only mobile app

# Linting and Testing
pnpm lint             # Lint all packages and apps
pnpm test             # Run tests across all packages
pnpm type-check       # Type check all TypeScript files

# Utilities
pnpm clean            # Clean all build artifacts
pnpm format           # Format all files with Prettier
```

### Web App Development

```bash
cd apps/web
pnpm dev
```

The web app will be available at `http://localhost:3000`

### Mobile App Development

```bash
cd apps/mobile
pnpm start
```

This will start the Expo development server. You can:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your device

## 📱 App Features

### Web App Pages
- `/` - Homepage with hero, services, process, and CTA sections
- `/about` - About Digital Linked
- `/services` - Detailed service offerings
- `/projects` - Portfolio showcase
- `/blog` - Blog with MDX support
- `/contact` - Contact form and information

### Mobile App Screens
- Home screen with services overview
- About screen
- Services detail screens
- Contact screen

## 🎨 Design System

The project uses a consistent design system across web and mobile:

### Colors
- **Primary**: Blue (#3B82F6) - Main brand color
- **Secondary**: Gray (#64748B) - Supporting elements
- **Accent**: Purple (#D946EF) - Highlights and CTAs

### Typography
- **Web**: Inter (body), Poppins (headings)
- **Mobile**: System fonts with Tailwind classes

### Components
Shared UI components are available in `packages/ui` and can be used across both web and mobile apps.

## 🔧 Configuration Files

### Turborepo (`turbo.json`)
- Defines build pipelines for dev, build, lint, test
- Configures caching and dependencies between packages

### TypeScript
- Base config in `packages/config/typescript/base.json`
- Extended by each app with specific settings

### ESLint & Prettier
- Shared configs in `packages/config/eslint/` and `packages/config/prettier/`
- Consistent code style across all packages

## 🚀 Deployment

### Web App (Vercel)
```bash
# Build for production
pnpm web:build

# Deploy to Vercel
vercel --prod
```

### Mobile App (EAS Build)
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for production
eas build --platform all
```

## 📦 Package Management

This monorepo uses pnpm workspaces for efficient package management:

- **Workspace dependencies**: Use `workspace:*` in package.json
- **Cross-package imports**: Import from `@digitallinked/ui`, `@digitallinked/utils`
- **Version management**: All packages versioned together

## 🔍 Development Workflow

1. **Feature Development**:
   - Create feature branch from main
   - Develop in appropriate app (`apps/web` or `apps/mobile`)
   - Use shared packages for common functionality
   - Test across both platforms

2. **Package Updates**:
   - Update shared packages in `packages/`
   - Build packages: `pnpm build --filter=@digitallinked/*`
   - Update consuming apps

3. **Testing**:
   - Run tests: `pnpm test`
   - Type check: `pnpm type-check`
   - Lint code: `pnpm lint`

## 🛡️ Quality Assurance

- **TypeScript**: Strict type checking across all packages
- **ESLint**: Consistent code style and best practices
- **Prettier**: Automatic code formatting
- **Turborepo**: Efficient builds and caching
- **Shared configs**: Consistent tooling across packages

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is proprietary to Digital Linked. All rights reserved.

## 📞 Support

For support and questions:
- Email: hello@newy.com.my
- Phone: +60138994478
- Address: 38, Jalan 3/24, Bandar Baru Bangi, Selangor 43650 Malaysia

---

**Digital Linked** - Your Strategic Partner for Digital Success 🚀
