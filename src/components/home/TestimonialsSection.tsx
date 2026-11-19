"use client";

import { Star } from "@phosphor-icons/react";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="border-t border-[var(--border)] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Quem já aplicou as trilhas em projetos reais
          </h2>
          <p className="mt-3 text-base text-[var(--muted)]">
            Relatos objetivos de estudantes e desenvolvedores que passaram pelas grades
            estruturadas de web, back-end, dados e vibe coding.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div
                    className="flex items-center gap-0.5 text-[var(--primary)]"
                    aria-label={`Avaliação ${item.rating} de 5 estrelas`}
                  >
                    {Array.from({ length: item.rating }).map((_, idx) => (
                      <Star key={idx} size={15} weight="fill" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--muted)]">
                    {item.trackTitle}
                  </span>
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-[var(--ink)] sm:text-base">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-5 border-t border-[var(--border)] pt-4 text-xs">
                <span className="block font-bold text-[var(--ink)]">{item.author}</span>
                <span className="text-[var(--muted)]">
                  {item.role} - {item.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
