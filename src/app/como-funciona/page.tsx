import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Upload, FileText, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ComoFunciona() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white">
              Como a <span className="text-accent">mágica</span> acontece
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Nosso processo é simples, rápido e otimizado para gerar o melhor currículo possível em segundos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="absolute top-24 left-[10%] right-[10%] h-0.5 bg-border hidden md:block -z-10">
               <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/50 transition-all shadow-xl group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Upload size={120} className="text-accent" />
              </div>
              <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8 text-accent shadow-[0_0_15px_rgba(0,200,151,0.2)] group-hover:scale-110 transition-transform">
                <span className="font-display font-bold text-2xl">1</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-white">Envie seu CV atual</h3>
              <p className="text-muted leading-relaxed text-lg">
                Faça o upload do seu PDF ou DOCX. Nossa IA faz a leitura, extrai todas as suas experiências, formações e skills e salva no seu <span className="text-accent font-medium">Perfil Inteligente</span>. Você só precisa fazer isso uma vez!
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/50 transition-all shadow-xl group relative overflow-hidden mt-0 md:mt-12">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileText size={120} className="text-accent" />
              </div>
              <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8 text-accent shadow-[0_0_15px_rgba(0,200,151,0.2)] group-hover:scale-110 transition-transform">
                <span className="font-display font-bold text-2xl">2</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-white">Cole a vaga</h3>
              <p className="text-muted leading-relaxed text-lg">
                Encontrou a vaga dos sonhos no LinkedIn? Cole o texto da descrição na nossa plataforma. A IA vai cruzar o que a empresa pede com o que você já fez.
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/50 transition-all shadow-xl group relative overflow-hidden mt-0 md:mt-24">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles size={120} className="text-accent" />
              </div>
              <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-8 text-accent shadow-[0_0_15px_rgba(0,200,151,0.2)] group-hover:scale-110 transition-transform">
                <span className="font-display font-bold text-2xl">3</span>
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-white">Baixe o CV Otimizado</h3>
              <p className="text-muted leading-relaxed text-lg">
                Pronto! Um PDF com layout profissional, otimizado para sistemas ATS e reescrito para destacar exatamente o que o recrutador quer ler.
              </p>
            </div>
          </div>
          
          <div className="mt-24 text-center">
            <Link href="/auth/cadastro" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,200,151,0.2)]">
              Testar Gratuitamente <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
