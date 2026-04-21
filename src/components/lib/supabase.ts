import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { ContactFormData } from '../ContactModal';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company_size: string;
  interest: string;
  message: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  if (!supabase) {
    throw new Error('Contact form is temporarily unavailable. Please try again later.');
  }

  const submission = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company_size: data.company_size,
    interest: data.interest,
    message: data.message || '',
    user_agent: navigator.userAgent
  };

  const { error } = await supabase
    .from('contact_submissions')
    .insert([submission]);

  if (error) {
    console.error('Error submitting form:', error);
    throw new Error('Failed to submit form. Please try again.');
  }
}
