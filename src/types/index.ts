export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  isActive: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string | null;
  category: string;
  client?: string | null;
  technologies: string[];
  images: string[];
  coverImage: string;
  link?: string | null;
  featured: boolean;
  isActive: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  github?: string | null;
  telegram?: string | null;
  order: number;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  category: string;
  tags: string[];
  authorName: string;
  isPublished: boolean;
  publishedAt?: Date | null;
  createdAt: Date;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  serviceType?: string | null;
  budget?: string | null;
  message: string;
  status: string;
  notes?: string | null;
  source?: string | null;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position?: string | null;
  content: string;
  avatar?: string | null;
  rating: number;
  isActive: boolean;
  order: number;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  budget?: string;
  message: string;
}
