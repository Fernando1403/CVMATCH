import Link from "next/link";
import { Upload, ArrowRight } from "lucide-react";

export default function GenerateStep1() {
  return (
    <div className="max-w-3xl mx-auto relative z-10 flex flex-col min-h-full">
      <div className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-8 md:mb-10 relative px-4 md:px-0">
          <div className="absolute left-4 right-4 md:left-0 md:right-0 top-1/2 h-0.5 bg-border -z-10"></div>
          <div className="bg-accent text-background w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">1</div>
          <div className="bg-secondary text-muted w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">2</div>
          <div className="bg-secondary text-muted w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold md:text-lg border-4 border-background">3</div>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-white text-center">Seu Currículo Base</h1>
        <p className="text-muted text-center mt-2 md:mt-3 text-base md:text-lg">Faça upload do seu PDF atual para extrairmos seu histórico.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
        <div className="w-full border-2 border-dashed border-border rounded-2xl md:rounded-3xl p-8 md:p-16 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer bg-card/50">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-secondary rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-accent shadow-lg">
            <Upload size={32} className="md:w-12 md:h-12" />
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">Arraste seu PDF aqui</h3>
          <p className="text-muted mb-6 md:mb-10 text-sm md:text-lg">ou clique para procurar nos seus arquivos</p>
          
          <button className="bg-white hover:bg-gray-200 text-background px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-xs md:text-sm transition-colors">
            Selecionar Arquivo
          </button>
        </div>
      </div>

      <div className="mt-8 md:mt-12 flex justify-center md:justify-end">
        <Link href="/generate/vaga" className="bg-accent hover:bg-accent-hover text-background w-full md:w-auto px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
          Próximo Passo <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
