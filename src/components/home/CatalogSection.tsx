"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FunnelSimple,
  MagnifyingGlass,
  Tag,
  X,
} from "@phosphor-icons/react";
import { useStore } from "@/context/StoreContext";
import { CATALOG_STATS, COURSE_CATEGORIES } from "@/data/courses";
import { isOnSale } from "@/lib/format";
import type { CourseCategoryId, CourseLevel } from "@/types/course";
import { CourseCard } from "@/components/store/CourseCard";

type SortMode = "featured" | "price-asc" | "price-desc" | "hours-desc" | "alpha";

export function CatalogSection() {
  const { courses } = useStore();

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CourseCategoryId | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "all">("all");
  const [onlyPromos, setOnlyPromos] = useState(false);
  const [sortBy, setSortBy] = useState<SortMode>("featured");

  // Sincroniza filtro inicial caso usuario chegue via link /?categoria=...#catalogo
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria");
    if (cat && COURSE_CATEGORIES.some((c) => c.id === cat)) {
      setSelectedCategory(cat as CourseCategoryId);
    }
  }, []);

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const list = courses.filter((course) => {
      if (selectedCategory !== "all" && course.category !== selectedCategory) {
        return false;
      }
      if (selectedLevel !== "all" && course.level !== selectedLevel) {
        return false;
      }
      if (onlyPromos && !isOnSale(course.price, course.originalPrice)) {
        return false;
      }
      if (normalizedQuery) {
        const searchable = [
          course.title,
          course.tagline,
          course.description,
          ...course.stack,
          ...course.modules.map((m) => m.title),
        ]
          .join(" ")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        if (!searchable.includes(normalizedQuery)) {
          return false;
        }
      }
      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "hours-desc":
        sorted.sort((a, b) => b.totalHours - a.totalHours);
        break;
      case "alpha":
        sorted.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
        break;
      case "featured":
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
        break;
    }

    return sorted;
  }, [courses, query, selectedCategory, selectedLevel, onlyPromos, sortBy]);

  const hasActiveFilters =
    query.trim().length > 0 ||
    selectedCategory !== "all" ||
    selectedLevel !== "all" ||
    onlyPromos;

  function resetFilters() {
    setQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setOnlyPromos(false);
    setSortBy("featured");
  }

  return (
    <section
      id="catalogo"
      className="scroll-mt-20 border-t border-[var(--border)] bg-[var(--surface)]/55 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecalho da secao */}
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Catálogo completo do Núcleo de Projetos
          </h2>
          <p className="mt-3 text-base text-[var(--muted)]">
            Explore todas as {CATALOG_STATS.totalTracks} trilhas oficiais por categoria,
            tecnologia ou nível. Clique em qualquer trilha para consultar a ementa completa.
          </p>
        </div>

        {/* Barra de filtros da loja */}
        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:p-5">
          {/* Linha 1: Busca + Nivel + Ordenacao */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            <div className="relative md:col-span-6">
              <label htmlFor="catalog-search" className="sr-only">
                Buscar trilhas por nome, tecnologia ou módulo
              </label>
              <MagnifyingGlass
                size={18}
                weight="bold"
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--muted)]"
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por React, Node.js, Vibe Coding, Python, IA..."
                className="h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] pr-4 pl-10 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="catalog-level" className="sr-only">
                Filtrar por nível
              </label>
              <select
                id="catalog-level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as CourseLevel | "all")}
                className="h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] px-3 text-sm font-medium text-[var(--ink)]"
              >
                <option value="all">Todos os níveis</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <label htmlFor="catalog-sort" className="sr-only">
                Ordenar trilhas
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortMode)}
                className="h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] px-3 text-sm font-medium text-[var(--ink)]"
              >
                <option value="featured">Ordenar: Destaques</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
                <option value="hours-desc">Maior carga horária</option>
                <option value="alpha">Ordem alfabética (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Linha 2: Pills de categoria + toggle promocao */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex h-9 items-center rounded-full px-3.5 text-xs font-semibold transition-colors ${
                selectedCategory === "all"
                  ? "bg-[var(--ink)] text-[var(--bg)]"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-secondary)] hover:border-[var(--border-strong)]"
              }`}
            >
              Todas ({courses.length})
            </button>

            {COURSE_CATEGORIES.map((category) => {
              const count = courses.filter((c) => c.category === category.id).length;
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex h-9 items-center rounded-full px-3.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-[var(--primary)] text-[var(--primary-ink)]"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-secondary)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  {category.shortLabel} ({count})
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setOnlyPromos((prev) => !prev)}
              aria-pressed={onlyPromos}
              className={`ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-colors ${
                onlyPromos
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                  : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)]"
              }`}
            >
              <Tag size={14} weight="bold" aria-hidden="true" />
              Somente promoções ({CATALOG_STATS.promoCount})
            </button>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="inline-flex items-center gap-2 text-[var(--muted)]">
            <FunnelSimple size={16} weight="bold" aria-hidden="true" />
            <span>
              Exibindo{" "}
              <strong className="font-mono font-semibold text-[var(--ink)] tabular-nums">
                {filteredCourses.length}
              </strong>{" "}
              de{" "}
              <strong className="font-mono font-semibold text-[var(--ink)] tabular-nums">
                {courses.length}
              </strong>{" "}
              trilhas
            </span>
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--border-strong)]"
            >
              <X size={14} weight="bold" aria-hidden="true" />
              Limpar filtros
            </button>
          )}
        </div>

        {/* Grade de cursos ou estado vazio */}
        {filteredCourses.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-14 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">
              Nenhuma trilha encontrada para esse filtro
            </h3>
            <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
              Tente buscar por outro termo (como React, Python, Dados ou Vibe Coding) ou
              limpe os filtros ativos para visualizar as {courses.length} trilhas.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--primary-ink)] hover:bg-[var(--primary-hover)]"
            >
              Mostrar todas as {courses.length} trilhas
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
