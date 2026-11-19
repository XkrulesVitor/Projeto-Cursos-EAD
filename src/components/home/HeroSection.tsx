"use client";

import { ArrowRight, BookOpen, Clock, Tag } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useStore } from "@/context/StoreContext";
import { CATALOG_STATS } from "@/data/courses";
import { assetPath } from "@/lib/assets";
import { formatBRL, formatCourseCount, formatHours } from "@/lib/format";

export function HeroSection() {
  const { courses, setActiveCourse, addToCart } = useStore();
  const reduceMotion = useReducedMotion();

  const spotlight =
    courses.find((course) => course.id === "vibe-coding") ?? courses[0];

  return (
    <section className="relative border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 sm:px-6 md:pt-14 md:pb-20 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna esquerda: exatamente 4 elementos de texto (eyebrow, headline, subtext, CTAs) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              Núcleo de Projetos · {CATALOG_STATS.totalTracks} trilhas oficiais
            </p>

            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--ink)] sm:text-5xl lg:text-[3.5rem]">
              Domine código, software e IA com trilhas práticas.
            </h1>

            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {CATALOG_STATS.totalCourses} cursos e {CATALOG_STATS.totalHours} horas com
              ementa aberta módulo a módulo, de R$ 49,99 a R$ 250,00.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#catalogo"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--primary-hover)] active:scale-[0.98]"
              >
                <span>Explorar catálogo</span>
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </a>

              <a
                href="#ofertas"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-5 text-sm font-semibold text-[var(--ink)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--surface-hover)] active:scale-[0.98]"
              >
                <Tag size={16} weight="bold" className="text-[var(--accent)]" aria-hidden="true" />
                <span>Ver ofertas</span>
              </a>
            </div>
          </motion.div>

          {/* Coluna direita: fotografia de estudio real + cartao da oferta em destaque fora da foto */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-card)]">
              <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
                <img
                  src={assetPath("/images/hero-studio.jpg")}
                  alt="Bancada arquitetônica de alumínio anodizado escuro com luz de recorte laranja cobre"
                  className="h-full w-full object-cover"
                />
              </div>

              {spotlight && (
                <div className="flex flex-col justify-between gap-4 border-t border-[var(--border)] p-5 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                        Oferta em destaque
                      </span>
                      <span className="font-mono text-xs text-[var(--muted)] tabular-nums">
                        {formatCourseCount(spotlight.courseCount)} /{" "}
                        {formatHours(spotlight.totalHours)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveCourse(spotlight)}
                      className="mt-2 block text-left font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] hover:text-[var(--primary)]"
                    >
                      {spotlight.title}
                    </button>
                    <div className="mt-1 flex items-center gap-2.5 font-mono text-xs text-[var(--muted)]">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen size={13} weight="bold" aria-hidden="true" />
                        Ementa completa
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={13} weight="bold" aria-hidden="true" />
                        Acesso imediato
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                    <div className="text-left sm:text-right">
                      {spotlight.originalPrice && (
                        <span className="block font-mono text-xs text-[var(--muted)] line-through tabular-nums">
                          {formatBRL(spotlight.originalPrice)}
                        </span>
                      )}
                      <span className="font-mono text-2xl font-bold text-[var(--ink)] tabular-nums">
                        {formatBRL(spotlight.price)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addToCart(spotlight.id, true)}
                      className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--primary)] px-4 text-xs font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors hover:bg-[var(--primary-hover)] active:scale-[0.98]"
                    >
                      Garantir por {formatBRL(spotlight.price)}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
