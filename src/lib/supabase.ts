import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const getEnvVar = (key: string): string => {
  if (Platform.OS === 'web') {
    return (import.meta as any).env?.[key] || '';
  } else {
    try {
      const Constants = require('expo-constants').default;
      return Constants.expoConfig?.extra?.[key.replace('VITE_', '')] || '';
    } catch {
      return '';
    }
  }
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

const getStorage = () => {
  if (Platform.OS === 'web') {
    return {
      getItem: (key: string) => {
        return Promise.resolve(localStorage.getItem(key));
      },
      setItem: (key: string, value: string) => {
        return Promise.resolve(localStorage.setItem(key, value));
      },
      removeItem: (key: string) => {
        return Promise.resolve(localStorage.removeItem(key));
      },
    };
  } else {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    return AsyncStorage;
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: getStorage(),
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
