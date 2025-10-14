# ConnectPlay

## Overview

ConnectPlay is a three-sided marketplace platform designed to connect universities, industry professionals, and students. It enables universities to offer verified guest speakers and curated educational content, professionals to monetize their expertise, and students to access industry knowledge and career development. The platform aims to be a full-stack web application with role-specific dashboards and streamlined user flows for partnerships, speaker onboarding, and student engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

**Technology Stack**: React 18, TypeScript, Vite, Wouter for routing. UI is built with shadcn/ui components, Radix UI primitives, and Tailwind CSS.

**Design System**: A light, professional Base44-inspired design with a focus on clarity. The design incorporates a specific color palette (blue for primary, purple for professional, green for success, amber for student features) and uses the Inter font family.

**Component Architecture**: Modular and reusable, featuring a light navbar, a dark four-column footer, and distinct sections for the homepage. Role-specific dashboards (University, Speaker, Student) are implemented with unique layouts and components tailored to each user type.

**State Management**: React Query for server state management, and react-hook-form with Zod for form state and validation.

**Styling Approach**: Global CSS with custom properties for the Base44 light theme, specific dashboard CSS for branding, Tailwind CSS for utility-first styling and UI primitives, and CSS variables for consistent spacing, borders, and shadows.

### Backend

**Framework**: Express.js with TypeScript and Node.js (ESM).

**Server Structure**: Minimal Express setup with route registration, initially using in-memory storage, designed for seamless future integration with a persistent database.

### Data Storage

**ORM**: Drizzle ORM integrated with Neon serverless PostgreSQL driver.

**Schema Design**: Drizzle's table definitions are used for entities like `universityApplications` and `professionalApplications`, employing UUID primary keys and drizzle-zod for validation, including specific email validation patterns.

**Database Connection**: Utilizes connection pooling via `@neondatabase/serverless`.

**Migrations**: Drizzle Kit is configured for PostgreSQL, managing schema changes and outputting migrations to a dedicated directory.

## External Dependencies

**UI Component Library**: shadcn/ui, leveraging Radix UI primitives (`@radix-ui/react-*`) for accessible UI components (Dialog, Dropdown, Toast, Tabs, Form controls).

**Form Management**: react-hook-form for form state, with `@hookform/resolvers` for Zod integration.

**Database & ORM**:
- `@neondatabase/serverless` for Neon PostgreSQL connectivity.
- `drizzle-orm` as the primary ORM.
- `drizzle-kit` for schema migration and management.
- `connect-pg-simple` for PostgreSQL session store.

**Styling & UI Utilities**:
- Tailwind CSS for utility-first styling.
- `class-variance-authority` (CVA) for creating component variants.
- `clsx` and `tailwind-merge` for conditional class merging.
- `date-fns` for date manipulation utilities.
- `lucide-react` for icons.

**Development Tools**:
- Replit-specific Vite plugins.
- `tsx` for TypeScript execution in development.
- `esbuild` for production bundling of the server.

**Type System**: Shared types via `@shared` path alias, with Zod schemas providing runtime validation and type inference across the application.