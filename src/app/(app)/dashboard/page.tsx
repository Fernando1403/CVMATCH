"use client";

import Link from "next/link";
import { FileText, Download, Plus, Sparkles, Loader2, Calendar, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useGenerate } from "@/context/GenerateContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const { setResult } = useGenerate();
  const { history, loading, refreshUserData } = useUser();
  const router = useRouter();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  const handleViewCV = (cv: any) => {
    // Salva no contexto global para a página de result carregar
    setResult(cv.cv_output);
    router.push("/result");
  };

  const startEditing = (e: React.MouseEvent, cv: any) => {
    e.stopPropagation();
    setEditingId(cv.id);
    setNewTitle(cv.job_title);
  };

  const handleRename = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newTitle.trim()) return;

    try {
      setIsRenaming(true);
      const res = await fetch("/api/cv/rename", {
        method: "PATCH",
        body: JSON.stringify({ id, newTitle }),
      });

      if (res.ok) {
        await refreshUserData();
        setEditingId(null);
      }
    } catch (err) {
      console.error("Erro ao renomear:", err);
    } finally {
      setIsRenaming(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Seus Currículos</h1>
          <p className="text-muted">Acompanhe e baixe os currículos gerados por IA.</p>
        </div>
        <Link href="/generate" className="bg-accent hover:bg-accent-hover text-background px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,200,151,0.2)]">
          <Plus size={20} /> Novo CV
        </Link>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted">
          <Loader2 className="w-10 h-10 animate-spin mb-4 text-accent" />
          <p>Carregando sua história...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((cv) => (
            <div 
              key={cv.id} 
              onClick={() => handleViewCV(cv)}
              className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileText size={120} />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div>
                  {editingId === cv.id ? (
                    <form 
                      onSubmit={(e) => handleRename(e, cv.id)}
                      className="mb-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input 
                        autoFocus
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={() => setEditingId(null)}
                        className="w-full bg-secondary border border-accent rounded-lg px-3 py-2 text-white focus:outline-none text-sm"
                        disabled={isRenaming}
                      />
                    </form>
                  ) : (
                    <div className="flex items-center gap-2 group/title mb-4">
                      <div className="text-xs font-bold text-accent tracking-widest uppercase truncate flex-1">
                        {cv.job_title || 'CV Otimizado'}
                      </div>
                      <button 
                        onClick={(e) => startEditing(e, cv)}
                        className="p-1.5 hover:bg-secondary rounded-md text-muted/50 hover:text-accent transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  )}
                  <h3 className="font-display text-xl font-bold text-white mb-1 truncate">
                    {cv.company || 'Empresa não informada'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted mb-6">
                    <Calendar size={14} />
                    {new Date(cv.generated_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="mt-auto">
                  <button className="flex items-center justify-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors bg-secondary px-4 py-2.5 rounded-lg w-full border border-border group-hover:border-accent/30">
                    <FileText size={16} /> Visualizar & Baixar
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Botão de Novo CV (Empty State sempre visível) */}
          <Link href="/generate" className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[240px] hover:border-accent/50 hover:bg-accent/5 transition-all group">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-muted mb-4 group-hover:text-accent transition-colors">
              <Sparkles size={28} />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-1">Gerar Novo</h3>
            <p className="text-sm text-muted">Use 1 crédito para criar um CV otimizado</p>
          </Link>
        </div>
      )}
    </div>
  );
}
