import Link from "next/link";
import { Download, Edit3, Sparkles } from "lucide-react";

export default function Result() {
  return (
    <div className="h-full flex flex-col bg-secondary/20">
      <header className="h-20 flex items-center justify-between px-8 border-b border-border flex-shrink-0 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div>
          <h1 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-accent" size={20}/> CV Pronto!
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-muted hover:text-white transition-colors font-medium text-sm">
            Sair para o Dashboard
          </Link>
          <button className="bg-white hover:bg-gray-200 text-background px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm shadow-md">
            <Download size={18} /> Baixar PDF
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 flex justify-center pb-20">
        {/* PDF Mockup A4 */}
        <div className="w-full max-w-[794px] aspect-[1/1.414] bg-white text-black shadow-2xl rounded-sm p-14 transform origin-top hover:scale-[1.01] transition-transform">
           <header className="border-b-2 border-gray-900 pb-6 mb-6">
              <h1 className="text-5xl font-display font-bold text-gray-900 mb-2">Fernando Silva</h1>
              <p className="text-xl text-gray-600 font-medium">Engenheiro de Software Sênior</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-gray-500 font-medium">
                <span>fernando@email.com</span>
                <span>•</span>
                <span>(11) 99999-9999</span>
                <span>•</span>
                <span>linkedin.com/in/fernando</span>
                <span>•</span>
                <span>São Paulo, SP</span>
              </div>
           </header>
           
           <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gray-900 inline-block"></span>
                Resumo Profissional
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm text-justify">
                Engenheiro de Software com mais de 5 anos de experiência, especializado no ecossistema React. 
                Possuo sólido histórico na entrega de aplicações web de alta performance e escalabilidade, 
                atuando diretamente na arquitetura e liderança técnica de equipes multidisciplinares. 
                Forte alinhamento com as tecnologias exigidas para a posição no Google, como Node.js, 
                Next.js e otimização de renderização.
              </p>
           </section>

           <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-gray-900 inline-block"></span>
                Experiência
              </h2>
              <div className="mb-6">
                 <div className="flex justify-between items-end mb-1">
                    <h3 className="font-bold text-lg text-gray-900">Desenvolvedor Front-end Sênior</h3>
                    <span className="text-sm text-gray-600 font-bold">Jan 2021 - Presente</span>
                 </div>
                 <p className="text-gray-800 font-medium text-sm mb-3">Tech Corp</p>
                 <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
                    <li>Liderança na migração do monolito para microsserviços e Next.js, impactando mais de 2 milhões de usuários.</li>
                    <li>Otimização de Web Vitals, reduzindo o tempo de carregamento em 40% com Server Components.</li>
                    <li>Mentoria de desenvolvedores júniores e condução de code reviews críticos.</li>
                 </ul>
              </div>
              
              <div className="mb-6">
                 <div className="flex justify-between items-end mb-1">
                    <h3 className="font-bold text-lg text-gray-900">Desenvolvedor Pleno</h3>
                    <span className="text-sm text-gray-600 font-bold">Fev 2018 - Dez 2020</span>
                 </div>
                 <p className="text-gray-800 font-medium text-sm mb-3">Startup.io</p>
                 <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
                    <li>Desenvolvimento de painéis de controle e dashboards em React com Redux.</li>
                    <li>Implementação de testes automatizados com Jest e Cypress, aumentando a cobertura para 85%.</li>
                 </ul>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
