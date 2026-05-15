"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle2, ArrowRight, Lock } from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/auth/forgot-password");
    }
  }, [email, router]);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (code.length < 6 || newPassword.length < 6) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center animate-in zoom-in duration-500">
        <div className="flex justify-center mb-6 text-accent">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 font-display">Senha redefinida!</h2>
        <p className="text-muted mb-8 text-lg">Sua nova senha foi salva com sucesso. Redirecionando para o login...</p>
        <Link 
          href="/auth/login"
          className="bg-accent text-background px-8 py-3 rounded-xl font-bold hover:bg-accent-hover transition-all"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl relative z-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent border border-accent/20">
          <Lock size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2 font-display">Nova Senha</h1>
        <p className="text-muted text-sm px-4">
          Insira o código enviado para <span className="text-white font-medium">{email}</span> e sua nova senha.
        </p>
      </div>

      <form onSubmit={handleReset} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-muted mb-2 uppercase tracking-widest text-[10px] font-bold">Código de 6 dígitos</label>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-[5px] text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted mb-2 uppercase tracking-widest text-[10px] font-bold">Nova Senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length < 6 || newPassword.length < 6}
          className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Redefinir Senha <ArrowRight size={20} /></>}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="mb-10 text-center relative z-10">
        <Link href="/" className="inline-block font-display font-bold text-3xl tracking-tight text-white mb-2">
          CVMatch<span className="text-accent">.AI</span>
        </Link>
      </div>

      <Suspense fallback={<Loader2 className="animate-spin text-accent" size={32} />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
