"use client";

import type { ReactNode } from "react";
import { AuthModal } from "@/components/store/AuthModal";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CheckoutModal } from "@/components/store/CheckoutModal";
import { CourseDetailModal } from "@/components/store/CourseDetailModal";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ToastStack } from "./ToastStack";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <CourseDetailModal />
      <CheckoutModal />
      <AuthModal />
      <ToastStack />
    </div>
  );
}
