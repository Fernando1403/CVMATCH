"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Check, X, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type Period = "mensal" | "trimestral" | "anual";

export default function Planos() {
  const [period, setPeriod] = useState<Period>("mensal");

  const prices = {
    pro: {
      mensal: { price: "19,99", total: "19,99", perMonth: "19,99" },
      trimestral: { price: "16,99", total: "50,97", perMonth: "16,99", discount: "15%" },
      anual: { price: "14,99", total: "179,88", perMonth: "14,99", discount: "25%" },
    },
    premium: {
      mensal: { price: "49,99", total: "49,99", perMonth: "49,99" },
      trimestral: { price: "42,49", total: "127,47", perMonth: "42,49", discount: "15%" },
      anual: { price: "37,49", total: "449,88", perMonth: "37,49", discount: "25%" },
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-32 pb-24 px-6">
        <section className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
              Preços <span className="text-accent">simples</span> e diretos
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12">
              Escolha o plano ideal para sua carreira. Economize até 25% nos planos anuais.
            </p>

            {/* Seletor de Período */}
            <div className="flex justify-center mb-12">
              <div className="bg-secondary/50 p-1.5 rounded-2xl border border-border flex items-center gap-1">
                <button 
                  onClick={() => setPeriod("mensal")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${period === "mensal" ? "bg-accent text-background shadow-lg shadow-accent/20" : "text-muted hover:text-white"}`}
                >
                  Mensal
                </button>
                <button 
                  onClick={() => setPeriod("trimestral")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative ${period === "trimestral" ? "bg-accent text-background shadow-lg shadow-accent/20" : "text-muted hover:text-white"}`}
                >
                  Trimestral
                  <span className="absolute -top-3 -right-2 bg-green-500 text-[9px] text-white px-2 py-0.5 rounded-full">-15%</span>
                </button>
                <button 
                  onClick={() => setPeriod("anual")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative ${period === "anual" ? "bg-accent text-background shadow-lg shadow-accent/20" : "text-muted hover:text-white"}`}
                >
                  Anual
                  <span className="absolute -top-3 -right-2 bg-green-500 text-[9px] text-white px-2 py-0.5 rounded-full">-25%</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free */}
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 flex flex-col hover:border-accent/30 transition-colors">
              <h3 className="text-3xl font-display font-bold text-white mb-2">Free</h3>
              <p className="text-muted mb-8">Para testar a plataforma</p>
              <div className="mb-10">
                <span className="text-5xl font-display font-bold text-white">R$ 0</span>
                <span className="text-muted text-lg">/vitalício</span>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white"><Check size={24} className="text-accent" /> 2 CVs gerados por IA</li>
                <li className="flex items-center gap-3 text-white"><Check size={24} className="text-accent" /> Memória de Perfil</li>
                <li className="flex items-center gap-3 text-muted opacity-50"><X size={24} /> Histórico ilimitado</li>
              </ul>
              <Link href="/auth/cadastro" className="block text-center bg-secondary hover:bg-border text-white border border-border py-4 rounded-xl font-bold transition-colors">
                Começar Grátis
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-card border-2 border-accent rounded-3xl p-8 md:p-10 flex flex-col relative md:-translate-y-6 shadow-[0_0_40px_rgba(0,200,151,0.15)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-background font-bold px-6 py-2 rounded-full text-xs uppercase tracking-wider">
                Mais Popular
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-2">Pro</h3>
              <p className="text-muted mb-8">Para quem busca ativamente</p>
              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted">R$</span>
                  <span className="text-5xl font-display font-bold text-white">{prices.pro[period].price}</span>
                  <span className="text-muted text-lg">/mês</span>
                </div>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white font-medium"><Check size={24} className="text-accent" /> 25 CVs gerados por IA</li>
                <li className="flex items-center gap-3 text-white"><Check size={24} className="text-accent" /> Memória de Perfil</li>
                <li className="flex items-center gap-3 text-white"><Check size={24} className="text-accent" /> Histórico ilimitado</li>
                <li className="flex items-center gap-3 text-muted opacity-50"><X size={24} /> Suporte prioritário</li>
              </ul>
              <Link href="/auth/cadastro" className="block text-center w-full bg-accent hover:bg-accent-hover text-background py-4 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(0,200,151,0.2)]">
                Assinar Pro
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 flex flex-col hover:border-accent/30 transition-colors">
              <h3 className="text-3xl font-display font-bold text-white mb-2">Premium</h3>
              <p className="text-muted mb-8">Para profissionais e agências</p>
              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted">R$</span>
                  <span className="text-5xl font-display font-bold text-white">{prices.premium[period].price}</span>
                  <span className="text-muted text-lg">/mês</span>
                </div>
              </div>
              <ul className="space-y-5 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white font-medium"><Check size={24} className="text-accent" /> 200 CVs gerados por IA</li>
                <li className="flex items-center gap-3 text-white"><Check size={24} className="text-accent" /> Memória de Perfil</li>
                <li className="flex items-center gap-3 text-white"><Check size={24} className="text-accent" /> Suporte prioritário</li>
              </ul>
              <Link href="/auth/cadastro" className="block text-center w-full bg-secondary hover:bg-border text-white border border-border py-4 rounded-xl font-bold transition-colors">
                Assinar Premium
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
