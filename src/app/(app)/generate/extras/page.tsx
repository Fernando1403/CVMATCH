import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function GenerateStep3() {
  return (
    <div className="max-w-3xl mx-auto p-8 relative z-10 flex flex-col min-h-[calc(100vh-4rem)] pt-16">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10">
            <div className="w-full h-full bg-accent"></div>
          </div>
          <div className="bg-accent text-background w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-background">✓</div>
          <div className="bg-accent text-background w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-background">✓</div>
          <div className="bg-accent text-background w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-background">3</div>
        </div>
        <h1 className="font-display text-4xl font-bold text-white text-center">Toque Final</h1>
        <p className="text-muted text-center mt-3 text-lg">Deseja adicionar alguma instrução extra para a IA?</p>
      </div>

      <div className="flex-1">
        <div className="bg-card border border-border rounded-3xl p-10 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent"></div>
          <h3 className="font-display text-xl font-bold text-white mb-3">Informações Adicionais (Opcional)</h3>
          <p className="text-muted mb-8 text-lg">Ex: "Eu fiz um curso de Cloud focado nesta vaga mas não coloquei no CV ainda" ou "Dê muito destaque na minha experiência com liderança de equipe e projetos do exterior".</p>
          
          <textarea rows={6} placeholder="Suas instruções extras..." className="w-full bg-secondary border border-border rounded-xl p-5 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none text-lg"></textarea>
        </div>
      </div>

      <div className="mt-12 flex justify-between">
        <Link href="/generate/vaga" className="text-muted hover:text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-2 bg-secondary border border-border">
          <ArrowLeft size={20} /> Voltar
        </Link>
        <Link href="/result" className="bg-accent hover:bg-accent-hover text-background px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(0,200,151,0.3)] hover:scale-105 transform">
          <Sparkles size={20} /> Gerar Meu CV Mágico
        </Link>
      </div>
    </div>
  );
}
