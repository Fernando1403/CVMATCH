import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 md:pt-32 pb-12 md:pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 md:mb-10">
            <span className="flex h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs md:text-sm font-bold text-muted uppercase tracking-wide">2 CVs grátis para começar</span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold max-w-4xl leading-tight mb-6 md:mb-8 text-white">
            Seu currículo com <span className="text-accent relative inline-block">
              match perfeito
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-accent/30 rounded-full blur-sm"></div>
            </span> para cada vaga.
          </h1>
          
          <p className="text-base md:text-2xl text-muted max-w-3xl mb-8 md:mb-12 leading-relaxed px-2">
            A inteligência artificial que entende sua trajetória e cria um PDF profissional otimizado para a vaga exata que você deseja. Aumente suas chances de entrevista.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md md:max-w-none justify-center">
            <Link href="/auth/cadastro" className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background px-6 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,200,151,0.2)]">
              Gerar currículo agora <ArrowRight size={20} className="md:w-6 md:h-6" />
            </Link>
            <Link href="/como-funciona" className="bg-secondary hover:bg-card text-white border border-border px-6 md:px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-xl transition-colors flex items-center justify-center">
              Como funciona
            </Link>
          </div>
          
          {/* Mockup / Dashboard Preview */}
          <div className="mt-16 md:mt-24 w-full max-w-5xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden relative group">
             <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
             <div className="h-10 md:h-12 border-b border-border bg-secondary flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20"></div>
                <div className="ml-4 flex-1 h-5 md:h-6 bg-primary rounded-md opacity-50"></div>
             </div>
             <div className="p-4 md:p-8 aspect-video flex items-center justify-center bg-primary/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-primary to-primary"></div>
                <div className="relative z-10 text-center border border-border bg-card/80 backdrop-blur-md p-6 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl transform transition-transform group-hover:scale-105">
                  <Sparkles className="w-12 h-12 md:w-20 md:h-20 text-accent mx-auto mb-4 md:mb-6 opacity-80" />
                  <p className="text-white font-display text-xl md:text-3xl font-bold mb-2">Dashboard e Preview do CV</p>
                  <p className="text-muted text-sm md:text-lg">A interface que vai colocar você na frente dos outros candidatos.</p>
                </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
