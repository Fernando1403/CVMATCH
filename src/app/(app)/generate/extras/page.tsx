"use client";

import { ArrowLeft, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useGenerate } from "@/context/GenerateContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useUser } from "@/context/UserContext";

export default function GenerateStep3() {
  const { state, setExtraInfo, setIsGenerating, setResult } = useGenerate();
  const { refreshUserData } = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      const formData = new FormData();
      if (state.file) formData.append("file", state.file);
      formData.append("jobDescription", state.jobDescription);
      formData.append("extraInfo", state.extraInfo);

      const response = await fetch("/api/generate-cv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro ao gerar o currículo.");
      }

      setResult(data.cv);
      await refreshUserData();
      router.push("/result");
    } catch (err: any) {
      setError(err.message);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto relative z-10 flex flex-col min-h-full">
      {state.isGenerating && (
        <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
            <Loader2 size={80} className="text-accent animate-spin relative z-10" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Gerando sua Mágica...</h2>
          <p className="text-muted text-lg max-w-md">
            Nossa IA está analisando a vaga e otimizando cada detalhe do seu perfil para garantir o melhor match possível.
          </p>
          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
            </div>
            <span className="text-accent text-sm font-bold uppercase tracking-widest">Otimizando experiências</span>
          </div>
        </div>
      )}

      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-8 md:mb-10 relative px-4 md:px-0">
          <div className="absolute left-4 right-4 md:left-0 md:right-0 top-1/2 h-0.5 bg-border -z-10">
            <div className="w-full h-full bg-accent"></div>
          </div>
          <div className="bg-accent text-background w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">✓</div>
          <div className="bg-accent text-background w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">✓</div>
          <div className="bg-accent text-background w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background shadow-[0_0_20px_rgba(0,200,151,0.3)]">3</div>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-white text-center">Toque Final</h1>
        <p className="text-muted text-center mt-2 md:mt-3 text-base md:text-lg">Deseja adicionar alguma instrução extra para a IA?</p>
      </div>

      <div className="flex-1 px-2">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-card border border-border rounded-2xl md:rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-accent"></div>
          <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Informações Adicionais (Opcional)</h3>
          <p className="text-muted mb-6 md:mb-8 text-sm md:text-lg">
            Ex: "Dê muito destaque na minha experiência com liderança de equipe e projetos do exterior".
          </p>
          
          <textarea 
            rows={6} 
            value={state.extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="Suas instruções extras..." 
            className="w-full bg-secondary border border-border rounded-xl p-4 md:p-5 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none text-sm md:text-lg min-h-[150px]"
          ></textarea>
        </div>
      </div>

      <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between gap-4">
        <button 
          onClick={() => router.push("/generate/vaga")}
          className="text-muted hover:text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-secondary border border-border order-2 md:order-1"
        >
          <ArrowLeft size={20} /> Voltar
        </button>
        <button 
          onClick={handleGenerate}
          className="bg-accent hover:bg-accent-hover text-background px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 order-1 md:order-2 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles size={20} /> Gerar Meu CV Mágico
        </button>
      </div>
    </div>
  );
}
