"use client";

import { ArrowLeft, ArrowRight, Building, Briefcase } from "lucide-react";
import { useGenerate } from "@/context/GenerateContext";
import { useRouter } from "next/navigation";

export default function GenerateStep2() {
  const { state, setJobDescription } = useGenerate();
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto relative z-10 flex flex-col min-h-full">
      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-8 md:mb-10 relative px-4 md:px-0">
          <div className="absolute left-4 right-4 md:left-0 md:right-0 top-1/2 h-0.5 bg-border -z-10">
            <div className="w-1/2 h-full bg-accent"></div>
          </div>
          <div className="bg-accent text-background w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">✓</div>
          <div className="bg-accent text-background w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background shadow-[0_0_20px_rgba(0,200,151,0.3)]">2</div>
          <div className="bg-secondary text-muted w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">3</div>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-white text-center">Sobre a Vaga</h1>
        <p className="text-muted text-center mt-2 md:mt-3 text-base md:text-lg">Cole os detalhes da vaga para a IA entender o que destacar.</p>
      </div>

      <div className="flex-1 space-y-6 md:space-y-8 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-sm font-medium text-muted mb-2 md:mb-3 flex items-center gap-2">
              <Briefcase size={18} /> Cargo desejado
            </label>
            <input 
              type="text" 
              placeholder="Ex: Desenvolvedor Front-end" 
              className="w-full bg-secondary border border-border rounded-xl px-4 md:px-5 py-3 md:py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-sm md:text-lg" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-2 md:mb-3 flex items-center gap-2">
              <Building size={18} /> Empresa (Opcional)
            </label>
            <input 
              type="text" 
              placeholder="Ex: Google" 
              className="w-full bg-secondary border border-border rounded-xl px-4 md:px-5 py-3 md:py-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all text-sm md:text-lg" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted mb-2 md:mb-3">Descrição Completa da Vaga</label>
          <textarea 
            rows={8} 
            value={state.jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Cole aqui os requisitos, responsabilidades e descrição da vaga..." 
            className="w-full bg-secondary border border-border rounded-xl p-4 md:p-5 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none text-sm md:text-lg min-h-[200px]"
          ></textarea>
        </div>
      </div>

      <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between gap-4">
        <button 
          onClick={() => router.push("/generate")}
          className="text-muted hover:text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-secondary border border-border order-2 md:order-1"
        >
          <ArrowLeft size={20} /> Voltar
        </button>
        <button 
          onClick={() => router.push("/generate/extras")}
          disabled={!state.jobDescription.trim()}
          className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-background px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 order-1 md:order-2"
        >
          Próximo Passo <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
