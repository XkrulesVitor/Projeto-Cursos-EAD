"use client";

import { useState } from "react";
import { Database, SignOut, UserCircle, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useStore } from "@/context/StoreContext";

export function AuthModal() {
  const { authOpen, setAuthOpen, user, supabaseReady, login, logout } = useStore();
  const reduceMotion = useReducedMotion();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    const res = await login({
      email,
      password,
      name: mode === "signup" ? name : undefined,
      isSignUp: mode === "signup",
    });
    setLoading(false);

    if (!res.ok) {
      setError(res.error || "Não foi possível concluir o acesso.");
    } else {
      setPassword("");
    }
  }

  return (
    <AnimatePresence>
      {authOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4"
        >
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            onClick={() => setAuthOpen(false)}
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
            className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] shadow-[var(--shadow-elevated)]"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-5 py-4">
              <h2
                id="auth-modal-title"
                className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]"
              >
                {user ? "Sua conta" : mode === "signin" ? "Entrar no Cursos EAD" : "Criar conta"}
              </h2>
              <button
                type="button"
                onClick={() => setAuthOpen(false)}
                aria-label="Fechar janela de conta"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink)]"
              >
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {user ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
                      <UserCircle size={28} weight="bold" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-[var(--ink)]">{user.name}</p>
                      <p className="truncate text-xs text-[var(--muted)]">{user.email}</p>
                      <span className="mt-1 inline-block rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)]">
                        {user.mode === "supabase" ? "Supabase Auth" : "Sessão local"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      await logout();
                      setAuthOpen(false);
                    }}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]"
                  >
                    <SignOut size={18} weight="bold" aria-hidden="true" />
                    Sair da conta
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signin");
                        setError(null);
                      }}
                      className={`h-9 rounded-md text-xs font-semibold transition-colors ${
                        mode === "signin"
                          ? "bg-[var(--surface-elevated)] text-[var(--ink)] shadow-xs"
                          : "text-[var(--muted)] hover:text-[var(--ink)]"
                      }`}
                    >
                      Já tenho conta
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setError(null);
                      }}
                      className={`h-9 rounded-md text-xs font-semibold transition-colors ${
                        mode === "signup"
                          ? "bg-[var(--surface-elevated)] text-[var(--ink)] shadow-xs"
                          : "text-[var(--muted)] hover:text-[var(--ink)]"
                      }`}
                    >
                      Criar conta
                    </button>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-xs leading-relaxed text-[var(--ink-secondary)]">
                    <Database
                      size={16}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-[var(--primary)]"
                      aria-hidden="true"
                    />
                    <p>
                      {supabaseReady
                        ? "Autenticação real conectada ao Supabase Auth."
                        : "Modo estático: cria uma sessão local para testar matrículas. Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para usar Supabase Auth real."}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "signup" && (
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="auth-name"
                          className="text-sm font-semibold text-[var(--ink)]"
                        >
                          Nome completo
                        </label>
                        <input
                          id="auth-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome"
                          className="h-11 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="auth-email"
                        className="text-sm font-semibold text-[var(--ink)]"
                      >
                        E-mail
                      </label>
                      <input
                        id="auth-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@exemplo.com"
                        className="h-11 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="auth-password"
                        className="text-sm font-semibold text-[var(--ink)]"
                      >
                        Senha
                      </label>
                      <input
                        id="auth-password"
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="h-11 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
                      />
                    </div>

                    {error && (
                      <p role="alert" className="text-xs font-medium text-[var(--danger)]">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-ink)] transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-60"
                    >
                      {loading
                        ? "Processando..."
                        : mode === "signin"
                          ? "Entrar"
                          : "Criar conta e acessar"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
