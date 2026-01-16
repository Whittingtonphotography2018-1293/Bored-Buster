import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Favorite {
  id: string;
  user_id: string;
  activity: string;
  age_group: string;
  created_at: string;
}

export interface UserPreference {
  id: string;
  user_id: string;
  age_group: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityHistory {
  id: string;
  user_id: string;
  activity: string;
  age_group: string;
  is_ai_generated: boolean;
  created_at: string;
}
