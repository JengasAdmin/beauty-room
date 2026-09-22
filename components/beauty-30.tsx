'use client';

import { useState } from 'react';
import { ClipboardList, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import {
  BEAUTY30_CATEGORIES,
  getBeauty30Recommendations,
  QUIZ_QUESTIONS,
  type QuizAnswers,
} from '@/data/beautyAfter30';
import { cn } from '@/lib/utils';

export function BeautyThirty() {
  const [cat, setCat] = useState(BEAUTY30_CATEGORIES[0].id);
  const [quizOpen, setQuizOpen] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = QUIZ_QUESTIONS.every((q) => answers[q.id]);
  const recs = submitted ? getBeauty30Recommendations(answers) : [];

  return (
    <div id="beauty30" className="container-x scroll-mt-20 py-10 lg:py-12">
      <SectionHeading
        index="05"
        eyebrow="Красота после 30"
        title="Красота после 30"
        subtitle="Уход становится не сложнее — он становится более осознанным."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {BEAUTY30_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={c.id === cat}
                className={cn(
                  'btn-ring rounded-full px-3.5 py-1.5 text-xs transition-colors',
                  c.id === cat
                    ? 'bg-ink text-ivory'
                    : 'border border-line bg-white text-muted hover:border-ink/40 hover:text-ink'
                )}
              >
                {c.title}
              </button>
            ))}
          </div>
          {BEAUTY30_CATEGORIES.filter((c) => c.id === cat).map((c) => (
            <div key={c.id} className="card p-5 sm:p-6">
              <h3 className="font-serif text-2xl">{c.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{c.text}</p>
              <p className="mt-3 text-xs text-muted/80">
                Информация носит информационный характер и не заменяет консультацию врача или
                косметолога.
              </p>
            </div>
          ))}
        </div>

        <aside className="card h-fit bg-sand/70 p-5">
          <ClipboardList size={22} className="text-accent" />
          <h3 className="mt-3 font-serif text-xl">Подобрать рекомендации</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Шесть коротких вопросов — и мы соберём информационные рекомендации по уходу с учётом
            ваших ответов.
          </p>
          <Button
            className="mt-4 w-full"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
              setQuizOpen(true);
            }}
          >
            <Sparkles size={15} />
            Пройти подбор
          </Button>
        </aside>
      </div>

      <Modal open={quizOpen} onClose={() => setQuizOpen(false)} title="Подобрать рекомендации">
        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q) => (
            <fieldset key={q.id}>
              <legend className="mb-1.5 text-sm font-medium">{q.question}</legend>
              <div className="flex flex-wrap gap-2">
                {q.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={answers[q.id] === o}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: o }))}
                    className={cn(
                      'btn-ring rounded-full px-3.5 py-1.5 text-xs transition-colors',
                      answers[q.id] === o
                        ? 'bg-ink text-ivory'
                        : 'border border-line bg-white text-muted hover:border-ink/40 hover:text-ink'
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}

          {!submitted ? (
            <>
              <Button className="w-full" disabled={!allAnswered} onClick={() => setSubmitted(true)}>
                Показать рекомендации
              </Button>
              {!allAnswered && (
                <p className="text-center text-xs text-muted">Ответьте на все вопросы</p>
              )}
            </>
          ) : (
            <div className="space-y-3">
              {recs.map((r) => (
                <div key={r.title} className="rounded-lg border border-line bg-ivory/60 p-4">
                  <h4 className="text-sm font-semibold text-clay">{r.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{r.text}</p>
                </div>
              ))}
              <p className="rounded-lg bg-sand px-4 py-3 text-xs leading-relaxed text-muted">
                Рекомендации носят информационный характер, не являются диагнозом или назначением и
                не заменяют консультацию врача или косметолога.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                }}
              >
                Пройти заново
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
