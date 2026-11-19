// Catálogo completo das 25 trilhas do Núcleo de Projetos (NP - Corporative)
// Total real: 25 trilhas, 92 cursos e 564 horas de carga horária

import type { CategoryMeta, CouponCode, CourseTrack } from "@/types/course";

export const COURSE_CATEGORIES: CategoryMeta[] = [
  {
    id: "web-mobile",
    label: "Web & Mobile",
    shortLabel: "Web & Mobile",
    description: "Interfaces responsivas, ecossistema React, Angular, WordPress e apps Android.",
    image: "/images/cat-web-mobile.jpg",
  },
  {
    id: "backend",
    label: "Back-End & Linguagens",
    shortLabel: "Back-End",
    description: "APIs escaláveis, arquitetura de serviços e domínio de Node.js, Python, Go, Java e C#.",
    image: "/images/cat-backend.jpg",
  },
  {
    id: "ia-vibe",
    label: "IA & Vibe Coding",
    shortLabel: "IA & Vibe Coding",
    description: "Fluxos de Vibe Coding, LLMs, agentes autônomos, chatbots e PLN aplicados a produto.",
    image: "/images/cat-ai-vibe.jpg",
  },
  {
    id: "engenharia",
    label: "Engenharia & Software",
    shortLabel: "Software",
    description: "Arquitetura, algoritmos, qualidade automatizada e gestão técnica de entregas.",
    image: "/images/cat-software.jpg",
  },
  {
    id: "dados-cloud",
    label: "Dados, Cloud & Segurança",
    shortLabel: "Dados & Cloud",
    description: "Engenharia de dados, machine learning, infraestrutura em nuvem e cibersegurança.",
    image: "/images/cat-data-cloud.jpg",
  },
  {
    id: "fundamentos",
    label: "Fundamentos & Ferramentas",
    shortLabel: "Fundamentos",
    description: "Produtividade diária com Dev Toolkit e domínio total do ecossistema Git e GitHub.",
    image: "/images/cat-foundations.jpg",
  },
];

export const STORE_COUPONS: CouponCode[] = [
  {
    code: "CP2EJR10",
    discountPercent: 10,
    description: "10% de desconto da comunidade CP2eJr",
  },
  {
    code: "VIBE15",
    discountPercent: 15,
    description: "15% OFF especial de Vibe Coding",
  },
  {
    code: "INATEL20",
    discountPercent: 20,
    description: "20% OFF para estudantes e devs",
  },
];

export const COURSES: CourseTrack[] = [
  // =========================================================================
  // 1. FUNDAMENTOS & FERRAMENTAS (2 trilhas)
  // =========================================================================
  {
    id: "dev-toolkit",
    slug: "dev-toolkit",
    title: "Dev Toolkit",
    tagline: "As ferramentas que separam quem escreve código de quem entrega software rápido.",
    description:
      "Trilha prática em cinco cursos diretos focada no dia a dia de quem programa: terminal avançado, HTTP e APIs, containers Docker, depuração no navegador e automação de tarefas repetitivas.",
    category: "fundamentos",
    level: "Iniciante",
    courseCount: 5,
    totalHours: 12,
    npPoints: 30,
    price: 49.99,
    originalPrice: 89.9,
    badge: "Oferta R$ 49,99",
    image: "/images/courses/dev-toolkit.jpg",
    imageAlt: "Maleta modular escura de engenharia com terminal laranja, containers ciano e engrenagem metálica",
    stack: ["Shell", "HTTP/REST", "Docker", "VS Code", "Regex"],
    outcomes: [
      "Navegar, diagnosticar processos e automatizar rotinas no terminal",
      "Inspecionar requisições HTTP, cabeçalhos, autenticação e payloads JSON",
      "Subir ambientes reprodutíveis com Docker e Docker Compose",
    ],
    prerequisites: ["Familiaridade básica com uso de computador e editor de código"],
    modules: [
      {
        id: "dev-toolkit-m1",
        title: "Terminal, Shell e Produtividade na Linha de Comando",
        hours: 3,
        topics: [
          "Pipes, redirecionamento, busca de arquivos e inspeção de logs",
          "Aliases, scripts simples e variáveis de sessão",
        ],
      },
      {
        id: "dev-toolkit-m2",
        title: "Protocolo HTTP, APIs e Clientes de Teste",
        hours: 2,
        topics: [
          "Verbos HTTP, status codes, headers e cookies na prática",
          "Coleções de testes de API com Insomnia, Bruno e curl",
        ],
      },
      {
        id: "dev-toolkit-m3",
        title: "Containers Essenciais com Docker",
        hours: 3,
        topics: [
          "Imagens, containers, volumes e redes locais",
          "Dockerfile enxuto e ambientes multi-serviço com Compose",
        ],
      },
      {
        id: "dev-toolkit-m4",
        title: "Debugging, DevTools e Inspeção de Rede",
        hours: 2,
        topics: [
          "Breakpoints, watch expressions e leitura de stack traces",
          "Análise de performance, cache e requisições no navegador",
        ],
      },
      {
        id: "dev-toolkit-m5",
        title: "Expressões Regulares e Automação de Rotinas",
        hours: 2,
        topics: [
          "Padrões práticos de Regex para validação e refatoração",
          "Scripts de tarefas e hooks de qualidade no projeto",
        ],
      },
    ],
  },
  {
    id: "github",
    slug: "github",
    title: "GitHub",
    tagline: "Versionamento profissional, Pull Requests limpos e automação com GitHub Actions.",
    description:
      "Domine todo o ecossistema Git e GitHub em 28 horas práticas: do histórico limpo de commits até pipelines de CI/CD, GitHub Pages, segurança de dependências e colaboração em escala.",
    category: "fundamentos",
    level: "Intermediário",
    courseCount: 5,
    totalHours: 28,
    npPoints: 30,
    price: 149.9,
    originalPrice: 189.9,
    image: "/images/courses/github.jpg",
    imageAlt: "Emblema Octocat do GitHub em prata cromada sobre grade luminosa de contribuições em verde esmeralda",
    stack: ["Git", "GitHub Actions", "GitHub Pages", "Code Review", "CI/CD"],
    outcomes: [
      "Resolver conflitos complexos, usar rebase interativo e manter histórico legível",
      "Conduzir code reviews técnicos com Pull Requests bem documentados",
      "Criar pipelines reais no GitHub Actions para testes, build e deploy automático",
    ],
    prerequisites: ["Lógica básica de programação e noções iniciais de terminal"],
    modules: [
      {
        id: "github-m1",
        title: "Git Profundo: Branches, Merge, Rebase e Recuperação",
        hours: 6,
        topics: [
          "Modelo de objetos do Git, commits atômicos e Conventional Commits",
          "Rebase interativo, cherry-pick, bisect e recuperação com reflog",
        ],
      },
      {
        id: "github-m2",
        title: "Fluxos Colaborativos, Issues e Code Review",
        hours: 6,
        topics: [
          "GitHub Flow, Trunk-Based Development e proteção de branches",
          "Templates de PR, checklists de revisão e gestão com GitHub Projects",
        ],
      },
      {
        id: "github-m3",
        title: "Automação Completa com GitHub Actions",
        hours: 6,
        topics: [
          "Workflows YAML, jobs em matriz, cache de dependências e secrets",
          "Validação automática de lint, typecheck e testes a cada Pull Request",
        ],
      },
      {
        id: "github-m4",
        title: "Deploy Contínuo e GitHub Pages na Prática",
        hours: 5,
        topics: [
          "Publicação de sites estáticos e apps Next.js/React via Actions",
          "Ambientes de staging, releases semânticas e artefatos de build",
        ],
      },
      {
        id: "github-m5",
        title: "Segurança de Repositórios e Portfólio Técnico",
        hours: 5,
        topics: [
          "Dependabot, secret scanning, code owners e assinatura de commits",
          "Documentação de README e organização de repositórios open source",
        ],
      },
    ],
  },

  // =========================================================================
  // 2. WEB & MOBILE (6 trilhas)
  // =========================================================================
  {
    id: "front-end-essencial",
    slug: "front-end-essencial",
    title: "Front-End Essencial",
    tagline: "HTML semântico, CSS moderno, JavaScript avançado e interfaces acessíveis.",
    description:
      "Formação de base sólida para construir interfaces rápidas, responsivas e fiéis ao design. Em 4 cursos e 31 horas, você domina da semântica HTML até arquiteturas CSS modernas e JavaScript assíncrono.",
    category: "web-mobile",
    level: "Iniciante",
    courseCount: 4,
    totalHours: 31,
    npPoints: 30,
    price: 159.9,
    originalPrice: 199.9,
    badge: "Mais procurada",
    featured: true,
    image: "/images/courses/front-end-essencial.jpg",
    imageAlt: "Símbolo metálico 3D de código </> flutuando sobre painéis translúcidos de layout web em ciano e cobre",
    stack: ["HTML5", "CSS3", "JavaScript ES2024", "Tailwind CSS", "Acessibilidade"],
    outcomes: [
      "Estruturar páginas semânticas otimizadas para SEO e leitores de tela",
      "Criar layouts responsivos com CSS Grid, Flexbox, tokens e modo claro/escuro",
      "Consumir APIs REST e manipular estado da interface com JavaScript moderno",
    ],
    prerequisites: ["Lógica básica de programação e familiaridade com editor de código"],
    modules: [
      {
        id: "fe-m1",
        title: "HTML5 Semântico, Formulários e Acessibilidade Web",
        hours: 7,
        topics: [
          "Estrutura documental, landmarks ARIA e navegação por teclado",
          "Formulários nativos, validação semântica e metadados para SEO",
        ],
      },
      {
        id: "fe-m2",
        title: "CSS Moderno: Grid, Flexbox, Tokens e Responsividade",
        hours: 8,
        topics: [
          "Sistemas de espaçamento, tipografia fluida com clamp() e variáveis CSS",
          "Temas claro e escuro, estados interativos e animações performáticas",
        ],
      },
      {
        id: "fe-m3",
        title: "JavaScript Moderno, DOM e Programação Assíncrona",
        hours: 9,
        topics: [
          "Escopo, closures, módulos ES, imutabilidade e manipulação de arrays",
          "Fetch API, async/await, tratamento de erros e persistência local",
        ],
      },
      {
        id: "fe-m4",
        title: "Projeto de Vitrine Responsiva e Otimização de Performance",
        hours: 7,
        topics: [
          "Core Web Vitals (LCP, INP, CLS), carregamento de fontes e imagens",
          "Publicação em produção e auditoria completa de interface",
        ],
      },
    ],
  },
  {
    id: "web-php-wordpress",
    slug: "web-php-wordpress",
    title: "Web com PHP e WordPress",
    tagline: "Sites institucionais, lojas e temas sob medida prontos para clientes reais.",
    description:
      "Voltada para entregas comerciais rápidas e sustentáveis. Você aprende PHP moderno orientado a objetos e o desenvolvimento de temas, blocos e customizações profissionais em WordPress.",
    category: "web-mobile",
    level: "Intermediário",
    courseCount: 2,
    totalHours: 31,
    npPoints: 30,
    price: 149.9,
    image: "/images/courses/web-php-wordpress.jpg",
    imageAlt: "Emblema circular metálico do WordPress em vidro azul índigo ao lado de blocos modulares de páginas web",
    stack: ["PHP 8", "WordPress", "MySQL", "WooCommerce", "Custom Themes"],
    outcomes: [
      "Desenvolver aplicações dinâmicas com PHP 8 e conexão segura a banco de dados",
      "Criar temas próprios, Custom Post Types e plugins leves no WordPress",
      "Configurar segurança, cache, SEO técnico e deploy para clientes",
    ],
    prerequisites: ["Conhecimentos básicos de HTML e CSS"],
    modules: [
      {
        id: "php-wp-m1",
        title: "PHP 8 Moderno, Orientação a Objetos e Banco de Dados",
        hours: 16,
        topics: [
          "Tipagem estrita, namespaces, Composer e padrão MVC enxuto",
          "PDO com prepared statements, sessões, autenticação e upload seguro",
          "Boas práticas contra SQL Injection, XSS e CSRF",
        ],
      },
      {
        id: "php-wp-m2",
        title: "WordPress Profissional: Temas, Blocos e Publicação",
        hours: 15,
        topics: [
          "Hierarquia de templates, hooks (actions e filters) e Custom Post Types",
          "Campos personalizados, integração WooCommerce e otimização de cache",
          "Migração, backup automatizado e manutenção em produção",
        ],
      },
    ],
  },
  {
    id: "full-stack",
    slug: "full-stack",
    title: "Full Stack",
    tagline: "Do banco relacional à interface reativa: construa produtos web ponta a ponta.",
    description:
      "Unifique front-end, back-end, autenticação e banco de dados em uma trilha de 32 horas focada em entrega real. Ideal para quem quer liderar features completas do requisito ao deploy.",
    category: "web-mobile",
    level: "Intermediário",
    courseCount: 2,
    totalHours: 32,
    npPoints: 30,
    price: 189.9,
    originalPrice: 239.9,
    featured: true,
    image: "/images/courses/full-stack.jpg",
    imageAlt: "Camadas tridimensionais de vidro fumê e blocos arquitetônicos conectados por luz cobre e esmeralda",
    stack: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Supabase"],
    outcomes: [
      "Arquitetar uma aplicação Full Stack tipada de ponta a ponta com TypeScript",
      "Modelar banco PostgreSQL com autenticação, permissões e APIs seguras",
      "Colocar uma aplicação completa no ar com observabilidade e CI/CD",
    ],
    prerequisites: ["Conhecimento prévio de JavaScript e fundamentos de Front-End"],
    modules: [
      {
        id: "fullstack-m1",
        title: "Front-End Reativo com TypeScript, React e Next.js",
        hours: 16,
        topics: [
          "Arquitetura de componentes, App Router, formulários e validação de schema",
          "Gerenciamento de estado, cache de requisições e UX resiliente",
          "Integração com autenticação e proteção de rotas",
        ],
      },
      {
        id: "fullstack-m2",
        title: "Back-End, Modelagem PostgreSQL e Deploy Integrado",
        hours: 16,
        topics: [
          "Design de APIs REST, migrações SQL, relacionamentos e índices",
          "Políticas de acesso (RLS), webhooks e tratamento estruturado de erros",
          "Pipeline de build, variáveis de ambiente e monitoramento em produção",
        ],
      },
    ],
  },
  {
    id: "react-react-native",
    slug: "react-react-native",
    title: "React & React Native",
    tagline: "Formação intensiva de 50 horas para dominar web moderna e apps iOS/Android.",
    description:
      "Nossa trilha mais extensa de desenvolvimento de interfaces multiplataforma. Em 3 cursos profundos, você domina React moderno, gerenciamento de estado em escala e aplicativos nativos com React Native e Expo.",
    category: "web-mobile",
    level: "Avançado",
    courseCount: 3,
    totalHours: 50,
    npPoints: 40,
    price: 249.99,
    originalPrice: 250.0,
    badge: "Oferta R$ 249,99",
    featured: true,
    image: "/images/courses/react-react-native.jpg",
    imageAlt: "Átomo oficial do React em vidro ciano luminoso sobre estúdio grafite com silhuetas web e mobile",
    stack: ["React 19", "TypeScript", "React Native", "Expo", "TanStack Query"],
    outcomes: [
      "Construir design systems e SPAs complexas com alta performance em React",
      "Gerenciar estado assíncrono, formulários complexos e testes de componentes",
      "Desenvolver e empacotar aplicativos Android e iOS completos com React Native",
    ],
    prerequisites: ["Domínio de JavaScript moderno e fundamentos de TypeScript"],
    modules: [
      {
        id: "rrn-m1",
        title: "React Profundo: Arquitetura, Hooks e Performance",
        hours: 18,
        topics: [
          "Composição avançada, custom hooks, Context API e padrões de renderização",
          "Profiling de performance, memoização consciente e acessibilidade em componentes",
          "Testes de integração e organização modular de projetos médios e grandes",
        ],
      },
      {
        id: "rrn-m2",
        title: "Ecossistema Web em Produção: Roteamento, Dados e Estado",
        hours: 16,
        topics: [
          "Sincronização de dados de servidor, cache otimista e paginação infinita",
          "Formulários tipados, animações fluidas e internacionalização",
          "Arquitetura limpa separando domínio, serviços e camada visual",
        ],
      },
      {
        id: "rrn-m3",
        title: "Aplicativos Mobile com React Native e Expo",
        hours: 16,
        topics: [
          "Navegação nativa, gestos, animações 60fps e adaptação de Safe Areas",
          "Persistência offline, notificações push e integração com recursos do aparelho",
          "Build com EAS e preparação para publicação nas lojas",
        ],
      },
    ],
  },
  {
    id: "mobile-nativo-android",
    slug: "mobile-nativo-android",
    title: "Mobile Nativo Android",
    tagline: "Desenvolvimento nativo moderno com Kotlin, Jetpack Compose e arquitetura limpa.",
    description:
      "Aprenda a construir aplicativos Android rápidos, confiáveis e seguindo as recomendações oficiais do Google, do Kotlin essencial até interfaces declarativas com Jetpack Compose.",
    category: "web-mobile",
    level: "Intermediário",
    courseCount: 3,
    totalHours: 16,
    npPoints: 30,
    price: 99.9,
    image: "/images/courses/mobile-nativo-android.jpg",
    imageAlt: "Emblema oficial do Android em verde esmeralda metálico flutuando sobre base de smartphone em grafite",
    stack: ["Kotlin", "Jetpack Compose", "Android Studio", "Room", "Retrofit"],
    outcomes: [
      "Programar com fluência em Kotlin utilizando coroutines e null safety",
      "Criar telas responsivas com Material 3 e Jetpack Compose",
      "Consumir APIs REST e persistir dados localmente usando arquitetura MVVM",
    ],
    prerequisites: ["Lógica de programação orientada a objetos"],
    modules: [
      {
        id: "android-m1",
        title: "Kotlin Moderno para Desenvolvimento Android",
        hours: 6,
        topics: [
          "Tipos anuláveis, data classes, sealed classes e funções de extensão",
          "Coroutines, Flow e programação assíncrona sem bloqueio de UI",
        ],
      },
      {
        id: "android-m2",
        title: "Interfaces Declarativas com Jetpack Compose",
        hours: 5,
        topics: [
          "Composables, elevação de estado, listas preguiçosas e temas claro/escuro",
          "Navegação entre telas e animações de transição suaves",
        ],
      },
      {
        id: "android-m3",
        title: "Arquitetura MVVM, APIs e Persistência Local",
        hours: 5,
        topics: [
          "ViewModel, repositórios, consumo de APIs com Retrofit e Room Database",
          "Empacotamento de APK/AAB e depuração em dispositivos reais",
        ],
      },
    ],
  },
  {
    id: "angular",
    slug: "angular",
    title: "Angular",
    tagline: "Aplicações corporativas estruturadas com TypeScript, Signals e RxJS.",
    description:
      "Trilha enxuta e direta ao ponto para dominar o Angular moderno com standalone components, Signals, formulários reativos e injeção de dependência usada em grandes equipes.",
    category: "web-mobile",
    level: "Intermediário",
    courseCount: 2,
    totalHours: 7,
    npPoints: 20,
    price: 50.0,
    image: "/images/courses/angular.jpg",
    imageAlt: "Escudo geométrico facetado do Angular em cristal rubi e aço escovado sobre superfície escura",
    stack: ["Angular", "TypeScript", "Signals", "RxJS", "Reactive Forms"],
    outcomes: [
      "Estruturar aplicações Angular modernas com standalone components e Signals",
      "Integrar APIs HTTP com interceptors, guards e formulários reativos validados",
    ],
    prerequisites: ["Conhecimento básico de HTML, CSS e TypeScript"],
    modules: [
      {
        id: "angular-m1",
        title: "Fundamentos do Angular Moderno e Signals",
        hours: 4,
        topics: [
          "Standalone components, diretivas de controle de fluxo e data binding",
          "Signals, computed values e injeção de dependência modular",
        ],
      },
      {
        id: "angular-m2",
        title: "Roteamento, Formulários Reativos e Integração HTTP",
        hours: 3,
        topics: [
          "Lazy loading de rotas, guards de autenticação e interceptors HTTP",
          "Formulários reativos com validações customizadas e build de produção",
        ],
      },
    ],
  },

  // =========================================================================
  // 3. BACK-END & LINGUAGENS (5 trilhas)
  // =========================================================================
  {
    id: "backend-nodejs",
    slug: "backend-nodejs",
    title: "Back-End com Node.js",
    tagline: "APIs robustas, autenticação, banco de dados, filas e testes em 42 horas.",
    description:
      "Formação profunda de back-end com JavaScript e TypeScript no servidor. Você constrói serviços de produção com arquitetura desacoplada, segurança, mensageria e observabilidade.",
    category: "backend",
    level: "Intermediário",
    courseCount: 2,
    totalHours: 42,
    npPoints: 40,
    price: 229.9,
    originalPrice: 250.0,
    featured: true,
    image: "/images/courses/backend-nodejs.jpg",
    imageAlt: "Hexágono oficial do Node.js em verde lima luminoso conectado a módulos de servidor em estúdio escuro",
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Redis", "Docker"],
    outcomes: [
      "Projetar APIs REST tipadas com validação rigorosa, autenticação JWT e RBAC",
      "Implementar arquitetura em camadas, testes automatizados e cache com Redis",
      "Orquestrar filas assíncronas, logs estruturados e deploy em container",
    ],
    prerequisites: ["Conhecimento intermediário de JavaScript ou TypeScript"],
    modules: [
      {
        id: "node-m1",
        title: "Fundamentos de Node.js, HTTP, APIs REST e Banco Relacional",
        hours: 20,
        topics: [
          "Event Loop, streams, variáveis de ambiente e estrutura limpa de projeto",
          "Validação de entrada, autenticação com hash seguro, JWT e refresh tokens",
          "Modelagem PostgreSQL, migrações, transações e consultas otimizadas",
        ],
      },
      {
        id: "node-m2",
        title: "Arquitetura Escalável, Testes, Filas e Produção",
        hours: 22,
        topics: [
          "Clean Architecture pragmática, inversão de dependência e tratamento de erros",
          "Cache distribuído, jobs em background, rate limiting e segurança HTTP",
          "Testes unitários/integração, observabilidade e containerização para produção",
        ],
      },
    ],
  },
  {
    id: "csharp-dotnet",
    slug: "csharp-dotnet",
    title: "C# e .NET",
    tagline: "Construa APIs corporativas de alta performance no ecossistema Microsoft .NET.",
    description:
      "Aprenda C# moderno e ASP.NET Core do zero ao deploy, cobrindo LINQ, Entity Framework Core, injeção de dependência nativa e boas práticas amplamente exigidas no mercado corporativo.",
    category: "backend",
    level: "Intermediário",
    courseCount: 2,
    totalHours: 16,
    npPoints: 30,
    price: 99.9,
    image: "/images/courses/csharp-dotnet.jpg",
    imageAlt: "Hexágono metálico violeta com o símbolo cromado C# sobre pedestal geométrico grafite",
    stack: ["C#", ".NET 9", "ASP.NET Core", "Entity Framework", "SQL Server"],
    outcomes: [
      "Escrever código idiomático em C# com generics, LINQ e programação assíncrona",
      "Criar Web APIs documentadas com OpenAPI, EF Core e autenticação robusta",
    ],
    prerequisites: ["Lógica de programação e noções de orientação a objetos"],
    modules: [
      {
        id: "dotnet-m1",
        title: "C# Moderno, Orientação a Objetos e LINQ",
        hours: 8,
        topics: [
          "Records, pattern matching, interfaces, generics e coleções",
          "Consultas expressivas com LINQ e assincronismo com async/await",
        ],
      },
      {
        id: "dotnet-m2",
        title: "Web APIs com ASP.NET Core e Entity Framework Core",
        hours: 8,
        topics: [
          "Minimal APIs vs Controllers, injeção de dependência e middlewares",
          "Mapeamento relacional com EF Core, migrações e testes de endpoint",
        ],
      },
    ],
  },
  {
    id: "linguagem-go",
    slug: "linguagem-go",
    title: "Linguagem Go",
    tagline: "Concorrência simples, binários rápidos e microsserviços leves com Golang.",
    description:
      "Introdução acelerada e prática à linguagem Go: sintaxe enxuta, structs, interfaces, goroutines, channels e construção de serviços HTTP de altíssimo rendimento e baixo consumo de memória.",
    category: "backend",
    level: "Intermediário",
    courseCount: 2,
    totalHours: 7,
    npPoints: 20,
    price: 49.99,
    originalPrice: 74.9,
    badge: "Oferta R$ 49,99",
    image: "/images/courses/linguagem-go.jpg",
    imageAlt: "Emblema aerodinâmico GO em metal anodizado turquesa com trilhas luminosas de alta velocidade",
    stack: ["Go", "Goroutines", "net/http", "PostgreSQL", "CLI"],
    outcomes: [
      "Escrever código Go idiomático com tratamento explícito de erros e testes nativos",
      "Aplicar goroutines, channels e context em serviços concorrentes seguros",
    ],
    prerequisites: ["Experiência básica em alguma linguagem de programação"],
    modules: [
      {
        id: "go-m1",
        title: "Fundamentos de Go, Tipos Compostos e Concorrência",
        hours: 4,
        topics: [
          "Módulos, slices, maps, ponteiros, structs e interfaces implícitas",
          "Goroutines, channels, select, WaitGroups e cancelamento com context",
        ],
      },
      {
        id: "go-m2",
        title: "Serviços HTTP de Alta Performance com Biblioteca Padrão",
        hours: 3,
        topics: [
          "Roteamento moderno com net/http, middlewares e serialização JSON",
          "Testes de tabela, benchmarks e compilação de binário único",
        ],
      },
    ],
  },
  {
    id: "java-spring",
    slug: "java-spring",
    title: "Java & Spring",
    tagline: "Engenharia back-end em Java moderno com Spring Boot, JPA e segurança.",
    description:
      "Quatro cursos objetivos para construir APIs empresariais em Java e Spring Boot com organização limpa, persistência com Spring Data JPA, Spring Security e testes automatizados.",
    category: "backend",
    level: "Intermediário",
    courseCount: 4,
    totalHours: 13,
    npPoints: 30,
    price: 89.9,
    image: "/images/courses/java-spring.jpg",
    imageAlt: "Xícara de cerâmica escura com vapor luminoso laranja do Java ao lado da folha cristalina verde do Spring",
    stack: ["Java 21", "Spring Boot", "Spring Data JPA", "Spring Security", "JUnit"],
    outcomes: [
      "Usar recursos modernos do Java 21 (records, streams e optional) com clareza",
      "Construir APIs REST completas com Spring Boot, validação e persistência JPA",
      "Proteger endpoints com Spring Security e validar regras com JUnit",
    ],
    prerequisites: ["Base em lógica de programação orientada a objetos"],
    modules: [
      {
        id: "java-m1",
        title: "Java Moderno: Coleções, Streams e Boas Práticas",
        hours: 4,
        topics: [
          "Records, lambdas, Stream API, exceções e organização de pacotes",
          "Gestão de dependências com Maven e Gradle",
        ],
      },
      {
        id: "java-m2",
        title: "APIs REST com Spring Boot e Validação",
        hours: 3,
        topics: [
          "Injeção de dependência, DTOs, Bean Validation e tratamento global de erros",
          "Documentação interativa com Swagger / OpenAPI",
        ],
      },
      {
        id: "java-m3",
        title: "Persistência de Dados com Spring Data JPA",
        hours: 3,
        topics: [
          "Entidades, relacionamentos, consultas derivadas e paginação",
          "Migrações versionadas de schema com Flyway",
        ],
      },
      {
        id: "java-m4",
        title: "Spring Security, JWT e Testes Automatizados",
        hours: 3,
        topics: [
          "Autenticação stateless, perfis de acesso e filtros de segurança",
          "Testes unitários com JUnit 5, Mockito e MockMvc",
        ],
      },
    ],
  },
  {
    id: "python",
    slug: "python",
    title: "Python",
    tagline: "Linguagem versátil para automação, APIs com FastAPI e base para IA e dados.",
    description:
      "Domine Python de forma estruturada em 3 cursos e 17 horas: da sintaxe limpa e ambientes virtuais até orientação a objetos, automação de scripts e APIs modernas com FastAPI.",
    category: "backend",
    level: "Iniciante",
    courseCount: 3,
    totalHours: 17,
    npPoints: 30,
    price: 109.9,
    originalPrice: 139.9,
    image: "/images/courses/python.jpg",
    imageAlt: "Símbolo oficial do Python em vidro metálico azul cobalto e amarelo ouro sobre superfície grafite escura",
    stack: ["Python 3.12", "FastAPI", "Pydantic", "Pytest", "Automação"],
    outcomes: [
      "Escrever código Python limpo com tipagem gradual e ambientes isolados",
      "Automatizar manipulação de arquivos, planilhas e integrações externas",
      "Desenvolver APIs rápidas e documentadas com FastAPI e testes em Pytest",
    ],
    prerequisites: ["Nenhum pré-requisito avançado; indicado também para iniciantes"],
    modules: [
      {
        id: "python-m1",
        title: "Python Essencial e Pensamento Computacional",
        hours: 6,
        topics: [
          "Estruturas nativas, list comprehensions, funções e módulos",
          "Ambientes virtuais, gestão de pacotes e boas práticas PEP 8",
        ],
      },
      {
        id: "python-m2",
        title: "Orientação a Objetos, Arquivos e Automação Prática",
        hours: 6,
        topics: [
          "Classes, dataclasses, tratamento de exceções e leitura de CSV/JSON",
          "Consumo de APIs externas e automação de tarefas recorrentes",
        ],
      },
      {
        id: "python-m3",
        title: "APIs Modernas com FastAPI, Pydantic e Pytest",
        hours: 5,
        topics: [
          "Validação de schemas com Pydantic, rotas assíncronas e OpenAPI automático",
          "Suíte de testes automatizados com Pytest e boas práticas de deploy",
        ],
      },
    ],
  },

  // =========================================================================
  // 4. IA & VIBE CODING (4 trilhas)
  // =========================================================================
  {
    id: "vibe-coding",
    slug: "vibe-coding",
    title: "Vibe Coding",
    tagline: "Construa software real em velocidade máxima orquestrando agentes de código.",
    description:
      "Oito módulos rápidos e práticos (9h) sobre engenharia assistida por IA sem cair em código quebrado: especificação antes do prompt, revisão crítica, design systems com IA e deploy de produtos reais.",
    category: "ia-vibe",
    level: "Iniciante",
    courseCount: 8,
    totalHours: 9,
    npPoints: 20,
    price: 49.99,
    originalPrice: 99.9,
    badge: "Oferta R$ 49,99",
    featured: true,
    image: "/images/courses/vibe-coding.jpg",
    imageAlt: "Barra de prompt em vidro fumê com símbolo de terminal e faísca de IA sobre teclas mecânicas escuras",
    stack: ["Agentes de Código", "Prompt Spec", "Next.js", "Supabase", "Code Review IA"],
    outcomes: [
      "Transformar ideias em especificações técnicas claras que guiam agentes de IA",
      "Evitar alucinações arquiteturais, regressão silenciosa e UI genérica",
      "Publicar MVPs funcionais com testes, git limpo e revisão humana rigorosa",
    ],
    prerequisites: ["Noções básicas de web ou vontade prática de construir produtos"],
    modules: [
      {
        id: "vibe-m1",
        title: "Mentalidade de Vibe Coding com Rigor de Engenharia",
        hours: 2,
        topics: [
          "Quando delegar para IA e quando assumir controle arquitetural",
          "Ciclo Spec -> Plano -> Execução -> Verificação",
        ],
      },
      {
        id: "vibe-m2",
        title: "Context Engineering: Regras, Skills e Memória de Projeto",
        hours: 1,
        topics: [
          "Como estruturar arquivos de contexto, restrições e padrões do repo",
          "Redução de retrabalho com prompts modulares e verificáveis",
        ],
      },
      {
        id: "vibe-m3",
        title: "Prototipagem de Interfaces Sem Cara de Template",
        hours: 1,
        topics: [
          "Direção visual, tokens de cor e revisão responsiva real no navegador",
          "Eliminando padrões genéricos e corrigindo hierarquia visual",
        ],
      },
      {
        id: "vibe-m4",
        title: "Construção Iterativa de Features Full Stack",
        hours: 1,
        topics: [
          "Quebra em tarefas pequenas e integração segura com banco e auth",
          "Geração controlada de schemas SQL e camadas de serviço",
        ],
      },
      {
        id: "vibe-m5",
        title: "Depuração Assistida e Leitura Crítica de Diffs",
        hours: 1,
        topics: [
          "Como investigar causa raiz com IA em vez de remendar sintomas",
          "Checklist rápido para auditar segurança e tipagem nos diffs",
        ],
      },
      {
        id: "vibe-m6",
        title: "Testes Automatizados Como Rede de Segurança",
        hours: 1,
        topics: [
          "Criando testes antes da refatoração para impedir quebras",
          "Verificação de build, lint e cenários de borda",
        ],
      },
      {
        id: "vibe-m7",
        title: "Integrações Rápidas: APIs, Webhooks e Deploy Estático",
        hours: 1,
        topics: [
          "Conectando Supabase, variáveis de ambiente e pipelines no GitHub Actions",
          "Publicação contínua sem custo de infraestrutura",
        ],
      },
      {
        id: "vibe-m8",
        title: "Desafio Final: Do Briefing ao Produto no Ar",
        hours: 1,
        topics: [
          "Entrega de uma aplicação completa documentada e auditada",
          "Boas práticas para manter o projeto vivo após o lançamento",
        ],
      },
    ],
  },
  {
    id: "ia-generativa",
    slug: "ia-generativa",
    title: "IA Generativa",
    tagline: "Fundamentos de LLMs, engenharia de prompts, RAG e avaliação em produção.",
    description:
      "Entenda como modelos fundacionais operam por baixo dos panos e construa aplicações de IA Generativa confiáveis com embeddings, busca semântica (RAG), controle de custo e métricas de qualidade.",
    category: "ia-vibe",
    level: "Intermediário",
    courseCount: 4,
    totalHours: 19,
    npPoints: 30,
    price: 129.9,
    originalPrice: 169.9,
    featured: true,
    image: "/images/courses/ia-generativa.jpg",
    imageAlt: "Escultura cristalina geométrica de rede neural emitindo faíscas luminosas em laranja e ciano",
    stack: ["LLMs", "RAG", "Embeddings", "Vector DB", "Prompt Engineering"],
    outcomes: [
      "Projetar prompts estruturados com saídas JSON confiáveis e controle de temperatura",
      "Implementar pipelines de RAG com chunking, embeddings e busca híbrida",
      "Avaliar qualidade, latência, custo por token e guardrails de segurança",
    ],
    prerequisites: ["Conhecimento básico de Python ou TypeScript e consumo de APIs"],
    modules: [
      {
        id: "genai-m1",
        title: "Arquitetura de LLMs, Tokens e Parâmetros de Geração",
        hours: 5,
        topics: [
          "Transformers em alto nível, janela de contexto, tokens e precificação",
          "Comparação prática entre modelos proprietários e abertos",
        ],
      },
      {
        id: "genai-m2",
        title: "Engenharia de Prompts e Saídas Estruturadas",
        hours: 5,
        topics: [
          "System prompts, few-shot, decomposição de tarefas e schemas JSON",
          "Mitigação de alucinações e citação verificável de fontes",
        ],
      },
      {
        id: "genai-m3",
        title: "RAG na Prática: Embeddings e Bancos Vetoriais",
        hours: 5,
        topics: [
          "Estratégias de chunking, indexação vetorial (pgvector) e reranking",
          "Pipeline de consulta sobre documentos PDF, bases técnicas e FAQs",
        ],
      },
      {
        id: "genai-m4",
        title: "Avaliação (Evals), Guardrails e Observabilidade",
        hours: 4,
        topics: [
          "Conjuntos de teste automatizados para medir fidelidade e relevância",
          "Proteção contra prompt injection, cache semântico e controle de custos",
        ],
      },
    ],
  },
  {
    id: "agentes-ia-chatbots",
    slug: "agentes-ia-chatbots",
    title: "Agentes de IA e Chatbots",
    tagline: "Orquestração multiagente, tool calling, memória e atendimento inteligente.",
    description:
      "Oito cursos completos (27h) para sair de prompts isolados e construir agentes autônomos capazes de usar ferramentas, consultar bancos de dados, manter memória e operar em canais reais.",
    category: "ia-vibe",
    level: "Avançado",
    courseCount: 8,
    totalHours: 27,
    npPoints: 30,
    price: 169.9,
    originalPrice: 219.9,
    featured: true,
    image: "/images/courses/agentes-ia-chatbots.jpg",
    imageAlt: "Núcleo orquestrador laranja conectado a satélites autônomos de diálogo em vidro fumê",
    stack: ["AI Agents", "Tool Calling", "MCP", "LangGraph", "Chatbots"],
    outcomes: [
      "Implementar agentes com chamada de funções (tool calling) e validação de ações",
      "Orquestrar fluxos multiagente com estado, memória de curto/longo prazo e fallback",
      "Integrar assistentes em interfaces web e canais de atendimento com monitoramento",
    ],
    prerequisites: ["Experiência com APIs e fundamentos de IA Generativa"],
    modules: [
      {
        id: "agents-m1",
        title: "Anatomia de Agentes: Planejamento, Ação e Observação",
        hours: 4,
        topics: [
          "Diferença entre workflows determinísticos e loops autônomos ReAct",
          "Definição clara de objetivos, limites e critérios de parada",
        ],
      },
      {
        id: "agents-m2",
        title: "Function Calling e Integração com Ferramentas Externas",
        hours: 4,
        topics: [
          "Contratos de ferramentas tipados, tratamento de falhas e retries",
          "Conexão segura com APIs REST, bancos SQL e serviços internos",
        ],
      },
      {
        id: "agents-m3",
        title: "Protocolo MCP e Ecossistema de Ferramentas Padronizadas",
        hours: 3,
        topics: [
          "Criação e consumo de servidores MCP para expor contexto e ações",
          "Boas práticas de permissão mínima para agentes",
        ],
      },
      {
        id: "agents-m4",
        title: "Memória de Conversa, Estado Persistente e Personalização",
        hours: 4,
        topics: [
          "Resumo progressivo de histórico, memória episódica e contexto por usuário",
          "Persistência de sessões de chat em PostgreSQL / Supabase",
        ],
      },
      {
        id: "agents-m5",
        title: "Grafos de Estado e Orquestração Multiagente",
        hours: 3,
        topics: [
          "Especialização de agentes (roteador, pesquisador, executor, revisor)",
          "Controle de ciclos, human-in-the-loop e aprovação de ações críticas",
        ],
      },
      {
        id: "agents-m6",
        title: "Design de Experiência Conversacional para Chatbots",
        hours: 3,
        topics: [
          "Streaming de tokens na UI, estados de pensamento e recuperação de erros",
          "Transbordo suave para atendimento humano",
        ],
      },
      {
        id: "agents-m7",
        title: "Segurança, Latência e Testes de Trajetórias",
        hours: 3,
        topics: [
          "Avaliação de escolha de ferramentas, sandboxing e limites de execução",
          "Tracing passo a passo de chamadas para depuração em produção",
        ],
      },
      {
        id: "agents-m8",
        title: "Projeto Integrador: Assistente Especialista em Produção",
        hours: 3,
        topics: [
          "Construção ponta a ponta de um agente com base de conhecimento e ações",
          "Deploy, telemetria e plano de evolução contínua",
        ],
      },
    ],
  },
  {
    id: "processamento-linguagem-natural",
    slug: "processamento-linguagem-natural",
    title: "Processamento de Linguagem Natural",
    tagline: "Da representação clássica de texto a Transformers e modelos de linguagem.",
    description:
      "Trilha aprofundada de 38 horas sobre NLP moderno e clássico: pré-processamento linguístico, classificação, extração de entidades, modelos Transformer e fine-tuning eficiente.",
    category: "ia-vibe",
    level: "Avançado",
    courseCount: 4,
    totalHours: 38,
    npPoints: 30,
    price: 219.9,
    image: "/images/courses/processamento-linguagem-natural.jpg",
    imageAlt: "Prismas cristalinos fumados refratando feixes luminosos laranja e verde representando processamento semântico",
    stack: ["Python", "Hugging Face", "PyTorch", "spaCy", "Transformers"],
    outcomes: [
      "Processar grandes volumes textuais para classificação, sentimento e NER",
      "Treinar e adaptar modelos Transformer com bibliotecas Hugging Face",
      "Colocar pipelines de NLP em produção com avaliação rigorosa de métricas",
    ],
    prerequisites: ["Python intermediário e noções básicas de Machine Learning"],
    modules: [
      {
        id: "pln-m1",
        title: "Fundamentos de Texto, Tokenização e Modelos Clássicos",
        hours: 9,
        topics: [
          "Normalização, lematização, TF-IDF, n-grams e pipelines com spaCy",
          "Classificação de documentos e análise de sentimento em português",
        ],
      },
      {
        id: "pln-m2",
        title: "Word Embeddings e Arquiteturas Neurais para Sequências",
        hours: 10,
        topics: [
          "Word2Vec, FastText, representações densas e similaridade semântica",
          "Mecanismos de atenção e evolução das redes sequenciais",
        ],
      },
      {
        id: "pln-m3",
        title: "Transformers, BERT e Ecossistema Hugging Face",
        hours: 10,
        topics: [
          "Self-attention, encoders, decoders e seleção de modelos pré-treinados",
          "Extração de entidades (NER), sumarização e perguntas e respostas",
        ],
      },
      {
        id: "pln-m4",
        title: "Fine-Tuning Eficiente (LoRA) e Inferência Otimizada",
        hours: 9,
        topics: [
          "Curadoria de datasets, ajuste fino com PEFT/LoRA e avaliação F1/ROUGE",
          "Quantização e serviço de modelos em API de baixa latência",
        ],
      },
    ],
  },

  // =========================================================================
  // 5. ENGENHARIA & SOFTWARE (4 trilhas)
  // =========================================================================
  {
    id: "engenharia-de-software",
    slug: "engenharia-de-software",
    title: "Engenharia de Software",
    tagline: "Requisitos, arquitetura limpa, padrões de projeto e manutenção sustentável.",
    description:
      "Estruture software que sobrevive ao tempo e à mudança de equipe. Em 22 horas você domina levantamento de requisitos, modelagem arquitetural, SOLID, design patterns e revisão técnica.",
    category: "engenharia",
    level: "Intermediário",
    courseCount: 3,
    totalHours: 22,
    npPoints: 30,
    price: 149.9,
    image: "/images/courses/engenharia-de-software.jpg",
    imageAlt: "Blocos arquitetônicos modulares de grafite sobre plano de blueprint técnico azul e cobre",
    stack: ["Arquitetura", "SOLID", "Design Patterns", "DDD", "UML / C4"],
    outcomes: [
      "Especificar sistemas com clareza usando histórias, ADRs e modelo C4",
      "Aplicar SOLID, acoplamento baixo e padrões de projeto sem overengineering",
      "Conduzir refatorações seguras e evoluir arquiteturas monolíticas ou modulares",
    ],
    prerequisites: ["Experiência prévia construindo projetos pequenos em qualquer linguagem"],
    modules: [
      {
        id: "eng-m1",
        title: "Engenharia de Requisitos, Modelagem e Documentação C4",
        hours: 8,
        topics: [
          "Requisitos funcionais/não-funcionais, casos de uso e critérios de aceite",
          "Diagramas C4, registros de decisão arquitetural (ADRs) e contratos",
        ],
      },
      {
        id: "eng-m2",
        title: "Design de Código, Princípios SOLID e Padrões de Projeto",
        hours: 7,
        topics: [
          "Coesão, acoplamento, inversão de dependência e composição",
          "Padrões criacionais, estruturais e comportamentais aplicados na prática",
        ],
      },
      {
        id: "eng-m3",
        title: "Arquitetura de Sistemas, Escalabilidade e Refatoração",
        hours: 7,
        topics: [
          "Monólito modular, arquitetura hexagonal e fronteiras de domínio (DDD)",
          "Gestão de débito técnico, revisão arquitetural e evolução segura",
        ],
      },
    ],
  },
  {
    id: "algoritmos-estruturas-dados",
    slug: "algoritmos-estruturas-dados",
    title: "Algoritmos e Estruturas de Dados",
    tagline: "Complexidade Big-O, grafos, árvores e resolução de problemas de alto nível.",
    description:
      "Base algorítmica sólida para entrevistas técnicas e sistemas que precisam escalar. Dois cursos densos (22h) cobrindo estruturas lineares, árvores balanceadas, grafos e programação dinâmica.",
    category: "engenharia",
    level: "Intermediário",
    courseCount: 2,
    totalHours: 22,
    npPoints: 30,
    price: 139.9,
    image: "/images/courses/algoritmos-estruturas-dados.jpg",
    imageAlt: "Árvore e grafo tridimensional de esferas metálicas conectadas por feixes luminosos cobre e índigo",
    stack: ["Big-O", "Estruturas de Dados", "Grafos", "Programação Dinâmica", "C++ / Python"],
    outcomes: [
      "Analisar complexidade de tempo e espaço de algoritmos reais",
      "Escolher e implementar listas, pilhas, filas, heaps, hash tables e árvores",
      "Resolver problemas clássicos com grafos, busca, guloso e programação dinâmica",
    ],
    prerequisites: ["Domínio básico de lógica de programação, funções e recursão"],
    modules: [
      {
        id: "aed-m1",
        title: "Complexidade, Ordenação e Estruturas Fundamentais",
        hours: 10,
        topics: [
          "Análise assintótica (Big-O), recursão e técnica dividir para conquistar",
          "Arrays, listas encadeadas, pilhas, filas, tabelas hash e ordenação eficiente",
        ],
      },
      {
        id: "aed-m2",
        title: "Árvores, Grafos e Estratégias Algorítmicas Avançadas",
        hours: 12,
        topics: [
          "Árvores binárias de busca, heaps, tries e percursos BFS/DFS",
          "Caminhos mínimos (Dijkstra), árvores geradoras, algoritmos gulosos e DP",
        ],
      },
    ],
  },
  {
    id: "qualidade-testes-software",
    slug: "qualidade-testes-software",
    title: "Qualidade e Testes de Software",
    tagline: "Pirâmide de testes, QA prático, TDD e automação ponta a ponta sem fragilidade.",
    description:
      "Quatro cursos diretos (6h) para incorporar qualidade desde a primeira linha de código: testes unitários, integração, automação E2E no navegador e integração em CI.",
    category: "engenharia",
    level: "Iniciante",
    courseCount: 4,
    totalHours: 6,
    npPoints: 20,
    price: 49.99,
    originalPrice: 69.9,
    badge: "Oferta R$ 49,99",
    image: "/images/courses/qualidade-testes-software.jpg",
    imageAlt: "Lupa óptica de precisão em titânio focando um selo de verificação verde esmeralda sobre blocos alinhados",
    stack: ["QA", "Vitest / Jest", "Playwright", "TDD", "CI Quality Gates"],
    outcomes: [
      "Escrever testes unitários e de integração rápidos e determinísticos",
      "Automatizar fluxos críticos de usuário com testes E2E confiáveis",
      "Estruturar planos de QA, reporte claro de bugs e gates no CI",
    ],
    prerequisites: ["Noções básicas de programação web ou back-end"],
    modules: [
      {
        id: "qa-m1",
        title: "Fundamentos de QA, Estratégia e Pirâmide de Testes",
        hours: 2,
        topics: [
          "Planejamento de cenários, classes de equivalência e valor limite",
          "Escrita de relatos de defeito reproduzíveis e métricas úteis",
        ],
      },
      {
        id: "qa-m2",
        title: "Testes Unitários, Mocks e Introdução a TDD",
        hours: 2,
        topics: [
          "Ciclo Red-Green-Refactor, isolamentos saudáveis e dublês de teste",
          "Cobertura inteligente focada em regras de negócio",
        ],
      },
      {
        id: "qa-m3",
        title: "Testes de Integração e Contratos de API",
        hours: 1,
        topics: [
          "Validação de endpoints, status HTTP e banco de testes isolado",
        ],
      },
      {
        id: "qa-m4",
        title: "Automação Ponta a Ponta (E2E) com Playwright",
        hours: 1,
        topics: [
          "Seletores resilientes, asserções automáticas e execução no GitHub Actions",
        ],
      },
    ],
  },
  {
    id: "gestao-de-projetos",
    slug: "gestao-de-projetos",
    title: "Gestão de Projetos",
    tagline: "Escopo, cronograma, métricas de fluxo e liderança prática de times de produto.",
    description:
      "Trilha de 21 horas para gerentes de projeto, tech leads e coordenadores entregarem valor previsível combinando métodos ágeis, gestão de riscos, comunicação com stakeholders e descoberta de produto.",
    category: "engenharia",
    level: "Iniciante",
    courseCount: 3,
    totalHours: 21,
    npPoints: 30,
    price: 119.9,
    image: "/images/courses/gestao-de-projetos.jpg",
    imageAlt: "Quadro Kanban tridimensional em três colunas de vidro fumê com cartões laranja, ciano e esmeralda",
    stack: ["Scrum", "Kanban", "Discovery", "Métricas de Fluxo", "Roadmaps"],
    outcomes: [
      "Estruturar escopo, EAP, cronogramas realistas e gestão ativa de riscos",
      "Facilitar rituais ágeis produtivos com Scrum, Kanban e métricas de fluxo",
      "Alinhar expectativas com clientes e priorizar backlog por impacto",
    ],
    prerequisites: ["Nenhum pré-requisito técnico obrigatório"],
    modules: [
      {
        id: "gp-m1",
        title: "Fundamentos de Gestão, Escopo, Riscos e Stakeholders",
        hours: 7,
        topics: [
          "Definição de objetivos, matriz de riscos, estimativas e comunicação clara",
          "Alinhamento com clientes, contratos de entrega e gestão de mudanças",
        ],
      },
      {
        id: "gp-m2",
        title: "Agilidade Prática: Scrum, Kanban e Métricas de Fluxo",
        hours: 7,
        topics: [
          "Quadros Kanban reais, limites de WIP, lead time e throughput",
          "Sprints enxutas, retrospectivas acionáveis e remoção de impedimentos",
        ],
      },
      {
        id: "gp-m3",
        title: "Visão de Produto, Priorização e Liderança Técnica",
        hours: 7,
        topics: [
          "Discovery contínuo, matrizes de priorização e definição de MVP",
          "Feedback construtivo, delegação e acompanhamento de saúde do time",
        ],
      },
    ],
  },

  // =========================================================================
  // 6. DADOS, CLOUD & SEGURANÇA (4 trilhas)
  // =========================================================================
  {
    id: "arquitetura-de-dados",
    slug: "arquitetura-de-dados",
    title: "Arquitetura de Dados",
    tagline: "A maior trilha do catálogo: 7 cursos e 51 horas de engenharia de dados moderna.",
    description:
      "Formação completa de ponta a ponta em arquitetura de dados: modelagem relacional e dimensional, pipelines ETL/ELT, Data Lakes, Lakehouse, streaming, orquestração e governança corporativa.",
    category: "dados-cloud",
    level: "Avançado",
    courseCount: 7,
    totalHours: 51,
    npPoints: 40,
    price: 250.0,
    badge: "Formação 51h",
    featured: true,
    image: "/images/courses/arquitetura-de-dados.jpg",
    imageAlt: "Torres cilíndricas de banco de dados em vidro fumê conectadas por pipelines luminosos dourados e azuis",
    stack: ["SQL", "Data Warehouse", "Lakehouse", "dbt", "Airflow", "Kafka", "Governança"],
    outcomes: [
      "Projetar modelos OLTP e OLAP (Star Schema) otimizados para consultas analíticas",
      "Construir pipelines confiáveis de ingestão, transformação (dbt) e orquestração",
      "Aplicar arquitetura Medalhão, streaming em tempo real e governança LGPD",
    ],
    prerequisites: ["Conhecimento intermediário de SQL e lógica de programação em Python"],
    modules: [
      {
        id: "dados-m1",
        title: "Modelagem Relacional Avançada e Otimização SQL",
        hours: 8,
        topics: [
          "Normalização, índices compostos, planos de execução e particionamento",
          "Window functions, CTEs e consultas analíticas de alta performance",
        ],
      },
      {
        id: "dados-m2",
        title: "Modelagem Dimensional e Data Warehousing",
        hours: 7,
        topics: [
          "Tabelas fato, dimensões, Slowly Changing Dimensions (SCD) e Star Schema",
          "Integração de fontes corporativas para camadas de BI",
        ],
      },
      {
        id: "dados-m3",
        title: "Ingestão de Dados e Pipelines ETL / ELT",
        hours: 8,
        topics: [
          "Conectores de APIs, bancos transacionais, carga incremental e idempotência",
          "Formatos colunares (Parquet) e compressão eficiente",
        ],
      },
      {
        id: "dados-m4",
        title: "Arquitetura Medalhão, Data Lakes e Lakehouse",
        hours: 7,
        topics: [
          "Camadas Bronze, Prata e Ouro com tabelas abertas (Delta / Iceberg)",
          "Separação de armazenamento e computação em escala",
        ],
      },
      {
        id: "dados-m5",
        title: "Transformação Analítica com dbt e Qualidade de Dados",
        hours: 7,
        topics: [
          "Modelos SQL versionados, testes de schema, linhagem e documentação",
          "Contratos de dados e alertas de anomalia em produção",
        ],
      },
      {
        id: "dados-m6",
        title: "Orquestração de Fluxos e Processamento em Streaming",
        hours: 7,
        topics: [
          "DAGs resilientes, retries, backfills e monitoramento de pipelines",
          "Conceitos de mensageria e ingestão orientada a eventos",
        ],
      },
      {
        id: "dados-m7",
        title: "Governança, Catalogação, Segurança e FinOps de Dados",
        hours: 7,
        topics: [
          "Controle de acesso granular, mascaramento PII e conformidade LGPD",
          "Observabilidade de custos em nuvem e catálogo corporativo de ativos",
        ],
      },
    ],
  },
  {
    id: "ciencia-dados-ml",
    slug: "ciencia-dados-ml",
    title: "Ciência de Dados e Machine Learning",
    tagline: "Análise exploratória, estatística aplicada e modelos preditivos em produção.",
    description:
      "Quatro cursos práticos (19h) para transformar dados brutos em decisões e modelos preditivos validados com Python, Pandas, Scikit-Learn e boas práticas de avaliação.",
    category: "dados-cloud",
    level: "Intermediário",
    courseCount: 4,
    totalHours: 19,
    npPoints: 30,
    price: 129.9,
    image: "/images/courses/ciencia-dados-ml.jpg",
    imageAlt: "Prismas estatísticos 3D, nuvem de pontos ciano e curva preditiva âmbar em estúdio escuro",
    stack: ["Python", "Pandas", "Scikit-Learn", "Estatística", "Visualização"],
    outcomes: [
      "Limpar, explorar e visualizar bases reais identificando padrões e vieses",
      "Treinar e validar modelos de regressão, classificação e clusterização",
      "Empacotar pipelines preditivos evitando vazamento de dados (data leakage)",
    ],
    prerequisites: ["Base em Python e noções de matemática do ensino médio/superior"],
    modules: [
      {
        id: "ds-m1",
        title: "Análise Exploratória de Dados com Python e Pandas",
        hours: 5,
        topics: [
          "Limpeza de dados ausentes, transformações, agrupamentos e joins",
          "Visualização clara de distribuições, correlações e séries temporais",
        ],
      },
      {
        id: "ds-m2",
        title: "Estatística Aplicada e Experimentação",
        hours: 5,
        topics: [
          "Probabilidade prática, intervalos de confiança e testes de hipótese",
          "Testes A/B e interpretação correta de significância estatística",
        ],
      },
      {
        id: "ds-m3",
        title: "Machine Learning Supervisionado com Scikit-Learn",
        hours: 5,
        topics: [
          "Engenharia de atributos, validação cruzada e seleção de hiperparâmetros",
          "Regressão, árvores de decisão, Random Forest e Gradient Boosting",
        ],
      },
      {
        id: "ds-m4",
        title: "Aprendizado Não Supervisionado e Entrega de Modelos",
        hours: 4,
        topics: [
          "Segmentação com K-Means/DBSCAN e redução de dimensionalidade (PCA)",
          "Serialização de pipelines, monitoramento de drift e comunicação executiva",
        ],
      },
    ],
  },
  {
    id: "cloud-computing",
    slug: "cloud-computing",
    title: "Cloud Computing",
    tagline: "Computação, redes, armazenamento, containers e infraestrutura como código.",
    description:
      "Aprenda os pilares da nuvem moderna em 3 cursos (19h): arquitetura de alta disponibilidade, serviços gerenciados, redes virtuais, segurança IAM, custos e automação com Infraestrutura como Código.",
    category: "dados-cloud",
    level: "Intermediário",
    courseCount: 3,
    totalHours: 19,
    npPoints: 30,
    price: 119.9,
    image: "/images/courses/cloud-computing.jpg",
    imageAlt: "Nuvem geométrica tridimensional azul celeste pairando sobre servidores modulares conectados",
    stack: ["AWS", "Redes VPC", "IAM", "Serverless", "Terraform / IaC"],
    outcomes: [
      "Arquitetar aplicações web resilientes com CDN, storage de objetos e banco gerenciado",
      "Configurar permissões IAM de privilégio mínimo, redes e variáveis seguras",
      "Versionar recursos de nuvem com Infraestrutura como Código e controlar gastos",
    ],
    prerequisites: ["Noções básicas de web, terminal e arquitetura cliente-servidor"],
    modules: [
      {
        id: "cloud-m1",
        title: "Fundamentos de Nuvem, IAM, Redes e Storage",
        hours: 6,
        topics: [
          "Regiões, zonas de disponibilidade, VPCs, sub-redes e security groups",
          "Boas práticas de IAM, object storage, CDN e hospedagem estática",
        ],
      },
      {
        id: "cloud-m2",
        title: "Computação, Containers e Arquiteturas Serverless",
        hours: 7,
        topics: [
          "Instâncias gerenciadas, balanceamento de carga e escalonamento automático",
          "Funções serverless, filas, eventos e observabilidade de logs/métricas",
        ],
      },
      {
        id: "cloud-m3",
        title: "Infraestrutura como Código (IaC) e Gestão de Custos",
        hours: 6,
        topics: [
          "Provisionamento declarativo reprodutível e separação de ambientes",
          "Alertas de faturamento, free tiers sustentáveis e revisão Well-Architected",
        ],
      },
    ],
  },
  {
    id: "ciberseguranca",
    slug: "ciberseguranca",
    title: "Cibersegurança",
    tagline: "Proteja aplicações web, APIs, credenciais e infraestrutura desde o código.",
    description:
      "Três cursos essenciais (9h) com foco em segurança defensiva prática (AppSec): vulnerabilidades OWASP Top 10, autenticação segura, gestão de segredos e cultura DevSecOps.",
    category: "dados-cloud",
    level: "Iniciante",
    courseCount: 3,
    totalHours: 9,
    npPoints: 20,
    price: 69.9,
    originalPrice: 89.9,
    image: "/images/courses/ciberseguranca.jpg",
    imageAlt: "Escudo blindado em titânio escuro com cadeado luminoso ciano e verde esmeralda ao centro",
    stack: ["OWASP Top 10", "AppSec", "OAuth2 / JWT", "Criptografia", "DevSecOps"],
    outcomes: [
      "Identificar e corrigir falhas críticas do OWASP Top 10 em aplicações web e APIs",
      "Aplicar criptografia correta, armazenamento seguro de senhas e gestão de tokens",
      "Integrar verificações automáticas de vulnerabilidades no pipeline de CI",
    ],
    prerequisites: ["Conhecimentos básicos de desenvolvimento web e HTTP"],
    modules: [
      {
        id: "sec-m1",
        title: "Fundamentos de Segurança, Criptografia e Identidade",
        hours: 3,
        topics: [
          "Tríade CIA, modelagem de ameaças, TLS/HTTPS e hashing seguro de senhas",
          "Sessões, cookies seguros, OAuth2 e armadilhas comuns com JWT",
        ],
      },
      {
        id: "sec-m2",
        title: "Segurança de Aplicações Web (OWASP Top 10)",
        hours: 3,
        topics: [
          "Prevenção prática contra Injection, Broken Access Control, XSS e CSRF",
          "Cabeçalhos HTTP de segurança (CSP, HSTS) e validação de entrada",
        ],
      },
      {
        id: "sec-m3",
        title: "DevSecOps, Gestão de Segredos e Resposta a Incidentes",
        hours: 3,
        topics: [
          "Proteção de chaves de API, auditoria de dependências e varredura SAST",
          "Checklist de revisão de segurança antes do deploy em produção",
        ],
      },
    ],
  },
];

// Métricas reais agregadas dinamicamente a partir das 25 trilhas
export const CATALOG_STATS = {
  totalTracks: COURSES.length,
  totalCourses: COURSES.reduce((acc, item) => acc + item.courseCount, 0),
  totalHours: COURSES.reduce((acc, item) => acc + item.totalHours, 0),
  promoCount: COURSES.filter((item) => item.originalPrice && item.originalPrice > item.price).length,
};

export function getCategoryMeta(categoryId: string): CategoryMeta {
  return (
    COURSE_CATEGORIES.find((cat) => cat.id === categoryId) ?? COURSE_CATEGORIES[0]
  );
}
