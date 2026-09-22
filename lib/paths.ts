// Базовый путь учтён для GitHub Pages (проект живёт в /beauty-room).
// В обычном (серверном) режиме и на Vercel база пустая.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// На статическом хостинге (GitHub Pages) API-роутов нет — запросы уходят
// на серверный бэкенд (Vercel). В серверном режиме используется свой /api.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}
