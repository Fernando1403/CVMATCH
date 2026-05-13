import { createClient } from '@supabase/supabase-js';

// Usamos as variáveis de ambiente normais (anônimas) para uso geral, 
// e a service role key apenas quando necessário burlar RLS (por exemplo, no momento do cadastro)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Cliente público padrão (sujeito às regras do RLS do Supabase)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente admin (bypassa RLS) - USE APENAS EM SERVER COMPONENTS OU ROUTE HANDLERS
export function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Supabase Service Role Key não configurada.");
  }
  return createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  });
}
