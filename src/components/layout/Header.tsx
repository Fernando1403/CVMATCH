"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/Logo.png";
import { Menu, X, User, LogOut, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status, update } = useSession();

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-display font-bold text-2xl tracking-tight text-white transition-opacity hover:opacity-80 flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Image
                src={Logo}
                alt="Logo CVMatch.AI"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="leading-none">CVMatch<span className="text-accent">.AI</span></span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link href="/como-funciona" className="text-muted hover:text-white transition-colors font-medium">Como funciona</Link>
          <Link href="/diferenciais" className="text-muted hover:text-white transition-colors font-medium">Diferenciais</Link>
          <Link href="/planos" className="text-muted hover:text-white transition-colors font-medium">Planos</Link>
          {status === "authenticated" && (
            <Link href="/dashboard" className="text-muted hover:text-white transition-colors font-medium">Dashboard</Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {status === "authenticated" ? (
            <div className="flex items-center gap-6">
              <button 
                onClick={async () => {
                  try {
                    const res = await fetch("/api/user/upgrade", { method: "POST" });
                    if (res.ok) {
                      const data = await res.json();
                      // Atualiza a sessão local com os novos dados
                      await update({
                        ...session,
                        user: {
                          ...session?.user,
                          plan: data.user.plan,
                          credits_used: data.user.credits_used,
                          credits_limit: data.user.credits_limit
                        }
                      });
                      window.location.reload(); 
                    }
                  } catch (err) {
                    console.error("Erro no upgrade:", err);
                  }
                }}
                className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-bold border border-accent/20 transition-all group"
              >
                <Zap size={14} className="fill-accent group-hover:scale-110 transition-transform" />
                Upgrade (Teste)
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 text-white hover:text-accent transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:border-accent/50 transition-all">
                    <User size={20} className="text-muted group-hover:text-accent" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold leading-tight">{session.user?.email?.split('@')[0]}</span>
                    <span className="text-[10px] text-muted uppercase tracking-wider font-bold">Plano {(session as any).user?.plan || 'Free'}</span>
                  </div>
                  <ChevronDown size={16} className={`text-muted transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-56 bg-card border border-border rounded-2xl shadow-2xl p-2 z-20 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-3 border-b border-border/50 mb-1">
                        <p className="text-xs text-muted mb-1">Logado como</p>
                        <p className="text-sm font-medium text-white truncate">{session.user?.email}</p>
                      </div>
                      <Link 
                        href="/profile" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted hover:text-white hover:bg-secondary transition-all"
                      >
                        <User size={18} />
                        Meu Perfil
                      </Link>
                      <button 
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mt-1"
                      >
                        <LogOut size={18} />
                        Sair da conta
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="text-white hover:text-accent transition-colors font-medium">Entrar</Link>
              <Link href="/auth/cadastro" className="bg-accent hover:bg-accent-hover text-background px-5 py-2.5 rounded-full font-bold transition-colors">
                Começar Grátis
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border absolute top-20 left-0 w-full flex flex-col p-6 gap-6 shadow-xl animate-in slide-in-from-top duration-300 overflow-y-auto max-h-[calc(100vh-80px)]">
          <nav className="flex flex-col gap-4">
            <Link
              href="/como-funciona"
              className="text-lg text-muted hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Como funciona
            </Link>
            <Link
              href="/diferenciais"
              className="text-lg text-muted hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Diferenciais
            </Link>
            <Link
              href="/planos"
              className="text-lg text-muted hover:text-white transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>
            {status === "authenticated" && (
              <Link
                href="/dashboard"
                className="text-lg text-muted hover:text-white transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </nav>
          
          <hr className="border-border" />
          
          <div className="flex flex-col gap-4">
            {status === "authenticated" ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center">
                    <User size={24} className="text-muted" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{session.user?.email?.split('@')[0]}</p>
                    <p className="text-xs text-muted uppercase font-bold">Plano {(session as any).user?.plan || 'Free'}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center justify-center gap-2 text-white hover:text-accent transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} /> Meu Perfil
                </Link>
                <Link
                  href="/planos"
                  className="bg-accent/10 text-accent border border-accent/20 px-5 py-4 rounded-xl font-bold transition-colors text-center text-lg flex items-center justify-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Zap size={20} className="fill-accent" /> Fazer Upgrade
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center justify-center gap-2 text-red-400 font-medium py-2"
                >
                  <LogOut size={18} /> Sair da conta
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-lg text-white hover:text-accent transition-colors font-medium text-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  href="/auth/cadastro"
                  className="bg-accent hover:bg-accent-hover text-background px-5 py-4 rounded-xl font-bold transition-colors text-center text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Começar Grátis
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
