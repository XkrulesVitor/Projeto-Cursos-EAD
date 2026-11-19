"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CaretDown,
  Certificate,
  Check,
  CheckCircle,
  Clock,
  ShoppingCartSimple,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useStore } from "@/context/StoreContext";
import { getCategoryMeta } from "@/data/courses";
import { assetPath } from "@/lib/assets";
import {
  formatBRL,
  formatCourseCount,
  formatHours,
  getDiscountPercent,
  isOnSale,
} from "@/lib/format";

export function CourseDetailModal() {
  const {
    activeCourse,
    setActiveCourse,
    isInCart,
    isEnrolled,
    addToCart,
    setCartOpen,
  } = useStore();
  const reduceMotion = useReducedMotion();
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeCourse) return;
    setExpandedModuleId(activeCourse.modules[0]?.id ?? null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCourse(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCourse, setActiveCourse]);

  const category = activeCourse ? getCategoryMeta(activeCourse.category) : null;
  const sale = activeCourse
    ? isOnSale(activeCourse.price, activeCourse.originalPrice)
    : false;
  const discountPercent = activeCourse
    ? getDiscountPercent(activeCourse.price, activeCourse.originalPrice)
    : 0;
  const inCart = activeCourse ? isInCart(activeCourse.id) : false;
  const enrolled = activeCourse ? isEnrolled(activeCourse.id) : false;

  return (
    <AnimatePresence>
      {activeCourse && category && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-modal-title"
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setActiveCourse(null)}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
          />

          {/* Painel do modal */}
          <motion.div
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] shadow-[var(--shadow-elevated)]"
          >
            {/* Cabecalho fixo */}
            <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--surface)] px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-[var(--ink)]">
                  {category.label}
                </span>
                <span className="text-[var(--muted)]">/</span>
                <span className="text-[var(--muted)]">{activeCourse.level}</span>
                {activeCourse.badge && (
                  <span className="rounded-full bg-[var(--primary-soft)] px-2.5 py-0.5 font-semibold text-[var(--primary)]">
                    {activeCourse.badge}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveCourse(null)}
                aria-label="Fechar detalhes da trilha"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink)] hover:bg-[var(--surface-hover)]"
              >
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>

            {/* Conteudo rolavel */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Capa e metricas reais */}
                <div className="lg:col-span-5">
                  <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                    <div className="aspect-[16/9] w-full">
                      <img
                        src={assetPath(activeCourse.image)}
                        alt={activeCourse.imageAlt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                      <span className="block text-[11px] text-[var(--muted)]">
                        Carga horária
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 font-mono text-base font-semibold text-[var(--ink)] tabular-nums">
                        <Clock size={15} weight="bold" className="text-[var(--primary)]" aria-hidden="true" />
                        {formatHours(activeCourse.totalHours)}
                      </span>
                    </div>
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                      <span className="block text-[11px] text-[var(--muted)]">
                        Conteúdo
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 font-mono text-base font-semibold text-[var(--ink)] tabular-nums">
                        <BookOpen size={15} weight="bold" className="text-[var(--primary)]" aria-hidden="true" />
                        {activeCourse.courseCount}
                      </span>
                    </div>
                    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
                      <span className="block text-[11px] text-[var(--muted)]">
                        Trilha NP
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 font-mono text-base font-semibold text-[var(--ink)] tabular-nums">
                        <Sparkle size={15} weight="bold" className="text-[var(--accent)]" aria-hidden="true" />
                        +{activeCourse.npPoints} pts
                      </span>
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="mt-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Tecnologias e temas
                    </h4>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {activeCourse.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--ink-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pre-requisitos */}
                  <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Pré-requisitos
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                      {activeCourse.prerequisites.map((req) => (
                        <li key={req} className="flex items-start gap-2">
                          <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Informacoes principais e ementa */}
                <div className="lg:col-span-7">
                  <h2
                    id="course-modal-title"
                    className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl"
                  >
                    {activeCourse.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                    {activeCourse.description}
                  </p>

                  {/* O que voce vai dominar */}
                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-[var(--ink)]">
                      O que você vai dominar nesta trilha
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {activeCourse.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex items-start gap-2.5 text-sm text-[var(--ink-secondary)]"
                        >
                          <CheckCircle
                            size={18}
                            weight="bold"
                            className="mt-0.5 shrink-0 text-[var(--accent)]"
                            aria-hidden="true"
                          />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Grade Curricular / Ementa completa */}
                  <div className="mt-7">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-[var(--ink)]">
                        Ementa completa ({formatCourseCount(activeCourse.courseCount)})
                      </h3>
                      <span className="font-mono text-xs font-semibold text-[var(--muted)] tabular-nums">
                        Total: {formatHours(activeCourse.totalHours)}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      {activeCourse.modules.map((mod, idx) => {
                        const isOpen = expandedModuleId === mod.id;
                        return (
                          <div
                            key={mod.id}
                            className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedModuleId(isOpen ? null : mod.id)
                              }
                              aria-expanded={isOpen}
                              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--surface)]"
                            >
                              <div className="flex items-center gap-3">
                                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--surface)] font-mono text-xs font-semibold text-[var(--primary)]">
                                  {idx + 1}
                                </span>
                                <span className="text-sm font-semibold text-[var(--ink)]">
                                  {mod.title}
                                </span>
                              </div>
                              <div className="flex shrink-0 items-center gap-2.5">
                                <span className="font-mono text-xs font-medium text-[var(--muted)] tabular-nums">
                                  {formatHours(mod.hours)}
                                </span>
                                <CaretDown
                                  size={15}
                                  weight="bold"
                                  className={`text-[var(--muted)] transition-transform duration-150 ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                  aria-hidden="true"
                                />
                              </div>
                            </button>

                            {isOpen && (
                              <div className="border-t border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3">
                                <ul className="space-y-1.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                                  {mod.topics.map((topic) => (
                                    <li key={topic} className="flex items-start gap-2">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rodape fixo de compra */}
            <div className="flex flex-col items-stretch justify-between gap-4 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <div className="flex items-center gap-4">
                <div>
                  {sale && activeCourse.originalPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[var(--muted)] line-through tabular-nums">
                        {formatBRL(activeCourse.originalPrice)}
                      </span>
                      <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                        {discountPercent >= 1
                          ? `Economize ${discountPercent}%`
                          : "Preço promocional"}
                      </span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                      <Certificate size={14} weight="bold" aria-hidden="true" />
                      Certificado com {formatHours(activeCourse.totalHours)}
                    </span>
                  )}
                  <p className="font-mono text-2xl font-bold text-[var(--ink)] tabular-nums">
                    {formatBRL(activeCourse.price)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {enrolled ? (
                  <Link
                    href="/matriculas/"
                    onClick={() => setActiveCourse(null)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] whitespace-nowrap transition-opacity hover:opacity-90"
                  >
                    <CheckCircle size={18} weight="bold" aria-hidden="true" />
                    Abrir em Minhas Matrículas
                  </Link>
                ) : inCart ? (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCourse(null);
                      setCartOpen(true);
                    }}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors hover:bg-[var(--primary-hover)]"
                  >
                    <ShoppingCartSimple size={18} weight="bold" aria-hidden="true" />
                    Ver no carrinho
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => addToCart(activeCourse.id, false)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 text-sm font-semibold text-[var(--ink)] whitespace-nowrap transition-colors hover:bg-[var(--surface-hover)]"
                    >
                      Adicionar ao carrinho
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(activeCourse.id, true);
                        setActiveCourse(null);
                      }}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors hover:bg-[var(--primary-hover)] active:scale-[0.98]"
                    >
                      <ShoppingCartSimple size={18} weight="bold" aria-hidden="true" />
                      Garantir vaga
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
