import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.SUPABASE_URL || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

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
