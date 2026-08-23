export interface CompanyDirector {
  name: string;
  role: string;
  din: string;
  altDin?: string;
  bio: string;
  avatarUrl: string;
  qualifications: string;
}

export interface BranchOffice {
  id: string;
  city: string;
  district: string;
  state: 'Telangana' | 'Andhra Pradesh';
  isHQ: boolean;
  address: string;
  landmark: string;
  phone: string;
  email: string;
  workingHours: string;
  googleMapsUrl?: string;
}

export interface ClientPartner {
  id: string;
  name: string;
  category: 'Enterprise' | 'PSU & Govt' | 'Infrastructure' | 'Power Utility';
  logoPlaceholderText: string;
}

export interface DiscomCoverage {
  code: string;
  fullName: string;
  state: 'Telangana' | 'Andhra Pradesh';
  coverageDistricts: string[];
  helpline: string;
  website: string;
}

export interface CompanyStats {
  yearsOfExcellence: string;
  totalCapacityMW: string;
  completedInstallations: string;
  cumulativeSavingsINR: string;
  customerSatisfactionPct: string;
  discomApprovalRate: string;
  certifiedEngineers: string;
  panelLinearWarrantyYears: string;
  inverterWarrantyYears: string;
  installationSlaDays: string;
  groupTurnoverINR: string;
}

export const COMPANY_DATA = {
  legalName: 'Varna Solar Pvt. Ltd.',
  brandName: 'Varna Solar',
  tagline: 'Power Your Future With Smart Solar Solutions',
  partnerStatus: 'Authorized Waaree Energies Channel Partner & Franchisee',
  cin: 'U35105TS2025PTC197488',
  tan: 'HYDV28422C',
  gstNumber: '36AAACV1234F1Z5',
  establishedYear: 2014,
  
  contact: {
    primaryPhone: '+91 91824 45679',
    formattedPhone: '+91 91824 45679',
    rawPhone: '919182445679',
    whatsappLink: 'https://wa.me/919182445679?text=Hello%20Varna%20Solar%2C%20I%20would%20like%20to%20get%20a%20free%20solar%20consultation%20and%20subsidy%20quote.',
    infoEmail: 'info@varnasolar.com',
    adminEmail: 'admin@varnasolar.com',
    supportEmail: 'support@varnasolar.com',
    websiteUrl: 'https://www.varnasolar.com',
    operatingHours: 'Monday - Saturday: 9:00 AM - 7:00 PM IST (Sunday Closed)',
  },

  stats: {
    yearsOfExcellence: '10+',
    totalCapacityMW: '15+ MW',
    completedInstallations: '1,500+',
    cumulativeSavingsINR: '₹12 Cr+',
    customerSatisfactionPct: '98%',
    discomApprovalRate: '100%',
    certifiedEngineers: '25+',
    panelLinearWarrantyYears: '30 Years',
    inverterWarrantyYears: '5–10 Years',
    installationSlaDays: '5–7 Days',
    groupTurnoverINR: '₹720+ Cr (Raion Techno Group)',
  } as CompanyStats,

  leadership: [
    {
      name: 'Mrs. Thade Suvarna Devi',
      role: 'Managing Director & Co-Founder',
      din: '07095392',
      altDin: '11069758',
      bio: 'Visionary co-founder of Varna Solar Pvt. Ltd., steering the company to become one of South India’s premier solar EPC organizations. Champion of renewable energy adoption, sustainable corporate governance, and nationwide PM Surya Ghar execution.',
      qualifications: 'B.Tech, M.B.A (Executive Management)',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Mr. Thade Soma Sekhar',
      role: 'Executive Director — Engineering & Operations',
      din: '07095383',
      altDin: '11069757',
      bio: 'Pioneering solar EPC technocrat with 15+ years of engineering leadership across high-tension (11kV/33kV) utility substations, MW-scale captive solar plants, and state DISCOM net-metering infrastructure.',
      qualifications: 'B.Tech (Electrical & Electronics Engineering), M.Tech (Power Systems)',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
  ] as CompanyDirector[],

  branches: [
    {
      id: 'branch-hyd-hq',
      city: 'Hyderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      isHQ: true,
      address: '8-3-214/7/1A, 2nd Floor, Pillar No: 1036, Sanjeeva Reddy Nagar (SR Nagar), Hyderabad 500038',
      landmark: 'Near Metro Pillar No: 1036, SR Nagar Metro Corridor',
      phone: '+91 91824 45679',
      email: 'info@varnasolar.com',
      workingHours: '9:00 AM - 7:00 PM IST',
    },
    {
      id: 'branch-vizag',
      city: 'Visakhapatnam (Vizag)',
      district: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      isHQ: false,
      address: 'D.No 48-14-44/1, 1st Floor, Rama Talkies Road, Dwaraka Nagar, Visakhapatnam 530016',
      landmark: 'Near Rama Talkies Junction',
      phone: '+91 91824 45679',
      email: 'vizag@varnasolar.com',
      workingHours: '9:30 AM - 6:30 PM IST',
    },
    {
      id: 'branch-adilabad',
      city: 'Adilabad',
      district: 'Adilabad',
      state: 'Telangana',
      isHQ: false,
      address: 'H.No 4-2-118, Main Road, Near Old Bus Stand, Adilabad 504001',
      landmark: 'Opposite District Library, Old Bus Stand Road',
      phone: '+91 91824 45679',
      email: 'adilabad@varnasolar.com',
      workingHours: '9:30 AM - 6:30 PM IST',
    },
    {
      id: 'branch-vempalli',
      city: 'Vempalli',
      district: 'YSR Kadapa',
      state: 'Andhra Pradesh',
      isHQ: false,
      address: 'Door No 7/234, Rayachoty Road, Vempalli, YSR Kadapa District 516321',
      landmark: 'Main Highway Junction, Rayachoty Road',
      phone: '+91 91824 45679',
      email: 'vempalli@varnasolar.com',
      workingHours: '9:30 AM - 6:30 PM IST',
    },
    {
      id: 'branch-tandur',
      city: 'Tandur',
      district: 'Vikarabad',
      state: 'Telangana',
      isHQ: false,
      address: 'Shop No 3-1-55, Station Road, Tandur, Vikarabad District 501141',
      landmark: 'Near Railway Station Road',
      phone: '+91 91824 45679',
      email: 'tandur@varnasolar.com',
      workingHours: '9:30 AM - 6:30 PM IST',
    },
  ] as BranchOffice[],

  clientLogos: [
    { id: 'c1', name: 'Airport Authority of India', category: 'PSU & Govt', logoPlaceholderText: 'AAI' },
    { id: 'c2', name: 'Ashok Leyland', category: 'Enterprise', logoPlaceholderText: 'Ashok Leyland' },
    { id: 'c3', name: 'Bondada Engineering & Energy', category: 'Enterprise', logoPlaceholderText: 'Bondada' },
    { id: 'c4', name: 'Cement Corporation of India (CCI)', category: 'PSU & Govt', logoPlaceholderText: 'CCI' },
    { id: 'c5', name: 'GMR Group', category: 'Infrastructure', logoPlaceholderText: 'GMR' },
    { id: 'c6', name: 'Greenko Energies', category: 'Power Utility', logoPlaceholderText: 'Greenko' },
    { id: 'c7', name: 'ITC Limited', category: 'Enterprise', logoPlaceholderText: 'ITC' },
    { id: 'c8', name: 'Phoenix Group', category: 'Enterprise', logoPlaceholderText: 'Phoenix' },
    { id: 'c9', name: 'Penna Cement', category: 'Enterprise', logoPlaceholderText: 'Penna Cement' },
    { id: 'c10', name: 'Ramagundam Fertilizers & Chemicals (RFCL)', category: 'PSU & Govt', logoPlaceholderText: 'RFCL' },
    { id: 'c11', name: 'SRR Projects', category: 'Infrastructure', logoPlaceholderText: 'SRR Projects' },
    { id: 'c12', name: 'Singareni Thermal Power Plant (STPP)', category: 'Power Utility', logoPlaceholderText: 'STPP' },
    { id: 'c13', name: 'TGGENCO', category: 'Power Utility', logoPlaceholderText: 'TGGENCO' },
    { id: 'c14', name: 'TGREDCO', category: 'PSU & Govt', logoPlaceholderText: 'TGREDCO' },
    { id: 'c15', name: 'APGENCO', category: 'Power Utility', logoPlaceholderText: 'APGENCO' },
    { id: 'c16', name: 'Bharat Heavy Electricals Limited (BHEL)', category: 'PSU & Govt', logoPlaceholderText: 'BHEL' },
    { id: 'c17', name: 'Hyderabad Metropolitan Dev Authority (HMDA)', category: 'PSU & Govt', logoPlaceholderText: 'HMDA' },
    { id: 'c18', name: 'My Home Group', category: 'Enterprise', logoPlaceholderText: 'My Home Group' },
    { id: 'c19', name: 'NHPC Limited', category: 'Power Utility', logoPlaceholderText: 'NHPC' },
    { id: 'c20', name: 'NMDC Limited', category: 'PSU & Govt', logoPlaceholderText: 'NMDC' },
    { id: 'c21', name: 'NTPC Limited', category: 'Power Utility', logoPlaceholderText: 'NTPC' },
    { id: 'c22', name: 'Pioneer Torsteel', category: 'Enterprise', logoPlaceholderText: 'Pioneer' },
    { id: 'c23', name: 'Indian Railways (South Central Railway)', category: 'PSU & Govt', logoPlaceholderText: 'Indian Railways' },
    { id: 'c24', name: 'Tirumala Tirupati Devasthanams (TTD)', category: 'PSU & Govt', logoPlaceholderText: 'TTD' },
    { id: 'c25', name: 'Telangana State Industrial Corp (TSIIC)', category: 'PSU & Govt', logoPlaceholderText: 'TSIIC' },
    { id: 'c26', name: 'Uranium Corporation of India (UCIL)', category: 'PSU & Govt', logoPlaceholderText: 'UCIL' },
    { id: 'c27', name: 'Vizag Steel (RINL)', category: 'PSU & Govt', logoPlaceholderText: 'Vizag Steel' },
    { id: 'c28', name: 'Visakhapatnam Port Authority', category: 'PSU & Govt', logoPlaceholderText: 'Vizag Port' },
    { id: 'c29', name: 'Wipro Enterprises', category: 'Enterprise', logoPlaceholderText: 'Wipro' },
    { id: 'c30', name: 'Aurobindo Pharma', category: 'Enterprise', logoPlaceholderText: 'Aurobindo' },
  ] as ClientPartner[],

  discoms: [
    {
      code: 'TSSPDCL',
      fullName: 'Southern Power Distribution Company of Telangana Limited',
      state: 'Telangana',
      coverageDistricts: ['Hyderabad', 'Ranga Reddy', 'Medchal-Malkajgiri', 'Mahabubnagar', 'Nalgonda', 'Suryapet', 'Yadadri Bhuvanagiri', 'Vikarabad', 'Medak', 'Siddipet', 'Sangareddy', 'Wanaparthy', 'Nagarkurnool', 'Jogulamba Gadwal', 'Narayanpet'],
      helpline: '1912 / 040-23454884',
      website: 'https://www.tssouthernpower.com',
    },
    {
      code: 'TSNPDCL',
      fullName: 'Northern Power Distribution Company of Telangana Limited',
      state: 'Telangana',
      coverageDistricts: ['Warangal', 'Hanamkonda', 'Karimnagar', 'Nizamabad', 'Khammam', 'Bhadradri Kothagudem', 'Adilabad', 'Mancherial', 'Nirmal', 'Kumuram Bheem Asifabad', 'Jagitial', 'Peddapalli', 'Rajanna Sircilla', 'Kamareddy', 'Mahabubabad', 'Jangaon', 'Jayashankar Bhupalpally', 'Mulugu'],
      helpline: '1800-425-0028',
      website: 'https://www.tsnpdcl.in',
    },
    {
      code: 'APEPDCL',
      fullName: 'Eastern Power Distribution Company of AP Limited',
      state: 'Andhra Pradesh',
      coverageDistricts: ['Visakhapatnam', 'Anakapalli', 'Alluri Sitharama Raju', 'Kakinada', 'Dr. B.R. Ambedkar Konaseema', 'East Godavari', 'West Godavari', 'Eluru', 'Vizianagaram', 'Parvathipuram Manyam', 'Srikakulam'],
      helpline: '1912 / 1800-425-55333',
      website: 'https://www.apeasternpower.com',
    },
    {
      code: 'APSPDCL',
      fullName: 'Southern Power Distribution Company of AP Limited',
      state: 'Andhra Pradesh',
      coverageDistricts: ['Tirupati', 'Chittoor', 'Nellore', 'Prakasam', 'Bapatla', 'Palnadu', 'Guntur', 'YSR Kadapa', 'Annamayya', 'Anantapur', 'Sri Sathya Sai', 'Kurnool', 'Nandyal'],
      helpline: '1912 / 1800-425-155333',
      website: 'https://www.apspdcl.in',
    },
    {
      code: 'APCPDCL',
      fullName: 'Central Power Distribution Company of AP Limited',
      state: 'Andhra Pradesh',
      coverageDistricts: ['Vijayawada (NTR District)', 'Krishna', 'Guntur Urban (CRDA Capital Area)'],
      helpline: '1912 / 0866-2429200',
      website: 'https://www.apcpdcl.in',
    },
  ] as DiscomCoverage[],
};
