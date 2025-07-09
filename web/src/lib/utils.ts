import { format } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateBR(date: string | Date | null | undefined): string {
  if (!date) return "-";

  try {
    if (date instanceof Date) return format(date, "dd/MM/yyyy");

    return format(new Date(date), "dd/MM/yyyy");
  } catch (error) {
    console.error(error);
    return "-";
  }
}
