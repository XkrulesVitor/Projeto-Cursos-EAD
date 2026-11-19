"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Database, ShieldCheck, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useStore } from "@/context/StoreContext";
import { formatBRL } from "@/lib/format";

export function CheckoutModal() {
  const router = useRouter();
  const {
    checkoutOpen,
    setCheckoutOpen,
    cartItems,
    cartTotals,
    appliedCoupon,
    user,
    supabaseReady,
    completeEnrollment,
  } = useStore();
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (checkoutOpen) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setError(null);
    }
  }, [checkoutOpen, user]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Informe seu nome completo para emissão do certificado.");
      return;
    }
    if (!email.includes("@")) {
      setError("Informe um e-mail válido para vincular suas matrículas.");
      return;
    }

    setError(null);
    setSubmitting(true);
    const ok = await completeEnrollment({ name: name.trim(), email: email.trim() });
    setSubmitting(false);

    if (ok) {
      router.push("/matriculas/");
    }
  }

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
        >
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            onClick={() => setCheckoutOpen(false)}
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
          />

          <motion.div
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] shadow-[var(--shadow-elevated)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-5 py-4">
              <h2
                id="checkout-modal-title"
                className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]"
              >
                Confirmar matrícula
              </h2>
              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                aria-label="Fechar janela de matrícula"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink)]"
              >
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
              {/* Resumo do pedido */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--muted)]">
                  <span>Trilhas selecionadas ({cartItems.length})</span>
                  {appliedCoupon && (
                    <span className="font-mono text-[var(--accent)]">
                      Cupom {appliedCoupon.code}
                    </span>
                  )}
                </div>
                <ul className="mt-2.5 max-h-36 space-y-1.5 overflow-y-auto text-sm">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2 text-[var(--ink)]"
                    >
                      <span className="truncate">{item.title}</span>
                      <span className="shrink-0 font-mono text-xs text-[var(--muted)] tabular-nums">
                        {formatBRL(item.price)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3 text-sm font-bold text-[var(--ink)]">
                  <span>Valor do pedido</span>
                  <span className="font-mono text-lg tabular-nums">
                    {formatBRL(cartTotals.finalTotal)}
                  </span>
                </div>
              </div>

              {/* Aviso de integracao Supabase */}
              <div className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
                <Database
                  size={17}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-[var(--primary)]"
                  aria-hidden="true"
                />
                <p>
                  {supabaseReady
                    ? "Integração Supabase ativa: esta matrícula será gravada na tabela enrollments do seu banco PostgreSQL."
                    : "Modo estático sem gateway de pagamento: sua matrícula será registrada localmente no navegador e liberada imediatamente. Ao conectar o Supabase no .env, passa a salvar direto no PostgreSQL."}
                </p>
              </div>

              {/* Campos do aluno */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="checkout-name"
                    className="text-sm font-semibold text-[var(--ink)]"
                  >
                    Nome completo
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome para o certificado"
                    className="h-11 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="checkout-email"
                    className="text-sm font-semibold text-[var(--ink)]"
                  >
                    E-mail do aluno
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    className="h-11 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs font-medium text-[var(--danger)]">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-60"
                >
                  <CheckCircle size={18} weight="bold" aria-hidden="true" />
                  <span>
                    {submitting ? "Registrando matrícula..." : "Confirmar e liberar acesso"}
                  </span>
                </button>
                <p className="inline-flex items-center justify-center gap-1.5 text-xs text-[var(--muted)]">
                  <ShieldCheck size={14} weight="bold" aria-hidden="true" />
                  Acesso imediato em Minhas Matrículas com garantia de 7 dias.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
