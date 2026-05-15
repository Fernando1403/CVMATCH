"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle2, ArrowRight, Mail } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const [timer, setTimer] = useState(120);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/auth/cadastro");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [email, router]);

  async function handleResend() {
    if (timer > 0 || resending) return;

    setResending(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setTimer(120); // Reseta o contador
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 5000); // Some após 5s
      } else {
        const data = await res.json();
        setError(data.error);
      }
    } catch (err) {
      setError("Erro ao solicitar novo código.");
    } finally {
      setResending(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length < 6) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
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
        <h2 className="text-3xl font-bold text-white mb-4 font-display">E-mail verificado!</h2>
        <p className="text-muted mb-8 text-lg">Sua conta foi ativada com sucesso. Redirecionando para o login...</p>
        <Link 
          href="/auth/login"
          className="bg-accent text-background px-8 py-3 rounded-xl font-bold hover:bg-accent-hover transition-all"
        >
          Ir para Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl relative z-10">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent border border-accent/20">
          <Mail size={32} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2 font-display">Verifique seu e-mail</h1>
        <p className="text-muted text-sm px-4">
          Enviamos um código de 6 dígitos para <span className="text-white font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {resendSuccess && (
          <div className="bg-accent/10 border border-accent/20 text-accent text-xs p-3 rounded-xl text-center animate-in fade-in slide-in-from-bottom-2">
            Novo código enviado! Verifique sua caixa de entrada.
          </div>
        )}

        <div>
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="w-full bg-secondary border border-border rounded-xl px-4 py-4 text-center text-3xl font-bold tracking-[10px] text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:tracking-normal placeholder:font-medium placeholder:text-muted/30"
            required
            autoFocus
          />
          <p className="text-center text-[10px] text-muted uppercase font-bold tracking-widest mt-4">
            Digite os 6 dígitos do e-mail
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || code.length < 6}
          className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <>Verificar Conta <ArrowRight size={20} /></>}
        </button>

        <button 
          type="button"
          disabled={timer > 0 || resending}
          className={`text-sm text-center transition-colors ${timer > 0 || resending ? "text-muted cursor-not-allowed" : "text-muted hover:text-white"}`}
          onClick={handleResend}
        >
          {resending ? (
            <span className="flex items-center gap-2 justify-center italic">Enviando...</span>
          ) : timer > 0 ? (
            <span>Não recebeu o e-mail? <span className="text-accent font-medium">Reenviar em {timer}s</span></span>
          ) : (
            <span>Não recebeu o e-mail? <span className="text-accent font-medium cursor-pointer">Reenviar</span></span>
          )}
        </button>
      </form>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="mb-10 text-center relative z-10">
        <Link href="/" className="inline-block font-display font-bold text-3xl tracking-tight text-white mb-2">
          CVMatch<span className="text-accent">.AI</span>
        </Link>
      </div>

      <Suspense fallback={<Loader2 className="animate-spin text-accent" size={32} />}>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
