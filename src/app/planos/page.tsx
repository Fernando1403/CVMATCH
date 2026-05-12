import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function Planos() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white">
              Preços <span className="text-accent">simples</span> e diretos
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Comece de graça e faça o upgrade apenas quando precisar gerar mais currículos para suas entrevistas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free */}
            <div className="bg-card border border-border rounded-3xl p-10 flex flex-col hover:border-accent/30 transition-colors">
              <h3 className="text-3xl font-display font-bold text-white mb-2">Free</h3>
              <p className="text-muted mb-8 text-lg">Para testar a plataforma</p>
              <div className="mb-10">
                <span className="text-5xl font-display font-bold text-white">R$ 0</span>
                <span className="text-muted text-lg">/vitalício</span>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> 2 CVs gerados por IA</li>
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> Memória de Perfil</li>
                <li className="flex items-center gap-3 text-muted text-lg"><X size={24} /> Histórico ilimitado</li>
                <li className="flex items-center gap-3 text-muted text-lg"><X size={24} /> Suporte prioritário</li>
              </ul>
              <Link href="/auth/cadastro" className="block text-center bg-secondary hover:bg-border text-white border border-border py-4 rounded-xl font-bold transition-colors text-lg">
                Começar Grátis
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-card border-2 border-accent rounded-3xl p-10 flex flex-col relative transform md:-translate-y-6 shadow-[0_0_40px_rgba(0,200,151,0.15)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-background font-bold px-6 py-2 rounded-full text-sm uppercase tracking-wider">
                Mais Popular
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-2">Pro</h3>
              <p className="text-muted mb-8 text-lg">Para quem busca ativamente</p>
              <div className="mb-10">
                <span className="text-5xl font-display font-bold text-white">R$ 19</span>
                <span className="text-muted text-lg">,99/mês</span>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> 30 CVs gerados por IA</li>
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> Memória de Perfil</li>
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> Histórico ilimitado</li>
                <li className="flex items-center gap-3 text-muted text-lg"><X size={24} /> Suporte prioritário</li>
              </ul>
              <Link href="/auth/cadastro" className="block text-center w-full bg-accent hover:bg-accent-hover text-background py-4 rounded-xl font-bold transition-colors text-lg shadow-[0_0_20px_rgba(0,200,151,0.2)]">
                Assinar Pro
              </Link>
            </div>

            {/* Pro Ilimitado */}
            <div className="bg-card border border-border rounded-3xl p-10 flex flex-col hover:border-accent/30 transition-colors">
              <h3 className="text-3xl font-display font-bold text-white mb-2">Ilimitado</h3>
              <p className="text-muted mb-8 text-lg">Para agências e recrutadores</p>
              <div className="mb-10">
                <span className="text-5xl font-display font-bold text-white">R$ 39</span>
                <span className="text-muted text-lg">,99/mês</span>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> CVs Ilimitados</li>
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> Memória de Perfil</li>
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> Histórico ilimitado</li>
                <li className="flex items-center gap-3 text-white text-lg"><Check size={24} className="text-accent" /> Suporte prioritário</li>
              </ul>
              <Link href="/auth/cadastro" className="block text-center w-full bg-secondary hover:bg-border text-white border border-border py-4 rounded-xl font-bold transition-colors text-lg">
                Assinar Ilimitado
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
