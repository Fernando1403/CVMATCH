import Link from "next/link";
import { FileText, Download, Plus, Sparkles } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto p-8 relative z-10 pt-16">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Seus Currículos</h1>
          <p className="text-muted">Acompanhe e baixe os currículos gerados por IA.</p>
        </div>
        <Link href="/generate" className="bg-accent hover:bg-accent-hover text-background px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,200,151,0.2)]">
          <Plus size={20} /> Novo CV
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Card */}
        <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <FileText size={120} />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div>
              <div className="text-xs font-bold text-accent mb-4 tracking-wider uppercase">Engenheiro de Software</div>
              <h3 className="font-display text-xl font-bold text-white mb-1">Google</h3>
              <p className="text-sm text-muted mb-6">Gerado há 2 dias</p>
            </div>
            <div className="mt-auto">
              <button className="flex items-center justify-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors bg-secondary px-4 py-2.5 rounded-lg w-full border border-border hover:border-accent/30">
                <Download size={16} /> Baixar PDF
              </button>
            </div>
          </div>
        </div>

        {/* Empty State Card */}
        <Link href="/generate" className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[240px] hover:border-accent/50 hover:bg-accent/5 transition-all group">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-muted mb-4 group-hover:text-accent transition-colors">
            <Sparkles size={28} />
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-1">Gerar Novo</h3>
          <p className="text-sm text-muted">Use 1 crédito para criar um CV otimizado</p>
        </Link>
      </div>
    </div>
  );
}
