// Avaliacoes curtas de alunos para a vitrine da loja (maximo 3 linhas cada)

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  trackTitle: string;
  rating: number;
  quote: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    author: "Lucas Mendonça",
    role: "Desenvolvedor Front-End",
    company: "Inatel / Projeto Web",
    trackTitle: "Front-End Essencial",
    rating: 5,
    quote:
      "A divisão em 4 cursos fechando 31h tirou toda a enrolação. Saí do HTML básico para componentes tipados em duas semanas.",
  },
  {
    id: "t2",
    author: "Beatriz Alencar",
    role: "Engenheira de Software Jr.",
    company: "Fintech de Pagamentos",
    trackTitle: "Back-End com Node.js",
    rating: 5,
    quote:
      "A ementa de 42h vai direto para APIs reais, autenticação, filas e testes automatizados. Foi o que destravou minha primeira vaga.",
  },
  {
    id: "t3",
    author: "Rafael Tavares",
    role: "Estudante de Eng. de Software",
    company: "Santa Rita do Sapucaí",
    trackTitle: "Vibe Coding",
    rating: 5,
    quote:
      "Paguei R$ 49,99 na promoção e já recuperei o tempo em um fim de semana estruturando prompts, especificações e revisão assistida por IA.",
  },
  {
    id: "t4",
    author: "Camila Ferreira",
    role: "Analista de Dados",
    company: "Consultoria de BI",
    trackTitle: "Arquitetura de Dados",
    rating: 5,
    quote:
      "São 7 cursos e 51 horas muito bem encadeadas de modelagem, pipelines e governança. Valeu cada centavo da formação completa.",
  },
];
