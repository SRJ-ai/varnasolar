export interface SuryaGharSlab {
  systemCapacity: string;
  systemCapacityKW: number;
  monthlyConsumptionRangeUnits: string;
  centralSubsidyAmountINR: number;
  subsidyFormulaText: string;
  averageMonthlySavingsINR: string;
  idealForHome: string;
}

export interface SubsidyStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  detailedWorkflow: string;
  turnaroundTime: string;
  responsibleParty: 'Varna Solar' | 'DISCOM Inspector' | 'MNRE National Portal' | 'Customer';
}

export interface KusumComponentDetails {
  id: 'Component-A' | 'Component-B' | 'Component-C';
  name: string;
  subtitle: string;
  targetCategory: string;
  capacityScope: string;
  financialBreakdown: {
    centralSubsidyPct: number;
    stateSubsidyPct: number;
    totalGovtSubsidyPct: number;
    bankLoanPct: number;
    farmerContributionPct: number;
  };
  features: string[];
  economicBenefit: string;
}

export const SUBSIDIES_DATA = {
  pmSuryaGhar: {
    schemeName: 'PM Surya Ghar: Muft Bijli Yojana',
    nodalAgency: 'Ministry of New and Renewable Energy (MNRE), Govt. of India',
    nationalPortalUrl: 'https://pmsuryaghar.gov.in',
    targetBeneficiaries: '1 Crore Indian Residential Households',
    maxSubsidyAmountINR: 78000,
    nationalBudgetINR: '₹75,021 Crores',
    
    slabs: [
      {
        systemCapacity: '1 kW System',
        systemCapacityKW: 1,
        monthlyConsumptionRangeUnits: '0 – 150 Units / Month',
        centralSubsidyAmountINR: 30000,
        subsidyFormulaText: 'Flat ₹30,000 Direct Bank Credit',
        averageMonthlySavingsINR: '₹800 – ₹1,200 / Month',
        idealForHome: '1–2 BHK Apartments, Compact Homes, Essential Lights & Fans',
      },
      {
        systemCapacity: '2 kW System',
        systemCapacityKW: 2,
        monthlyConsumptionRangeUnits: '150 – 300 Units / Month',
        centralSubsidyAmountINR: 60000,
        subsidyFormulaText: '₹30,000 per kW (₹60,000 Total Direct Bank Credit)',
        averageMonthlySavingsINR: '₹1,600 – ₹2,400 / Month',
        idealForHome: '2–3 BHK Independent Homes with Refrigerator & 1 Split AC',
      },
      {
        systemCapacity: '3 kW to 10 kW System',
        systemCapacityKW: 3,
        monthlyConsumptionRangeUnits: '300+ Units / Month',
        centralSubsidyAmountINR: 78000,
        subsidyFormulaText: '₹30k (1st kW) + ₹30k (2nd kW) + ₹18k (3rd kW) = ₹78,000 Max Cap',
        averageMonthlySavingsINR: '₹2,500 – ₹10,000+ / Month',
        idealForHome: 'Duplexes, Luxury Gated Villas, Multi-AC Homes & EV Owners',
      },
    ] as SuryaGharSlab[],

    groupHousingRwaSubsidy: {
      ratePerKwINR: 18000,
      maxCapacityKW: 500,
      description: 'Common facility rooftop solar installations for Residential Welfare Associations (RWA) and Group Housing Societies (GHS) receive ₹18,000 per kW up to 500 kW capacity for elevators, water pumps, and EV charging bays.',
    },

    eligibilityCriteria: [
      'Applicant must possess legal ownership or authorized long-term rights to the residential terrace.',
      'Must have an active domestic Low Tension (LT) electricity connection with local DISCOM (TSSPDCL/TSNPDCL/APEPDCL/APSPDCL).',
      'Minimum shadow-free rooftop area of 80 to 100 sq.ft per 1 kWp system capacity.',
      'Deployment of Domestic Content Requirement (DCR) certified solar PV modules listed under ALMM List-I.',
      'Applicant must hold a valid Aadhaar-linked active bank account for direct DBT transfer.',
    ],

    requiredDocuments: [
      'Latest Domestic Electricity Bill (Consumer Service Number clearly visible)',
      'Applicant Aadhaar Card (linked with active mobile number for OTP authentication)',
      'Property Tax Receipt / Sale Deed / Proof of Rooftop Ownership',
      'Cancelled Bank Cheque or Front Page of Bank Passbook (matching Aadhaar name)',
      'Recent Passport-Size Photograph of the Applicant',
    ],

    claimSteps: [
      {
        stepNumber: 1,
        title: 'National Portal Registration',
        shortDesc: 'Varna Solar registers your consumer service number on pmsuryaghar.gov.in.',
        detailedWorkflow: 'We register your DISCOM electricity consumer service number on the central PM Surya Ghar portal, upload primary KYC documents, and initiate official technical feasibility approval.',
        turnaroundTime: '1 – 2 Days',
        responsibleParty: 'Varna Solar',
      },
      {
        stepNumber: 2,
        title: 'Site & Structural Audit',
        shortDesc: 'Certified engineers conduct 3D shadow analysis and load assessment.',
        detailedWorkflow: 'Our technical team visits your premises to measure shadow-free azimuth, roof load-bearing capability, and optimal string cable routing.',
        turnaroundTime: '24 – 48 Hours',
        responsibleParty: 'Varna Solar',
      },
      {
        stepNumber: 3,
        title: 'Tier-1 EPC Installation',
        shortDesc: 'Execution with Waaree ALMM Tier-1 panels and smart inverters.',
        detailedWorkflow: 'Turnkey installation of Tier-1 DCR solar panels, hot-dip galvanized mounting structures, chemical earthing pits, and surge protection boxes.',
        turnaroundTime: '5 – 7 Working Days',
        responsibleParty: 'Varna Solar',
      },
      {
        stepNumber: 4,
        title: 'DISCOM Net-Metering Commissioning',
        shortDesc: 'Utility inspector tests plant and installs bidirectional meter.',
        detailedWorkflow: 'State DISCOM technical engineers inspect the installation, test anti-islanding safety features, install the bidirectional net meter, and issue the official Joint Inspection Report (JIR).',
        turnaroundTime: '7 – 14 Days',
        responsibleParty: 'DISCOM Inspector',
      },
      {
        stepNumber: 5,
        title: 'Direct Bank Subsidy Credit (DBT)',
        shortDesc: 'Up to ₹78,000 transferred straight into your Aadhaar bank account.',
        detailedWorkflow: 'Commissioning certificate and bank verification details are submitted to the national portal. The Central Government transfers up to ₹78,000 directly to your bank account within 30 days.',
        turnaroundTime: '15 – 30 Days',
        responsibleParty: 'MNRE National Portal',
      },
    ] as SubsidyStep[],
  },

  pmKusum: {
    schemeName: 'PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan)',
    nodalAgency: 'Ministry of New and Renewable Energy (MNRE) & State Nodal Agencies (TGREDCO / NREDCAP)',
    totalGovtSubsidyPct: 60,
    centralSharePct: 30,
    stateSharePct: 30,
    bankLoanPct: 30,
    farmerContributionPct: 10,
    annualDieselSavingsRangeINR: '₹35,000 – ₹65,000 per pump set per year',
    
    components: [
      {
        id: 'Component-A',
        name: 'Component A: Decentralized Solar Power Plants',
        subtitle: 'Setting up 500 kW to 2 MW Solar Plants on Farmland',
        targetCategory: 'Individual Farmers, Farmer Producer Organizations (FPOs), Cooperatives',
        capacityScope: '500 kW to 2 MW Capacity',
        financialBreakdown: {
          centralSubsidyPct: 0,
          stateSubsidyPct: 0,
          totalGovtSubsidyPct: 0,
          bankLoanPct: 70,
          farmerContributionPct: 30,
        },
        features: [
          'Installed on barren, fallow, or cultivable agricultural land within 5 km radius of 33/11 kV substations',
          'Power purchased by local DISCOM under 25-Year Power Purchase Agreement (PPA)',
          'Provides stable recurring rental/tariff income of ₹25,000 to ₹40,000 per acre per year',
          'Farmers can continue cultivating shade-loving crops beneath elevated solar panel structures',
        ],
        economicBenefit: 'Guaranteed 25-year monthly revenue stream from DISCOM feed-in tariffs with bankable collateral.',
      },
      {
        id: 'Component-B',
        name: 'Component B: Standalone Solar Agricultural Pumps',
        subtitle: 'Replacement of Diesel Pumps with Off-Grid Solar Pumps',
        targetCategory: 'Individual Off-Grid Farmers in Non-Electrified Zones',
        capacityScope: '3 HP, 5 HP, 7.5 HP and up to 10 HP Submersible & Surface Pumps',
        financialBreakdown: {
          centralSubsidyPct: 30,
          stateSubsidyPct: 30,
          totalGovtSubsidyPct: 60,
          bankLoanPct: 30,
          farmerContributionPct: 10,
        },
        features: [
          '60% Government Subsidy (30% Central + 30% State Govt) directly credited to vendor',
          '30% institutional bank loan at subsidized priority sector interest rates',
          'Farmer invests only 10% upfront margin money',
          '100% replaces diesel pumps, eliminating 800–1,200 liters of annual diesel fuel expense',
          'Automated MPPT pump controllers with dry-run and reverse polarity protection',
        ],
        economicBenefit: 'Zero diesel fuel cost; reliable daytime water discharge during peak sunshine hours.',
      },
      {
        id: 'Component-C',
        name: 'Component C: Solarization of Grid-Connected Pumps',
        subtitle: 'Solarizing Existing Agricultural Connections with Net-Metering',
        targetCategory: 'Farmers with Existing Grid-Connected Agricultural Pumpsets',
        capacityScope: 'Up to 2 Times Pump Capacity in kW (e.g. 15 kWp Array for 7.5 HP Pump)',
        financialBreakdown: {
          centralSubsidyPct: 30,
          stateSubsidyPct: 30,
          totalGovtSubsidyPct: 60,
          bankLoanPct: 30,
          farmerContributionPct: 10,
        },
        features: [
          '60% total government financial subsidy support',
          'Supplies daytime power directly to existing electric borewell pump',
          'Surplus generated solar units exported back to DISCOM grid via net-meter',
          'Farmers receive monetary credits/income from DISCOM for exported surplus clean energy',
        ],
        economicBenefit: 'Daytime farming convenience without nighttime grid trips plus supplemental power export income.',
      },
    ] as KusumComponentDetails[],
  },
};
