
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SUPABASE_URL = 'https://wpmraojojkgmdquciots.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwbXJhb2pvamtnbWRxdWNpb3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNjU5ODMsImV4cCI6MjA2NTg0MTk4M30.54J2hBkXJAXu8kqOdyWKAsghawga2X-wQ1V0-kKCoas'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
