# E2E Test Infra: Varna Solar Redesign

## Test Philosophy
- Opaque-box, requirement-driven testing. Validates user-facing functionality, routing, solar math accuracy, content fidelity, and UI responsiveness.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Workload Application Scenarios.

## Feature Inventory & Test Coverage Goals
| # | Feature | Requirement Source | Tier 1 (Feature) | Tier 2 (Boundary) | Tier 3 (Cross-Feature) | Tier 4 (Scenarios) |
|---|---------|-------------------|:----------------:|:-----------------:|:----------------------:|:------------------:|
| 1 | Framework & Build Integrity | R1 / Acceptance | 5 | 5 | ✓ | ✓ |
| 2 | React Router 15+ Routes Navigation | R1 / Acceptance | 15 | 5 | ✓ | ✓ |
| 3 | Extracted Live Site Copy & Data Fidelity | R2 / Acceptance | 10 | 5 | ✓ | ✓ |
| 4 | "Watermelon UI" Styling & Tailwind Classes | R3 / Acceptance | 10 | 5 | ✓ | ✓ |
| 5 | Framer Motion Spring Animations & Transitions | R3 / Acceptance | 10 | 5 | ✓ | ✓ |
| 6 | 38-State Solar & Subsidy Calculation Engine | R2 / R3 | 12 | 8 | ✓ | ✓ |
| 7 | "Ask Varna" AI Solar Chatbot NLP Engine | R2 / R3 | 10 | 5 | ✓ | ✓ |
| 8 | Dynamic Projects Gallery & Filters | R2 / R3 | 6 | 4 | ✓ | ✓ |
| 9 | Lead Capture & Instant Quotation Forms | R2 / R3 | 5 | 5 | ✓ | ✓ |
| 10 | Admin Portal Authentication & CRM State | R2 / R3 | 6 | 4 | ✓ | ✓ |

## Test Runner & Architecture
- Test Runner: Node.js / Vitest automated test suite (`npm run test` or `node scripts/run-e2e-tests.js`).
- Tests cover:
  1. Build compilation check (`npm run build`).
  2. Router verification (Programmatic navigation across all distinct pages with zero broken links).
  3. Copy integrity check (Verifying "PM Surya Ghar subsidy", "15+ MW", "1,500+", "Thade Suvarna Devi", "9182445679", etc. in source and bundle).
  4. Framer Motion integration (Verifying `<motion.div>`, `<motion.section>`, `AnimatePresence`, spring physics configs).
  5. Modern Tailwind utility classes (`backdrop-blur`, `shadow-2xl`, `bg-gradient-to-r`, `bg-clip-text`, `ring-1`, `border-white/10`).
  6. Mathematical calculation verification across multiple state tariffs and subsidy slabs.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Expected Outcome |
|---|----------|--------------------|------------------|
| 1 | Residential Customer Journey | Home -> PM Surya Ghar Page -> Solar Calculator -> Instant Quote Modal | Correct subsidy (₹78k for 3kW), instant quotation payload generated |
| 2 | Commercial Factory Owner Journey | Home -> Commercial Solar -> Sizing Estimator -> Contact Form | Capex/Opex options, 40% depreciation highlighted, lead tagged |
| 3 | Rural Farmer Irrigation Journey | Home -> Agriculture Solar -> PM KUSUM Guide -> Solar Pump Inquiry | 60% Govt subsidy breakdown, 3-20HP pump options displayed |
| 4 | Telangana/AP Case Study Explorer | Projects Page -> Filter by Commercial -> View Mahaboobnagar Case Study | Detailed 100kW plant specs, ₹14.4 Lakh annual savings verified |
| 5 | Admin Workflow Scenario | Admin Login -> View Leads -> Filter by Status -> Review Blog Management | Secure access, state preservation in storage, dynamic updates |
