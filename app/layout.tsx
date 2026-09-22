import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Beauty Room — красота, уход и вдохновение',
  description:
    'Beauty Room — современное пространство о красоте, уходе за собой, волосах, лёгкой активности и персональных рекомендациях.',
  openGraph: {
    title: 'Beauty Room — красота, уход и вдохновение',
    description:
      'Уход, волосы, лёгкая активность, вдохновение и персональные рекомендации — в одном пространстве.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Beauty Room',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
