import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (simplified for now)
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  company?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Quote {
  id: string
  user_id?: string
  project_type: 'website' | 'apps' | 'ai_automation' | 'marketing'
  full_name: string
  email: string
  phone?: string
  company?: string
  project_description: string
  budget_range?: string
  timeline?: string
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected'
  created_at: string
  updated_at: string
}

export interface ContactMessage {
  id: string
  full_name: string
  email: string
  message_type?: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image?: string
  category?: string
  tags?: string[]
  author_id?: string
  published: boolean
  featured: boolean
  views: number
  read_time?: number
  created_at: string
  updated_at: string
  published_at?: string
}

export interface PortfolioProject {
  id: string
  title: string
  slug: string
  description?: string
  long_description?: string
  featured_image?: string
  gallery_images?: string[]
  project_type: 'website' | 'app' | 'ai_automation' | 'marketing'
  technologies?: string[]
  client_name?: string
  project_url?: string
  github_url?: string
  featured: boolean
  status: 'in_progress' | 'completed' | 'maintenance'
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  client_name: string
  client_company?: string
  client_position?: string
  testimonial: string
  rating?: number
  project_type?: 'website' | 'app' | 'ai_automation' | 'marketing'
  featured: boolean
  approved: boolean
  created_at: string
}
