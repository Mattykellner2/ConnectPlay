# ConnectPlay

## Overview

ConnectPlay is a three-sided marketplace platform that connects universities, industry professionals, and students. The platform enables universities to provide verified guest speakers and curated educational content to their students, allows professionals to monetize their expertise through speaking engagements and content creation, and gives students access to industry knowledge and career development opportunities.

The application is built as a full-stack web platform with a React frontend and Express backend, using PostgreSQL for data persistence. It features role-specific dashboards for universities, speakers, and students, with distinct user flows for partnership applications, speaker onboarding, and student access management.

## Recent Changes

**October 2024 - Base44 Light Theme Redesign**
- Transformed homepage from dark gradient aesthetic to clean, light Base44-inspired design
- Created `client/src/styles/global.css` with comprehensive CSS custom properties for light theme
- Rebuilt Navigation component with simple anchor tags (removed nested Link components that caused React errors)
- Completely redesigned Home page (`client/src/pages/Home.tsx`) with six distinct sections:
  - Hero section with blue accent on "Industry Experts"
  - Three feature cards with color-coded icons (blue/purple/amber)
  - "How ConnectPlay Works" four-step process
  - "Complete Platform" features showcase
  - "Trusted by Leading Institutions" social proof
  - Dark footer with four-column navigation
- Created dedicated Footer component (`client/src/components/Footer.tsx`)
- Established new color system: Blue primary (#2563EB), Purple (#7C3AED), Green (#22C55E), Amber (#F59E0B)
- Maintained existing dashboard pages and internal navigation structure

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React 18 with TypeScript, Vite as build tool, and Wouter for client-side routing. The UI is built using shadcn/ui components with Radix UI primitives and Tailwind CSS for styling.

**Design System**: Light, professional Base44-inspired design system emphasizing clarity and approachability. The homepage features a clean white aesthetic with strategic use of color accents (blue for primary actions, purple for professional content, green for success states, amber for student-related features).

**Typography**: Inter font family for all text with Inter system font stack fallback. Responsive heading sizes using CSS clamp() for fluid typography across viewport sizes. Font weights range from 600 (semibold for links) to 800 (extrabold for main headings).

**Color System**:
- Primary: Blue (#2563EB) for CTAs and key UI elements
- Purple: (#7C3AED) for professional/speaker-related content
- Green: (#22C55E) for positive states and confirmations  
- Amber: (#F59E0B) for student-related features and highlights
- Neutral palette: Slate scale from #0F172A (text) to #F8FAFC (light backgrounds)

**Component Architecture**: Modular component structure with reusable UI primitives in `client/src/components/ui/` and feature-specific components. Pages are organized by user role with dedicated components:
- Navigation: Light navbar with subtle border, logo, center navigation links, and action buttons
- Footer: Dark footer (#0B1220) with four-column layout for site navigation
- Home sections: Hero, feature cards, how-it-works steps, platform features, trusted institutions
- Role dashboards: UniversityDashboard, SpeakerDashboard, StudentDashboard

**State Management**: React Query (@tanstack/react-query) for server state management with custom query client configuration. Form state managed through react-hook-form with Zod validation schemas.

**Styling Approach**: Dual styling system combining:
1. Global CSS (`client/src/styles/global.css`) with CSS custom properties for Base44 light theme - includes button styles (.btn-primary, .btn-outline), card styles, typography, and layout helpers
2. Tailwind CSS with shadcn/ui components for dashboard and internal pages
3. CSS variables for spacing (--space-1 through --space-10), border radius (--radius-sm/md/lg), and shadows (--shadow-sm/md)

### Backend Architecture

**Framework**: Express.js with TypeScript, running on Node.js. ESM module system throughout the codebase.

**Server Structure**: Minimal Express setup in `server/index.ts` with route registration in `server/routes.ts`. Development middleware includes request logging with response capture and Vite integration for HMR.

**Data Access Layer**: Abstracted through `IStorage` interface in `server/storage.ts`. Currently implements in-memory storage (`MemStorage` class) with methods for user CRUD operations. Designed to be swapped with database-backed implementation.

**Development Setup**: Vite middleware mode for development with custom logger. Production build uses esbuild to bundle server code. Environment-based configuration through process.env.

### Data Storage

**ORM**: Drizzle ORM with Neon serverless PostgreSQL driver. Database schema defined in `shared/schema.ts` using Drizzle's table definitions.

**Schema Design**: 
- `universityApplications` table stores partnership demo requests with fields for contact info, university details, program size, and partnership goals
- `professionalApplications` table captures speaker applications including credentials, expertise topics, speaking formats, and fee structure
- Tables use UUID primary keys with `gen_random_uuid()` defaults
- Validation schemas created using drizzle-zod with custom refinements (e.g., .edu email validation)

**Database Connection**: Connection pooling through @neondatabase/serverless with WebSocket support. Database URL configured via environment variable with validation on startup.

**Migrations**: Drizzle Kit configured for PostgreSQL dialect with migrations output to `./migrations` directory. Push-based schema updates available via `db:push` script.

### External Dependencies

**UI Component Library**: shadcn/ui with Radix UI primitives (@radix-ui/react-*) for accessible, unstyled components including Dialog, Dropdown, Toast, Tabs, Form controls, and Navigation components.

**Form Management**: react-hook-form for form state with @hookform/resolvers for Zod schema integration. Validation powered by Zod with drizzle-zod for type-safe database schema validation.

**Database & ORM**: 
- @neondatabase/serverless for Neon PostgreSQL connection
- drizzle-orm as the ORM layer
- drizzle-kit for schema management and migrations
- connect-pg-simple for PostgreSQL session store (prepared for session management)

**Styling & UI Utilities**:
- Tailwind CSS for utility-first styling
- class-variance-authority (CVA) for component variant management
- clsx and tailwind-merge via cn() utility for conditional class merging
- date-fns for date formatting and manipulation
- lucide-react for icon system

**Development Tools**:
- Replit-specific plugins for vite (runtime error overlay, cartographer, dev banner)
- tsx for TypeScript execution in development
- esbuild for production server bundling

**Type System**: Shared types between client and server via `@shared` path alias. Zod schemas provide runtime validation and TypeScript type inference for API contracts.