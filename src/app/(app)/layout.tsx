"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/Logo.png";
import { UserCircle, Zap, LogOut, LayoutDashboard, Loader2 } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { useSession, signOut } from "next-auth/react";

import { useUser } from "@/context/UserContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { userData, refreshUserData } = useUser();

  // 1. Carregando
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-muted font-medium animate-pulse">Verificando sua conta...</p>
      </div>
    );
  }

  // 2. Não Logado - Tela de Acesso Negado
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Efeito de fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-md bg-card border border-border p-10 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-8 border border-border">
            <Zap className="text-accent w-10 h-10" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-4">Acesso Restrito</h1>
          <p className="text-muted text-lg mb-10">
            Você precisa estar logado para acessar as ferramentas mágicas do CVMatch.AI.
          </p>
          <div className="flex flex-col gap-4">
            <Link 
              href="/auth/login" 
              className="bg-accent hover:bg-accent-hover text-background px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-accent/20"
            >
              Fazer Login
            </Link>
            <Link 
              href="/auth/cadastro" 
              className="text-muted hover:text-white px-8 py-4 rounded-xl font-bold transition-all border border-border hover:bg-secondary"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Logado - Renderiza o App normalmente
  const userPlan = userData?.plan || (session as any)?.user?.plan || "Free";
  const creditsUsed = userData?.credits_used ?? (session as any)?.user?.credits_used ?? 0;
  const creditsLimit = userData?.credits_limit ?? (session as any)?.user?.credits_limit ?? 2;
  const creditsRemaining = creditsLimit - creditsUsed;

  const creditsPercent = (creditsRemaining / creditsLimit) * 100;
  
  // Lógica de cores baseada no uso
  let colorClass = "bg-accent";
  let textClass = "text-accent bg-accent/10";
  
  if (creditsPercent <= 20) {
    colorClass = "bg-red-500";
    textClass = "text-red-500 bg-red-500/10";
  } else if (creditsPercent <= 60) {
    colorClass = "bg-yellow-500";
    textClass = "text-yellow-500 bg-yellow-500/10";
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden pt-20">
        {/* Sidebar - hidden on mobile */}
        <aside className="hidden md:flex w-64 border-r border-border bg-secondary/30 flex-col z-20">
          <div className="h-20 flex items-center px-6 border-b border-border shrink-0">
            <Link href="/dashboard" className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-2">
              <div className="relative w-7 h-7 flex items-center justify-center">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="leading-none">CVMatch<span className="text-accent">.AI</span></span>
            </Link>
          </div>

          <div className="p-4 flex-grow flex flex-col gap-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-white hover:bg-card transition-all">
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-white hover:bg-card transition-all">
              <UserCircle size={20} />
              <span className="font-medium">Meu Perfil</span>
            </Link>
            <Link href="/generate" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-all mt-4 border border-accent/20">
              <Zap size={20} />
              <span className="font-bold">Gerar CV</span>
            </Link>
          </div>

          <div className="p-4 border-t border-border shrink-0">
            <div className="bg-card border border-border rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted">Plano {userPlan}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md transition-colors duration-500 ${textClass}`}>
                  {creditsRemaining} Créditos
                </span>
              </div>
              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${colorClass}`} 
                  style={{ width: `${creditsPercent}%` }}
                />
              </div>
              <button 
                onClick={async () => {
                  try {
                    const res = await fetch("/api/user/upgrade", { method: "POST" });
                    if (res.ok) {
                      await refreshUserData();
                    }
                  } catch (err) {
                    console.error("Erro no upgrade:", err);
                  }
                }}
                className="block w-full text-xs font-bold text-white mt-3 hover:text-accent transition-colors text-left"
              >
                Fazer Upgrade (Teste)
              </button>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 px-4 py-2 text-sm text-muted hover:text-white transition-colors w-full"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative bg-background">
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
