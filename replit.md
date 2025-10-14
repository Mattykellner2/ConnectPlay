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

## Recent Changes

**October 2024 - Speaker Dashboard Base44 Redesign**
- Complete redesign of Industry Professional dashboard at `/speakers/dashboard` following Base44 design system
- **Layout Structure**:
  - Left sidebar (260px): ConnectPlay logo, Navigation section with 6 items (Overview, Speaking Events, Content Studio, Earnings, Messages, Settings)
  - Main content area: Profile header, 4 KPI cards, tab bar, dynamic tab content
  - Active sidebar items: Light background (#EEF2F7), blue text, bold weight
- **Profile Header**:
  - Dark gradient background (#1E293B to #334155) with rounded corners and shadow
  - Profile photo (68px circle), welcome message with user name
  - Subtitle showing title and company
  - Green "Industry Expert" badge
  - Blue "Create Content" button → routes to `/speakers/content/new`
- **KPI Cards** (4-column grid):
  - Total Revenue: Green icon ($12,847, +23% from last year)
  - Content Sales: Blue icon (1,943, +156 this month)
  - Speaking Events: Purple icon (28, 4 upcoming)
  - Average Rating: Amber icon (4.9, Excellent feedback)
- **Tab Bar**: Segmented control with 4 tabs (Overview, Speaking Events, Content Studio, Earnings)
- **Tab Content**:
  - Overview: Quick Actions (4 buttons) + Recent Activity (4 items with blue dots)
  - Speaking Events: 3 event cards with details, tags, prices, "View All Bookings" button
  - Content Studio: 3 stat panels + "Ready to Share Your Expertise?" CTA
  - Earnings: Summary cards + Recent Transactions + "View Detailed Analytics" button
- **Create Content Page** (`/speakers/content/new`): Upload placeholder, back navigation to dashboard
- Updated `client/src/styles/speaker.css` with comprehensive Base44 styles
- All navigation functional with client-side routing (Wouter)
- Fully responsive design (mobile, tablet, desktop)
- All dummy data ready to be replaced with real user-specific information

**October 2024 - Settings Pages and Student Dashboard**
- **Speaker Settings** (`/speakers/settings`):
  - Account Information: Profile photo upload, full name (Dr. Sarah Martinez), email display
  - Professional Information: Company/institution (Stanford GSB), team member count
  - Notifications: 3 toggle switches (New Messages, New Bookings, Content Purchases) with localStorage persistence (key: 'speaker-notification-preferences')
  - Danger Zone: Red background (#FEF2F2) section with account deletion confirmation dialog
  - Back button navigation to dashboard
  - All switches have proper data-testid attributes for testing (switch-new-messages, switch-new-bookings, switch-content-purchases)

- **Student Dashboard** (`/students/dashboard`):
  - Left sidebar (260px): ConnectPlay logo, Quick Access (Home Page), Navigation (Dashboard, My Speakers, Content Library, Events, Messages, Speaker Connect, Settings)
  - Red gradient header (#DC2626 to #B91C1C): "Welcome back, Alex!" with profile photo and subtitle (Ohio State University · Business Analytics · Class of 2025)
  - Blue speaker code callout: "Connect with a Speaker" feature with code entry dialog (demo code: 1234)
  - Upcoming For You: 2 event cards (AI in Business Workshop, Career Development AMA) with View buttons
  - Recommended For You: Content card with Watch Now button
  - Sponsored Opportunity: Orange gradient (#F59E0B to #D97706) job posting card
  - **Connect Feature** (`/students/dashboard/connect`):
    - Search input with filter tags (Marketing, Operations, Partnerships, Brand Strategy)
    - Professional cards showing photo, name, title, company, specialties, rating
    - Connect button opens modal with custom questions
    - Modal validates required fields and sends connection request
    - Filter system shows only professionals matching selected tags
  - Updated `client/src/styles/student.css` with comprehensive Base44 styles
  - localStorage: Stores priority speaker codes
  - Fully responsive with mobile, tablet, desktop breakpoints

- **Student Settings** (`/students/settings`):
  - Account Information: Profile photo upload, full name (Alex Johnson), email display
  - Academic Information: Institution (Ohio State University), Program (Business Analytics), Class Year (2025)
  - Notifications: 3 toggle switches (New Content, Upcoming Events, Speaker Replies) with localStorage persistence (key: 'student-notification-preferences')
  - Danger Zone: Red background section with account deletion confirmation
  - Back button navigation to dashboard
  - All switches have proper data-testid attributes for testing (switch-new-content, switch-upcoming-events, switch-speaker-replies)

- **Technical Implementation**:
  - All toggle switches use lazy initialization with guarded localStorage.parse() fallback
  - All navigation uses Wouter's useLocation/setLocation for client-side routing (no page reloads)
  - Every interactive element has data-testid attributes for comprehensive test coverage
  - Comprehensive test suite: 45 test steps covering all Settings pages, Student Dashboard, and Connect workflow
  - All dummy data clearly marked for replacement with real user-specific information upon account creation

**October 2024 - Comprehensive Connections System with Priority Access**
- **Global Navigation Updates**:
  - Added "Home Page" link at top of all sidebars (both Speaker and Student roles)
  - Added "Events" tab to Industry Professional sidebar navigation
  - Added "Connections" tab to both Speaker and Student sidebar navigation
  - All sidebar items have proper active states and data-testid attributes

- **Speaker/Pro Connections Hub** (`/speakers/dashboard/connections`):
  - **Three-tab system**: Requests (inbound), Network (accepted), History (past)
  - **Priority Sorting**: Priority requests appear first with green badge ("Priority")
  - **Requests Tab**: Shows inbound connection requests from students
    - Each request card shows: student name, program, institution, submission date
    - "Review" button opens modal with student's answers to custom questions
    - Accept/Decline workflow with toast notifications
    - Priority badge for requests from students with valid access codes
  - **Network Tab**: Shows accepted connections with quick actions
    - Message button (connects to messaging system)
    - "Invite to Event" button (for booking students to events)
  - **History Tab**: Shows past declined or expired requests
  - Review modal displays all student answers with Accept/Decline buttons
  - Empty states for each tab when no data available

- **Speaker Events Page** (`/speakers/dashboard/events`):
  - Full-page view of upcoming speaking engagements
  - Event cards show: title, organization, institution, date, time, type (virtual/in-person), price
  - Type badges: Blue for virtual, Green for in-person
  - Empty state message: "No events yet—create your first event or accept a booking request"
  - "View All Bookings" button from Speaking Events tab navigates here

- **Speaker Settings - Connect Questions** (`/speakers/settings`):
  - **Connect Questions Management**:
    - Add up to 5 custom questions for student connection requests
    - Each question: prompt (textarea), required toggle, delete button
    - "Add Question" button (disabled when 5 questions exist)
    - "Save Questions" button with success toast
    - All questions have data-testid for testing
  - **Priority Access Codes**:
    - Add/remove access codes that grant priority to students
    - Input field + "Add" button to create new codes
    - Code badges displayed with remove (X) buttons
    - Codes stored as string array (e.g., ["STANFORD-MKTG-2025", "1234"])
    - Demo code "1234" accepted for testing
  - All sections integrated into existing Settings page layout

- **Student Dashboard Updates** (`/students/dashboard`):
  - **Red Gradient Header**: Shows student info (institution · program · class year)
  - **Blue Speaker Code Callout**: 
    - "Connect with a Speaker" section with "Enter Speaker Code" button
    - Dialog opens with code input field (centered, monospace font)
    - Accepts priority access codes (demo: "1234")
    - Success toast: "Code Accepted! You now have priority access to this speaker"
    - Sets student.priorityForPros[proId] = true for backend integration
  - **Two-column layout**: Upcoming For You + Recommended/Sponsored content

- **Student Speaker Connect** (`/students/dashboard/connect`):
  - **Four sub-tabs**: Discover, My Requests, Network, History
  - **Discover Tab**:
    - Search input with icon (search by name, company, topic)
    - Filter tags: Marketing, Operations, Partnerships, Brand Strategy (toggleable)
    - Professional cards grid showing: photo, name, title, org, bio, tags
    - "Connect" button opens modal for each professional
  - **Connect Modal**:
    - Displays pro's custom questions (from their Settings)
    - Required fields marked with red asterisk
    - Optional "Access Code" field for priority
    - Validates all required fields before submission
    - "Send Request" button with success toast
    - Toast message: "Request Sent! You'll be notified when {proFirstName} responds"
  - **My Requests Tab**:
    - Shows student's outbound connection requests
    - Each item: pro name, organization, submission date, status badge
    - Status badges: Pending (amber), Accepted (green), Declined (red)
    - Priority badge shown for priority requests
    - Empty state when no requests
  - **Network Tab**:
    - Shows accepted connections only
    - Quick actions: Message button, Book button (for scheduling)
    - Connection date displayed
    - Empty state: "No connections yet"
  - **History Tab**:
    - Shows past declined or expired requests
    - Empty state with clock icon

- **Priority Logic Implementation**:
  - Student enters valid code → grants priority for specific pro
  - Pro's Requests tab sorts: priority requests first (by createdAt desc), then regular (by createdAt desc)
  - Connect modal checks: accessCode === valid OR student.priorityForPros[proId] === true
  - Priority flag persists on ConnectRequest object
  - Green "Priority" badge displayed throughout UI for priority requests
  - TODO comments mark where backend validation needed (code ↔ pro ↔ cohort)

- **Data Models** (placeholder structures ready for backend):
  ```typescript
  type Pro = {
    id: string;
    name: string;
    title: string;
    org: string;
    photoUrl?: string;
    tags: string[];
    connectsOpen?: boolean;
    connectQuestions?: { id: string; prompt: string; required?: boolean }[];
    acceptsCodes?: string[]; // priority codes
  };

  type Student = {
    id: string;
    firstName: string;
    lastName: string;
    institutionName?: string;
    programName?: string;
    gradYear?: string | number;
    priorityForPros?: Record<string, boolean>; // proId -> true if priority granted
  };

  type ConnectRequest = {
    requestId: string;
    studentId: string;
    proId: string;
    answers: { questionId: string; value: string }[];
    priority: boolean;
    status: 'pending' | 'accepted' | 'declined';
    createdAt: string;
  };
  ```

- **Routes Added**:
  - `/speakers/dashboard/events` - Events page
  - `/speakers/dashboard/connections` - Connections hub
  - `/students/dashboard/connect` - Speaker Connect (with tabs)

- **CSS Updates**:
  - `client/src/styles/speaker.css`: Added connection styles (tabs, cards, badges, modals, empty states, events page)
  - `client/src/styles/student.css`: Added connection tab styles (tabs, request/network items, status badges, empty states)
  - All styles follow Base44 design system with proper color tokens

- **Testing**:
  - Comprehensive 52-step test plan executed successfully
  - All features tested: Events navigation, Connections workflow, Priority logic, Settings management
  - Test coverage: Speaker Events, Connections tabs, Connect Questions, Access Codes, Student code entry, Connection requests with priority, Tab navigation
  - All interactive elements have data-testid attributes for automated testing

- **Backend Integration Points** (TODO):
  - Replace dummy data with API endpoints
  - Implement validateProCode(proId, code) for code validation
  - Implement submitConnectRequest(payload) for request creation
  - Implement listProRequests(proId) for fetching requests
  - Implement decideRequest(requestId, decision) for accept/decline
  - Wire notification system for request/response alerts
  - Add bell icon with unread count in dashboard headers