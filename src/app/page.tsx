import Link from "next/link";
import { ArrowRight, Sparkles, Check, X, Upload, FileText, Zap, BrainCircuit, Target, LayoutTemplate } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 md:pt-44 pb-16 md:pb-32 relative overflow-hidden">
          {/* Efeitos de luz de fundo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[400px] md:h-[600px] bg-accent/5 rounded-full blur-[80px] md:blur-[120px] -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6 md:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-1.5 w-1.5 md:h-2.5 md:w-2.5 rounded-full bg-accent animate-pulse"></span>
              <span className="text-[10px] md:text-sm font-bold text-muted uppercase tracking-wide">2 CVs grátis para começar</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold max-w-5xl leading-[1.1] mb-6 md:mb-8 text-white animate-in fade-in slide-in-from-bottom-6 duration-1000 px-4">
              Seu currículo com <span className="text-accent relative inline-block">
                match perfeito
                <div className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-1 md:h-2 bg-accent/20 rounded-full blur-md"></div>
              </span> para cada vaga.
            </h1>
            
            <p className="text-base md:text-2xl text-muted max-w-3xl mb-8 md:mb-14 leading-relaxed px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              A inteligência artificial que entende sua trajetória e cria um PDF profissional otimizado para a vaga exata que você deseja.
            </p>
            
            <div className="flex flex-col sm:row gap-4 md:gap-6 w-full max-w-md md:max-w-none justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <Link href="/auth/cadastro" className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background px-8 md:px-12 py-5 md:py-6 rounded-2xl font-bold text-lg md:text-xl transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(0,200,151,0.2)] active:scale-95">
                Gerar currículo agora <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features / Diferenciais Summary */}
        <section className="py-24 bg-secondary/20 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Por que nós?</h2>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-white">Tecnologia que coloca você no topo</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl hover:border-accent/30 transition-all group">
                <div className="w-14 h-14 bg-secondary border border-border rounded-xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,200,151,0.1)]">
                  <BrainCircuit size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Memória de Perfil</h4>
                <p className="text-muted">Nós salvamos sua história. Não precisa reescrever ou reenviar seu CV a cada nova candidatura.</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl hover:border-accent/30 transition-all group">
                <div className="w-14 h-14 bg-secondary border border-border rounded-xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,200,151,0.1)]">
                  <Target size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Match Perfeito</h4>
                <p className="text-muted">Cruzamos as palavras-chave da vaga com suas skills para garantir 100% de relevância.</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl hover:border-accent/30 transition-all group">
                <div className="w-14 h-14 bg-secondary border border-border rounded-xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,200,151,0.1)]">
                  <LayoutTemplate size={28} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Layout ATS-Friendly</h4>
                <p className="text-muted">Design limpo e profissional, otimizado para passar com sucesso pelos robôs de RH.</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/diferenciais" className="text-accent hover:text-white font-bold inline-flex items-center gap-2 group transition-colors">
                Ver todos os diferenciais <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works Summary */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Simples e Rápido</h2>
                <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">A mágica em 3 passos</h3>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold shrink-0">1</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Envie seu CV atual</h4>
                      <p className="text-muted">Suba seu PDF ou DOCX uma única vez. Nós extraímos tudo para seu Perfil Inteligente.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold shrink-0">2</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Cole a descrição da vaga</h4>
                      <p className="text-muted">A IA analisa o que a empresa busca e seleciona seus melhores pontos para destacar.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold shrink-0">3</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Baixe seu CV Otimizado</h4>
                      <p className="text-muted">Pronto! Um PDF profissional e reescrito para te dar o match perfeito em segundos.</p>
                    </div>
                  </div>
                </div>
                <Link href="/como-funciona" className="mt-12 text-accent hover:text-white font-bold inline-flex items-center gap-2 group transition-colors">
                   Saiba mais detalhes <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full animate-pulse"></div>
                <div className="bg-card border border-border p-4 rounded-3xl shadow-2xl relative rotate-2 group-hover:rotate-0 transition-transform">
                  <div className="bg-secondary/50 rounded-2xl p-8 border border-border/50">
                    <div className="w-full h-4 bg-accent/20 rounded-full mb-4"></div>
                    <div className="w-[80%] h-4 bg-muted/20 rounded-full mb-8"></div>
                    <div className="space-y-4">
                      <div className="w-full h-32 bg-secondary rounded-xl border border-border/30 flex items-center justify-center">
                        <Sparkles className="text-accent/40 w-12 h-12" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Summary */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-accent font-bold uppercase tracking-widest text-[10px] md:text-sm mb-4">Planos</h2>
              <h3 className="font-display text-3xl md:text-5xl font-bold text-white">Escolha seu foguete</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Plano Free */}
              <div className="bg-card border border-border p-6 md:p-8 rounded-3xl flex flex-col hover:border-accent/20 transition-all order-2 md:order-1">
                <h4 className="text-lg font-bold text-white mb-2">Free</h4>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">R$ 0</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-muted"><Check size={18} className="text-accent" /> 2 CVs gerados</li>
                  <li className="flex items-center gap-2 text-sm text-muted"><Check size={18} className="text-accent" /> Memória de Perfil</li>
                </ul>
                <Link href="/auth/cadastro" className="w-full py-4 bg-secondary hover:bg-border text-white text-center rounded-xl font-bold transition-all">Começar</Link>
              </div>

              {/* Plano Pro */}
              <div className="bg-card border-2 border-accent p-6 md:p-8 rounded-3xl flex flex-col relative md:scale-105 shadow-2xl shadow-accent/10 order-1 md:order-2">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-background text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">Popular</div>
                <h4 className="text-lg font-bold text-white mb-2">Pro</h4>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">R$ 19,99</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-white"><Check size={18} className="text-accent" /> 25 CVs gerados</li>
                  <li className="flex items-center gap-2 text-sm text-white"><Check size={18} className="text-accent" /> Histórico Ilimitado</li>
                  <li className="flex items-center gap-2 text-sm text-muted"><X size={18} /> Suporte Prioritário</li>
                </ul>
                <Link href="/auth/cadastro" className="w-full py-4 bg-accent hover:bg-accent-hover text-background text-center rounded-xl font-bold transition-all shadow-lg shadow-accent/20">Assinar Pro</Link>
              </div>

              {/* Plano Premium */}
              <div className="bg-card border border-border p-6 md:p-8 rounded-3xl flex flex-col hover:border-accent/20 transition-all order-3">
                <h4 className="text-lg font-bold text-white mb-2">Premium</h4>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">R$ 49,99</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-white"><Check size={18} className="text-accent" /> 200 CVs gerados</li>
                  <li className="flex items-center gap-2 text-sm text-white"><Check size={18} className="text-accent" /> Suporte Prioritário</li>
                </ul>
                <Link href="/auth/cadastro" className="w-full py-4 bg-secondary hover:bg-border text-white text-center rounded-xl font-bold transition-all">Assinar Premium</Link>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/planos" className="text-accent hover:text-white font-bold inline-flex items-center gap-2 group transition-colors">
                Ver todos os detalhes dos planos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 p-12 md:p-20 rounded-[40px] relative overflow-hidden">
             <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-[80px]"></div>
             <h3 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">Pronto para ser o candidato número 1?</h3>
             <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">Junte-se a centenas de profissionais que já estão garantindo entrevistas com o poder da nossa IA.</p>
             <Link href="/auth/cadastro" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background px-12 py-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-[0_0_50px_rgba(0,200,151,0.3)]">
                Criar meu currículo grátis <ArrowRight size={24} />
             </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
