import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Privacidade() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <section className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Política de <span className="text-accent">Privacidade</span>
            </h1>
            <p className="text-muted">Última atualização: Maio de 2026</p>
          </div>
          
          <div className="text-muted space-y-8 text-lg">
            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">1. Coleta de Dados</h2>
              <p className="leading-relaxed">
                Coletamos informações que você nos fornece diretamente ao usar a plataforma, incluindo seu nome, e-mail, histórico profissional, acadêmico e outras informações contidas no currículo original que você submete em nossos sistemas.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">2. Uso das Informações</h2>
              <p className="leading-relaxed mb-4">
                Utilizamos seus dados exclusivamente para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Criar e gerenciar sua conta;</li>
                <li>Alimentar nossa Inteligência Artificial para gerar currículos otimizados;</li>
                <li>Manter seu "Perfil Inteligente" atualizado para agilizar futuras gerações;</li>
                <li>Melhorar nossos serviços e enviar comunicações importantes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">3. Compartilhamento de Dados</h2>
              <p className="leading-relaxed">
                Não vendemos ou compartilhamos seus dados pessoais com terceiros para fins de marketing. Seus dados são enviados de forma segura para os provedores de Inteligência Artificial (como Anthropic ou OpenAI) exclusivamente para o processamento e reescrita do seu currículo.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">4. Seus Direitos e Exclusão</h2>
              <p className="leading-relaxed">
                Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Você pode fazer isso diretamente no seu Dashboard (na aba Meu Perfil) ou solicitando a exclusão da conta através do nosso suporte.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">5. Segurança</h2>
              <p className="leading-relaxed">
                Implementamos as melhores práticas e medidas de segurança técnicas para proteger suas informações pessoais contra acesso, alteração, divulgação ou destruição não autorizada.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">6. Contato</h2>
              <p className="leading-relaxed">
                Se você tiver dúvidas, sugestões ou preocupações sobre esta Política de Privacidade, entre em contato conosco através do e-mail: <strong className="text-white">privacy@cvmatch.ai</strong>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
