"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha inválidos.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Ocorreu um erro ao tentar entrar.");
    } finally {
      setLoading(false);
    }
  }

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
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Email</label>
              <input 
                name="email"
                type="email" 
                required
                placeholder="seu@email.com" 
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Senha</label>
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••" 
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all" 
              />
            </div>
            
            <div className="flex justify-end">
              <Link href="#" className="text-sm text-accent hover:text-accent-hover transition-colors">
                Esqueceu a senha?
              </Link>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-3.5 rounded-xl mt-2 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Entrar <ArrowRight size={18} /></>}
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
