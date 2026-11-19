"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Certificate,
  CheckCircle,
  Circle,
  Clock,
  Database,
  UserCircle,
} from "@phosphor-icons/react";
import { useStore } from "@/context/StoreContext";
import { assetPath } from "@/lib/assets";
import { formatBRL, formatCourseCount, formatHours } from "@/lib/format";

export default function MatriculasPage() {
  const {
    courses,
    enrollments,
    user,
    supabaseReady,
    toggleModuleDone,
    setAuthOpen,
    setActiveCourse,
  } = useStore();

  const enrolledItems = enrollments
    .map((record) => {
      const course = courses.find((c) => c.id === record.courseId);
      return course ? { record, course } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const totalHoursUnlocked = enrolledItems.reduce(
    (acc, item) => acc + item.course.totalHours,
    0,
  );
  const totalModulesUnlocked = enrolledItems.reduce(
    (acc, item) => acc + item.course.modules.length,
    0,
  );
  const totalModulesDone = enrolledItems.reduce(
    (acc, item) => acc + item.record.completedModuleIds.length,
    0,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
      >
        <ArrowLeft size={16} weight="bold" aria-hidden="true" />
        Voltar para a loja
      </Link>

      {/* Cabecalho */}
      <div className="mt-6 flex flex-col items-start justify-between gap-6 border-b border-[var(--border)] pb-8 lg:flex-row lg:items-end">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
            Minhas Matrículas
          </h1>
          <p className="mt-2 max-w-[56ch] text-sm text-[var(--muted)] sm:text-base">
            Acompanhe sua evolução módulo por módulo nas trilhas adquiridas e libere o
            comprovante de conclusão ao completar 100% da grade.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs text-[var(--ink-secondary)]">
            <Database
              size={15}
              weight="bold"
              className={supabaseReady ? "text-[var(--accent)]" : "text-[var(--primary)]"}
              aria-hidden="true"
            />
            <span>
              {supabaseReady
                ? "Sincronizado com Supabase"
                : "Persistência local (pronto para Supabase)"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 text-xs font-semibold text-[var(--ink)] hover:bg-[var(--surface-hover)]"
          >
            <UserCircle size={16} weight="bold" aria-hidden="true" />
            <span>{user ? `${user.name} (${user.email})` : "Conectar conta"}</span>
          </button>
        </div>
      </div>

      {/* Resumo numerico real do aluno */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
          <span className="text-xs font-medium text-[var(--muted)]">
            Trilhas liberadas
          </span>
          <p className="mt-1.5 font-mono text-3xl font-bold text-[var(--ink)] tabular-nums">
            {enrolledItems.length}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
          <span className="text-xs font-medium text-[var(--muted)]">
            Carga horária disponível
          </span>
          <p className="mt-1.5 font-mono text-3xl font-bold text-[var(--ink)] tabular-nums">
            {formatHours(totalHoursUnlocked)}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
          <span className="text-xs font-medium text-[var(--muted)]">
            Cursos concluídos
          </span>
          <p className="mt-1.5 font-mono text-3xl font-bold text-[var(--ink)] tabular-nums">
            {totalModulesDone} / {totalModulesUnlocked}
          </p>
        </div>
      </div>

      {/* Lista de trilhas matriculadas ou estado vazio */}
      {enrolledItems.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--primary)]">
            <BookOpen size={26} weight="bold" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
            Nenhuma matrícula registrada ainda
          </h2>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            Adicione qualquer uma das 26 trilhas do catálogo ao carrinho e conclua a
            matrícula para desbloquear sua grade interativa aqui.
          </p>
          <Link
            href="/#catalogo"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[var(--primary)] px-6 text-sm font-semibold text-[var(--primary-ink)] hover:bg-[var(--primary-hover)]"
          >
            Explorar catálogo de trilhas
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {enrolledItems.map(({ record, course }) => {
            const doneCount = record.completedModuleIds.length;
            const totalMods = course.modules.length;
            const percent =
              totalMods > 0 ? Math.round((doneCount / totalMods) * 100) : 0;
            const completed = percent === 100;

            return (
              <article
                key={record.id}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-[var(--shadow-card)]"
              >
                <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-12">
                  {/* Resumo da trilha */}
                  <div className="lg:col-span-4">
                    <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                      <div className="aspect-[16/9] w-full">
                        <img
                          src={assetPath(course.image)}
                          alt={course.imageAlt}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">
                          {course.title}
                        </h2>
                        {completed && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
                            <Certificate size={13} weight="bold" aria-hidden="true" />
                            Concluída
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--muted)] tabular-nums">
                        <span>{formatCourseCount(course.courseCount)}</span>
                        <span>/</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock size={13} weight="bold" aria-hidden="true" />
                          {formatHours(course.totalHours)}
                        </span>
                        <span>/</span>
                        <span>Valor: {formatBRL(record.paidPrice)}</span>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                        <span className="text-[var(--ink-secondary)]">Progresso</span>
                        <span className="font-mono text-[var(--ink)] tabular-nums">
                          {doneCount}/{totalMods} ({percent}%)
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[var(--surface)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveCourse(course)}
                        className="mt-4 inline-flex h-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--border-strong)]"
                      >
                        Ver descrição completa
                      </button>
                    </div>
                  </div>

                  {/* Checklist interativo de cursos/modulos */}
                  <div className="lg:col-span-8">
                    <h3 className="text-sm font-bold text-[var(--ink)]">
                      Grade curricular (clique para marcar como concluído)
                    </h3>
                    <div className="mt-3 space-y-2">
                      {course.modules.map((mod, idx) => {
                        const isDone = record.completedModuleIds.includes(mod.id);
                        return (
                          <button
                            key={mod.id}
                            type="button"
                            onClick={() => toggleModuleDone(course.id, mod.id)}
                            aria-pressed={isDone}
                            className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                              isDone
                                ? "border-[var(--accent)]/40 bg-[var(--accent-soft)]/50"
                                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {isDone ? (
                                <CheckCircle
                                  size={20}
                                  weight="fill"
                                  className="mt-0.5 shrink-0 text-[var(--accent)]"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Circle
                                  size={20}
                                  weight="bold"
                                  className="mt-0.5 shrink-0 text-[var(--muted)]"
                                  aria-hidden="true"
                                />
                              )}
                              <div>
                                <p
                                  className={`text-sm font-semibold ${
                                    isDone
                                      ? "text-[var(--ink)] line-through decoration-[var(--accent)]/60"
                                      : "text-[var(--ink)]"
                                  }`}
                                >
                                  {idx + 1}. {mod.title}
                                </p>
                                <p className="mt-0.5 text-xs text-[var(--muted)]">
                                  {mod.topics[0]}
                                </p>
                              </div>
                            </div>
                            <span className="shrink-0 font-mono text-xs font-semibold text-[var(--muted)] tabular-nums">
                              {formatHours(mod.hours)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
