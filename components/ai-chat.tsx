'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { demoReply } from '@/lib/demo-chat';
import { useChat } from '@/lib/chat-context';
import { apiUrl } from '@/lib/paths';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const EXAMPLES = [
  'Как ухаживать за сухими волосами?',
  'Как составить простой уход за кожей?',
  'Что делать после осветления волос?',
  'Какие лёгкие упражнения можно делать дома?',
];

const GREETING: Message = {
  role: 'assistant',
  content:
    'Здравствуйте! Я — Beauty AI, ваш персональный помощник Beauty Room. Задайте вопрос о красоте, уходе, волосах или образе жизни. 💛',
};

export function AiSection() {
  const { setOpen } = useChat();

  return (
    <div id="ai" className="container-x scroll-mt-20 py-10 lg:py-12">
      <SectionHeading index="08" eyebrow="Beauty AI" title="Beauty AI" />
      <div className="card flex flex-col items-start gap-5 bg-ink p-6 text-ivory sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h3 className="font-serif text-2xl">Ваш персональный AI-помощник</h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-ivory/70">
            Задай вопрос о красоте, уходе, волосах или образе жизни — ответим в контексте Beauty
            Room.
          </p>
        </div>
        <Button variant="accent" size="lg" onClick={() => setOpen(true)} className="shrink-0">
          <Sparkles size={16} />
          Открыть AI
        </Button>
      </div>
    </div>
  );
}

export function AiChatModal() {
  const { open, setOpen } = useChat();
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
  }, [open, setOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(apiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      if (typeof data.demo === 'boolean') setDemo(data.demo);
    } catch {
      // Нет серверной части (например, GitHub Pages) — отвечаем demo-движком на клиенте.
      setDemo(true);
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: demoReply(trimmed) },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Beauty AI чат">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative flex h-[92vh] w-full flex-col overflow-hidden bg-white shadow-xl sm:h-[80vh] sm:max-w-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-line bg-ink px-5 py-4 text-ivory">
          <div>
            <div className="font-serif text-lg leading-tight">Beauty AI</div>
            <div className="text-xs text-ivory/60">Ваш персональный AI-помощник</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Закрыть чат"
            className="btn-ring rounded-lg p-1.5 text-ivory/70 hover:bg-ivory/10 hover:text-ivory"
          >
            <X size={18} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) => (
            <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                  m.role === 'user'
                    ? 'rounded-br-md bg-ink text-ivory'
                    : 'rounded-bl-md bg-ivory text-ink'
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-ivory px-4 py-3">
                <span className="flex gap-1" aria-label="Beauty AI печатает">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-clay"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => send(ex)}
                className="btn-ring rounded-full border border-line bg-white px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-ink"
              >
                {ex}
              </button>
            ))}
          </div>
        )}

        <form
          className="flex gap-2 border-t border-line p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            className="field"
            placeholder="Напишите свой вопрос…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Сообщение для Beauty AI"
          />
          <Button type="submit" size="md" disabled={loading || !input.trim()} aria-label="Отправить">
            <Send size={16} />
          </Button>
        </form>

        <p className="border-t border-line bg-ivory px-4 py-2 text-center text-[11px] text-muted/80">
          {demo ? 'Demo-режим: подготовленные ответы Beauty Room.' : 'Ответы генерирует AI.'}{' '}
          Информация не заменяет консультацию врача.
        </p>
      </div>
    </div>
  );
}
