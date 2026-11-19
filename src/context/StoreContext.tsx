"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { COURSES, STORE_COUPONS } from "@/data/courses";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getCurrentUser, signInAccount, signOutAccount } from "@/services/authService";
import { fetchCoursesCatalog } from "@/services/courseService";
import {
  createEnrollments,
  loadEnrollments,
  toggleEnrollmentModule,
} from "@/services/enrollmentService";
import type {
  CouponCode,
  CourseTrack,
  EnrollmentRecord,
  UserProfile,
} from "@/types/course";

const CART_STORAGE_KEY = "cursos_ead_cart_v1";
const COUPON_STORAGE_KEY = "cursos_ead_coupon_v1";

export interface ToastMessage {
  id: string;
  text: string;
  tone: "success" | "info" | "error";
}

interface CartTotals {
  itemCount: number;
  listTotal: number;
  subtotal: number;
  promoSavings: number;
  couponDiscount: number;
  finalTotal: number;
}

interface StoreContextValue {
  courses: CourseTrack[];
  catalogSource: "local" | "supabase";
  supabaseReady: boolean;

  cartIds: string[];
  cartItems: CourseTrack[];
  cartTotals: CartTotals;
  appliedCoupon: CouponCode | null;

  enrollments: EnrollmentRecord[];
  user: UserProfile | null;

  activeCourse: CourseTrack | null;
  cartOpen: boolean;
  checkoutOpen: boolean;
  authOpen: boolean;
  toasts: ToastMessage[];

  setActiveCourse: (course: CourseTrack | null) => void;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setAuthOpen: (open: boolean) => void;

  isInCart: (courseId: string) => boolean;
  isEnrolled: (courseId: string) => boolean;
  addToCart: (courseId: string, openDrawer?: boolean) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;

  applyCoupon: (rawCode: string) => { ok: boolean; message: string };
  removeCoupon: () => void;

  completeEnrollment: (customer: { name: string; email: string }) => Promise<boolean>;
  toggleModuleDone: (courseId: string, moduleId: string) => Promise<void>;

  login: (params: {
    email: string;
    password: string;
    name?: string;
    isSignUp?: boolean;
  }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  pushToast: (text: string, tone?: ToastMessage["tone"]) => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<CourseTrack[]>(COURSES);
  const [catalogSource, setCatalogSource] = useState<"local" | "supabase">("local");
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [activeCourse, setActiveCourse] = useState<CourseTrack | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback(
    (text: string, tone: ToastMessage["tone"] = "info") => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, text, tone }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 3600);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Hidratacao inicial do catalogo, carrinho, cupom, sessao e matriculas
  useEffect(() => {
    let active = true;

    async function hydrate() {
      try {
        const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setCartIds(parsed.filter((id): id is string => typeof id === "string"));
          }
        }
        const savedCoupon = window.localStorage.getItem(COUPON_STORAGE_KEY);
        if (savedCoupon) {
          const match = STORE_COUPONS.find((c) => c.code === savedCoupon);
          if (match) setAppliedCoupon(match);
        }
      } catch {
        // Ignora storage indisponivel
      }

      const [catalogResult, currentUser] = await Promise.all([
        fetchCoursesCatalog(),
        getCurrentUser(),
      ]);

      if (!active) return;

      setCourses(catalogResult.courses);
      setCatalogSource(catalogResult.source);
      setUser(currentUser);

      const loadedEnrollments = await loadEnrollments(currentUser?.id);
      if (active) {
        setEnrollments(loadedEnrollments);
      }
    }

    hydrate();
    return () => {
      active = false;
    };
  }, []);

  // Persiste carrinho localmente
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartIds));
    } catch {
      // Ignora restricao de armazenamento
    }
  }, [cartIds]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        window.localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon.code);
      } else {
        window.localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // Ignora restricao de armazenamento
    }
  }, [appliedCoupon]);

  const enrolledSet = useMemo(
    () => new Set(enrollments.map((item) => item.courseId)),
    [enrollments],
  );

  const cartItems = useMemo(
    () =>
      cartIds
        .map((id) => courses.find((course) => course.id === id))
        .filter((course): course is CourseTrack => Boolean(course)),
    [cartIds, courses],
  );

  const cartTotals = useMemo<CartTotals>(() => {
    const subtotal = roundCurrency(
      cartItems.reduce((acc, item) => acc + item.price, 0),
    );
    const listTotal = roundCurrency(
      cartItems.reduce((acc, item) => acc + (item.originalPrice ?? item.price), 0),
    );
    const promoSavings = roundCurrency(Math.max(0, listTotal - subtotal));
    const couponDiscount = appliedCoupon
      ? roundCurrency((subtotal * appliedCoupon.discountPercent) / 100)
      : 0;
    const finalTotal = roundCurrency(Math.max(0, subtotal - couponDiscount));

    return {
      itemCount: cartItems.length,
      listTotal,
      subtotal,
      promoSavings,
      couponDiscount,
      finalTotal,
    };
  }, [cartItems, appliedCoupon]);

  const isInCart = useCallback(
    (courseId: string) => cartIds.includes(courseId),
    [cartIds],
  );

  const isEnrolled = useCallback(
    (courseId: string) => enrolledSet.has(courseId),
    [enrolledSet],
  );

  const addToCart = useCallback(
    (courseId: string, openDrawer = false) => {
      const course = courses.find((c) => c.id === courseId);
      if (!course) return;

      if (enrolledSet.has(courseId)) {
        pushToast(`Você já possui matrícula ativa em ${course.title}.`, "info");
        return;
      }

      if (cartIds.includes(courseId)) {
        if (openDrawer) setCartOpen(true);
        else pushToast(`${course.title} já está no carrinho.`, "info");
        return;
      }

      setCartIds((prev) => [...prev, courseId]);
      if (openDrawer) {
        setCartOpen(true);
      } else {
        pushToast(`${course.title} adicionada ao carrinho.`, "success");
      }
    },
    [courses, enrolledSet, cartIds, pushToast],
  );

  const removeFromCart = useCallback((courseId: string) => {
    setCartIds((prev) => prev.filter((id) => id !== courseId));
  }, []);

  const clearCart = useCallback(() => {
    setCartIds([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((rawCode: string) => {
    const normalized = rawCode.trim().toUpperCase();
    if (!normalized) {
      return { ok: false, message: "Digite um código de cupom válido." };
    }
    const found = STORE_COUPONS.find((coupon) => coupon.code === normalized);
    if (!found) {
      return {
        ok: false,
        message: "Cupom não encontrado. Experimente CP2EJR10, VIBE15 ou INATEL20.",
      };
    }
    setAppliedCoupon(found);
    return {
      ok: true,
      message: `Cupom ${found.code} aplicado (${found.discountPercent}% OFF).`,
    };
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const completeEnrollment = useCallback(
    async (customer: { name: string; email: string }) => {
      if (cartItems.length === 0) return false;

      let activeUser = user;
      if (!activeUser && !isSupabaseConfigured) {
        const result = await signInAccount({
          email: customer.email,
          password: "demo-static-session",
          name: customer.name,
        });
        if (result.user) {
          activeUser = result.user;
          setUser(result.user);
        }
      }

      const discountFactor = appliedCoupon
        ? 1 - appliedCoupon.discountPercent / 100
        : 1;

      const itemsToEnroll = cartItems.map((course) => ({
        courseId: course.id,
        paidPrice: roundCurrency(course.price * discountFactor),
      }));

      const nextRecords = await createEnrollments({
        userId: activeUser?.id,
        items: itemsToEnroll,
        couponApplied: appliedCoupon?.code,
      });

      setEnrollments(nextRecords);
      setCartIds([]);
      setAppliedCoupon(null);
      setCheckoutOpen(false);
      setCartOpen(false);
      pushToast(
        `${itemsToEnroll.length} ${
          itemsToEnroll.length === 1 ? "trilha liberada" : "trilhas liberadas"
        } em Minhas Matrículas.`,
        "success",
      );
      return true;
    },
    [cartItems, user, appliedCoupon, pushToast],
  );

  const toggleModuleDone = useCallback(
    async (courseId: string, moduleId: string) => {
      const next = await toggleEnrollmentModule({
        userId: user?.id,
        courseId,
        moduleId,
        currentRecords: enrollments,
      });
      setEnrollments(next);
    },
    [user?.id, enrollments],
  );

  const login = useCallback(
    async (params: {
      email: string;
      password: string;
      name?: string;
      isSignUp?: boolean;
    }) => {
      const result = await signInAccount(params);
      if (result.error || !result.user) {
        return { ok: false, error: result.error || "Não foi possível entrar." };
      }
      setUser(result.user);
      const userEnrollments = await loadEnrollments(result.user.id);
      setEnrollments(userEnrollments);
      setAuthOpen(false);
      pushToast(`Bem-vindo, ${result.user.name}.`, "success");
      return { ok: true };
    },
    [pushToast],
  );

  const logout = useCallback(async () => {
    await signOutAccount();
    setUser(null);
    const localOnly = await loadEnrollments(undefined);
    setEnrollments(localOnly);
    pushToast("Sessão encerrada com segurança.", "info");
  }, [pushToast]);

  return (
    <StoreContext.Provider
      value={{
        courses,
        catalogSource,
        supabaseReady: isSupabaseConfigured,
        cartIds,
        cartItems,
        cartTotals,
        appliedCoupon,
        enrollments,
        user,
        activeCourse,
        cartOpen,
        checkoutOpen,
        authOpen,
        toasts,
        setActiveCourse,
        setCartOpen,
        setCheckoutOpen,
        setAuthOpen,
        isInCart,
        isEnrolled,
        addToCart,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        completeEnrollment,
        toggleModuleDone,
        login,
        logout,
        pushToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore precisa ser utilizado dentro de StoreProvider.");
  }
  return ctx;
}
