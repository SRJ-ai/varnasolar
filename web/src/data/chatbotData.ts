export interface ChatbotIntent {
  intentId: string;
  intentName: string;
  keywords: string[];
  replyMarkdown: string;
  quickReplies: string[];
  primaryActionUrl?: string;
  primaryActionLabel?: string;
}

export interface ChatQuickTopic {
  id: string;
  label: string;
  iconName: string;
  promptText: string;
}

export const CHATBOT_QUICK_TOPICS: ChatQuickTopic[] = [
  { id: 't1', label: 'PM Surya Ghar Subsidy', iconName: 'Gift', promptText: 'Tell me about PM Surya Ghar Subsidy slabs and eligibility' },
  { id: 't2', label: 'How Much Can I Save?', iconName: 'TrendingUp', promptText: 'How much money can I save on my electricity bill?' },
  { id: 't3', label: 'What Size System Do I Need?', iconName: 'Maximize2', promptText: 'What system size kW is needed for my home?' },
  { id: 't4', label: 'Net Metering & DISCOM', iconName: 'Zap', promptText: 'How does DISCOM net metering work in Telangana and AP?' },
  { id: 't5', label: 'Commercial Solar ROI', iconName: 'Building2', promptText: 'What are the commercial solar tax benefits and ROI?' },
  { id: 't6', label: 'PM KUSUM Agri Pumps', iconName: 'Sprout', promptText: 'How does PM KUSUM solar pump subsidy work for farmers?' },
  { id: 't7', label: 'Installation Timeline', iconName: 'Clock', promptText: 'How long does solar installation and net metering take?' },
  { id: 't8', label: 'About Varna Solar & Offices', iconName: 'Award', promptText: 'Tell me about Varna Solar leadership, DINs, and branch offices' },
];

export const CHATBOT_INTENTS: ChatbotIntent[] = [
  {
    intentId: 'pricing_cost',
    intentName: 'Pricing, Cost & Quotation',
    keywords: ['price', 'cost', 'rate', 'quote', 'pricing', 'expensive', 'cheap', 'budget', 'how much', 'inr', 'slab', 'cost per kw', 'estimate', 'quotation', 'charges'],
    replyMarkdown: `
**Varna Solar Turnkey Pricing & Subsidy Slabs:**

Indicative turnkey costs (Tier-1 Waaree DCR panels + Smart MPPT Inverter + HDG Structure + Net Metering):
• **1 kW System**: ~₹65,000 – ₹75,000 *(After ₹30k subsidy: **~₹35k – ₹45k**)*
• **2 kW System**: ~₹1,30,000 – ₹1,45,000 *(After ₹60k subsidy: **~₹70k – ₹85k**)*
• **3 kW System**: ~₹1,85,000 – ₹2,10,000 *(After ₹78k subsidy: **~₹1.07L – ₹1.32L**)*
• **5 kW System**: ~₹2,90,000 – ₹3,30,000 *(After ₹78k subsidy: **~₹2.12L – ₹2.52L**)*
• **10 kW System**: ~₹5,40,000 – ₹6,00,000 *(After ₹78k subsidy: **~₹4.62L – ₹5.22L**)*

*All quotes include statutory 30-year panel warranty, 5-year workmanship warranty, and complete DISCOM net-metering liaison.*
    `,
    quickReplies: ['Calculate Exact Savings', 'PM Surya Ghar Details', 'Book Free Site Survey'],
    primaryActionUrl: '/solar-calculator',
    primaryActionLabel: 'Launch Solar Calculator',
  },
  {
    intentId: 'subsidy_pmsuryaghar',
    intentName: 'PM Surya Ghar: Muft Bijli Yojana',
    keywords: ['subsidy', 'pm surya ghar', 'muft bijli', 'government subsidy', '78000', '30000', '60000', 'dbt', 'central subsidy', 'yojana', 'modi solar', 'subsidy claim', 'free electricity'],
    replyMarkdown: `
**PM Surya Ghar: Muft Bijli Yojana Central DBT Subsidies:**

• **1 kW Plant**: **₹30,000** direct bank transfer (saves ₹800–₹1,200/mo)
• **2 kW Plant**: **₹60,000** direct bank transfer (saves ₹1,600–₹2,400/mo)
• **3 kW to 10 kW Plant**: **₹78,000 Maximum Cap** (saves ₹2,500–₹10,000+/mo)

**Varna Solar handles 100% of the portal paperwork**: We register your domestic service number on \`pmsuryaghar.gov.in\`, install ALMM Tier-1 modules, coordinate DISCOM inspection, and track DBT credit directly to your Aadhaar-linked bank account within 30 days!
    `,
    quickReplies: ['Check Eligibility', 'Documents Required', 'Calculate My Subsidy'],
    primaryActionUrl: '/pm-surya-ghar-yojana',
    primaryActionLabel: 'View Complete Subsidy Guide',
  },
  {
    intentId: 'pm_kusum_agri',
    intentName: 'PM-KUSUM Agriculture Solar Pumps',
    keywords: ['kusum', 'agriculture', 'farm', 'farmer', 'pump', 'borewell', 'irrigation', 'hp', 'diesel pump', 'kisan', 'paddy', 'motor', 'agri solar', 'submersible', 'open well'],
    replyMarkdown: `
**PM-KUSUM Scheme for Farmers in Telangana & Andhra Pradesh:**

Get up to **60% Government Subsidy** (30% Central MNRE + 30% State Govt) on high-efficiency solar water pumps:
• **Total Govt Subsidy**: 60%
• **Bank Loan**: 30% (Low agricultural interest)
• **Farmer Contribution**: **Only 10%**

**Pump Sizes Available**: 3 HP, 5 HP, 7.5 HP, 10 HP to 20 HP borewell submersible and open-well surface pumps.
*Eliminates diesel costs completely, saving ₹35,000 to ₹65,000 every year with automated daytime irrigation.*
    `,
    quickReplies: ['PM KUSUM Details', 'Agri Pump Sizing', 'Speak to Agri Engineer'],
    primaryActionUrl: '/pm-kusum-scheme',
    primaryActionLabel: 'Explore PM KUSUM Guide',
  },
  {
    intentId: 'system_sizing',
    intentName: 'System Sizing & Rooftop Area',
    keywords: ['size', 'kw', 'capacity', 'roof', 'area', 'sqft', 'square feet', 'how many panels', 'space', 'terrace', 'sq meter', 'dimension', 'shadow', 'how big'],
    replyMarkdown: `
**Solar System Sizing Rules of Thumb:**

Rule: Every **1 kWp** of solar PV requires approximately **80 to 100 sq.ft** of shadow-free rooftop space:
• **Monthly Bill ₹1,500 – ₹2,500** ➔ **2 kW** (~160–200 sq.ft)
• **Monthly Bill ₹3,000 – ₹5,000** ➔ **3 kW** (~250–300 sq.ft)
• **Monthly Bill ₹5,000 – ₹8,000** ➔ **5 kW** (~400–500 sq.ft)
• **Monthly Bill ₹10,000 – ₹18,000** ➔ **8–10 kW** (~700–1,000 sq.ft)
• **Monthly Bill ₹20,000+** ➔ **15–20 kW+** (1,200+ sq.ft)

*Varna Solar conducts free 3D CAD shadow modeling to optimize generation for elevated structures.*
    `,
    quickReplies: ['Open Solar Calculator', 'Book Free Roof Survey', 'Contact Engineer'],
    primaryActionUrl: '/solar-calculator',
    primaryActionLabel: 'Calculate Exact Capacity',
  },
  {
    intentId: 'savings_roi',
    intentName: 'Financial Savings, Payback & ROI',
    keywords: ['saving', 'savings', 'bill reduction', 'roi', 'payback', 'return', 'offset', 'units', 'kwh', 'investment return', 'how much save', 'money saved', 'break even'],
    replyMarkdown: `
**Solar Financial Returns & Payback Period:**

• **Electricity Bill Reduction**: Up to **90%** reduction on monthly bills.
• **Residential Payback**: **3.0 to 3.8 Years** (with ₹78,000 PM Surya Ghar subsidy).
• **Commercial & Industrial Payback**: **2.5 to 3.2 Years** (with 40% Accelerated Depreciation).
• **25-Year Cumulative Savings**: ₹8 Lakhs to ₹30 Lakhs+ for homes; ₹1 Cr+ for commercial plants.
• **Annual ROI**: **25% to 35% tax-free return** on net capital invested.
    `,
    quickReplies: ['Calculate 25-Yr ROI', 'Residential Solutions', 'Commercial Solutions'],
    primaryActionUrl: '/solar-calculator',
    primaryActionLabel: 'View Detailed ROI Breakdown',
  },
  {
    intentId: 'residential_solar',
    intentName: 'Residential Rooftop Solar Systems',
    keywords: ['residential', 'home', 'house', 'villa', 'apartment', 'domestic', 'rooftop', 'individual house', 'gated community', 'flat', 'housing society', 'duplex'],
    replyMarkdown: `
**Residential Solar Power Solutions by Varna Solar:**

We engineer three robust residential configurations:
1. **On-Grid Solar (Most Popular)**: Direct net-metering with TSSPDCL/APEPDCL. Eligible for full ₹78k subsidy. Lowest upfront cost, 3-year payback.
2. **Hybrid Solar**: On-grid net metering combined with a Lithium-ion battery bank for 24/7 uninterrupted power during outages.
3. **Elevated Gazebo Structure**: High-clearance structures allowing you to use your entire rooftop terrace for recreation or gardening.
    `,
    quickReplies: ['Explore Residential Solar', 'PM Surya Ghar Subsidy', 'Book Site Visit'],
    primaryActionUrl: '/residential-solar',
    primaryActionLabel: 'Explore Residential Solar',
  },
  {
    intentId: 'commercial_industrial',
    intentName: 'Commercial & Industrial Solar (MW Scale)',
    keywords: ['commercial', 'industrial', 'factory', 'company', 'warehouse', 'ht', 'open access', 'accelerated depreciation', 'business', 'hospital', 'school', 'college', 'textile', 'pharma', 'office', 'megawatt', 'mw'],
    replyMarkdown: `
**Commercial & Industrial Turnkey Solar EPC:**

Cut commercial power tariffs (₹8.50–₹11.50/unit) by **80% to 90%**:
• **Capacities**: 10 kW to 5 MW+ (Rooftop PEB shed, Ground Mount & Solar Carports)
• **Tax Advantage**: **40% Accelerated Depreciation** under Section 32 in Year 1
• **Grid Integration**: High Tension (11kV / 33kV) synchronization with zero-export protection
• **Solar-DG Hybrid**: Smart synchronization cuts diesel generator fuel consumption by 70–80%
• **Real-Time IoT SCADA**: Remote generation tracking with automated fault alerts
    `,
    quickReplies: ['Industrial Solutions', 'Commercial Solutions', 'Speak to Industrial Expert'],
    primaryActionUrl: '/commercial-solar',
    primaryActionLabel: 'Explore Commercial Solar',
  },
  {
    intentId: 'net_metering_discom',
    intentName: 'DISCOM Net-Metering & Grid Synchronisation',
    keywords: ['net meter', 'net-meter', 'net metering', 'discom', 'tsspdcl', 'tsnpdcl', 'apepdcl', 'apspdcl', 'grid export', 'bi-directional', 'approval', 'jir', 'meter change', 'power export'],
    replyMarkdown: `
**DISCOM Net-Metering Process & 100% Track Record:**

A bi-directional meter measures energy in both directions:
1. Daytime surplus solar power is exported to the DISCOM grid for bill credits.
2. Nighttime power is imported from the grid.
3. Your monthly invoice reflects only the net difference!

**Coverage & Liaison**: We handle end-to-end approvals across **TSSPDCL**, **TSNPDCL**, **APEPDCL**, **APSPDCL**, and **APCPDCL** with a verified **100% net-meter approval success rate**.
    `,
    quickReplies: ['Subsidy Flowchart', 'Residential Solar', 'Contact Headquarters'],
    primaryActionUrl: '/pm-surya-ghar-yojana',
    primaryActionLabel: 'View Net Metering Process',
  },
  {
    intentId: 'battery_storage_hybrid',
    intentName: 'Battery Backup & Hybrid Systems',
    keywords: ['battery', 'storage', 'backup', 'lithium', 'lead acid', 'power cut', 'hybrid', 'off-grid', 'inverter battery', 'uninterrupted', 'blackout', 'tubular', 'lifepo4'],
    replyMarkdown: `
**Solar Energy Storage & Battery Options:**

• **Lithium Iron Phosphate (LiFePO4)**: 10+ years operational life, 6,000+ cycles, 90% depth of discharge, compact wall-mount, zero maintenance.
• **Tall Tubular Lead-Acid**: 3–5 years life, economical upfront cost, ideal for basic home lighting backup.

*For urban Hyderabad and Andhra Pradesh homes, we recommend Hybrid Inverters with 5kWh or 10kWh Lithium batteries for seamless blackout protection.*
    `,
    quickReplies: ['Hybrid Solar Specs', 'Calculate Battery Sizing', 'Book Site Survey'],
    primaryActionUrl: '/residential-solar',
    primaryActionLabel: 'Explore Hybrid Solar',
  },
  {
    intentId: 'panels_modules_waaree',
    intentName: 'Solar PV Modules, Waaree Partnership & DCR',
    keywords: ['panel', 'module', 'waaree', 'monocrystalline', 'bifacial', 'topcon', 'dcr', 'almm', 'tier 1', 'watt', '540w', '550w', 'efficiency', 'solar plate'],
    replyMarkdown: `
**Tier-1 ALMM Module Technology (Waaree Energies Partner):**

As an **Authorized Waaree Energies Channel Partner**, Varna Solar deploys only premium Tier-1 ALMM List-I certified modules:
• **Mono PERC & N-Type TOPCon**: >21.5% conversion efficiency
• **Bifacial Glass-to-Glass**: Generates up to 25% extra energy from rear reflected albedo light
• **Linear Warranty**: **30-Year Performance Warranty** (maintains >80% output at Year 30)
• **Certifications**: Anti-PID, BIS, IEC 61215, Class-VI Salt Mist Corrosion certified
    `,
    quickReplies: ['Why Choose Varna', 'View Completed Projects', 'Request Quote'],
    primaryActionUrl: '/why-choose-us',
    primaryActionLabel: 'Why Choose Varna Solar',
  },
  {
    intentId: 'warranty_amc_maintenance',
    intentName: 'Warranties, Maintenance & 30-Year AMC',
    keywords: ['warranty', 'guarantee', 'amc', 'maintenance', 'cleaning', 'service', 'repair', 'life', 'lifespan', 'breakdown', 'complaint', 'service sla', '48 hours'],
    replyMarkdown: `
**Varna Solar Comprehensive Warranties & Service SLA:**

• **Solar PV Panels**: **30-Year Linear Performance Guarantee** (Waaree Energies)
• **Solar Inverters**: **5 to 10 Years** Manufacturer Replacement Warranty
• **Mounting Structures**: **10-Year Structural Integrity Warranty** (Hot-Dip Galvanized)
• **Workmanship & Wiring**: **5-Year Workmanship Warranty**
• **Service SLA**: Dedicated **48-Hour On-Site Resolution SLA** across Telangana & AP
• **30-Year AMC**: Optional bi-monthly cleaning, thermal health scans, and earthing audits
    `,
    quickReplies: ['Why Choose Us', 'Read Maintenance Guide', 'Contact Support'],
    primaryActionUrl: '/why-choose-us',
    primaryActionLabel: 'View Warranty Details',
  },
  {
    intentId: 'installation_timeline_process',
    intentName: 'Installation Timeline & 8-Step Turnkey Process',
    keywords: ['process', 'timeline', 'how long', 'duration', 'steps', 'procedure', 'site survey', 'audit', 'time to install', 'commissioning time', 'fast track', 'days'],
    replyMarkdown: `
**Our 8-Step Turnkey Solar Delivery Timeline:**

1. **Day 1**: Free Consultation & Bill Energy Audit
2. **Day 2**: 3D Rooftop Survey & Shadow Simulation
3. **Day 3**: Custom System Engineering & SLD Design
4. **Day 4**: Transparent Itemized Proposal & Subsidy Filing
5. **Day 5–10**: Turnkey EPC Physical Installation on your roof
6. **Day 11**: Pre-Commissioning Quality & Safety Testing
7. **Day 15–25**: DISCOM Bi-Directional Net-Meter Synchronization
8. **Day 30–45**: Direct Subsidy DBT Credit to your Bank Account
    `,
    quickReplies: ['Book Free Consultation', 'Explore Projects', 'Call Headquarters'],
    primaryActionUrl: '/about-us',
    primaryActionLabel: 'Explore 8-Step Process',
  },
  {
    intentId: 'about_company_contact',
    intentName: 'About Varna Solar, Leadership DINs, Branches & Contact',
    keywords: ['about', 'who are you', 'company', 'varnasolar', 'office', 'address', 'phone', 'contact', 'hyderabad', 'branches', 'directors', 'din', 'ceo', 'suvarna', 'soma sekhar', 'sr nagar', 'vizag', 'adilabad', 'vempalli', 'tandur'],
    replyMarkdown: `
**About Varna Solar Pvt. Ltd.:**

• **Authorized Waaree Energies Franchisee Partner** with 10+ Years EPC Excellence
• **Leadership & MCA DINs**:
  - Managing Director: **Mrs. Thade Suvarna Devi** (DIN: \`07095392\` / \`11069758\`)
  - Executive Director: **Mr. Thade Soma Sekhar** (DIN: \`07095383\` / \`11069757\`)
• **Corporate Stats**: 15+ MW Installed, 1,500+ Projects, ₹12 Cr+ Annual Client Savings
• **Headquarters**: 8-3-214/7/1A, 2nd Floor, Pillar No: 1036, SR Nagar, Hyderabad 500038
• **Branch Network**: Hyderabad HQ, Visakhapatnam (Vizag), Adilabad, Vempalli (Kadapa), Tandur
• **Direct Hotline**: **+91 91824 45679** | Email: **info@varnasolar.com**
    `,
    quickReplies: ['Contact Headquarters', 'Branch Offices', 'WhatsApp Us Now'],
    primaryActionUrl: '/contact',
    primaryActionLabel: 'Contact Headquarters',
  },
];

export function matchChatbotIntent(userInput: string): { replyMarkdown: string; quickReplies: string[]; primaryActionUrl?: string; primaryActionLabel?: string } {
  const normalized = userInput.toLowerCase().trim();
  
  for (const intent of CHATBOT_INTENTS) {
    for (const keyword of intent.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        return {
          replyMarkdown: intent.replyMarkdown,
          quickReplies: intent.quickReplies,
          primaryActionUrl: intent.primaryActionUrl,
          primaryActionLabel: intent.primaryActionLabel,
        };
      }
    }
  }

  return {
    replyMarkdown: `
I'm here to assist you with everything related to solar power! You can ask about:
• **PM Surya Ghar Subsidy** (up to ₹78,000 direct bank transfer)
• **Savings & System Sizing** for your home or business
• **Commercial & Industrial MW Solar** (with 40% tax depreciation)
• **PM KUSUM Agriculture Solar Pumps** (60% subsidy for farmers)
• **DISCOM Net Metering** (TSSPDCL, TSNPDCL, APEPDCL, APSPDCL)

Would you like to calculate your savings or speak directly with our senior solar engineer?
    `,
    quickReplies: ['Calculate Solar Savings', 'PM Surya Ghar Subsidy', 'WhatsApp Senior Engineer (+91 91824 45679)'],
    primaryActionUrl: '/solar-calculator',
    primaryActionLabel: 'Launch Solar Calculator',
  };
}
