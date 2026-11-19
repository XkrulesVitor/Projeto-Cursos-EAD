"use client";

import Link from "next/link";
import {
  CheckCircle,
  Copy,
  Database,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  TerminalWindow,
} from "@phosphor-icons/react";
import { useState } from "react";
import { AUTHOR_PROFILE } from "@/data/about";
import { CATALOG_STATS, COURSE_CATEGORIES, STORE_COUPONS } from "@/data/courses";
import { useStore } from "@/context/StoreContext";

export function Footer() {
  const { supabaseReady, catalogSource, pushToast } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  async function handleCopyCoupon(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      pushToast(`Cupom ${code} copiado. Cole no carrinho para ativar.`, "success");
      window.setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      pushToast(`Use o cupom ${code} diretamente no carrinho.`, "info");
    }
  }

  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Coluna 1: Marca e resumo */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-[var(--ink)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-ink)]">
                <TerminalWindow size={20} weight="bold" aria-hidden="true" />
              </span>
              <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
                Cursos EAD
              </span>
            </Link>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-[var(--muted)]">
              Catálogo oficial de capacitação inspirado nas {CATALOG_STATS.totalTracks} trilhas do
              Núcleo de Projetos: {CATALOG_STATS.totalCourses} cursos práticos somando{" "}
              {CATALOG_STATS.totalHours} horas com ementa transparente.
            </p>

            {/* Status honesto da camada Supabase */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-xs font-medium text-[var(--ink-secondary)]">
              <Database
                size={15}
                weight="bold"
                className={supabaseReady ? "text-[var(--accent)]" : "text-[var(--primary)]"}
                aria-hidden="true"
              />
              <span>
                {supabaseReady && catalogSource === "supabase"
                  ? "Supabase conectado (Postgres + Auth)"
                  : "Modo estático local (pronto para Supabase)"}
              </span>
            </div>
          </div>

          {/* Coluna 2: Categorias */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-[var(--ink)]">Categorias</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COURSE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/?categoria=${cat.id}#catalogo`}
                    className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Navegacao da loja */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[var(--ink)]">Navegação</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/#ofertas"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  Ofertas R$ 49,99
                </Link>
              </li>
              <li>
                <Link
                  href="/#catalogo"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  Todas as {CATALOG_STATS.totalTracks} trilhas
                </Link>
              </li>
              <li>
                <Link
                  href="/matriculas/"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  Minhas Matrículas
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre/"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  Sobre Mim
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Cupons ativos na loja */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-[var(--ink)]">Cupons para o carrinho</h3>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Clique para copiar e aplicar no fechamento da matrícula:
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {STORE_COUPONS.map((coupon) => (
                <button
                  key={coupon.code}
                  type="button"
                  onClick={() => handleCopyCoupon(coupon.code)}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-left transition-colors hover:border-[var(--primary)]"
                >
                  <div>
                    <span className="block font-mono text-xs font-semibold text-[var(--ink)]">
                      {coupon.code}
                    </span>
                    <span className="block text-[11px] text-[var(--muted)]">
                      {coupon.description}
                    </span>
                  </div>
                  {copiedCode === coupon.code ? (
                    <CheckCircle
                      size={16}
                      weight="bold"
                      className="shrink-0 text-[var(--accent)]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Copy
                      size={15}
                      weight="bold"
                      className="shrink-0 text-[var(--muted)]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center">
          <p>
            Cursos EAD desenvolvido por{" "}
            <Link
              href="/sobre/"
              className="font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
            >
              {AUTHOR_PROFILE.fullName} ({AUTHOR_PROFILE.handle})
            </Link>
            .
          </p>

          <div className="flex items-center gap-3">
            <a
              href={AUTHOR_PROFILE.links.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="Repositório Projeto-Cursos-EAD no GitHub"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 py-1.5 text-[var(--ink)] transition-colors hover:border-[var(--border-strong)]"
            >
              <GithubLogo size={15} weight="bold" aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href={AUTHOR_PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn de Vitor Noronha"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 py-1.5 text-[var(--ink)] transition-colors hover:border-[var(--border-strong)]"
            >
              <LinkedinLogo size={15} weight="bold" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href={AUTHOR_PROFILE.links.email}
              aria-label="Enviar e-mail"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 py-1.5 text-[var(--ink)] transition-colors hover:border-[var(--border-strong)]"
            >
              <EnvelopeSimple size={15} weight="bold" aria-hidden="true" />
              <span>E-mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
