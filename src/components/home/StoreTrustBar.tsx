"use client";

import {
  Certificate,
  ClockCountdown,
  Code,
  ShieldCheck,
} from "@phosphor-icons/react";
import { CATALOG_STATS } from "@/data/courses";

const STORE_BENEFITS = [
  {
    icon: ClockCountdown,
    title: "Acesso imediato",
    detail: "Trilhas liberadas assim que você confirma a matrícula.",
  },
  {
    icon: Code,
    title: `${CATALOG_STATS.totalHours} horas práticas`,
    detail: `${CATALOG_STATS.totalCourses} cursos distribuídos em ${CATALOG_STATS.totalTracks} trilhas do NP.`,
  },
  {
    icon: Certificate,
    title: "Certificado detalhado",
    detail: "Carga horária exata e relação de módulos concluídos.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia de 7 dias",
    detail: "Revise a ementa completa e troque de trilha sem burocracia.",
  },
];

export function StoreTrustBar() {
  return (
    <section
      aria-label="Garantias da loja"
      className="border-b border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STORE_BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--primary)]">
                  <Icon size={18} weight="bold" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-sans text-sm font-bold text-[var(--ink)]">
                    {item.title}
                  </h2>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted)]">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
