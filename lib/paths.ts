// Базовый путь учтён для GitHub Pages (проект живёт в /beauty-room).
// В обычном (серверном) режиме и на Vercel база пустая.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function apiUrl(path: string): string {
  return `${BASE_PATH}${path}`;
}
