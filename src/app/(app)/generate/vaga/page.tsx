import Link from "next/link";
import { ArrowLeft, ArrowRight, Building, Briefcase } from "lucide-react";

export default function GenerateStep2() {
  return (
    <div className="max-w-3xl mx-auto p-8 relative z-10 flex flex-col min-h-[calc(100vh-4rem)] pt-16">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10">
            <div className="w-1/2 h-full bg-accent"></div>
          </div>
          <div className="bg-accent text-background w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-background">✓</div>
          <div className="bg-accent text-background w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-background">2</div>
          <div className="bg-secondary text-muted w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-4 border-background">3</div>
        </div>
        <h1 className="font-display text-4xl font-bold text-white text-center">Sobre a Vaga</h1>
        <p className="text-muted text-center mt-3 text-lg">Cole os detalhes da vaga para a IA entender o que destacar.</p>
      </div>

      <div className="flex-1 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-muted mb-3 flex items-center gap-2">
              <Briefcase size={18} /> Cargo desejado
            </label>
            <input type="text" placeholder="Ex: Desenvolvedor Front-end" className="w-full bg-secondary border border-border rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-3 flex items-center gap-2">
              <Building size={18} /> Empresa
            </label>
            <input type="text" placeholder="Ex: Google" className="w-full bg-secondary border border-border rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-lg" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted mb-3">Descrição Completa da Vaga</label>
          <textarea rows={8} placeholder="Cole aqui os requisitos, responsabilidades e descrição da vaga..." className="w-full bg-secondary border border-border rounded-xl p-5 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none text-lg"></textarea>
        </div>
      </div>

      <div className="mt-12 flex justify-between">
        <Link href="/generate" className="text-muted hover:text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center gap-2 bg-secondary border border-border">
          <ArrowLeft size={20} /> Voltar
        </Link>
        <Link href="/generate/extras" className="bg-accent hover:bg-accent-hover text-background px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,200,151,0.2)]">
          Próximo Passo <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
