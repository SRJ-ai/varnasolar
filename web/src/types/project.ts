export type ProjectSector = 'Residential' | 'Commercial' | 'Industrial' | 'Agriculture' | 'Infrastructure';
export type SystemTopology = 'On-Grid' | 'Off-Grid' | 'Hybrid' | 'Solar Pump' | 'Captive HT' | 'Ground Mount' | string;

export interface ProjectTestimonial {
  quote: string;
  clientName: string;
  designation: string;
  organization?: string;
  rating: number;
}

export interface ProjectCaseStudy {
  id: string | number;
  title: string;
  slug: string;
  sector: ProjectSector;
  clientName: string;
  location: string;
  district: string;
  state: 'Telangana' | 'Andhra Pradesh' | 'Assam' | 'Other';
  systemCapacity: string;
  systemCapacityKW: number;
  systemTopology: SystemTopology;
  panelsUsed: string;
  inverterUsed: string;
  annualGenerationKWh: number;
  annualSavingsINR: number;
  co2OffsetTonnesPerYear: number;
  paybackYears: number;
  policyOrSubsidyApplied: string;
  imageUrl: string;
  thumbnailUrl?: string;
  galleryImages?: string[];
  testimonial: ProjectTestimonial;
  keyTechnicalHighlights: string[];
  completionYear: number;
  isFeatured?: boolean;
}
