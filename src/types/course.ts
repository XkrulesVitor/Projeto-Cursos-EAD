// Definicoes de tipos centrais do e-commerce Cursos EAD

export type CourseCategoryId =
  | "web-mobile"
  | "backend"
  | "ia-vibe"
  | "engenharia"
  | "dados-cloud"
  | "fundamentos";

export type CourseLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface CourseModule {
  /** Identificador unico do curso/modulo dentro da trilha */
  id: string;
  /** Nome do curso/modulo exibido na ementa */
  title: string;
  /** Carga horaria individual em horas (a soma fecha o total da trilha) */
  hours: number;
  /** Topicos praticos cobertos neste modulo */
  topics: string[];
}

export interface CourseTrack {
  /** Identificador e slug unico da trilha */
  id: string;
  slug: string;
  /** Nome oficial da trilha no Nucleo de Projetos */
  title: string;
  /** Subtitulo curto e objetivo de posicionamento */
  tagline: string;
  /** Descricao completa para vitrine e pagina de ementa */
  description: string;
  /** Categoria de navegacao da loja */
  category: CourseCategoryId;
  /** Nivel tecnico recomendado */
  level: CourseLevel;
  /** Numero exato de cursos dentro da trilha */
  courseCount: number;
  /** Carga horaria total exata em horas */
  totalHours: number;
  /** Pontuacao de referencia do Nucleo de Projetos */
  npPoints: number;
  /** Preco atual de venda em reais */
  price: number;
  /** Preco cheio antes da promocao (quando houver oferta) */
  originalPrice?: number;
  /** Selo curto opcional (ex: "Comece por aqui", "Oferta R$ 49,99", "Formacao Completa") */
  badge?: string;
  /** Indica se a trilha entra na vitrine principal de destaques */
  featured?: boolean;
  /** Caminho da imagem de capa em public/images */
  image: string;
  /** Texto alternativo descritivo da capa */
  imageAlt: string;
  /** Tecnologias principais abordadas */
  stack: string[];
  /** Resultados praticos que o aluno domina ao concluir */
  outcomes: string[];
  /** Pre-requisitos claros */
  prerequisites: string[];
  /** Lista de cursos/modulos que compoem a ementa da trilha */
  modules: CourseModule[];
}

export interface CategoryMeta {
  id: CourseCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
}

export interface CouponCode {
  code: string;
  discountPercent: number;
  description: string;
}

export interface EnrollmentRecord {
  id: string;
  courseId: string;
  enrolledAt: string;
  paidPrice: number;
  couponApplied?: string;
  completedModuleIds: string[];
  source: "local" | "supabase";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mode: "local" | "supabase";
}
