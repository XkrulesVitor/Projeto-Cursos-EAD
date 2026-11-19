"use client";

import {
  BookOpen,
  Check,
  Clock,
  ShoppingCartSimple,
  Tag,
} from "@phosphor-icons/react";
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
import type { CourseTrack } from "@/types/course";

interface CourseCardProps {
  course: CourseTrack;
}

export function CourseCard({ course }: CourseCardProps) {
  const { isInCart, isEnrolled, addToCart, setActiveCourse, setCartOpen } =
    useStore();

  const category = getCategoryMeta(course.category);
  const inCart = isInCart(course.id);
  const enrolled = isEnrolled(course.id);
  const sale = isOnSale(course.price, course.originalPrice);
  const discountPercent = getDiscountPercent(course.price, course.originalPrice);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-[var(--border-strong)]">
      {/* Midia 16:9 limpa, sem overlays e sem animacao de escala em img */}
      <button
        type="button"
        onClick={() => setActiveCourse(course)}
        aria-label={`Ver ementa completa da trilha ${course.title}`}
        className="block w-full overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] text-left"
      >
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={assetPath(course.image)}
            alt={course.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5">
        {/* Linha de categoria e selo fora da imagem */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium text-[var(--muted)]">
            {category.shortLabel}
          </span>

          <div className="flex items-center gap-1.5">
            {course.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--primary-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--primary)]">
                {course.badge}
              </span>
            )}
            {sale && !course.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                <Tag size={11} weight="bold" aria-hidden="true" />
                {discountPercent >= 1 ? `-${discountPercent}%` : "Oferta"}
              </span>
            )}
          </div>
        </div>

        {/* Titulo e resumo */}
        <button
          type="button"
          onClick={() => setActiveCourse(course)}
          className="mt-2.5 text-left"
        >
          <h3 className="font-[family-name:var(--font-display)] text-lg font-bold leading-snug text-[var(--ink)] transition-colors hover:text-[var(--primary)]">
            {course.title}
          </h3>
        </button>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
          {course.tagline}
        </p>

        {/* Metadados reais da trilha (cursos, horas, nivel) */}
        <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--ink-secondary)] tabular-nums">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen size={14} weight="bold" className="text-[var(--muted)]" aria-hidden="true" />
            {formatCourseCount(course.courseCount)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} weight="bold" className="text-[var(--muted)]" aria-hidden="true" />
            {formatHours(course.totalHours)}
          </span>
          <span className="rounded-md bg-[var(--surface)] px-2 py-0.5 font-sans text-[11px] font-medium text-[var(--muted)]">
            {course.level}
          </span>
        </div>

        {/* Rodape de preco e acao */}
        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-3 border-t border-[var(--border)] pt-4">
            <div>
              {sale && course.originalPrice ? (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[var(--muted)] line-through tabular-nums">
                    {formatBRL(course.originalPrice)}
                  </span>
                  {discountPercent >= 1 && (
                    <span className="font-mono text-[11px] font-semibold text-[var(--accent)]">
                      -{discountPercent}%
                    </span>
                  )}
                </div>
              ) : (
                <span className="block text-[11px] text-[var(--muted)]">
                  Acesso completo
                </span>
              )}
              <p className="font-mono text-xl font-semibold tracking-tight text-[var(--ink)] tabular-nums">
                {formatBRL(course.price)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCourse(course)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--ink)] whitespace-nowrap transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] active:scale-[0.98]"
              >
                Ver ementa
              </button>

              {enrolled ? (
                <span className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[var(--accent-soft)] px-3 text-xs font-semibold text-[var(--accent)] whitespace-nowrap">
                  <Check size={14} weight="bold" aria-hidden="true" />
                  Matriculado
                </span>
              ) : inCart ? (
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[var(--primary)] bg-[var(--primary-soft)] px-3 text-xs font-semibold text-[var(--primary)] whitespace-nowrap transition-colors active:scale-[0.98]"
                >
                  <Check size={14} weight="bold" aria-hidden="true" />
                  No carrinho
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCart(course.id)}
                  aria-label={`Adicionar ${course.title} ao carrinho`}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 text-xs font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors hover:bg-[var(--primary-hover)] active:scale-[0.98]"
                >
                  <ShoppingCartSimple size={15} weight="bold" aria-hidden="true" />
                  Comprar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
