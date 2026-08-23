/**
 * Varna Solar - Lead Capture, CRM & Inquiries
 */

export type ServiceTypeInquiry = 
  | 'Residential Rooftop' 
  | 'Commercial Solar' 
  | 'Industrial Solar' 
  | 'Agriculture Solar Pump' 
  | 'PM Surya Ghar Consultation' 
  | 'PM KUSUM Consultation' 
  | 'AMC & Maintenance';

export type LeadStatus = 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Proposal Sent' | 'Converted' | 'Closed';

export interface LeadSubmission {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;
  state: string;
  serviceType: ServiceTypeInquiry;
  monthlyBill?: number;
  estimatedCapacityKW?: number;
  roofType?: 'Concrete Flat' | 'Tin / Metal PEB Shed' | 'Tiled / Slanted' | 'Open Ground';
  message?: string;
  status?: LeadStatus;
  createdAt?: string;
  source?: string;
}
