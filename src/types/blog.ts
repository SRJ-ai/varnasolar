/**
 * Varna Solar - Knowledge Base & Blog Types
 */

export type BlogCategory = 
  | 'Residential Guides' 
  | 'Government Subsidies' 
  | 'Commercial Solar' 
  | 'Industrial Insights' 
  | 'Agriculture Pumps' 
  | 'Maintenance & Tech';

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Full markdown / HTML body content
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedDate: string; // ISO / Formatted string (e.g. "2026-08-15")
  readTimeMinutes: number;
  featuredImage: string;
  isFeatured?: boolean;
  tableOfContents?: TableOfContentsItem[];
}
