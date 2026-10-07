export interface Profile {
  id: string;
  user_id?: string;
  full_name: string;
  title: string;
  tagline: string;
  bio: string;
  years_experience: number;
  avatar_url: string;
  cv_url: string;
  location: string;
  email: string;
  phone: string;
  available_for_hire: boolean;
  availability_note: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  created_at?: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption?: string;
  sort_order: number;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  client: string;
  year: number;
  role: string;
  category_id: string;
  category?: Category;
  tags: string[];
  cover_image: string;
  images?: ProjectImage[];
  live_url?: string;
  behance_url?: string;
  featured: boolean;
  sort_order: number;
  status: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  company_url?: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  is_current: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  deliverables: string[];
  icon_name: string;
  sort_order: number;
  created_at?: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  accent_color: string;
  social_links: {
    behance?: string;
    dribbble?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    [key: string]: string | undefined;
  };
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  budget_range?: string;
  message: string;
  is_read: boolean;
  created_at?: string;
}
