// Script de validacao de integridade do catalogo e regras de copy do Cursos EAD
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const coursesFile = path.join(root, "src", "data", "courses.ts");
const srcDir = path.join(root, "src");

function walkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(full));
    } else if (/\.(ts|tsx|css)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const raw = fs.readFileSync(coursesFile, "utf8");
const coursesSection = raw.split("export const COURSES: CourseTrack[] = [")[1] ?? "";

// Extrai cada bloco de curso dentro de COURSES
const trackBlocks = coursesSection.split(/\n  \{\n    id: "/).slice(1);
if (trackBlocks.length !== 26) {
  console.error(`ERRO: Esperadas 26 trilhas, encontradas ${trackBlocks.length}.`);
  process.exit(1);
}

let totalCourses = 0;
let totalHours = 0;
let has4999 = false;
let has24999 = false;
let has50 = false;
let has250 = false;
const seenImages = new Set();

for (const block of trackBlocks) {
  const idMatch = block.match(/^([^"]+)"/);
  const id = idMatch ? idMatch[1] : "desconhecido";
  const courseCount = Number(block.match(/courseCount:\s*(\d+)/)?.[1] ?? -1);
  const trackHours = Number(block.match(/totalHours:\s*(\d+)/)?.[1] ?? -1);
  const price = Number(block.match(/price:\s*([\d.]+)/)?.[1] ?? -1);
  const imagePath = block.match(/image:\s*"([^"]+)"/)?.[1] ?? "";

  if (!imagePath) {
    console.error(`ERRO em "${id}": imagem ausente.`);
    process.exit(1);
  }
  if (seenImages.has(imagePath)) {
    console.error(`ERRO em "${id}": imagem repetida "${imagePath}". Cada trilha deve ter capa exclusiva.`);
    process.exit(1);
  }
  seenImages.add(imagePath);

  const diskImagePath = path.join(root, "public", imagePath.replace(/^\//, ""));
  if (!fs.existsSync(diskImagePath)) {
    console.error(`ERRO em "${id}": arquivo de imagem nao encontrado em ${diskImagePath}`);
    process.exit(1);
  }

  const modulesSection = block.split("modules: [")[1] ?? "";
  const moduleHours = [...modulesSection.matchAll(/hours:\s*(\d+)/g)].map((m) =>
    Number(m[1]),
  );

  if (moduleHours.length !== courseCount) {
    console.error(
      `ERRO em "${id}": courseCount=${courseCount}, mas possui ${moduleHours.length} modulos.`,
    );
    process.exit(1);
  }

  const sumHours = moduleHours.reduce((a, b) => a + b, 0);
  if (sumHours !== trackHours) {
    console.error(
      `ERRO em "${id}": totalHours=${trackHours}, mas soma dos modulos=${sumHours}.`,
    );
    process.exit(1);
  }

  if (price < 49.99 || price > 250) {
    console.error(`ERRO em "${id}": preco ${price} fora da faixa R$ 49,99 - R$ 250,00.`);
    process.exit(1);
  }

  if (price === 49.99) has4999 = true;
  if (price === 249.99) has24999 = true;
  if (price === 50) has50 = true;
  if (price === 250) has250 = true;

  totalCourses += courseCount;
  totalHours += trackHours;
}

if (totalCourses !== 94) {
  console.error(`ERRO: Esperados 94 cursos no total, encontrados ${totalCourses}.`);
  process.exit(1);
}
if (totalHours !== 573) {
  console.error(`ERRO: Esperadas 573 horas no total, encontradas ${totalHours}.`);
  process.exit(1);
}
if (!has4999 || !has24999 || !has50 || !has250) {
  console.error("ERRO: Faltam faixas de preco obrigatorias (49.99, 50.00, 249.99, 250.00).");
  process.exit(1);
}

// Verifica ausencia de em-dash (—) e en-dash (–) em todo src/
for (const file of walkFiles(srcDir)) {
  const content = fs.readFileSync(file, "utf8");
  if (content.includes("\u2014") || content.includes("\u2013")) {
    console.error(`ERRO: Em-dash ou en-dash encontrado em ${path.relative(root, file)}`);
    process.exit(1);
  }
}

console.log(
  `OK: 26 trilhas, ${totalCourses} cursos, ${totalHours}h validadas, precos R$ 49,99 a R$ 250,00 e zero em-dashes.`,
);
