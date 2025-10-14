# ConnectPlay

## Overview

ConnectPlay is a three-sided marketplace platform connecting universities, industry professionals, and students. Its purpose is to enable universities to provide verified guest speakers and curated educational content, allow professionals to monetize their expertise, and offer students access to industry knowledge and career development. The platform is a full-stack web application with a React frontend, Express backend, and PostgreSQL for data persistence, featuring role-specific dashboards and streamlined user flows for partnerships, speaker onboarding, and student access.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React 18, TypeScript, Vite, Wouter for routing. UI is built with shadcn/ui components, Radix UI primitives, and Tailwind CSS.

**Design System**: A light, professional Base44-inspired design emphasizing clarity. The homepage uses a clean white aesthetic with strategic color accents: blue for primary actions, purple for professional content, green for success, and amber for student features. Typography uses the Inter font family.

**Color System**:
- Primary: Blue (#2563EB)
- Purple: (#7C3AED)
- Green: (#22C55E)
- Amber: (#F59E0B)
- Neutral palette: Slate scale (#0F172A to #F8FAFC)

**Component Architecture**: Modular structure with reusable UI primitives and feature-specific components. Includes a light navbar, a dark four-column footer, and distinct sections for the homepage. Role-specific dashboards (University, Speaker, Student) are implemented, with the University Dashboard featuring a light sidebar, an OSU red gradient TopHeader, StatCard components, and content panels.

**State Management**: React Query for server state, react-hook-form with Zod for form state and validation.

**Styling Approach**: Global CSS with custom properties for the Base44 light theme, specific dashboard CSS for university branding, Tailwind CSS with shadcn/ui for UI primitives, and CSS variables for spacing, borders, and shadows.

### Backend Architecture

**Framework**: Express.js with TypeScript and Node.js (ESM).

**Server Structure**: Minimal Express setup with route registration, using in-memory storage via an `IStorage` interface, designed for future database integration.

**Development Setup**: Vite middleware for development, esbuild for production bundling, and environment-based configuration.

### Data Storage

**ORM**: Drizzle ORM with Neon serverless PostgreSQL driver.

**Schema Design**: Uses Drizzle's table definitions in `shared/schema.ts` for entities like `universityApplications` and `professionalApplications`. UUID primary keys and drizzle-zod for validation (e.g., .edu email).

**Database Connection**: Connection pooling via `@neondatabase/serverless`.

**Migrations**: Drizzle Kit configured for PostgreSQL, with migration output to `./migrations`.

## External Dependencies

**UI Component Library**: shadcn/ui, leveraging Radix UI primitives (`@radix-ui/react-*`) for accessible UI components (Dialog, Dropdown, Toast, Tabs, Form controls).

**Form Management**: react-hook-form for form state, `@hookform/resolvers` for Zod integration.

**Database & ORM**:
- `@neondatabase/serverless` for Neon PostgreSQL.
- `drizzle-orm` as the ORM.
- `drizzle-kit` for schema management.
- `connect-pg-simple` for PostgreSQL session store.

**Styling & UI Utilities**:
- Tailwind CSS for utility-first styling.
- `class-variance-authority` (CVA) for component variants.
- `clsx` and `tailwind-merge` for conditional class merging.
- `date-fns` for date manipulation.
- `lucide-react` for icons.

**Development Tools**:
- Replit-specific Vite plugins.
- `tsx` for TypeScript execution.
- `esbuild` for server bundling.

**Type System**: Shared types via `@shared` path alias, with Zod schemas for runtime validation and type inference.