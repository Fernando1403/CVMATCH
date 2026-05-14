"use client";

import Link from "next/link";
import { Download, Sparkles, ChevronLeft, LayoutDashboard, Loader2 } from "lucide-react";
import { useGenerate } from "@/context/GenerateContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function Result() {
  const { state } = useGenerate();
  const router = useRouter();
  const cvRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Se não houver resultado (ex: refresh na página), volta para o dashboard
  useEffect(() => {
    if (!state.result && !state.isGenerating) {
      router.push("/dashboard");
    }
  }, [state.result, state.isGenerating, router]);

  const handleDownloadPDF = () => {
    // Usar o motor de impressão do navegador é a única forma de garantir 
    // que o texto não seja cortado ao meio entre as páginas.
    window.print();
  };

  if (!state.result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Sparkles size={48} className="text-accent animate-pulse mx-auto mb-4" />
          <p className="text-muted">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  const { profile, summary, experience, education, hard_skills, languages } = state.result;

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      {/* Estilos para impressão profissional */}
      <style jsx global>{`
        @media print {
          /* Esconde tudo exceto o CV */
          body * {
            visibility: hidden;
          }
          #cv-preview, #cv-preview * {
            visibility: visible;
          }
          #cv-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          /* Força fundo branco e cores reais */
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          /* Evita quebrar blocos de experiência ao meio */
          section, .experience-item, .education-item {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>

      <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 border-b border-border flex-shrink-0 bg-background/80 backdrop-blur-md sticky top-0 z-40 print:hidden">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-muted hover:text-white md:hidden p-2">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="text-accent hidden sm:block" size={20}/> CV Pronto!
          </h1>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/dashboard" className="text-muted hover:text-white transition-colors font-medium text-sm hidden md:block flex items-center gap-2">
            <LayoutDashboard size={16} /> Dashboard
          </Link>
          <button 
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed text-xs md:text-sm"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isExporting ? "Gerando..." : "Baixar PDF"}
          </button>
        </div>
      </header>

      {/* Preview do Currículo (Folha A4) */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12 bg-muted/30 scrollbar-thin scrollbar-thumb-muted">
        <div 
          id="cv-preview"
          ref={cvRef}
          className="mx-auto bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] p-12 text-zinc-900"
          style={{ 
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.5'
          }}
        >
           <header className="border-b-2 border-gray-900 pb-4 md:pb-6 mb-4 md:mb-6">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-2">{profile.name}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs md:text-sm text-gray-500 font-medium">
                {profile.email && <span>{profile.email}</span>}
                {profile.phone && (
                  <>
                    <span>•</span>
                    <span>{profile.phone}</span>
                  </>
                )}
                {profile.linkedin && (
                  <>
                    <span>•</span>
                    <span>{profile.linkedin}</span>
                  </>
                )}
                {profile.location && (
                  <>
                    <span>•</span>
                    <span>{profile.location}</span>
                  </>
                )}
              </div>
           </header>
           
           <section className="mb-6 md:mb-8 text-left">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
                Resumo Profissional
              </h2>
              <p className="text-gray-700 leading-relaxed text-xs md:text-sm text-justify">
                {summary}
              </p>
           </section>

           <section className="mb-6 md:mb-8 text-left">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
                Experiência
              </h2>
              <div className="space-y-6">
                {experience.map((exp: any, i: number) => (
                  <div key={i} className="experience-item mb-4 md:mb-6">
                    <div className="flex justify-between items-end mb-1">
                       <h3 className="font-bold text-base md:text-lg text-gray-900">{exp.role}</h3>
                       <span className="text-[10px] md:text-sm text-gray-600 font-bold">{exp.period}</span>
                    </div>
                    <p className="text-gray-800 font-medium text-xs md:text-sm mb-2 md:mb-3">{exp.company}</p>
                    <ul className="list-disc list-inside text-gray-700 text-[11px] md:text-sm space-y-1 md:space-y-2">
                      {exp.description.map((desc: string, j: number) => (
                        <li key={j}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
           </section>

           <div className="grid grid-cols-2 gap-8">
             <section className="text-left">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
                  Educação
                </h2>
                <div className="space-y-4">
                  {education.map((edu: any, i: number) => (
                    <div key={i} className="education-item">
                      <p className="font-bold text-sm md:text-base">{edu.course}</p>
                      <p className="text-gray-600 text-xs md:text-sm">{edu.institution} • {edu.period}</p>
                    </div>
                  ))}
                </div>
             </section>

             <section className="text-left">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
                  Habilidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {hard_skills.map((skill: string, i: number) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded text-[10px] md:text-xs font-medium text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
             </section>
           </div>
        </div>
      </div>
    </div>
  );
}
