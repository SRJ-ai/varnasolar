// web/scripts/suites/tier3-chatbot-and-forms.mjs
// Tier 3: Chatbot 13 NLP Intent Matchers, Form State, WhatsApp URI & Admin CRM Lifecycle

import { describe, test, assert, assertEqual, assertIncludes, assertMatches, assertGreaterThan } from '../test-harness.mjs';

// 13 Canonical Chatbot Intent Dictionaries
export const chatbotIntents = {
  pricing: {
    keywords: ['price', 'cost', 'quote', 'rate', 'how much', 'quotation', 'charges', 'expenditure', 'investment'],
    samplePrompt: 'What is the price of a 5kW rooftop solar system?',
    expectedResponseTopic: 'Pricing & Sizing',
  },
  panel: {
    keywords: ['panel', 'module', 'waaree', 'monocrystalline', 'bifacial', 'n-type', 'topcon', 'half-cut'],
    samplePrompt: 'Do you use Waaree bifacial solar panels?',
    expectedResponseTopic: 'Solar Panels',
  },
  inverter: {
    keywords: ['inverter', 'string inverter', 'microinverter', 'hybrid', 'mppt', 'sungrow', 'growatt', 'grid-tie'],
    samplePrompt: 'Which solar inverter brand is best for home on-grid?',
    expectedResponseTopic: 'Inverters',
  },
  battery: {
    keywords: ['battery', 'lithium', 'storage', 'backup', 'power cut', 'load shedding', 'lifepo4'],
    samplePrompt: 'Can I add a lithium battery storage for nighttime backup?',
    expectedResponseTopic: 'Battery Storage',
  },
  diesel: {
    keywords: ['diesel', 'dg set', 'generator', 'hybrid sync', 'fuel saving', 'dg-pv controller'],
    samplePrompt: 'Can industrial solar synchronize with our diesel generator?',
    expectedResponseTopic: 'Diesel Generator Sync',
  },
  netmetering: {
    keywords: ['net meter', 'net metering', 'discom', 'export', 'bi-directional', 'tsspdcl', 'tsnpdcl', 'apepdcl', 'apspscl'],
    samplePrompt: 'How does net-metering work with TSSPDCL in Hyderabad?',
    expectedResponseTopic: 'Net Metering & DISCOM',
  },
  subsidy: {
    keywords: ['pm surya ghar', 'subsidy', 'grant', '78000', '30000', 'muft bijli', 'dbt', 'central subsidy'],
    samplePrompt: 'How much PM Surya Ghar subsidy can I claim for 3kW?',
    expectedResponseTopic: 'PM Surya Ghar Subsidy',
  },
  sitesurvey: {
    keywords: ['site survey', 'site visit', 'roof inspection', 'feasibility', 'engineer visit', 'free survey'],
    samplePrompt: 'Can you send an engineer for a free rooftop site survey?',
    expectedResponseTopic: 'Site Survey',
  },
  timeline: {
    keywords: ['timeline', 'duration', 'how long', 'how many days', 'installation time', 'commissioning time'],
    samplePrompt: 'How many days does it take to install solar panels?',
    expectedResponseTopic: 'Installation Timeline',
  },
  warranty: {
    keywords: ['warranty', 'guarantee', '25 year', '30 year', 'performance warranty', 'amc', 'maintenance'],
    samplePrompt: 'What warranty do you provide on Waaree solar modules?',
    expectedResponseTopic: 'Warranty & AMC',
  },
  roof: {
    keywords: ['roof area', 'sq ft', 'square feet', 'shadow', 'shadow free', 'tile roof', 'sheet roof', 'rcc roof'],
    samplePrompt: 'How much shadow-free rooftop square feet is needed for 5kW?',
    expectedResponseTopic: 'Rooftop Requirements',
  },
  financing: {
    keywords: ['financing', 'emi', 'bank loan', 'sbi solar loan', 'interest rate', 'zero down', 'loan approval'],
    samplePrompt: 'Do you offer zero down-payment bank EMI loans for solar?',
    expectedResponseTopic: 'Solar Financing & Loans',
  },
  credentials: {
    keywords: ['is varna solar genuine', 'trust', 'company details', 'directors', 'din', 'address', 'experience', 'track record'],
    samplePrompt: 'Is Varna Solar an authorized Waaree partner in Telangana?',
    expectedResponseTopic: 'Company Credentials & Trust',
  },
};

export function matchNLPQuery(input) {
  if (!input || typeof input !== 'string') {
    return {
      matched: false,
      intent: 'fallback',
      reply: 'Please contact our solar advisors at +91 91824 45679 or click below for instant WhatsApp consultation.',
      actionUrl: 'https://wa.me/919182445679',
    };
  }

  const query = input.toLowerCase().trim();
  if (!query) {
    return {
      matched: false,
      intent: 'fallback',
      reply: 'Please contact our solar advisors at +91 91824 45679 or click below for instant WhatsApp consultation.',
      actionUrl: 'https://wa.me/919182445679',
    };
  }

  let bestIntent = null;
  let maxMatches = 0;

  for (const [intentKey, data] of Object.entries(chatbotIntents)) {
    let matchCount = 0;
    for (const kw of data.keywords) {
      if (query.includes(kw)) {
        matchCount++;
      }
    }
    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      bestIntent = intentKey;
    }
  }

  if (bestIntent && maxMatches > 0) {
    return {
      matched: true,
      intent: bestIntent,
      reply: `Information regarding ${chatbotIntents[bestIntent].expectedResponseTopic}: Varna Solar provides premium solutions with tier-1 components.`,
      quickReplies: ['Get a Free Quote', 'Talk to Engineer on WhatsApp', 'Calculate ROI'],
    };
  }

  return {
    matched: false,
    intent: 'fallback',
    reply: 'I am here to help with solar inquiries! You can also chat directly with our engineering team on WhatsApp.',
    actionUrl: 'https://wa.me/919182445679',
    quickReplies: ['PM Surya Ghar Subsidy', 'Rooftop Calculator', 'Book Site Survey'],
  };
}

export function buildWhatsAppQuoteURI({ name, phone, city, systemSizeKW, monthlyBill, estimatedSubsidy }) {
  const base = 'https://wa.me/919182445679';
  const text = `Hello Varna Solar Team,
I would like an instant quotation for rooftop solar installation.
- Customer Name: ${name}
- Phone: ${phone}
- Location: ${city}
- System Capacity: ${systemSizeKW} kW
- Monthly Bill: ₹${monthlyBill}
- Expected Subsidy: ₹${estimatedSubsidy}
Please arrange a site survey and share technical proposal.`;

  return `${base}?text=${encodeURIComponent(text)}`;
}

// In-Memory CRM Store Simulator
export class CRMLeadStore {
  constructor() {
    this.leads = [];
    this.nextId = 1;
  }

  addLead({ name, phone, email = '', service = 'residential', city = 'Hyderabad', systemSizeKW = 3, monthlyBill = 3000, notes = '' }) {
    const lead = {
      id: `LEAD-${String(this.nextId++).padStart(4, '0')}`,
      name,
      phone,
      email,
      service,
      city,
      systemSizeKW,
      monthlyBill,
      status: 'New',
      notes: notes ? [notes] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.leads.push(lead);
    return lead;
  }

  getLeads(filterStatus = null) {
    if (!filterStatus || filterStatus === 'all') return this.leads;
    return this.leads.filter(l => l.status.toLowerCase() === filterStatus.toLowerCase());
  }

  updateLeadStatus(leadId, newStatus, note = '') {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) throw new Error(`Lead ${leadId} not found`);
    lead.status = newStatus;
    if (note) lead.notes.push(note);
    lead.updatedAt = new Date().toISOString();
    return lead;
  }
}

export function registerTier3ChatbotAndForms() {
  describe(3, 'Chatbot 13 NLP Intent Matchers, Form State, WhatsApp URI & Admin CRM Lifecycle', () => {
    test('3.6 Chatbot NLP Engine Accurately Matches All 13 Intent Dictionaries', () => {
      for (const [intentKey, data] of Object.entries(chatbotIntents)) {
        const result = matchNLPQuery(data.samplePrompt);
        assert(result.matched, `Sample prompt for "${intentKey}" should match`);
        assertEqual(result.intent, intentKey, `Prompt "${data.samplePrompt}" should resolve to intent "${intentKey}"`);
      }
    });

    test('3.7 Chatbot Provides Graceful Fallback with Direct WhatsApp Escalation', () => {
      const fallbackResult = matchNLPQuery('Can solar panels survive a supernova explosion?');
      assert(!fallbackResult.matched, 'Unrelated query should not match domain intents');
      assertEqual(fallbackResult.intent, 'fallback', 'Intent should be fallback');
      assertIncludes(fallbackResult.actionUrl, 'https://wa.me/919182445679', 'Fallback should provide WhatsApp helpline link');
    });

    test('3.8 Solar Calculator -> Instant Quotation -> WhatsApp URL Direct Dispatch', () => {
      const url = buildWhatsAppQuoteURI({
        name: 'Venkateswara Rao',
        phone: '9182445679',
        city: 'Jubilee Hills, Hyderabad',
        systemSizeKW: 5,
        monthlyBill: 6000,
        estimatedSubsidy: 78000,
      });

      assert(url.startsWith('https://wa.me/919182445679?text='), 'URL must begin with official Varna Solar WhatsApp endpoint');
      assertIncludes(url, 'Venkateswara', 'URL parameter must include customer name');
      assertIncludes(url, '9182445679', 'URL parameter must include customer phone');
      assertIncludes(url, '78000', 'URL parameter must include subsidy estimate');
      assertIncludes(url, '5%20kW', 'URL parameter must include sized capacity');
    });

    test('3.9 Dynamic 9-Project Portfolio Case Studies Category Filter Logic', () => {
      const caseStudies = [
        { id: 1, name: 'Jubilee Hills Villa', category: 'residential', kw: 5 },
        { id: 2, name: 'Gachibowli Commercial Complex', category: 'commercial', kw: 100 },
        { id: 3, name: 'Pashamylaram Heavy Industry', category: 'industrial', kw: 500 },
        { id: 4, name: 'Warangal Agricultural Farm', category: 'agriculture', kw: 7.5 },
        { id: 5, name: 'Narsingi Luxury Residence', category: 'residential', kw: 20 },
        { id: 6, name: 'Sircilla Textile Mill', category: 'industrial', kw: 250 },
        { id: 7, name: 'Sathupalli Community Pumps', category: 'agriculture', kw: 30 },
        { id: 8, name: 'Assam Solar Streetlights', category: 'commercial', kw: 50 },
        { id: 9, name: 'Kakinada MW Ground Plant', category: 'industrial', kw: 1000 },
      ];

      function filterProjects(cat) {
        if (!cat || cat === 'all') return caseStudies;
        return caseStudies.filter(p => p.category === cat);
      }

      assertEqual(filterProjects('all').length, 9, 'All filter returns 9 case studies');
      assertEqual(filterProjects('residential').length, 2, 'Residential filter returns 2 case studies');
      assertEqual(filterProjects('commercial').length, 2, 'Commercial filter returns 2 case studies');
      assertEqual(filterProjects('industrial').length, 3, 'Industrial filter returns 3 case studies');
      assertEqual(filterProjects('agriculture').length, 2, 'Agriculture filter returns 2 case studies');
    });

    test('3.10 Admin CRM Store Lead Lifecycle State Machine & Persistence', () => {
      const crm = new CRMLeadStore();
      
      // Step 1: Ingest Leads
      const lead1 = crm.addLead({
        name: 'Soma Sekhar',
        phone: '9848012345',
        service: 'commercial',
        city: 'Gachibowli',
        systemSizeKW: 100,
        monthlyBill: 120000,
        notes: 'Interested in Capex model with 40% depreciation',
      });

      const lead2 = crm.addLead({
        name: 'Suvarna Reddy',
        phone: '9182445679',
        service: 'residential',
        city: 'SR Nagar',
        systemSizeKW: 3.5,
        monthlyBill: 4500,
      });

      assertEqual(crm.getLeads().length, 2, 'CRM store should hold 2 leads');
      assertEqual(lead1.status, 'New', 'Initial status should be "New"');

      // Step 2: Update Lead Status
      crm.updateLeadStatus(lead1.id, 'Contacted', 'Called client, scheduled rooftop site survey for tomorrow 11 AM');
      const updatedLead1 = crm.getLeads().find(l => l.id === lead1.id);
      assertEqual(updatedLead1.status, 'Contacted', 'Status should transition to "Contacted"');
      assertEqual(updatedLead1.notes.length, 2, 'Notes history should contain 2 entries');

      // Step 3: Filter by status
      assertEqual(crm.getLeads('New').length, 1, 'Only 1 lead remains in "New" state');
      assertEqual(crm.getLeads('Contacted').length, 1, '1 lead is in "Contacted" state');
    });
  });
}
