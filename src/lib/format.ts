// Utilitarios de formatacao monetaria, descontos e carga horaria

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export function formatBRL(value: number): string {
  return brlFormatter.format(value);
}

export function getDiscountPercent(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function isOnSale(price: number, originalPrice?: number): boolean {
  return Boolean(originalPrice && originalPrice > price);
}

export function formatHours(hours: number): string {
  return `${hours}h`;
}

export function formatCourseCount(count: number): string {
  return count === 1 ? "1 curso" : `${count} cursos`;
}
