/**
 * Varna Solar - Projects & Portfolio Types
 */

export type ProjectSector = 'Residential' | 'Commercial' | 'Industrial' | 'Agriculture' | 'Infrastructure';
export type SystemTopology = 'On-Grid' | 'Off-Grid' | 'Hybrid' | 'Solar Pump' | 'Captive HT' | 'Ground Mount';

export interface ProjectTestimonial {
  quote: string;
  clientName: string;
  designation: string;
  organization?: string;
  rating: number; // 1 to 5
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
  systemCapacity: string; // e.g. "500 kWp"
  systemCapacityKW: number;
  systemTopology: SystemTopology;
  panelsUsed: string; // e.g. "Waaree Mono PERC 545W ALMM Tier-1"
  inverterUsed: string; // e.g. "Sungrow 100kW Multi-MPPT String Inverters"
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
