"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { FAQ_ITEMS } from "@/data/faq";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-[var(--border)] bg-[var(--surface)]/55 py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Coluna esquerda informativa */}
          <div className="lg:col-span-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              Dúvidas frequentes
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--ink)]">
              Tudo claro antes da matrícula
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Regras de acesso, certificados com carga horária, uso de cupons no carrinho e
              como ativar a sincronização com o Supabase.
            </p>

            <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
              <h3 className="text-sm font-bold text-[var(--ink)]">
                Quer conhecer quem coordena o catálogo?
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                Veja a trajetória completa no Inatel, na CP2eJr e os repositórios abertos no
                GitHub.
              </p>
              <Link
                href="/sobre/"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] underline-offset-4 hover:underline"
              >
                <span>Abrir página Sobre Mim</span>
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Coluna direita: Accordion FAQ */}
          <div className="space-y-3 lg:col-span-8">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--surface)]"
                  >
                    <div>
                      <span className="block font-mono text-[11px] font-medium text-[var(--muted)]">
                        {item.category}
                      </span>
                      <span className="mt-0.5 block text-sm font-bold text-[var(--ink)] sm:text-base">
                        {item.question}
                      </span>
                    </div>
                    <CaretDown
                      size={18}
                      weight="bold"
                      className={`shrink-0 text-[var(--muted)] transition-transform duration-150 ${
                        isOpen ? "rotate-180 text-[var(--primary)]" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-[var(--border)] px-5 py-4 text-sm leading-relaxed text-[var(--ink-secondary)]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
