// Servico de catalogo preparado para ler do Supabase com fallback automatico para os dados locais
import { COURSES } from "@/data/courses";
import { getSupabaseClient } from "@/lib/supabase";
import type { CourseCategoryId, CourseLevel, CourseModule, CourseTrack } from "@/types/course";

interface SupabaseCourseRow {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: CourseCategoryId;
  level: CourseLevel;
  course_count: number;
  total_hours: number;
  np_points: number;
  price: number;
  original_price: number | null;
  badge: string | null;
  featured: boolean;
  image: string;
  image_alt: string;
  stack: string[];
  outcomes: string[];
  prerequisites: string[];
  course_modules?: {
    id: string;
    title: string;
    hours: number;
    topics: string[];
    position: number;
  }[];
}

function mapSupabaseRowToCourse(row: SupabaseCourseRow): CourseTrack {
  const modules: CourseModule[] = (row.course_modules || [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((m) => ({
      id: m.id,
      title: m.title,
      hours: Number(m.hours),
      topics: m.topics || [],
    }));

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    category: row.category,
    level: row.level,
    courseCount: Number(row.course_count),
    totalHours: Number(row.total_hours),
    npPoints: Number(row.np_points),
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    badge: row.badge || undefined,
    featured: Boolean(row.featured),
    image: row.image,
    imageAlt: row.image_alt,
    stack: row.stack || [],
    outcomes: row.outcomes || [],
    prerequisites: row.prerequisites || [],
    modules,
  };
}

/**
 * Busca o catalogo completo de trilhas.
 * Se o Supabase estiver configurado e com a tabela courses populada, retorna do Postgres;
 * caso contrario, utiliza o catalogo oficial estatico embutido.
 */
export async function fetchCoursesCatalog(): Promise<{
  courses: CourseTrack[];
  source: "supabase" | "local";
}> {
  const client = getSupabaseClient();
  if (!client) {
    return { courses: COURSES, source: "local" };
  }

  try {
    const { data, error } = await client
      .from("courses")
      .select(
        `
        id, slug, title, tagline, description, category, level,
        course_count, total_hours, np_points, price, original_price,
        badge, featured, image, image_alt, stack, outcomes, prerequisites,
        course_modules (id, title, hours, topics, position)
      `,
      )
      .order("title", { ascending: true });

    if (error || !data || data.length === 0) {
      return { courses: COURSES, source: "local" };
    }

    const mapped = (data as unknown as SupabaseCourseRow[]).map(mapSupabaseRowToCourse);
    return { courses: mapped, source: "supabase" };
  } catch {
    return { courses: COURSES, source: "local" };
  }
}
