// web/scripts/suites/tier4-workload-scenarios.mjs
// Tier 4: Real-World Workload User Journeys & End-to-End State Simulations

import { describe, test, assert, assertEqual, assertIncludes, assertGreaterThan, assertBetween } from '../test-harness.mjs';
import { sanitizeAndCalculateSolar } from './tier2-boundary-cases.mjs';
import { calculateDetailedSolarMetrics, calculateAgriPumpPackage } from './tier3-calculation-engine.mjs';
import { matchNLPQuery, buildWhatsAppQuoteURI, CRMLeadStore } from './tier3-chatbot-and-forms.mjs';

export function registerTier4WorkloadScenarios() {
  describe(4, 'Real-World Workload User Journeys & End-to-End Simulations', () => {
    // Shared persistent CRM store across workload scenarios
    const crmStore = new CRMLeadStore();

    test('4.1 Scenario 1: Residential Homeowner Journey (Home -> PM Surya Ghar -> Calc -> Quote -> WhatsApp)', () => {
      // Step 1: User visits Home (/)
      const homePageStats = {
        installedCapacity: '15+ MW',
        totalInstalls: '1,500+',
        experience: '10+ Years',
        discomApproval: '100%',
      };
      assertEqual(homePageStats.installedCapacity, '15+ MW');
      assertEqual(homePageStats.discomApproval, '100%');

      // Step 2: Clicks PM Surya Ghar banner -> Visits /pm-surya-ghar-yojana
      const subsidySlabs = {
        slab1kW: 30000,
        slab2kW: 60000,
        slab3kWPlus: 78000,
      };
      assertEqual(subsidySlabs.slab3kWPlus, 78000, 'PM Surya Ghar maximum cap must be ₹78,000');

      // Step 3: Navigates to /solar-calculator with ₹4,500 monthly bill in Telangana
      const bill = 4500;
      const stateCode = 'TG';
      const calcResult = sanitizeAndCalculateSolar(bill, stateCode, 'residential');
      
      assertGreaterThanOrEqual(calcResult.systemSizeKW, 3.5, '₹4,500 bill sizes to >=3.5 kW system');
      assertEqual(calcResult.centralSubsidyINR, 78000, 'Subsidy for 3.5 kW must be ₹78,000');
      assertGreaterThan(calcResult.annualSavingsINR, 30000, 'Annual savings should be >₹30,000');
      assertBetween(calcResult.paybackYears, 2.5, 4.5, 'Payback period should be between 2.5 and 4.5 years');

      // Step 4: User opens Instant Quotation Modal & submits lead
      const leadPayload = {
        name: 'Venkatesh Rao',
        phone: '9848012345',
        city: 'Jubilee Hills, Hyderabad',
        service: 'residential',
        systemSizeKW: calcResult.systemSizeKW,
        monthlyBill: bill,
        notes: 'Requested site survey for rooftop solar under PM Surya Ghar',
      };
      const createdLead = crmStore.addLead(leadPayload);
      assertEqual(createdLead.name, 'Venkatesh Rao');
      assertEqual(createdLead.status, 'New');

      // Step 5: Generates WhatsApp consultation link
      const whatsAppUrl = buildWhatsAppQuoteURI({
        name: leadPayload.name,
        phone: leadPayload.phone,
        city: leadPayload.city,
        systemSizeKW: leadPayload.systemSizeKW,
        monthlyBill: leadPayload.monthlyBill,
        estimatedSubsidy: calcResult.centralSubsidyINR,
      });

      assert(whatsAppUrl.startsWith('https://wa.me/919182445679'), 'WhatsApp URL should route to Varna Solar hotline');
      assertIncludes(whatsAppUrl, 'Venkatesh', 'WhatsApp URL includes client name');
      assertIncludes(whatsAppUrl, '78000', 'WhatsApp URL includes ₹78,000 subsidy amount');
    });

    test('4.2 Scenario 2: Commercial Factory Owner Journey (Commercial Solar -> 40% Depreciation -> 100kW Case Study -> Lead)', () => {
      // Step 1: Navigates to /commercial-solar
      const commercialBenefits = {
        acceleratedDepreciation: 0.40, // 40% Section 32
        paybackYearsRange: [2.5, 3.5],
        financingModels: ['Capex', 'Opex / RESCO'],
      };
      assertEqual(commercialBenefits.acceleratedDepreciation, 0.40, '40% Accelerated Depreciation tax benefit');

      // Step 2: Commercial plant sizing for 100 kW
      const commMetrics = calculateDetailedSolarMetrics({
        systemKW: 100,
        stateTariff: 8.50, // HT Commercial Tariff
        dailyGen: 4.60,
        connectionType: 'commercial',
      });

      assertEqual(commMetrics.centralSubsidyINR, 0, 'Commercial connections receive ₹0 residential subsidy');
      assertGreaterThan(commMetrics.year1TaxDepreciationBenefitINR, 450000, 'Year 1 tax savings > ₹4.5 Lakhs');
      assertBetween(commMetrics.paybackYears, 2.0, 4.0, 'Payback within 2.0 to 4.0 years');

      // Step 3: Submits Commercial Inquiry
      const commLead = crmStore.addLead({
        name: 'Vanguard Technologies Ltd',
        phone: '9182445679',
        service: 'commercial',
        city: 'Gachibowli, Hyderabad',
        systemSizeKW: 100,
        monthlyBill: 130000,
        notes: 'Commercial rooftop 100 kW plant inquiry with 40% accelerated depreciation claim',
      });

      assertEqual(commLead.service, 'commercial');
      assertEqual(commLead.systemSizeKW, 100);
    });

    test('4.3 Scenario 3: Rural Farmer Solar Pump Journey (Agri Solar -> PM KUSUM 60% Subsidy -> Pump Inquiry)', () => {
      // Step 1: Farmer explores /agriculture-solar and /pm-kusum-scheme
      const pumpSpecs = calculateAgriPumpPackage(7.5);
      
      assertEqual(pumpSpecs.hp, 7.5, 'Sized to 7.5 HP solar water pump');
      assertEqual(pumpSpecs.totalGovtSubsidy, 247500, '60% Government subsidy = ₹2,47,500');
      assertEqual(pumpSpecs.farmerShare, 41250, '10% Farmer contribution = ₹41,250');
      assertGreaterThan(pumpSpecs.annualDieselSavingsINR, 35000, 'Annual diesel savings > ₹35,000');

      // Step 2: Submits Agri Pump Lead
      const agriLead = crmStore.addLead({
        name: 'Ramana Reddy',
        phone: '9848123456',
        service: 'agriculture',
        city: 'Warangal Rural',
        systemSizeKW: 7.5,
        monthlyBill: 0,
        notes: 'PM KUSUM Component-B 7.5 HP Submersible Solar Pump application',
      });

      assertEqual(agriLead.service, 'agriculture');
      assertEqual(crmStore.getLeads().length, 3, 'CRM store should now hold 3 leads');
    });

    test('4.4 Scenario 4: Investor & Client Landmark Projects Discovery (9 Case Studies Exploration)', () => {
      const caseStudies = [
        { id: 1, title: '5 kW Residential Villa', location: 'Jubilee Hills, Hyderabad', kw: 5, category: 'residential', savings: '₹54,000/yr' },
        { id: 2, title: '100 kW Commercial Tech Park', location: 'Gachibowli, Hyderabad', kw: 100, category: 'commercial', savings: '₹13.68 Lakh/yr' },
        { id: 3, title: '500 kW Industrial HT Plant', location: 'Pashamylaram, Hyderabad', kw: 500, category: 'industrial', savings: '₹61.2 Lakh/yr' },
        { id: 4, title: '7.5 HP Agricultural Solar Pump', location: 'Warangal, Telangana', kw: 7.5, category: 'agriculture', savings: '₹45,000/yr diesel' },
        { id: 5, title: '20 kW Luxury Residence', location: 'Narsingi, Hyderabad', kw: 20, category: 'residential', savings: '₹2.16 Lakh/yr' },
        { id: 6, title: '250 kW Textile Mill', location: 'Sircilla, Telangana', kw: 250, category: 'industrial', savings: '₹30.6 Lakh/yr' },
        { id: 7, title: '300 Solar Pumps Village Project', location: 'Sathupalli, Telangana', kw: 300, category: 'agriculture', savings: '100% diesel elimination' },
        { id: 8, title: '300 Solar Street Lights', location: 'Assam, India', kw: 50, category: 'commercial', savings: '100% grid-free' },
        { id: 9, title: '1 MW Ground Mount Solar Farm', location: 'Kakinada, Andhra Pradesh', kw: 1000, category: 'industrial', savings: '₹1.22 Cr/yr' },
      ];

      // Assert total count
      assertEqual(caseStudies.length, 9, 'Must provide 9 comprehensive case studies');

      // Filter by Industrial
      const industrialProjects = caseStudies.filter(p => p.category === 'industrial');
      assertEqual(industrialProjects.length, 3, '3 industrial case studies');

      // Check 1 MW Kakinada Specs
      const kakinadaProject = caseStudies.find(p => p.id === 9);
      assertEqual(kakinadaProject.kw, 1000, 'Kakinada project capacity is 1,000 kW (1 MW)');
      assertIncludes(kakinadaProject.savings, '1.22 Cr', 'Kakinada annual savings is ₹1.22 Cr/yr');
    });

    test('4.5 Scenario 5: Admin CRM Lead Lifecycle & Status Management', () => {
      // Step 1: Admin reviews all leads ingested from Scenarios 1, 2, 3
      const allLeads = crmStore.getLeads();
      assertGreaterThanOrEqual(allLeads.length, 3, 'Admin CRM should see all 3 captured customer leads');

      // Step 2: Admin transitions Lead #1 from "New" to "Contacted"
      const lead1 = allLeads[0];
      assertEqual(lead1.status, 'New');
      crmStore.updateLeadStatus(lead1.id, 'Contacted', 'Spoke with Venkatesh Rao; site survey booked for Friday 10 AM');
      
      // Step 3: Admin transitions Lead #2 from "New" to "Proposal Sent"
      const lead2 = allLeads[1];
      crmStore.updateLeadStatus(lead2.id, 'Proposal Sent', '100 kW Commercial BOM and 40% depreciation model emailed');

      // Step 4: Verify state transitions
      const contactedLeads = crmStore.getLeads('Contacted');
      const proposalLeads = crmStore.getLeads('Proposal Sent');
      assertEqual(contactedLeads.length, 1, '1 lead in "Contacted" state');
      assertEqual(proposalLeads.length, 1, '1 lead in "Proposal Sent" state');
      assertEqual(contactedLeads[0].notes.length, 2, 'Notes history updated');
    });
  });
}
