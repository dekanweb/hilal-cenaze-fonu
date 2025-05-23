import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ivepefxyqbqanjjzpztx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2ZXBlZnh5cWJxYW5qanpwenR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDg1NzEsImV4cCI6MjA2MzU4NDU3MX0.46Rszo78tGXu58XMoP0oJbwH4ewDHTuZT5hZdXLVAc8';

// Supabase istemcisini daha fazla yapılandırma seçeneği ile oluştur
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    fetch: fetch.bind(globalThis)
  }
});
