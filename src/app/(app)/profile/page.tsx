"use client";

import { useState, useEffect } from "react";
import { Save, Briefcase, GraduationCap, Code, Trash2, Plus, Loader2, CheckCircle2 } from "lucide-react";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Estados para os dados do perfil
  const [hardSkills, setHardSkills] = useState("");
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await fetch("/api/user/profile");
      const data = await res.json();
      
      if (data.profile) {
        setHardSkills(data.profile.hard_skills?.join(", ") || "");
        setExperiences(data.profile.experiences || []);
        setEducation(data.profile.education || []);
      }
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hard_skills: hardSkills.split(",").map(s => s.trim()).filter(s => s !== ""),
          experiences,
          education
        })
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Erro ao salvar perfil.");
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
    } finally {
      setSaving(false);
    }
  }

  // --- Funções para Experiência ---
  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", period: "", description: "" }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExp = [...experiences];
    newExp[index][field] = value;
    setExperiences(newExp);
  };

  // --- Funções para Formação ---
  const addEducation = () => {
    setEducation([...education, { institution: "", course: "", period: "" }]);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...education];
    newEdu[index][field] = value;
    setEducation(newEdu);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-accent mb-4" size={40} />
        <p className="text-muted font-medium">Carregando sua memória de perfil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative z-10 pb-20">
      <header className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-background/80 backdrop-blur-md py-4 z-20 border-b border-border/50">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 text-center md:text-left">Meu Perfil</h1>
          <p className="text-muted text-xs md:text-sm text-center md:text-left">A base de conhecimento da IA sobre você. Edite para otimizar suas próximas gerações.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-3 md:py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shrink-0 w-full md:w-auto shadow-lg ${
            success ? "bg-green-500 text-white" : "bg-accent hover:bg-accent-hover text-background"
          } disabled:opacity-50`}
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : success ? <CheckCircle2 size={18} /> : <Save size={18} />}
          {success ? "Salvo com sucesso!" : "Salvar Alterações"}
        </button>
      </header>

      <div className="space-y-6 md:space-y-8 px-4 md:px-0">
        {/* Skills Section */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-accent bg-accent/10 p-2 md:p-2.5 rounded-xl"><Code size={20} className="md:w-6 md:h-6" /></div>
            <h2 className="font-display text-lg md:text-xl font-bold text-white">Skills em destaque</h2>
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-muted mb-2 uppercase tracking-widest">Hard Skills (separadas por vírgula)</label>
            <textarea 
              rows={3} 
              value={hardSkills}
              onChange={(e) => setHardSkills(e.target.value)}
              placeholder="Ex: React, Next.js, Node.js, TypeScript..."
              className="w-full bg-secondary border border-border rounded-xl p-4 text-white text-sm md:text-base focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
            />
          </div>
        </div>

        {/* Experiences Section */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="text-accent bg-accent/10 p-2 md:p-2.5 rounded-xl"><Briefcase size={20} className="md:w-6 md:h-6" /></div>
              <h2 className="font-display text-lg md:text-xl font-bold text-white">Experiência Profissional</h2>
            </div>
            <button 
              onClick={addExperience}
              className="text-accent hover:text-white flex items-center gap-1 text-sm font-bold transition-colors"
            >
              <Plus size={18} /> Adicionar
            </button>
          </div>
          
          <div className="space-y-6">
            {experiences.length === 0 && (
              <p className="text-center text-muted py-10 border-2 border-dashed border-border rounded-2xl">Nenhuma experiência adicionada. Clique em adicionar para começar.</p>
            )}
            {experiences.map((exp, index) => (
              <div key={index} className="bg-secondary/30 border border-border rounded-2xl p-6 relative group hover:border-accent/30 transition-all">
                <button 
                  onClick={() => removeExperience(index)}
                  className="absolute right-4 top-4 text-muted hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase mb-1">Cargo</label>
                    <input 
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(index, "role", e.target.value)}
                      placeholder="Ex: Desenvolvedor Sênior"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:border-accent/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase mb-1">Empresa</label>
                    <input 
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="Ex: Google"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:border-accent/50 outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] font-bold text-muted uppercase mb-1">Período</label>
                  <input 
                    type="text"
                    value={exp.period}
                    onChange={(e) => updateExperience(index, "period", e.target.value)}
                    placeholder="Ex: Jan 2021 - Presente"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:border-accent/50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted uppercase mb-1">Principais Atividades</label>
                  <textarea 
                    rows={4}
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Descreva suas responsabilidades e conquistas..."
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:border-accent/50 outline-none resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education Section */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="text-accent bg-accent/10 p-2 md:p-2.5 rounded-xl"><GraduationCap size={20} className="md:w-6 md:h-6" /></div>
              <h2 className="font-display text-lg md:text-xl font-bold text-white">Formação Acadêmica</h2>
            </div>
            <button 
              onClick={addEducation}
              className="text-accent hover:text-white flex items-center gap-1 text-sm font-bold transition-colors"
            >
              <Plus size={18} /> Adicionar
            </button>
          </div>
          
          <div className="space-y-6">
            {education.length === 0 && (
              <p className="text-center text-muted py-10 border-2 border-dashed border-border rounded-2xl">Nenhuma formação adicionada.</p>
            )}
            {education.map((edu, index) => (
              <div key={index} className="bg-secondary/30 border border-border rounded-2xl p-6 relative group hover:border-accent/30 transition-all">
                <button 
                  onClick={() => removeEducation(index)}
                  className="absolute right-4 top-4 text-muted hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase mb-1">Curso / Grau</label>
                    <input 
                      type="text"
                      value={edu.course}
                      onChange={(e) => updateEducation(index, "course", e.target.value)}
                      placeholder="Ex: Engenharia de Software"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:border-accent/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-muted uppercase mb-1">Instituição</label>
                    <input 
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="Ex: USP"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:border-accent/50 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-muted uppercase mb-1">Período</label>
                  <input 
                    type="text"
                    value={edu.period}
                    onChange={(e) => updateEducation(index, "period", e.target.value)}
                    placeholder="Ex: 2018 - 2022"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-white focus:border-accent/50 outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
