# CVMatch.AI — Planner Completo do Projeto

> Documento de alinhamento para desenvolvimento do produto.
> Gerado em: Mayo 2026

---

## 🎯 Visão do Produto

App web que recebe o CV atual do usuário + descrição da vaga + informações extras, e gera um currículo otimizado em PDF, alinhado com a vaga. Com memória de perfil persistente para otimizar gerações futuras.

**Tagline:** _"Seu CV com match perfeito para cada vaga."_

---

## 🏷️ Identidade

| | |
|---|---|
| **Nome** | CVMatch.AI |
| **Domínio principal** | cvmatch.ai |
| **Domínio BR** | cvmatch.com.br |
| **Redes / email** | @cvmatch.ai |
| **Idiomas** | PT-BR (padrão) + EN |

---

## 💳 Planos e Preços

| Plano | Preço | Limite | Margem estimada |
|---|---|---|---|
| **Free** | R$0 | 2 CVs vitalício | — |
| **Pro** | R$19,99/mês | 30 CVs/mês | ~91% |
| **Pro Ilimitado** | R$39,99/mês | Sem limite | ~72–86% |

### Lógica de Freemium
- Todo novo usuário recebe **2 créditos gratuitos** ao criar conta
- Cada geração de CV consome 1 crédito
- Ao zerar os créditos → modal de upgrade exibido
- Pagamento: **placeholder por enquanto** (botões de upgrade sem integração real)
- Integração de pagamento (Stripe ou Mercado Pago) em fase posterior

---

## 📐 Stack Técnica

| Camada | Tecnologia |
|---|---|
| **Framework** | Next.js 14+ (App Router) |
| **Linguagem** | TypeScript |
| **Auth** | NextAuth.js v5 — email + senha |
| **Banco de dados** | Supabase (Postgres) |
| **IA** | Anthropic API — Claude Sonnet (`claude-sonnet-4-20250514`) |
| **Extração de PDF/DOCX** | pdf-parse + mammoth |
| **Geração de PDF** | Puppeteer ou @react-pdf/renderer |
| **i18n** | next-intl (PT-BR / EN) |
| **Estilização** | Tailwind CSS |
| **Deploy** | Vercel |

---

## 🖥️ Telas & Fluxo Completo

```
Landing Page
    ↓
Cadastro / Login
    ↓
Dashboard ←──────────────────────────────┐
    ↓                                     │
Geração — Step 1 (CV)                    │
    ↓                                     │
Geração — Step 2 (Vaga)                  │
    ↓                                     │
Geração — Step 3 (Extras)               │
    ↓                                     │
Tela de Loading (animada)                │
    ↓                                     │
Resultado (Preview + Download PDF) ──────┘
    ↕
Meu Perfil (memória editável)
```

---

### 1. Landing Page

**Seções:**
- **Hero** — Headline forte, subtítulo, CTA "Gerar meu currículo agora" + badge "2 CVs grátis para começar"
- **Como funciona** — 3 passos animados: (1) Envie seu CV, (2) Cole a vaga, (3) Baixe o CV otimizado
- **Diferenciais** — Memória de perfil, match por IA, PDF profissional, bilíngue
- **Planos** — Tabela Free / Pro / Pro Ilimitado com CTA em cada plano
- **Depoimentos** — Placeholder inicial
- **Footer** — Links, idioma toggle, @cvmatch.ai

**Design:**
- Inspirado no Copie.ai
- Dark mode: fundo `#0A0A0A`
- Tipografia bold e grande
- Acento principal: verde-teal `#00C897`
- Glassmorphism sutil nos cards
- Animações de entrada nas seções (scroll reveal)

---

### 2. Auth

**Páginas:**
- `/auth/cadastro` — Nome, email, senha + confirmação
- `/auth/login` — Email + senha
- `/auth/recuperar-senha` — Email para reset

**Regras:**
- Ao criar conta → 2 créditos Free atribuídos automaticamente no banco
- Sessão gerenciada pelo NextAuth.js

---

### 3. Dashboard

**Elementos:**
- Header com: plano atual (badge) + créditos restantes
- Card de boas-vindas (1ª vez) ou resumo de uso
- Histórico de CVs gerados: data, cargo, empresa, botão de re-download
- Botão principal "➕ Novo CV"
- Link para "Meu Perfil"

---

### 4. Meu Perfil (Memória do Usuário) ⭐

**Campos editáveis:**
- Hard Skills (tags)
- Soft Skills (tags)
- Experiências Profissionais (empresa, cargo, período, descrição)
- Formação Acadêmica (instituição, curso, período)
- Projetos (nome, descrição, link)
- Idiomas (idioma + nível)
- Certificações (nome, emissor, ano)

**Comportamento:**
- Populado automaticamente após a 1ª geração de CV
- Editável manualmente a qualquer momento
- Dados usados como contexto nas gerações futuras (substitui upload obrigatório)

---

### 5. Geração — 3 Steps

**Step 1 — Seu CV**
- Se 1ª geração → upload obrigatório (PDF ou DOCX)
- Se perfil já existir → exibe resumo do perfil salvo + opção "Atualizar com novo upload"

**Step 2 — A Vaga**
- Textarea: colar descrição da vaga
- OU upload de imagem/print da vaga (Claude faz parse visual)
- Campos: Nome do cargo + Nome da empresa (para histórico)

**Step 3 — Extras**
- Textarea livre
- Dica: _"Adicione projetos, conquistas ou skills que não estão no seu CV mas são relevantes para essa vaga"_

**Tela de Loading:**
- Animação com mensagens dinâmicas:
  - "Analisando a vaga…"
  - "Cruzando suas skills…"
  - "Identificando o match…"
  - "Montando seu CV…"

---

### 6. Resultado

- Preview do CV gerado (layout A4 na tela)
- Botão "⬇️ Baixar PDF"
- Botão "🔄 Gerar outro CV"
- Botão "✏️ Editar meu perfil"
- Crédito consumido → atualiza contador no header

---

### 7. Paywall

- Ativado ao tentar gerar com 0 créditos
- Modal elegante com os dois planos lado a lado
- CTA: "Assinar Pro — R$19,99/mês" e "Assinar Pro Ilimitado — R$39,99/mês"
- Botões placeholder (sem integração de pagamento por ora)

---

## 🧠 Lógica de IA

### 1ª Geração (sem perfil salvo)
```
INPUT:
- Texto extraído do CV (pdf-parse / mammoth)
- Descrição da vaga
- Informações extras do usuário
- System prompt de otimização

OUTPUT:
- CV otimizado em JSON estruturado → renderizado em PDF
- Perfil extraído automaticamente → salvo no banco (user_profile)
```

### Gerações Seguintes (perfil já salvo)
```
INPUT:
- Perfil resumido do banco (user_profile)
- Descrição da vaga
- Informações extras do usuário
- System prompt de otimização

OUTPUT:
- CV otimizado em JSON estruturado → renderizado em PDF
```

### Cache Inteligente
- Hash da vaga (SHA-256) gerado a cada submissão
- Se mesmo user_id + mesmo hash → retorna CV do cache sem chamar a API
- Economia estimada: 20–30% nas chamadas de API

### Estimativa de Custo (Claude Sonnet)
| Situação | Tokens Input | Tokens Output | Custo/CV |
|---|---|---|---|
| 1ª geração (CV completo) | ~2.000 | ~1.500 | ~R$0,17 |
| Gerações seguintes (perfil) | ~1.200 | ~1.500 | ~R$0,11 |

---

## 💾 Schema do Banco (Supabase)

```sql
-- Usuários
users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password_hash text,
  plan text DEFAULT 'free',        -- 'free' | 'pro' | 'pro_unlimited'
  credits_used integer DEFAULT 0,
  credits_limit integer DEFAULT 2, -- 2=free, 30=pro, 999999=unlimited
  locale text DEFAULT 'pt-BR',
  created_at timestamp
)

-- Perfil / Memória do usuário
user_profile (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  hard_skills text[],
  soft_skills text[],
  experiences jsonb,    -- [{company, role, period, description}]
  education jsonb,      -- [{institution, course, period}]
  projects jsonb,       -- [{name, description, url}]
  languages text[],     -- ["Inglês - Avançado"]
  certifications jsonb, -- [{name, issuer, year}]
  last_updated timestamp
)

-- Histórico de CVs gerados
cv_history (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  job_title text,
  company text,
  vaga_hash text,
  pdf_url text,
  generated_at timestamp
)

-- Cache de vagas
vaga_cache (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  vaga_hash text,
  cv_output jsonb,
  created_at timestamp
)
```

---

## 📁 Estrutura de Pastas (Next.js)

```
cvmatch-ai/
├── app/
│   └── [locale]/
│       ├── page.tsx                  → Landing Page
│       ├── auth/
│       │   ├── login/page.tsx
│       │   ├── cadastro/page.tsx
│       │   └── recuperar-senha/page.tsx
│       ├── dashboard/page.tsx
│       ├── profile/page.tsx          → Meu Perfil
│       ├── generate/
│       │   ├── page.tsx              → Step 1
│       │   ├── vaga/page.tsx         → Step 2
│       │   └── extras/page.tsx       → Step 3
│       └── result/
│           └── [id]/page.tsx
├── api/
│   ├── auth/[...nextauth]/route.ts
│   ├── generate-cv/route.ts          → Core: Anthropic + PDF
│   ├── user/
│   │   ├── credits/route.ts
│   │   └── history/route.ts
│   └── profile/route.ts
├── components/
│   ├── ui/                           → botões, inputs, cards, modais
│   ├── stepper/                      → componente de 3 steps
│   ├── paywall/                      → modal de upgrade
│   ├── cv-preview/                   → preview A4
│   └── layout/                       → header, footer, nav
├── lib/
│   ├── anthropic.ts                  → wrapper da API + prompts
│   ├── pdf.ts                        → geração de PDF
│   ├── extract.ts                    → extração de texto PDF/DOCX
│   ├── cache.ts                      → hash + cache de vagas
│   └── supabase.ts                   → client do banco
├── messages/
│   ├── pt-BR.json                    → traduções PT
│   └── en.json                       → traduções EN
└── middleware.ts                     → i18n + auth guard
```

---

## 🚀 Fases de Desenvolvimento

| Fase | O que construir | Prioridade |
|---|---|---|
| **1** | Setup: Next.js + Supabase + NextAuth + Tailwind | 🔴 Alta |
| **2** | Landing Page (design CVMatch.AI) | 🔴 Alta |
| **3** | Auth: cadastro, login, recuperação de senha | 🔴 Alta |
| **4** | Dashboard + lógica de créditos/planos | 🔴 Alta |
| **5** | Fluxo de 3 Steps (UI completo) | 🔴 Alta |
| **6** | Integração Anthropic (geração + extração de perfil) | 🔴 Alta |
| **7** | Geração de PDF + download | 🔴 Alta |
| **8** | Tela "Meu Perfil" (memória editável) | 🟡 Média |
| **9** | Cache inteligente de vagas | 🟡 Média |
| **10** | Paywall + modal de upgrade | 🟡 Média |
| **11** | i18n PT-BR / EN | 🟡 Média |
| **12** | Integração de pagamento (Stripe / Mercado Pago) | 🟢 Futura |
| **13** | Depoimentos reais + SEO | 🟢 Futura |
| **14** | App mobile (PWA ou React Native) | 🟢 Futura |

---

## 🎨 Design System

| Token | Valor |
|---|---|
| `--bg-primary` | `#0A0A0A` |
| `--bg-secondary` | `#111111` |
| `--bg-card` | `#1A1A1A` |
| `--accent` | `#00C897` |
| `--accent-hover` | `#00A87E` |
| `--text-primary` | `#FFFFFF` |
| `--text-secondary` | `#A0A0A0` |
| `--border` | `#2A2A2A` |
| `--font-display` | Sora / Clash Display |
| `--font-body` | DM Sans |

**Referência visual:** [Copie.ai](https://copie.ai)

---

## 📌 Notas Importantes

1. **Upload de CV** é obrigatório apenas na 1ª geração. A partir da 2ª, o perfil salvo substitui.
2. **Cache de vagas** é por usuário — o mesmo hash para usuários diferentes não compartilha cache.
3. **Pagamento** é placeholder na fase 1. A lógica de créditos e planos já deve estar funcional no banco desde o início.
4. **i18n** — PT-BR como locale padrão. Toggle de idioma no header (globo icon).
5. **PDF gerado** deve seguir um template profissional limpo — ATS-friendly (sem colunas complexas, sem ícones excessivos).

---

_Documento mantido por: CVMatch.AI Team_
_Última atualização: Maio 2026_
