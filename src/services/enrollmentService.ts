// Servico de matriculas e progresso de modulos (Supabase Postgres com fallback localStorage)
import { getSupabaseClient } from "@/lib/supabase";
import type { EnrollmentRecord } from "@/types/course";

const LOCAL_ENROLLMENTS_KEY = "cursos_ead_enrollments_v1";

function readLocalEnrollments(): EnrollmentRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_ENROLLMENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalEnrollments(records: EnrollmentRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_ENROLLMENTS_KEY, JSON.stringify(records));
  } catch {
    // Ignora falha de quota em modo privado do navegador
  }
}

export async function loadEnrollments(userId?: string): Promise<EnrollmentRecord[]> {
  const client = getSupabaseClient();

  if (client && userId) {
    try {
      const { data, error } = await client
        .from("enrollments")
        .select("id, course_id, enrolled_at, paid_price, coupon_applied, completed_module_ids")
        .eq("user_id", userId)
        .order("enrolled_at", { ascending: false });

      if (!error && data) {
        return data.map((row) => ({
          id: String(row.id),
          courseId: String(row.course_id),
          enrolledAt: String(row.enrolled_at),
          paidPrice: Number(row.paid_price),
          couponApplied: row.coupon_applied ? String(row.coupon_applied) : undefined,
          completedModuleIds: Array.isArray(row.completed_module_ids)
            ? row.completed_module_ids
            : [],
          source: "supabase",
        }));
      }
    } catch {
      // Cai para persistencia local caso a tabela ainda nao exista
    }
  }

  return readLocalEnrollments();
}

export async function createEnrollments(params: {
  userId?: string;
  items: { courseId: string; paidPrice: number }[];
  couponApplied?: string;
}): Promise<EnrollmentRecord[]> {
  const client = getSupabaseClient();
  const now = new Date().toISOString();

  if (client && params.userId) {
    try {
      const payload = params.items.map((item) => ({
        user_id: params.userId,
        course_id: item.courseId,
        paid_price: item.paidPrice,
        coupon_applied: params.couponApplied ?? null,
        completed_module_ids: [],
        enrolled_at: now,
      }));

      const { data, error } = await client
        .from("enrollments")
        .upsert(payload, { onConflict: "user_id,course_id" })
        .select("id, course_id, enrolled_at, paid_price, coupon_applied, completed_module_ids");

      if (!error && data) {
        return data.map((row) => ({
          id: String(row.id),
          courseId: String(row.course_id),
          enrolledAt: String(row.enrolled_at),
          paidPrice: Number(row.paid_price),
          couponApplied: row.coupon_applied ? String(row.coupon_applied) : undefined,
          completedModuleIds: Array.isArray(row.completed_module_ids)
            ? row.completed_module_ids
            : [],
          source: "supabase",
        }));
      }
    } catch {
      // Fallback para persistencia local
    }
  }

  const existing = readLocalEnrollments();
  const existingIds = new Set(existing.map((e) => e.courseId));
  const created: EnrollmentRecord[] = [];

  for (const item of params.items) {
    if (existingIds.has(item.courseId)) continue;
    created.push({
      id: `local-${item.courseId}-${Date.now()}`,
      courseId: item.courseId,
      enrolledAt: now,
      paidPrice: item.paidPrice,
      couponApplied: params.couponApplied,
      completedModuleIds: [],
      source: "local",
    });
  }

  const merged = [...created, ...existing];
  writeLocalEnrollments(merged);
  return merged;
}

export async function toggleEnrollmentModule(params: {
  userId?: string;
  courseId: string;
  moduleId: string;
  currentRecords: EnrollmentRecord[];
}): Promise<EnrollmentRecord[]> {
  const updated = params.currentRecords.map((record) => {
    if (record.courseId !== params.courseId) return record;
    const exists = record.completedModuleIds.includes(params.moduleId);
    const nextModules = exists
      ? record.completedModuleIds.filter((id) => id !== params.moduleId)
      : [...record.completedModuleIds, params.moduleId];
    return { ...record, completedModuleIds: nextModules };
  });

  const target = updated.find((r) => r.courseId === params.courseId);
  const client = getSupabaseClient();

  if (client && params.userId && target && target.source === "supabase") {
    try {
      await client
        .from("enrollments")
        .update({ completed_module_ids: target.completedModuleIds })
        .eq("user_id", params.userId)
        .eq("course_id", params.courseId);
    } catch {
      // Mantem estado otimista
    }
  } else {
    writeLocalEnrollments(updated);
  }

  return updated;
}
