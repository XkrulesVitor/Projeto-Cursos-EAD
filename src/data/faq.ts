// Perguntas frequentes da loja Cursos EAD

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Acesso" | "Certificado" | "Conteúdo" | "Conta e Supabase";
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "acesso-imediato",
    category: "Acesso",
    question: "Como funciona o acesso depois que eu confirmo a matrícula?",
    answer:
      "Assim que você conclui a matrícula pelo carrinho, todas as trilhas selecionadas aparecem imediatamente na aba Minhas Matrículas. Você já pode abrir a grade curricular completa e acompanhar seu progresso módulo por módulo.",
  },
  {
    id: "origem-trilhas",
    category: "Conteúdo",
    question: "De onde vêm as 26 trilhas e as cargas horárias do catálogo?",
    answer:
      "O catálogo reúne todas as 26 trilhas estruturadas no Núcleo de Projetos (NP), somando 94 cursos e 573 horas de capacitação técnica em desenvolvimento web, back-end, mobile, engenharia de software, dados, nuvem, IA generativa e vibe coding.",
  },
  {
    id: "precos-promocoes",
    category: "Acesso",
    question: "Por que alguns cursos estão por R$ 49,99 e R$ 249,99?",
    answer:
      "Nossa tabela base vai de R$ 50,00 a R$ 250,00 de acordo com a profundidade e a carga horária da trilha. Periodicamente destacamos trilhas de entrada em oferta por R$ 49,99 e formações intensivas de 50h por R$ 249,99, além de cupons adicionais no carrinho.",
  },
  {
    id: "cupons-desconto",
    category: "Acesso",
    question: "Quais cupons posso aplicar no carrinho agora?",
    answer:
      "Você pode aplicar os cupons CP2EJR10 (10% de desconto), VIBE15 (15% de desconto) ou INATEL20 (20% de desconto) diretamente no carrinho lateral antes de concluir a matrícula.",
  },
  {
    id: "certificado-horas",
    category: "Certificado",
    question: "As trilhas possuem certificado com carga horária discriminada?",
    answer:
      "Sim. Ao concluir todos os módulos de uma trilha na área Minhas Matrículas, você libera o comprovante de conclusão contendo o nome da trilha, a relação de cursos concluídos e a carga horária exata para horas complementares ou portfólio.",
  },
  {
    id: "pre-requisitos",
    category: "Conteúdo",
    question: "Preciso saber programar antes de começar?",
    answer:
      "Não. A trilha Onboarding (9h) e a trilha Dev Toolkit (12h) foram desenhadas exatamente para quem está dando os primeiros passos. Trilhas intermediárias e avançadas listam claramente os pré-requisitos na aba de ementa antes da matrícula.",
  },
  {
    id: "integracao-supabase",
    category: "Conta e Supabase",
    question: "Como funciona a integração com o Supabase neste projeto?",
    answer:
      "O site roda 100% estático no GitHub Pages usando dados locais e localStorage por padrão. A camada de serviços, autenticação e schema SQL do Supabase já está pronta: basta definir NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para ativar login real e persistência em PostgreSQL.",
  },
  {
    id: "garantia-suporte",
    category: "Acesso",
    question: "Posso trocar de trilha ou tirar dúvidas sobre a ementa?",
    answer:
      "Todas as matrículas contam com garantia de 7 dias para revisão do conteúdo e troca de trilha caso você perceba que outro nível faz mais sentido para o seu momento. Você também pode falar direto pelo e-mail ou LinkedIn na página Sobre Mim.",
  },
];
