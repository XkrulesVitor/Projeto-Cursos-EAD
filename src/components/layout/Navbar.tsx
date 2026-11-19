"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  List,
  ShoppingCartSimple,
  TerminalWindow,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import { useStore } from "@/context/StoreContext";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/#catalogo", label: "Catálogo", match: "/" },
  { href: "/#ofertas", label: "Ofertas", match: null },
  { href: "/#faq", label: "FAQ", match: null },
  { href: "/sobre/", label: "Sobre Mim", match: "/sobre" },
  { href: "/matriculas/", label: "Minhas Matrículas", match: "/matriculas" },
];

export function Navbar() {
  const pathname = usePathname();
  const { cartTotals, enrollments, user, setCartOpen, setAuthOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const normalizedPath = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Marca */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-[var(--ink)] transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-ink)]">
            <TerminalWindow size={20} weight="bold" aria-hidden="true" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight whitespace-nowrap">
            Cursos EAD
          </span>
        </Link>

        {/* Navegacao desktop em 1 linha */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.match !== null && normalizedPath === item.match;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? "bg-[var(--surface)] text-[var(--ink)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                }`}
              >
                <span>{item.label}</span>
                {item.match === "/matriculas" && enrollments.length > 0 && (
                  <span className="rounded-full bg-[var(--accent-soft)] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[var(--accent)] tabular-nums">
                    {enrollments.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Acoes de loja: Tema, Conta, Carrinho */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="hidden h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 text-sm font-medium text-[var(--ink)] whitespace-nowrap transition-colors duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] active:scale-[0.98] sm:inline-flex"
          >
            <UserCircle size={18} weight="bold" aria-hidden="true" />
            <span className="max-w-[110px] truncate">
              {user ? user.name : "Entrar"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir carrinho com ${cartTotals.itemCount} itens`}
            className="relative inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--primary)] px-3.5 text-sm font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors duration-150 hover:bg-[var(--primary-hover)] active:scale-[0.98]"
          >
            <ShoppingCartSimple size={18} weight="bold" aria-hidden="true" />
            <span className="hidden sm:inline">Carrinho</span>
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-black/20 px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums">
              {cartTotals.itemCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink)] lg:hidden"
          >
            {mobileMenuOpen ? (
              <X size={20} weight="bold" aria-hidden="true" />
            ) : (
              <List size={20} weight="bold" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4 lg:hidden">
          <nav aria-label="Navegação mobile" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface)]"
              >
                <span>{item.label}</span>
                {item.match === "/matriculas" && enrollments.length > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--accent)]">
                    <BookOpen size={13} weight="bold" aria-hidden="true" />
                    {enrollments.length}
                  </span>
                )}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthOpen(true);
              }}
              className="mt-2 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2.5 text-sm font-medium text-[var(--ink)]"
            >
              <UserCircle size={18} weight="bold" aria-hidden="true" />
              <span>{user ? `Conta: ${user.name}` : "Entrar na conta"}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
