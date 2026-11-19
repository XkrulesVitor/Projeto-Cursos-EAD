// Gera supabase/seed.sql automaticamente a partir de src/data/courses.ts
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const coursesPath = path.join(root, "src", "data", "courses.ts");
const outPath = path.join(root, "supabase", "seed.sql");

// Carrega o modulo TypeScript nativamente no Node 24 removendo o import de tipos
const source = fs.readFileSync(coursesPath, "utf8");
const cleaned = source
  .replace(/^import type .*$/gm, "")
  .replace(/export const COURSE_CATEGORIES: CategoryMeta\[\] =/g, "const COURSE_CATEGORIES =")
  .replace(/export const STORE_COUPONS: CouponCode\[\] =/g, "const STORE_COUPONS =")
  .replace(/export const COURSES: CourseTrack\[\] =/g, "const COURSES =")
  .replace(/export const CATALOG_STATS =[\s\S]*$/m, "return COURSES;");

const courses = new Function(cleaned)();

const sqlQuote = (val) => {
  if (val === undefined || val === null) return "null";
  return `'${String(val).replace(/'/g, "''")}'`;
};

const sqlTextArray = (arr = []) => {
  if (!arr.length) return "'{}'";
  return `ARRAY[${arr.map(sqlQuote).join(", ")}]`;
};

const lines = [
  "-- =============================================================================",
  "-- Seed oficial do catalogo Cursos EAD (26 trilhas, 94 cursos, 573 horas)",
  "-- Execute no SQL Editor do Supabase apos rodar supabase/schema.sql.",
  "-- =============================================================================",
  "",
  "begin;",
  "",
];

for (const c of courses) {
  lines.push(
    `insert into public.courses (id, slug, title, tagline, description, category, level, course_count, total_hours, np_points, price, original_price, badge, featured, image, image_alt, stack, outcomes, prerequisites)`,
  );
  lines.push(
    `values (${sqlQuote(c.id)}, ${sqlQuote(c.slug)}, ${sqlQuote(c.title)}, ${sqlQuote(c.tagline)}, ${sqlQuote(c.description)}, ${sqlQuote(c.category)}, ${sqlQuote(c.level)}, ${c.courseCount}, ${c.totalHours}, ${c.npPoints}, ${c.price.toFixed(2)}, ${c.originalPrice ? c.originalPrice.toFixed(2) : "null"}, ${sqlQuote(c.badge)}, ${Boolean(c.featured)}, ${sqlQuote(c.image)}, ${sqlQuote(c.imageAlt)}, ${sqlTextArray(c.stack)}, ${sqlTextArray(c.outcomes)}, ${sqlTextArray(c.prerequisites)})`,
  );
  lines.push(
    `on conflict (id) do update set title = excluded.title, tagline = excluded.tagline, description = excluded.description, price = excluded.price, original_price = excluded.original_price, badge = excluded.badge, total_hours = excluded.total_hours, course_count = excluded.course_count;`,
  );
  lines.push("");

  c.modules.forEach((m, index) => {
    lines.push(
      `insert into public.course_modules (id, course_id, position, title, hours, topics) values (${sqlQuote(m.id)}, ${sqlQuote(c.id)}, ${index + 1}, ${sqlQuote(m.title)}, ${m.hours}, ${sqlTextArray(m.topics)}) on conflict (id) do update set title = excluded.title, hours = excluded.hours, topics = excluded.topics, position = excluded.position;`,
    );
  });
  lines.push("");
}

lines.push("commit;");
lines.push("");

fs.writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`Seed SQL gerado com sucesso em supabase/seed.sql (${courses.length} trilhas).`);
