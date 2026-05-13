import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/Logo.png";
import { UserCircle, Zap, LogOut, LayoutDashboard } from "lucide-react";
import { Header } from "../../components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
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
                <span className="text-sm font-medium text-muted">Plano Free</span>
                <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md">2 Créditos</span>
              </div>
              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                <div className="bg-accent h-full w-full" />
              </div>
              <button className="w-full text-xs font-bold text-white mt-3 hover:text-accent transition-colors text-left">
                Fazer Upgrade
              </button>
            </div>
            <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-muted hover:text-white transition-colors w-full">
              <LogOut size={18} />
              Sair
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative bg-background pt-20 md:pt-0">
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
