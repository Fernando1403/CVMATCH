import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrainCircuit, Clock, LayoutTemplate, Target, Zap, ShieldCheck } from "lucide-react";

export default function Diferenciais() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white">
              Por que usar o <span className="text-accent">CVMatch.AI</span>?
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Nossa tecnologia foi desenvolvida para colocar seu currículo no topo da pilha, passando por filtros ATS e encantando recrutadores.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/30 transition-colors group">
              <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <BrainCircuit size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Memória de Perfil</h3>
              <p className="text-muted leading-relaxed text-lg">Diferente de outras IAs, nós salvamos o seu perfil. Você não precisa reescrever ou reenviar seu CV toda vez que for aplicar para uma vaga diferente.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/30 transition-colors group">
               <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Match Perfeito</h3>
              <p className="text-muted leading-relaxed text-lg">A IA cruza as palavras-chave exatas da descrição da vaga com a sua experiência, reescrevendo tópicos para garantir o maior "match" possível.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/30 transition-colors group">
              <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <LayoutTemplate size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Layout ATS-Friendly</h3>
              <p className="text-muted leading-relaxed text-lg">Os currículos são gerados em um design limpo e profissional, otimizado para ser lido com sucesso pelos robôs de recrutamento (ATS).</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/30 transition-colors group">
              <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Velocidade Extrema</h3>
              <p className="text-muted leading-relaxed text-lg">Gere um currículo totalmente novo e personalizado para uma vaga em menos de 15 segundos. Aplique para mais vagas, mais rápido.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/30 transition-colors group">
              <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Privacidade Garantida</h3>
              <p className="text-muted leading-relaxed text-lg">Seus dados profissionais pertencem a você. Mantemos tudo seguro e você pode apagar seu histórico e perfil com um clique.</p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-10 hover:border-accent/30 transition-colors group">
              <div className="w-16 h-16 bg-secondary border border-border rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Histórico de Versões</h3>
              <p className="text-muted leading-relaxed text-lg">Acesse o seu dashboard para ver e baixar novamente os currículos que você já gerou para vagas anteriores a qualquer momento.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
