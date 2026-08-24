# Project: Varna Solar Frontend Replica & Modern Watermelon UI Redesign

## Architecture
- **Framework**: React 18 / Vite / TypeScript
- **Styling**: Tailwind CSS with custom "Watermelon UI" theme extension (Emerald `#059669`, Fresh Mint `#10B981`/`#34D399`, Watermelon Coral-Rose `#FF5364`/`#FB7185`, Solar Amber `#FF7A00`, Obsidian Slate `#050B14`/`#091322`)
- **Animation**: Framer Motion (spring physics, layout animations, page transitions, stagger reveals, 3D hover cards, modal popups)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6/v7) with 15+ comprehensive routes
- **Data & State**: Mock data store + localStorage for dynamic CRM leads, blog articles, 38-State tariffs, 9 project case studies, and chatbot intent matching engine

## Code Layout
```
d:\ALL PROJECTS\varnasolar\
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── index.html
├── public/
│   ├── favicon.ico
│   └── images/
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   ├── solar.ts
    │   ├── blog.ts
    │   ├── lead.ts
    │   └── project.ts
    ├── data/
    │   ├── stateTariffs.ts       (38 States & UTs solar insolation & tariff lookup)
    │   ├── projectsData.ts       (9 Telangana/AP landmark case studies)
    │   ├── solutionsData.ts      (Residential, Commercial, Industrial, Agriculture specs)
    │   ├── subsidiesData.ts      (PM Surya Ghar & PM KUSUM complete formulas & tiers)
    │   ├── blogsData.ts          (Solar knowledge base articles)
    │   ├── chatbotData.ts        (13 intent dictionaries & FAQ quick chips)
    │   └── companyData.ts        (Leadership DINs, branches, 30 client logos, stats)
    ├── components/
    │   ├── layout/
    │   │   ├── Topbar.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   ├── MobileDrawer.tsx
    │   │   └── Layout.tsx
    │   ├── common/
    │   │   ├── GlassCard.tsx
    │   │   ├── WatermelonButton.tsx
    │   │   ├── AnimatedBadge.tsx
    │   │   ├── SectionHeader.tsx
    │   │   └── PageTransition.tsx
    │   ├── home/
    │   │   ├── HeroSection.tsx
    │   │   ├── StatsCounter.tsx
    │   │   ├── SolutionsPillars.tsx
    │   │   ├── SubsidyBanner.tsx
    │   │   ├── ProcessStepper.tsx
    │   │   ├── QuickCalculator.tsx
    │   │   ├── ProjectsCarousel.tsx
    │   │   ├── ClientMarquee.tsx
    │   │   ├── TestimonialsSection.tsx
    │   │   └── FAQAccordion.tsx
    │   ├── calculator/
    │   │   ├── SolarCalculatorEngine.tsx
    │   │   ├── SavingsBreakdown.tsx
    │   │   └── QuotationModal.tsx
    │   ├── chatbot/
    │   │   ├── AskVarnaChatbot.tsx
    │   │   └── ChatMessage.tsx
    │   └── shared/
    │       ├── FloatingActionHub.tsx
    │       ├── LeadModal.tsx
    │       └── SEOHead.tsx
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── AboutUsPage.tsx
    │   ├── WhyChooseUsPage.tsx
    │   ├── ResidentialSolarPage.tsx
    │   ├── CommercialSolarPage.tsx
    │   ├── IndustrialSolarPage.tsx
    │   ├── AgricultureSolarPage.tsx
    │   ├── PMSuryaGharPage.tsx
    │   ├── PMKusumPage.tsx
    │   ├── SolarCalculatorPage.tsx
    │   ├── ProjectsPage.tsx
    │   ├── BlogsPage.tsx
    │   ├── BlogPostPage.tsx
    │   ├── ContactPage.tsx
    │   ├── AdminLoginPage.tsx
    │   ├── AdminDashboardPage.tsx
    │   └── NotFoundPage.tsx
    └── utils/
        ├── calculations.ts
        ├── motionPresets.ts
        └── formatters.ts
```

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Vite + Tailwind + TS + Framer Setup | Modern project bootstrap with Watermelon UI tokens, fonts, and icons | M1 | survey |
| 2 | Topbar & Glassmorphic Navbar | Contact hotline, location, Waaree partner badge, dropdowns, active route indicator | M1 | survey |
| 3 | Mobile Drawer & Responsive Nav | Slide-in drawer with spring physics and full navigation tree | M1 | survey |
| 4 | 4-Column Footer with Corporate Identity | MCA DINs (Mrs. Thade Suvarna Devi, Mr. Thade Soma Sekhar), 4 branches, DISCOM coverage | M1 | survey |
| 5 | Floating Quick Action Hub | WhatsApp launcher, Call hotline, and "Ask Varna" trigger | M1 | survey |
| 6 | Cinematic Hero Section | Animated glowing particles, live stats ticker (15+ MW, 1,500+ installs), quick CTA | M2 | survey |
| 7 | 4-Pillar Solutions Grid | Residential, Commercial, Industrial, Agriculture 3D interactive cards | M2 | survey |
| 8 | PM Surya Ghar Promo Callout | ₹78,000 subsidy badge, 5-step claim summary, instant quote CTA | M2 | survey |
| 9 | 8-Step Turnkey Process Stepper | Consultation to Net-Metering commissioning interactive stepper | M2 | survey |
| 10 | Interactive Quick Savings Estimator | Home page quick bill slider with real-time solar ROI | M2 | survey |
| 11 | 9-Project Case Studies Carousel | Telangana & AP landmark projects with kWp, savings, and photos | M2 | survey |
| 12 | 30-Client Corporate Marquee | Infinite auto-scrolling client partner logos with hover pause | M2 | survey |
| 13 | Testimonials & Reviews Grid | Verbatim client feedback with star ratings and system capacities | M2 | survey |
| 14 | Interactive FAQ Accordion | Comprehensive solar questions with search filter and smooth height animation | M2 | survey |
| 15 | "Ask Varna" AI Solar Chatbot | NLP intent matcher (13 dictionaries), quick question chips, WhatsApp handover | M2 | survey |
| 16 | Residential Solar Page | On-grid/off-grid/hybrid comparison, net-metering DISCOM process, pricing tiers | M3 | survey |
| 17 | Commercial Solar Page | Capex/Opex models, 40% accelerated depreciation, 2.5-3 yr payback, solar carports | M3 | survey |
| 18 | Industrial Solar Page | High Tension (11kV/33kV) sync, MW solar farms, SCADA telemetry, zero export | M3 | survey |
| 19 | Agriculture Solar Pumps Page | 3HP-20HP solar pump packages, PM KUSUM 60% subsidy integration, farmer benefits | M3 | survey |
| 20 | PM Surya Ghar Subsidy Guide Page | 1kW (₹30k), 2kW (₹60k), 3-10kW (₹78k) slabs, eligibility, required docs, claim flowchart | M3 | survey |
| 21 | PM KUSUM Scheme Page | Component A, B & C guide, 60% Govt Subsidy + 30% Bank Loan + 10% Farmer Share | M3 | survey |
| 22 | 38-State Solar Sizing & ROI Calculator | Full 38 States/UTs insolation & tariff lookup, monthly bill slider, 30-yr ROI projection | M4 | survey |
| 23 | About Us Page | 10+ Yr EPC history, Director profiles with DINs, Waaree partnership, mission/vision | M4 | survey |
| 24 | Why Choose Us Page | Tier-1 components, 25-yr warranty, 100% DISCOM approval rate, 48-hr service SLA | M4 | survey |
| 25 | Filterable Projects Portfolio | Filter by Residential, Commercial, Industrial, Agriculture with lightbox modal | M4 | survey |
| 26 | Solar Knowledge Hub & Blog | Dynamic blog listing with search/tags and full reading view (`/blog/:slug`) | M4 | survey |
| 27 | Contact & Branch Locator Page | Interactive branch cards (SR Nagar, Vizag, Adilabad, Vempalli, Tandur), lead form | M4 | survey |
| 28 | Admin Portal & CRM Dashboard | Secure login (`admin@varnasolar.com`), Lead management, Article editor | M4 | survey |
| 29 | Global Lead Capture & Modal | Reusable quote inquiry modal with validation and WhatsApp direct dispatch | M4 | survey |
| 30 | E2E Test Suite Execution & Tier 5 Hardening | 100% test pass on routing, components, calculations, and adversarial stress tests | M5 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Project Foundation & Layout Shell | Vite, Tailwind, TS, Framer, Navbar, Footer, Mobile Drawer, Floating Hub, Routes Skeleton | none | PLANNED |
| 2 | M2: Home Page & Global Components | Hero, Stats, Pillars, Subsidy Banner, Stepper, Quick Calc, Projects Carousel, Testimonials, FAQs, Chatbot | M1 | PLANNED |
| 3 | M3: Sector Solutions & Subsidy Guides | Residential, Commercial, Industrial, Agriculture, PM Surya Ghar, PM KUSUM Pages | M1 | PLANNED |
| 4 | M4: Interactive Tools, Portfolio, About & Admin | 38-State Calculator, About Us, Why Choose Us, Portfolio, Blogs, Contact, Admin CRM | M1 | PLANNED |
| 5 | M5: Final Verification & Adversarial Hardening | E2E test suite execution, Tier 5 stress testing, Forensic Audit, Build verification | M1, M2, M3, M4 | PLANNED |

## Interface Contracts
### Routing & Navigation Contract
- Routes:
  - `/` -> HomePage
  - `/about-us` -> AboutUsPage
  - `/why-choose-us` -> WhyChooseUsPage
  - `/residential-solar` -> ResidentialSolarPage
  - `/commercial-solar` -> CommercialSolarPage
  - `/industrial-solar` -> IndustrialSolarPage
  - `/agriculture-solar` -> AgricultureSolarPage
  - `/pm-surya-ghar-yojana` -> PMSuryaGharPage
  - `/pm-kusum-scheme` -> PMKusumPage
  - `/solar-calculator` -> SolarCalculatorPage
  - `/projects` -> ProjectsPage
  - `/blogs` -> BlogsPage
  - `/blog/:slug` -> BlogPostPage
  - `/contact` -> ContactPage
  - `/admin/login` -> AdminLoginPage
  - `/admin` -> AdminDashboardPage
  - `*` -> NotFoundPage

### Solar Calculation Engine Contract (`src/utils/calculations.ts`)
- `calculateSolarSavings(monthlyBill: number, stateCode: string, connectionType: 'residential' | 'commercial' | 'industrial')`
  - Input: monthly bill in INR, state code (e.g. 'TG', 'AP', 'MH', etc.), connection type
  - Output: `{ systemSizeKW: number, annualGenerationKWh: number, annualSavingsINR: number, centralSubsidyINR: number, netCostINR: number, paybackYears: number, lifetimeSavings30YrINR: number, co2OffsetTonsPerYear: number, treesPlantedEquivalent: number }`

### Chatbot Intent Matcher Contract (`src/components/chatbot/AskVarnaChatbot.tsx`)
- `matchIntent(userInput: string): { reply: string, quickReplies?: string[], action?: string }`
