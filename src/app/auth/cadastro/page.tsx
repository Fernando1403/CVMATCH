import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Cadastro() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block font-display font-bold text-3xl tracking-tight text-white mb-2">
            CVMatch<span className="text-accent">.AI</span>
          </Link>
          <p className="text-muted text-lg flex items-center justify-center gap-2">
            Crie sua conta e ganhe 2 CVs <Sparkles className="text-accent" size={18} />
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Nome Completo</label>
              <input type="text" placeholder="João da Silva" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Email</label>
              <input type="email" placeholder="seu@email.com" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Senha</label>
              <input type="password" placeholder="••••••••" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
            </div>

            <Link href="/dashboard" className="w-full bg-accent hover:bg-accent-hover text-background font-bold py-3.5 rounded-xl mt-4 transition-all flex items-center justify-center gap-2">
              Criar minha conta <ArrowRight size={18} />
            </Link>
          </form>
        </div>

        <p className="text-center mt-8 text-muted">
          Já tem uma conta? <Link href="/auth/login" className="text-white hover:text-accent transition-colors font-medium">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}
