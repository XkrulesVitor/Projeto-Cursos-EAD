import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Code,
  EnvelopeSimple,
  GithubLogo,
  GraduationCap,
  LinkedinLogo,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { AUTHOR_PROFILE } from "@/data/about";
import { CATALOG_STATS } from "@/data/courses";
import { assetPath } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Sobre Mim | Vitor Hugo Felipe Noronha (XKrules) - Cursos EAD",
  description:
    "Conheça Vitor Hugo Felipe Noronha (XKrules), graduando em Engenharia de Software no Inatel, Coordenador de P&D na CP2eJr e criador do Cursos EAD.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} weight="bold" aria-hidden="true" />
        Voltar para a loja
      </Link>

      {/* Bloco principal: retrato real + apresentacao */}
      <section className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-card)]">
            <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--surface)]">
              <img
                src={assetPath(AUTHOR_PROFILE.photo)}
                alt={AUTHOR_PROFILE.photoAlt}
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] px-5 py-4 text-xs text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[var(--ink)]">
                <MapPin size={14} weight="bold" className="text-[var(--primary)]" aria-hidden="true" />
                {AUTHOR_PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono">
                <GraduationCap size={14} weight="bold" aria-hidden="true" />
                Inatel
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            Sobre o autor · @{AUTHOR_PROFILE.githubUsername}
          </p>

          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--ink)] sm:text-5xl">
            {AUTHOR_PROFILE.fullName}
          </h1>

          <p className="mt-3 text-lg font-medium text-[var(--ink-secondary)]">
            {AUTHOR_PROFILE.headline}
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted)]">
            <p>{AUTHOR_PROFILE.bio}</p>
            <p>{AUTHOR_PROFILE.secondaryBio}</p>
          </div>

          {/* Botoes de contato direto */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={AUTHOR_PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors hover:bg-[var(--primary-hover)]"
            >
              <GithubLogo size={18} weight="bold" aria-hidden="true" />
              <span>GitHub ({AUTHOR_PROFILE.handle})</span>
            </a>

            <a
              href={AUTHOR_PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-5 text-sm font-semibold text-[var(--ink)] whitespace-nowrap transition-colors hover:bg-[var(--surface-hover)]"
            >
              <LinkedinLogo size={18} weight="bold" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>

            <a
              href={AUTHOR_PROFILE.links.email}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-5 text-sm font-semibold text-[var(--ink)] whitespace-nowrap transition-colors hover:bg-[var(--surface-hover)]"
            >
              <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
              <span>{AUTHOR_PROFILE.links.emailLabel}</span>
            </a>
          </div>

          {/* Numeros reais do catalogo liderado */}
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[var(--border)] pt-6">
            <div>
              <span className="block font-mono text-2xl font-bold text-[var(--ink)] tabular-nums sm:text-3xl">
                {CATALOG_STATS.totalTracks}
              </span>
              <span className="mt-1 block text-xs text-[var(--muted)]">
                Trilhas no catálogo NP
              </span>
            </div>
            <div>
              <span className="block font-mono text-2xl font-bold text-[var(--ink)] tabular-nums sm:text-3xl">
                {CATALOG_STATS.totalCourses}
              </span>
              <span className="mt-1 block text-xs text-[var(--muted)]">
                Cursos estruturados
              </span>
            </div>
            <div>
              <span className="block font-mono text-2xl font-bold text-[var(--ink)] tabular-nums sm:text-3xl">
                {CATALOG_STATS.totalHours}h
              </span>
              <span className="mt-1 block text-xs text-[var(--muted)]">
                Carga horária total
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trajetoria e atuacao */}
      <section className="mt-20 border-t border-[var(--border)] pt-14">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
            Atuação e trajetória
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
            Experiência conectando engenharia de software, gestão de projetos e entrega de
            produtos digitais.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {AUTHOR_PROFILE.milestones.map((item) => (
            <div
              key={item.role}
              className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
                      {item.role}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-[var(--primary)]">
                      {item.organization}
                    </p>
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Abrir site de ${item.organization}`}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--border-strong)]"
                    >
                      <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack tecnica */}
      <section className="mt-16 border-t border-[var(--border)] pt-14">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
          Stack técnica
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AUTHOR_PROFILE.stackGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--ink)]">
                <Code size={16} weight="bold" className="text-[var(--primary)]" aria-hidden="true" />
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 font-mono text-xs text-[var(--ink-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Repositorios publicos em destaque */}
      <section className="mt-16 border-t border-[var(--border)] pt-14">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
              Projetos em destaque no GitHub
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Seleção direta dos repositórios públicos em github.com/{AUTHOR_PROFILE.githubUsername}.
            </p>
          </div>
          <a
            href={AUTHOR_PROFILE.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] underline-offset-4 hover:underline"
          >
            <span>Ver todos os repositórios</span>
            <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {AUTHOR_PROFILE.featuredRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 transition-colors hover:border-[var(--primary)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--muted)]">
                    {repo.highlight}
                  </span>
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    className="text-[var(--muted)] transition-colors group-hover:text-[var(--primary)]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-3 font-mono text-sm font-bold text-[var(--ink)] group-hover:text-[var(--primary)]">
                  {repo.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                  {repo.description}
                </p>
              </div>
              <span className="mt-4 block border-t border-[var(--border)] pt-3 font-mono text-[11px] text-[var(--ink-secondary)]">
                {repo.language}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
