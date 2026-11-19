"use client";

import {
  BookOpen,
  Check,
  Clock,
  ShoppingCartSimple,
  Tag,
} from "@phosphor-icons/react";
import { useStore } from "@/context/StoreContext";
import { assetPath } from "@/lib/assets";
import {
  formatBRL,
  formatCourseCount,
  formatHours,
  getDiscountPercent,
} from "@/lib/format";

const PROMO_IDS = [
  "react-react-native",
  "onboarding",
  "dev-toolkit",
  "backend-nodejs",
  "qualidade-testes-software",
];

export function PromoShowcase() {
  const {
    courses,
    setActiveCourse,
    addToCart,
    isInCart,
    isEnrolled,
    setCartOpen,
  } = useStore();

  const promoTracks = PROMO_IDS.map((id) =>
    courses.find((course) => course.id === id),
  ).filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (promoTracks.length < 5) return null;

  const [leadTrack, ...secondaryTracks] = promoTracks;

  return (
    <section id="ofertas" className="scroll-mt-20 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabecalho empilhado verticalmente */}
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Ofertas selecionadas da vitrine
          </h2>
          <p className="mt-3 text-base text-[var(--muted)]">
            Trilhas de entrada por R$ 49,99 e formações intensivas de até 50 horas em
            condição promocional, cumulativas com os cupons do carrinho.
          </p>
        </div>

        {/* Bento assimetrico exato de 5 celulas (1 destaque 2-linhas + 4 cards secundarios) */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Celula 1: Destaque principal com arte de estudio */}
          <article className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-card)] lg:col-span-5">
            <button
              type="button"
              onClick={() => setActiveCourse(leadTrack)}
              className="block w-full border-b border-[var(--border)] bg-[var(--surface)] text-left"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={assetPath(leadTrack.image)}
                  alt={leadTrack.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </button>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                  <Tag size={13} weight="bold" aria-hidden="true" />
                  {leadTrack.badge || "Oferta especial"}
                </span>
                <span className="font-mono text-xs text-[var(--muted)] tabular-nums">
                  {formatCourseCount(leadTrack.courseCount)} /{" "}
                  {formatHours(leadTrack.totalHours)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveCourse(leadTrack)}
                className="mt-4 text-left"
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] transition-colors hover:text-[var(--primary)]">
                  {leadTrack.title}
                </h3>
              </button>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {leadTrack.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {leadTrack.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-xs text-[var(--ink-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-[var(--border)] pt-5">
                <div>
                  {leadTrack.originalPrice && (
                    <span className="block font-mono text-xs text-[var(--muted)] line-through tabular-nums">
                      De {formatBRL(leadTrack.originalPrice)}
                    </span>
                  )}
                  <p className="font-mono text-2xl font-bold text-[var(--ink)] tabular-nums">
                    {formatBRL(leadTrack.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCourse(leadTrack)}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 text-xs font-semibold text-[var(--ink)] whitespace-nowrap hover:bg-[var(--surface-hover)]"
                  >
                    Ver ementa
                  </button>
                  {isEnrolled(leadTrack.id) ? (
                    <span className="inline-flex h-10 items-center gap-1 rounded-lg bg-[var(--accent-soft)] px-3.5 text-xs font-semibold text-[var(--accent)]">
                      <Check size={14} weight="bold" aria-hidden="true" />
                      Matriculado
                    </span>
                  ) : isInCart(leadTrack.id) ? (
                    <button
                      type="button"
                      onClick={() => setCartOpen(true)}
                      className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[var(--primary)] bg-[var(--primary-soft)] px-3.5 text-xs font-semibold text-[var(--primary)] whitespace-nowrap"
                    >
                      <Check size={14} weight="bold" aria-hidden="true" />
                      No carrinho
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToCart(leadTrack.id)}
                      className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[var(--primary)] px-4 text-xs font-semibold text-[var(--primary-ink)] whitespace-nowrap hover:bg-[var(--primary-hover)] active:scale-[0.98]"
                    >
                      <ShoppingCartSimple size={15} weight="bold" aria-hidden="true" />
                      Comprar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* Celulas 2 a 5: grade 2x2 com variacao sutil de superficie */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {secondaryTracks.map((track, idx) => {
              const discount = getDiscountPercent(track.price, track.originalPrice);
              const inCart = isInCart(track.id);
              const enrolled = isEnrolled(track.id);
              const tintedSurface = idx === 0 || idx === 3;

              return (
                <article
                  key={track.id}
                  className={`flex flex-col justify-between rounded-xl border border-[var(--border)] p-5 transition-colors hover:border-[var(--border-strong)] ${
                    tintedSurface
                      ? "tech-grid-surface bg-[var(--surface)]"
                      : "bg-[var(--surface-elevated)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                        {discount >= 1 ? `-${discount}% OFF` : "Oferta"}
                      </span>
                      <span className="font-mono text-xs text-[var(--muted)] tabular-nums">
                        {formatHours(track.totalHours)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveCourse(track)}
                      className="mt-3 text-left"
                    >
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] hover:text-[var(--primary)]">
                        {track.title}
                      </h3>
                    </button>

                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                      {track.tagline}
                    </p>

                    <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-[var(--ink-secondary)] tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen size={13} weight="bold" aria-hidden="true" />
                        {formatCourseCount(track.courseCount)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={13} weight="bold" aria-hidden="true" />
                        {formatHours(track.totalHours)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-[var(--border)] pt-4">
                    <div>
                      {track.originalPrice && (
                        <span className="block font-mono text-xs text-[var(--muted)] line-through tabular-nums">
                          {formatBRL(track.originalPrice)}
                        </span>
                      )}
                      <span className="font-mono text-xl font-bold text-[var(--ink)] tabular-nums">
                        {formatBRL(track.price)}
                      </span>
                    </div>

                    {enrolled ? (
                      <span className="inline-flex h-9 items-center gap-1 rounded-lg bg-[var(--accent-soft)] px-3 text-xs font-semibold text-[var(--accent)]">
                        <Check size={14} weight="bold" aria-hidden="true" />
                        Matriculado
                      </span>
                    ) : inCart ? (
                      <button
                        type="button"
                        onClick={() => setCartOpen(true)}
                        className="inline-flex h-9 items-center gap-1 rounded-lg border border-[var(--primary)] bg-[var(--primary-soft)] px-3 text-xs font-semibold text-[var(--primary)] whitespace-nowrap"
                      >
                        No carrinho
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addToCart(track.id)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 text-xs font-semibold text-[var(--primary-ink)] whitespace-nowrap hover:bg-[var(--primary-hover)] active:scale-[0.98]"
                      >
                        <ShoppingCartSimple size={14} weight="bold" aria-hidden="true" />
                        Comprar
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
