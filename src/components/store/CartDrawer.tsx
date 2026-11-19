"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Clock,
  ShoppingCartSimple,
  Tag,
  Trash,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useStore } from "@/context/StoreContext";
import { STORE_COUPONS } from "@/data/courses";
import { assetPath } from "@/lib/assets";
import { formatBRL, formatCourseCount, formatHours } from "@/lib/format";

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cartItems,
    cartTotals,
    appliedCoupon,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    setCheckoutOpen,
    setActiveCourse,
  } = useStore();
  const reduceMotion = useReducedMotion();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!cartOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cartOpen, setCartOpen]);

  const totalHoursInCart = cartItems.reduce((acc, item) => acc + item.totalHours, 0);

  function handleSubmitCoupon(event: React.FormEvent) {
    event.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.ok) setCouponInput("");
  }

  return (
    <AnimatePresence>
      {cartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Carrinho de compras"
          className="fixed inset-0 z-[var(--z-drawer)] flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer */}
          <motion.aside
            initial={reduceMotion ? { x: 0 } : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[var(--border-strong)] bg-[var(--bg)] shadow-[var(--shadow-elevated)]"
          >
            {/* Cabecalho */}
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-5 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingCartSimple size={20} weight="bold" className="text-[var(--primary)]" aria-hidden="true" />
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--ink)]">
                    Seu Carrinho ({cartTotals.itemCount})
                  </h2>
                  {cartItems.length > 0 && (
                    <p className="font-mono text-xs text-[var(--muted)] tabular-nums">
                      Carga acumulada: {formatHours(totalHoursInCart)}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Fechar carrinho"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--ink)] hover:bg-[var(--surface-hover)]"
              >
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>

            {/* Lista de itens */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]">
                    <ShoppingCartSimple size={26} weight="bold" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)]">
                    Seu carrinho está vazio
                  </h3>
                  <p className="mt-1.5 max-w-[30ch] text-sm text-[var(--muted)]">
                    Explore as 25 trilhas do Núcleo de Projetos, incluindo ofertas a partir de R$ 49,99.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-ink)] hover:bg-[var(--primary-hover)]"
                  >
                    Explorar catálogo
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs font-medium text-[var(--muted)] underline-offset-4 hover:text-[var(--danger)] hover:underline"
                    >
                      Limpar carrinho
                    </button>
                  </div>

                  {cartItems.map((course) => (
                    <div
                      key={course.id}
                      className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-3"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setCartOpen(false);
                          setActiveCourse(course);
                        }}
                        className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                      >
                        <img
                          src={assetPath(course.image)}
                          alt={course.imageAlt}
                          className="h-full w-full object-cover"
                        />
                      </button>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setCartOpen(false);
                              setActiveCourse(course);
                            }}
                            className="truncate text-left text-sm font-bold text-[var(--ink)] hover:text-[var(--primary)]"
                          >
                            {course.title}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(course.id)}
                            aria-label={`Remover ${course.title} do carrinho`}
                            className="rounded p-1 text-[var(--muted)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger)]"
                          >
                            <Trash size={15} weight="bold" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-[var(--muted)] tabular-nums">
                          <span>{formatCourseCount(course.courseCount)}</span>
                          <span>/</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={12} weight="bold" aria-hidden="true" />
                            {formatHours(course.totalHours)}
                          </span>
                        </div>

                        <div className="mt-auto flex items-baseline gap-2 pt-2">
                          <span className="font-mono text-sm font-bold text-[var(--ink)] tabular-nums">
                            {formatBRL(course.price)}
                          </span>
                          {course.originalPrice && course.originalPrice > course.price && (
                            <span className="font-mono text-[11px] text-[var(--muted)] line-through tabular-nums">
                              {formatBRL(course.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cupom e resumo financeiro */}
            {cartItems.length > 0 && (
              <div className="border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                <form onSubmit={handleSubmitCoupon} className="space-y-2">
                  <label
                    htmlFor="cart-coupon-input"
                    className="block text-xs font-semibold text-[var(--ink)]"
                  >
                    Cupom de desconto
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="cart-coupon-input"
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Ex: VIBE15"
                      className="h-10 flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 font-mono text-sm text-[var(--ink)] placeholder:text-[var(--muted)]"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3.5 text-xs font-semibold text-[var(--ink)] whitespace-nowrap hover:bg-[var(--surface-hover)]"
                    >
                      Aplicar
                    </button>
                  </div>

                  {/* Atalhos rapidos de cupom */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {STORE_COUPONS.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          const res = applyCoupon(c.code);
                          setCouponFeedback(res);
                        }}
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium transition-colors ${
                          appliedCoupon?.code === c.code
                            ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                            : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--muted)] hover:text-[var(--ink)]"
                        }`}
                      >
                        <Tag size={11} weight="bold" aria-hidden="true" />
                        {c.code}
                      </button>
                    ))}
                  </div>

                  {couponFeedback && (
                    <p
                      className={`text-xs ${
                        couponFeedback.ok
                          ? "text-[var(--accent)]"
                          : "text-[var(--danger)]"
                      }`}
                    >
                      {couponFeedback.message}
                    </p>
                  )}
                </form>

                {appliedCoupon && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-[var(--accent-soft)] px-3 py-2 text-xs text-[var(--accent)]">
                    <span className="font-semibold">
                      Cupom {appliedCoupon.code} ({appliedCoupon.discountPercent}% OFF)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        removeCoupon();
                        setCouponFeedback(null);
                      }}
                      className="font-semibold underline underline-offset-2"
                    >
                      Remover
                    </button>
                  </div>
                )}

                <dl className="mt-4 space-y-1.5 border-t border-[var(--border)] pt-4 text-sm">
                  <div className="flex items-center justify-between text-[var(--muted)]">
                    <dt>Subtotal</dt>
                    <dd className="font-mono tabular-nums">
                      {formatBRL(cartTotals.subtotal)}
                    </dd>
                  </div>
                  {cartTotals.promoSavings > 0 && (
                    <div className="flex items-center justify-between text-xs text-[var(--accent)]">
                      <dt>Economia das ofertas</dt>
                      <dd className="font-mono font-semibold tabular-nums">
                        -{formatBRL(cartTotals.promoSavings)}
                      </dd>
                    </div>
                  )}
                  {cartTotals.couponDiscount > 0 && (
                    <div className="flex items-center justify-between text-xs text-[var(--accent)]">
                      <dt>Desconto do cupom</dt>
                      <dd className="font-mono font-semibold tabular-nums">
                        -{formatBRL(cartTotals.couponDiscount)}
                      </dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 text-base font-bold text-[var(--ink)]">
                    <dt>Total</dt>
                    <dd className="font-mono text-xl tabular-nums">
                      {formatBRL(cartTotals.finalTotal)}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => setCheckoutOpen(true)}
                  className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-ink)] whitespace-nowrap transition-colors hover:bg-[var(--primary-hover)] active:scale-[0.98]"
                >
                  <span>Finalizar matrícula</span>
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
