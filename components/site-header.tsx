'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Sparkles, X } from 'lucide-react';
import { useChat } from '@/lib/chat-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '#top', label: 'Главная' },
  { href: '#form', label: 'Форма' },
  { href: '#horoscope', label: 'Гороскоп' },
  { href: '#weather', label: 'Погода' },
  { href: '#beauty30', label: 'Красота' },
  { href: '#hair', label: 'Волосы' },
  { href: '#consultations', label: 'Консультации' },
  { href: '#ai', label: 'AI' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { setOpen: setChatOpen } = useChat();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link
          href="#top"
          className="btn-ring rounded font-serif text-lg tracking-[0.18em] uppercase"
          onClick={() => setOpen(false)}
        >
          Beauty&nbsp;Room
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setChatOpen(true)} className="hidden sm:inline-flex">
            <Sparkles size={15} />
            AI-помощник
          </Button>
          <button
            className="btn-ring rounded-lg p-2 hover:bg-sand lg:hidden"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden border-line transition-all duration-300 lg:hidden',
          open ? 'max-h-[36rem] border-t' : 'max-h-0'
        )}
      >
        <nav aria-label="Мобильная навигация" className="container-x flex flex-col py-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-[15px] text-ink transition-colors hover:bg-sand"
            >
              {l.label}
            </a>
          ))}
          <Button
            size="md"
            className="mt-2 mb-3"
            onClick={() => {
              setOpen(false);
              setChatOpen(true);
            }}
          >
            <Sparkles size={15} />
            AI-помощник
          </Button>
        </nav>
      </div>
    </header>
  );
}
