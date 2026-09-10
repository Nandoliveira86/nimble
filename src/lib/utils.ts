import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function hoursAgo(hours: number) {
  return new Date(Date.now() - hours * 3600_000).toISOString();
}

export function daysAgo(days: number) {
  return hoursAgo(days * 24);
}

export function formatHoursPlayed(hours: number) {
  if (hours < 1) return "Less than 1 hour";
  if (hours === 1) return "1 hour played";
  const rounded = hours % 1 === 0 ? hours.toFixed(0) : hours.toFixed(1);
  return `${rounded} hours played`;
}

export function formatSessionClock(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatLastPlayed(iso: string | null) {
  if (!iso) return "Never played";
  const delta = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(0, Math.floor(delta / 60000));
  if (minutes < 2) return "Just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 14) return `${days} days ago`;
  return "A while ago";
}
