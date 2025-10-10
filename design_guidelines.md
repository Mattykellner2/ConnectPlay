# ConnectPlay Design Guidelines

## Design Approach: Hybrid Professional System

**Selected Approach:** Custom design system inspired by Linear's clarity + Stripe's professional restraint + Notion's information density
**Rationale:** ConnectPlay is a complex, multi-role platform requiring trustworthy professionalism (B2B universities), aspirational appeal (professionals), and accessible usability (students). A hybrid approach balances enterprise credibility with modern marketplace energy.

## Core Design Elements

### A. Color Palette

**Brand Foundation:**
- Primary Deep Red: 355 75% 45% (university partnerships, CTAs, active states)
- Secondary Navy: 220 40% 25% (professional dashboard headers, trust elements)
- Neutral Slate: 215 20% 65% (body text, borders, inactive states)

**Role-Based Accents:**
- University Gold: 45 90% 55% (badges, "Most Popular" highlights)
- Professional Teal: 185 65% 50% (speaker metrics, revenue indicators)
- Student Purple: 265 60% 60% (student dashboard, access code success)

**Functional Colors:**
- Success Green: 145 65% 45% (confirmations, checkmarks)
- Warning Amber: 35 85% 55% (validation hints)
- Error Red: 5 75% 50% (inline validation errors)
- Background Light: 210 15% 98% (light mode surface)
- Background Dark: 220 25% 12% (dark mode default)

### B. Typography

**Font Families:**
- Headings: Inter (600, 700 weights) - crisp, professional authority
- Body: Inter (400, 500 weights) - optimal readability for dense information
- Data/Metrics: JetBrains Mono (500 weight) - clear numeric distinction

**Hierarchy:**
- Hero Headings: 3.5rem/tight (bold), letter-spacing -0.02em
- Section Headings: 2rem/snug (semibold)
- Card Titles: 1.25rem/normal (semibold)
- Body Text: 1rem/relaxed (regular)
- Captions/Labels: 0.875rem/normal (medium)
- Metrics/Stats: 2.5rem/tight (medium, monospace)

### C. Layout System

**Spacing Primitives:** Tailwind units of 3, 4, 6, 8, 12, 16
- Micro spacing (within components): 3, 4
- Component padding: 6, 8
- Section spacing: 12, 16
- Page margins: 16, 20

**Grid Structure:**
- Container max-width: 1280px (max-w-7xl)
- Dashboard panels: 2-3 column grid (lg:grid-cols-3)
- Partnership tiers: 3-column equal (lg:grid-cols-3)
- Form layouts: Single column max-w-2xl

### D. Component Library

**Navigation:**
- Top bar: Frosted glass effect (backdrop-blur-md bg-white/80), subtle bottom border
- Hover states: Text darkens 15%, underline slides in from left
- Admin/Login buttons: Outlined with shadow lift on hover

**Cards & Tiles:**
- Base: Rounded-xl (12px), shadow-sm, border border-slate-200
- Hover elevation: shadow-lg transition-all duration-300, translate-y-[-4px]
- Partnership tier cards: Equal height (min-h-96), centered content
- "Most Popular" badge: Absolute top-right, gold background, subtle glow

**Dashboard Metrics:**
- KPI tiles: Grid layout, gradient backgrounds (subtle 5% opacity overlays)
- Metric numbers: Extra-large monospace, contrasting color
- Trend indicators: Small arrows with percentage change in matching color

**Forms:**
- Input fields: Rounded-lg, border-2 focus:border-primary, transition-colors
- Inline validation: Text-sm text-red-500, appears below field with fade-in
- Success states: Green checkmark (h-16 w-16), scale-in animation
- LinkedIn Quick Setup: Outlined button with LinkedIn blue accent

**Chat/Messages:**
- Sidebar: Fixed width 320px, scrollable conversation list
- Message bubbles: Rounded-2xl, differentiated sender/receiver colors
- Unread dots: Blue circle (h-2 w-2), positioned top-right of avatar
- Timestamps: Text-xs opacity-60

**Content Library:**
- Product cards: Image top (aspect-video), gradient overlay on hover
- Purchase buttons: Prominent primary color, shows live pricing
- Filter sidebar: Sticky position, checkbox groups with clean spacing

### E. Interactions & Animations

**Micro-interactions (Subtle):**
- Button hovers: Slight darkening + shadow lift (150ms ease)
- Card hovers: Elevation change + border color shift (300ms ease-out)
- Form focus: Border color transition + subtle glow (200ms)
- Tab switches: Content fade + slide (250ms ease-in-out)

**Prohibited/Minimal:**
- Avoid parallax scrolling
- No autoplay carousels
- Minimal loading spinners (use skeleton screens instead)
- No confetti or celebratory animations (keep professional)

## Page-Specific Guidelines

### Public Landing Page
- Hero: Full-width gradient overlay (deep red to navy 45deg), centered content, max-w-4xl text container
- Three user cards: Equal height, icon top, CTA bottom, hover lift effect
- Navigation: Transparent initially, solid white on scroll with shadow
- Footer: Comprehensive (newsletter, social, quick links, trust badges)

### Partnership Tiers Page
- Hero: Clean centered heading with supporting subtext (no image)
- Tier cards: Side-by-side, "Most Popular" gets subtle scale (1.05) and gold border
- Form section: Two-column (md:grid-cols-2), full-width submit button
- Demo request: Progressive disclosure, validation happens on blur

### Dashboards (All Roles)
- Header: Full-width colored gradient (university=red, speaker=navy, student=purple)
- Metrics row: 4-tile grid (lg:grid-cols-4), equal height, icon left
- Tab navigation: Horizontal pills, active state with bottom border + background
- Content area: White cards with shadow-sm, 8-unit padding
- Sidebar (when present): Fixed 280px width, bg-slate-50

### Application Flows
- Multi-step: Progress indicators top (1-2-3 dots), current step highlighted
- Step transitions: Slide left-to-right, fade previous step
- Review step: Two-column summary, edit links on each section
- Success page: Centered checkmark, primary CTA, secondary "Return home" link

### Student Access Code
- Single input: Extra-large (text-2xl), centered, monospace font
- Validation: Instant feedback, success = green border + checkmark
- Profile form: Single column, grouped fields (personal, academic)
- Welcome: Fade-in greeting card with dashboard preview button

## Images Strategy

**Hero Image:** Large background image for public landing hero section
- Image description: Diverse group of university students collaborating with a professional mentor in a modern co-working space, bright natural lighting, professional but approachable atmosphere
- Treatment: 40% dark overlay, content in white text over image
- Position: Full-width, min-h-[600px], background-cover

**Dashboard Previews:** Use illustrative screenshots or abstract representations
- University dashboard: Analytics charts, calendar grids
- Speaker dashboard: Revenue graphs, booking timeline
- Student dashboard: Content cards, event calendar

**Partnership Tier Icons:** Simple line icons (not images)
- Use Heroicons for all iconography throughout platform

## Accessibility & Dark Mode

- Maintain WCAG AA contrast (4.5:1 minimum for text)
- Dark mode: All form inputs with slate-800 background, white text
- Focus indicators: 2px solid ring with offset, always visible
- Keyboard navigation: Clear focus states, logical tab order
- Screen reader: Semantic HTML, ARIA labels on interactive elements