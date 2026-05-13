-- Criação da tabela de Usuários
CREATE TABLE public.users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password_hash text,
  plan text DEFAULT 'free', -- 'free' | 'pro' | 'pro_unlimited'
  credits_used integer DEFAULT 0,
  credits_limit integer DEFAULT 2, -- 2=free, 30=pro, 999999=unlimited
  locale text DEFAULT 'pt-BR',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criação da tabela de Perfil / Memória do usuário
CREATE TABLE public.user_profile (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  hard_skills text[],
  soft_skills text[],
  experiences jsonb,    -- [{company, role, period, description}]
  education jsonb,      -- [{institution, course, period}]
  projects jsonb,       -- [{name, description, url}]
  languages text[],     -- ["Inglês - Avançado"]
  certifications jsonb, -- [{name, issuer, year}]
  last_updated timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criação da tabela de Histórico de CVs gerados
CREATE TABLE public.cv_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  job_title text,
  company text,
  vaga_hash text,
  pdf_url text,
  generated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criação da tabela de Cache de vagas
CREATE TABLE public.vaga_cache (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  vaga_hash text,
  cv_output jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Políticas de Segurança RLS (Row Level Security) básicas
-- Habilitar RLS em todas as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaga_cache ENABLE ROW LEVEL SECURITY;

-- IMPORTANTE: Como estamos usando NextAuth via Backend/Server-Side, 
-- não precisamos depender do RLS para consultas feitas pelo nosso servidor (que pode usar a SERVICE_ROLE key)
-- ou podemos criar políticas baseadas no auth.uid() SE fôssemos acessar o banco diretamente do Client.
-- Para manter o controle estrito na API, essas políticas previnem acesso anônimo da API pública do Supabase.
