// Dados reais do autor para a pagina Sobre Mim (baseados no GitHub XkrulesVitor)

export interface AuthorProject {
  name: string;
  language: string;
  description: string;
  url: string;
  highlight: string;
}

export interface AuthorMilestone {
  role: string;
  organization: string;
  detail: string;
  url?: string;
}

export const AUTHOR_PROFILE = {
  fullName: "Vitor Hugo Felipe Noronha",
  handle: "XKrules",
  githubUsername: "XkrulesVitor",
  headline: "Engenharia de Software, Front-End e coordenação de P&D aplicada a produtos reais.",
  bio: "Sou graduando em Engenharia de Software no Inatel e desenvolvedor Front-End focado em transformar requisitos complexos em interfaces rápidas, acessíveis e prontas para produção. Atuo como Coordenador de Pesquisa e Desenvolvimento no Núcleo de Projetos da CP2eJr, onde conduzi o desenvolvimento da plataforma web/app CP2eJR - Corporative.",
  secondaryBio:
    "Também sou Co-Fundador da Made By You, pesquisador de Iniciação Científica em Modelagem Computacional e Manufatura Aditiva 3D no Inatel, Técnico em Eletrônica pela ETE FMC e desenvolvedor de jogos em GameMaker (GML) e Construct 3, premiado com Melhor Visual na Game Jam Cubio.",
  photo: "/images/vitor-noronha.jpg",
  photoAlt: "Retrato de Vitor Hugo Felipe Noronha sentado diante do logo da AWS",
  location: "Santa Rita do Sapucaí, MG",
  institution: "Inatel - Engenharia de Software",
  links: {
    github: "https://github.com/XkrulesVitor",
    repo: "https://github.com/XkrulesVitor/Projeto-Cursos-EAD",
    linkedin: "https://www.linkedin.com/in/vitor-noronha",
    email: "mailto:vitorhugo.noronha15@gmail.com",
    emailLabel: "vitorhugo.noronha15@gmail.com",
    cp2ejr: "https://cp2ejr.com.br/",
    inatel: "https://inatel.br/",
    madeByYou: "https://www.instagram.com/use.mby/",
  },
  milestones: [
    {
      role: "Coordenador de P&D e Gerente de Projetos",
      organization: "CP2eJr (Núcleo de Projetos)",
      detail:
        "Liderança do ciclo de Pesquisa e Desenvolvimento e arquitetura da plataforma interna CP2eJR - Corporative, origem das 26 trilhas técnicas deste catálogo.",
      url: "https://cp2ejr.com.br/",
    },
    {
      role: "Graduando em Engenharia de Software e Pesquisador IC",
      organization: "Inatel",
      detail:
        "Formação em Engenharia de Software com pesquisa de Iniciação Científica em Modelagem Computacional e Manufatura Aditiva 3D.",
      url: "https://inatel.br/",
    },
    {
      role: "Co-Fundador",
      organization: "Made By You",
      detail:
        "Concepção de marca e entrega de produtos digitais autorais do protótipo até a experiência final do cliente.",
      url: "https://www.instagram.com/use.mby/",
    },
    {
      role: "Técnico em Eletrônica e Desenvolvedor de Jogos",
      organization: "ETE FMC & Game Jams",
      detail:
        "Base sólida em eletrônica pela ETE FMC e criação de jogos em GameMaker (GML) e Construct 3, com prêmio de Melhor Visual na Game Jam Cubio.",
    },
  ] as AuthorMilestone[],
  stackGroups: [
    {
      label: "Front-End & UI",
      items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Motion", "HTML5 / CSS3"],
    },
    {
      label: "Base Algorítmica & Back-End",
      items: ["Node.js", "Python", "Java", "C++", "C", "C#", "Supabase / SQL"],
    },
    {
      label: "Games, 3D & Hardware",
      items: ["GameMaker (GML)", "Construct 3", "Modelagem 3D", "Manufatura Aditiva", "Eletrônica"],
    },
  ],
  featuredRepos: [
    {
      name: "Projeto-Cursos-EAD",
      language: "TypeScript / Next.js",
      description: "E-commerce estático das 26 trilhas do Núcleo de Projetos preparado para Supabase e GitHub Pages.",
      url: "https://github.com/XkrulesVitor/Projeto-Cursos-EAD",
      highlight: "Este projeto",
    },
    {
      name: "Gamificacao-Inatel-Academico",
      language: "TypeScript",
      description: "Implementação de mecânicas de gamificação entre alunos no aplicativo Inatel Acadêmico.",
      url: "https://github.com/XkrulesVitor/Gamificacao-Inatel-Academico",
      highlight: "Educação & Produto",
    },
    {
      name: "V.A.L-Finance",
      language: "Python",
      description: "Aplicação de Inteligência Artificial aplicada à análise e apoio a decisões de investimentos.",
      url: "https://github.com/XkrulesVitor/V.A.L-Finance",
      highlight: "IA Aplicada",
    },
    {
      name: "MRP-Mobi",
      language: "TypeScript",
      description: "Plataforma web para gestão de indicações integrada ao aplicativo MRP Mobi.",
      url: "https://github.com/XkrulesVitor/MRP-Mobi",
      highlight: "Web App",
    },
    {
      name: "Inatel2",
      language: "TypeScript",
      description: "Calculadora de notas e planejamento acadêmico criada para estudantes dos cursos do Inatel.",
      url: "https://github.com/XkrulesVitor/Inatel2",
      highlight: "Ferramenta Estudantil",
    },
    {
      name: "Pokemon-Ruptura-Temporal",
      language: "GameMaker Language",
      description: "Fan game autoral desenvolvido em GML com foco em direção visual e sistemas de gameplay.",
      url: "https://github.com/XkrulesVitor/Pokemon-Ruptura-Temporal",
      highlight: "Game Dev",
    },
  ] as AuthorProject[],
};
