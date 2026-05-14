"use client";

import { Upload, ArrowRight, FileText, X } from "lucide-react";
import { useGenerate } from "@/context/GenerateContext";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function GenerateStep1() {
  const { state, setFile } = useGenerate();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-3xl mx-auto relative z-10 flex flex-col min-h-full">
      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-8 md:mb-10 relative px-4 md:px-0">
          <div className="absolute left-4 right-4 md:left-0 md:right-0 top-1/2 h-0.5 bg-border -z-10"></div>
          <div className="bg-accent text-background w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background shadow-[0_0_20px_rgba(0,200,151,0.3)]">1</div>
          <div className="bg-secondary text-muted w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">2</div>
          <div className="bg-secondary text-muted w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">3</div>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-white text-center">Seu Currículo Base</h1>
        <p className="text-muted text-center mt-2 md:mt-3 text-base md:text-lg">Faça upload do seu PDF ou DOCX atual para extrairmos seu histórico.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx"
          className="hidden"
        />
        
        {!state.file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-2xl md:rounded-3xl p-8 md:p-16 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer bg-card/50"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-secondary rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-accent shadow-lg">
              <Upload size={32} className="md:w-12 md:h-12" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Arraste seu arquivo aqui</h3>
            <p className="text-muted mb-6 md:mb-10 text-sm md:text-lg">ou clique para procurar (.pdf ou .docx)</p>
            
            <button className="bg-white hover:bg-gray-200 text-background px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-xs md:text-sm transition-colors">
              Selecionar Arquivo
            </button>
          </div>
        ) : (
          <div className="w-full bg-card border border-accent/20 rounded-2xl md:rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent/20"></div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent">
              <FileText size={40} />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2 truncate max-w-full px-4">
              {state.file.name}
            </h3>
            <p className="text-muted text-sm mb-8">
              {(state.file.size / (1024 * 1024)).toFixed(2)} MB • Pronto para processar
            </p>
            
            <button 
              onClick={removeFile}
              className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <X size={16} /> Remover e trocar arquivo
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 md:mt-12 flex justify-center md:justify-end">
        <button 
          onClick={() => router.push("/generate/vaga")}
          disabled={!state.file}
          className="bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-background w-full md:w-auto px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
        >
          Próximo Passo <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
