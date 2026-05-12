import { Save, UserCircle, Briefcase, GraduationCap, Code } from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto p-8 relative z-10 pt-16">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Meu Perfil</h1>
          <p className="text-muted">A base de conhecimento da IA sobre você. Edite para otimizar suas próximas gerações.</p>
        </div>
        <button className="bg-white hover:bg-gray-100 text-background px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shrink-0">
          <Save size={18} /> Salvar Alterações
        </button>
      </header>

      <div className="space-y-8">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-accent bg-accent/10 p-2.5 rounded-xl"><Code size={24} /></div>
            <h2 className="font-display text-xl font-bold">Skills em destaque</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Hard Skills</label>
              <textarea rows={3} className="w-full bg-secondary border border-border rounded-xl p-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none" defaultValue="React, Next.js, TypeScript, Node.js, TailwindCSS"></textarea>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-accent bg-accent/10 p-2.5 rounded-xl"><Briefcase size={24} /></div>
            <h2 className="font-display text-xl font-bold">Experiência Profissional</h2>
          </div>
          
          <div className="border border-border rounded-xl p-6 relative group bg-secondary/50 hover:border-accent/30 transition-colors">
            <button className="absolute right-4 top-4 text-sm font-medium text-muted opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white bg-card px-3 py-1 rounded-md border border-border">Editar</button>
            <h3 className="font-bold text-lg text-white">Desenvolvedor Front-end Sênior</h3>
            <p className="text-accent font-medium mb-4">Tech Corp • 2021 - Presente</p>
            <p className="text-muted text-sm leading-relaxed">
              Liderei o desenvolvimento do novo portal corporativo usando Next.js, aumentando a performance em 40%. Atuei diretamente na arquitetura escalável e revisão de código da equipe júnior.
            </p>
          </div>
          
          <button className="mt-6 text-sm font-bold text-accent border border-accent hover:bg-accent/10 px-4 py-2 rounded-lg transition-colors w-full md:w-auto">
            + Adicionar Experiência
          </button>
        </div>
        
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-accent bg-accent/10 p-2.5 rounded-xl"><GraduationCap size={24} /></div>
            <h2 className="font-display text-xl font-bold">Formação Acadêmica</h2>
          </div>
          
          <button className="text-sm font-bold text-accent border border-accent hover:bg-accent/10 px-4 py-2 rounded-lg transition-colors w-full md:w-auto">
            + Adicionar Formação
          </button>
        </div>
      </div>
    </div>
  );
}
