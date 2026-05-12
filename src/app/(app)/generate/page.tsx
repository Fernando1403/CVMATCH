import Link from "next/link";
import { Upload, ArrowRight } from "lucide-react";

export default function GenerateStep1() {
  return (
    <div className="max-w-3xl mx-auto p-8 relative z-10 flex flex-col min-h-[calc(100vh-4rem)] pt-16">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10"></div>
          <div className="bg-accent text-background w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-background">1</div>
          <div className="bg-secondary text-muted w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-background">2</div>
          <div className="bg-secondary text-muted w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-background">3</div>
        </div>
        <h1 className="font-display text-4xl font-bold text-white text-center">Seu Currículo Base</h1>
        <p className="text-muted text-center mt-3 text-lg">Faça upload do seu PDF atual para extrairmos seu histórico.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full border-2 border-dashed border-border rounded-3xl p-16 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer bg-card/50">
          <div className="w-24 h-24 bg-secondary rounded-2xl flex items-center justify-center mb-8 text-accent shadow-lg">
            <Upload size={48} />
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-3">Arraste seu PDF aqui</h3>
          <p className="text-muted mb-10 text-lg">ou clique para procurar nos seus arquivos</p>
          
          <button className="bg-white hover:bg-gray-200 text-background px-8 py-3.5 rounded-full font-bold text-sm transition-colors">
            Selecionar Arquivo
          </button>
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <Link href="/generate/vaga" className="bg-accent hover:bg-accent-hover text-background px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2">
          Próximo Passo <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
