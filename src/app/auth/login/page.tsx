import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block font-display font-bold text-3xl tracking-tight text-white mb-2">
            CVMatch<span className="text-accent">.AI</span>
          </Link>
          <p className="text-muted text-lg">Bem-vindo de volta!</p>
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Email</label>
              <input type="email" placeholder="seu@email.com" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Senha</label>
              <input type="password" placeholder="••••••••" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" />
            </div>
            
            <div className="flex justify-end">
              <Link href="#" className="text-sm text-accent hover:text-accent-hover transition-colors">
                Esqueceu a senha?
              </Link>
            </div>

            <button type="button" className="w-full bg-accent hover:bg-accent-hover text-background font-bold py-3.5 rounded-xl mt-2 transition-all flex items-center justify-center gap-2">
              Entrar <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-muted">
          Não tem uma conta? <Link href="/auth/cadastro" className="text-white hover:text-accent transition-colors font-medium">Criar conta grátis</Link>
        </p>
      </div>
    </div>
  );
}
