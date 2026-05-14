import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Termos() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <section className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
              Termos de <span className="text-accent">Uso</span>
            </h1>
            <p className="text-muted">Última atualização: Maio de 2026</p>
          </div>
          
          <div className="text-muted space-y-8 text-lg">
            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">1. Aceitação dos Termos</h2>
              <p className="leading-relaxed">
                Ao acessar e usar o CVMatch.AI, você concorda em cumprir e ser regido por estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">2. Descrição do Serviço</h2>
              <p className="leading-relaxed">
                O CVMatch.AI fornece ferramentas baseadas em inteligência artificial para otimização e geração de currículos (PDFs) a partir de informações fornecidas pelo usuário e descrições de vagas.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">3. Contas de Usuário</h2>
              <p className="leading-relaxed">
                Para utilizar as funcionalidades completas, é necessário criar uma conta. Você é responsável por manter a confidencialidade das credenciais da sua conta e por todas as atividades que ocorram sob ela.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">4. Uso Aceitável</h2>
              <p className="leading-relaxed">
                Você concorda em usar o serviço apenas para fins legais. É proibido submeter informações falsas, conteúdo difamatório, ou violar direitos de propriedade intelectual de terceiros.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">5. Limitação de Responsabilidade</h2>
              <p className="leading-relaxed">
                O CVMatch.AI não garante que o uso do nosso currículo gerado resultará em contratação. O serviço é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">6. Alterações nos Termos</h2>
              <p className="leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre mudanças significativas através da plataforma ou por e-mail. O uso continuado após as alterações indica a sua aceitação.
              </p>
            </div>

            <div>
              <h2 className="text-white font-display text-2xl font-bold mb-3">7. Assinaturas, Cancelamentos e Fidelidade</h2>
              <p className="leading-relaxed">
                Ao contratar um plano com desconto (Pacotes Trimestral ou Anual), o usuário usufrui de uma tarifa reduzida em troca de um compromisso de permanência pelo período contratado. 
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Plano Trimestral:</strong> Em caso de cancelamento antecipado, será aplicada uma multa rescisória equivalente a 1 (uma) mensalidade integral do plano.</li>
                <li><strong>Plano Anual:</strong> Em caso de cancelamento antecipado, será aplicada uma multa rescisória equivalente a 3 (três) mensalidades integrais do plano.</li>
              </ul>
              <p className="mt-4 leading-relaxed">
                O cancelamento de planos Mensais pode ser feito a qualquer momento sem aplicação de multas, cessando o acesso às funcionalidades Pro/Premium ao final do período já pago.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
