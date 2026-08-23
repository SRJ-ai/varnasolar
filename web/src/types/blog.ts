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
  content: string;
  category: BlogCategory;
  tags: string[];
  author: BlogAuthor;
  publishedDate: string;
  readTimeMinutes: number;
  featuredImage: string;
  isFeatured?: boolean;
  tableOfContents?: TableOfContentsItem[];
}
