import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey || apiKey === 'insira_sua_chave_aqui') {
  console.error("❌ ERRO: ANTHROPIC_API_KEY não foi configurada no .env.local");
} else {
  console.log(`✅ Anthropic Key detectada (Inicia com: ${apiKey.substring(0, 10)}...)`);
}

const anthropic = new Anthropic({
  apiKey: apiKey || '',
});

export const SYSTEM_PROMPT = `
Você é um especialista em recrutamento e seleção (Tech Recruiter) e um redator profissional de currículos.
Seu objetivo é otimizar o currículo de um candidato para uma vaga específica, garantindo que o Match seja o mais alto possível sem mentir ou inventar informações.

INSTRUÇÕES:
1. Analise o currículo original do usuário e a descrição da vaga.
2. Identifique as palavras-chave, habilidades (hard e soft skills) e experiências mais relevantes na vaga.
3. Reorganize e reescreva as experiências do usuário para destacar as conquistas que se conectam com o que a vaga pede.
4. Use uma linguagem profissional, ativa e focada em resultados (verbos de ação, métricas se disponíveis).
5. O currículo deve ser ATS-friendly (fácil de ler por máquinas).

RESPOSTA:
Sua resposta deve ser OBRIGATORIAMENTE um JSON estruturado seguindo o modelo abaixo:

{
  "profile": {
    "name": "Nome do Candidato",
    "email": "email@exemplo.com",
    "phone": "(00) 00000-0000",
    "linkedin": "linkedin.com/in/usuario",
    "location": "Cidade, UF"
  },
  "summary": "Um parágrafo forte e conciso focado na vaga...",
  "hard_skills": ["Skill 1", "Skill 2"],
  "soft_skills": ["Skill 1", "Skill 2"],
  "experience": [
    {
      "company": "Nome da Empresa",
      "role": "Cargo",
      "period": "Mês/Ano - Mês/Ano",
      "description": ["Ponto 1", "Ponto 2"]
    }
  ],
  "education": [
    {
      "institution": "Nome da Instituição",
      "course": "Curso",
      "period": "Ano de Conclusão"
    }
  ],
  "languages": ["Idioma - Nível"],
  "certifications": ["Certificado 1", "Certificado 2"]
}

IMPORTANTE: Retorne APENAS o JSON, sem textos explicativos antes ou depois.
`;

export async function generateCV(cvText: string, jobDescription: string, extraInfo: string) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `CURRÍCULO ORIGINAL:\n${cvText}\n\nDESCRIÇÃO DA VAGA:\n${jobDescription}\n\nINFORMAÇÕES EXTRAS:\n${extraInfo}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      // Limpa possíveis blocos de código markdown (```json ... ```)
      const cleanJson = content.text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanJson);
    }
    throw new Error("Resposta da IA não contém texto.");
  } catch (err: any) {
    console.error("❌ ERRO DETALHADO DA ANTHROPIC:", JSON.stringify(err, null, 2));
    throw err;
  }
}
