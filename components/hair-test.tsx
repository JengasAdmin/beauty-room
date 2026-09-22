'use client';

import { useState } from 'react';
import { Lock, ShieldAlert, UserRoundCheck } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { getHairPlan, HAIR_QUESTIONS } from '@/data/hairCare';
import { cn } from '@/lib/utils';

export function HairTest() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ReturnType<typeof getHairPlan> | null>(null);

  const answeredAll = HAIR_QUESTIONS.every((q) => answers[q.id] !== undefined);
  const score = Object.values(answers).reduce((a, b) => a + b, 0);

  function submit() {
    if (!answeredAll) return;
    setResult(getHairPlan(score));
    setTimeout(
      () => document.getElementById('hair-result')?.scrollIntoView({ behavior: 'smooth' }),
      50
    );
  }

  return (
    <div id="hair" className="scroll-mt-20 border-y border-line bg-sand/50">
      <div className="container-x py-10 lg:py-12">
        <SectionHeading
          index="06"
          eyebrow="Волосы"
          title="Восстановление волос после обесцвечивания"
          subtitle="Разберём состояние волос и соберём понятный план ухода."
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="space-y-3">
            {HAIR_QUESTIONS.map((q, qi) => (
              <fieldset key={q.id} className="card p-4 sm:p-5">
                <legend className="text-sm font-medium">
                  <span className="mr-2 text-xs tabular-nums text-accent">
                    {String(qi + 1).padStart(2, '0')}
                  </span>
                  {q.question}
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      aria-pressed={answers[q.id] === o.score}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.score }))}
                      className={cn(
                        'btn-ring rounded-full px-3.5 py-1.5 text-xs transition-colors',
                        answers[q.id] === o.score
                          ? 'bg-ink text-ivory'
                          : 'border border-line bg-white text-muted hover:border-ink/40 hover:text-ink'
                      )}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <aside className="card sticky top-20 h-fit p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
              Прогресс
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-sand" role="presentation">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{
                  width: `${(Object.keys(answers).length / HAIR_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">
              Отвечено {Object.keys(answers).length} из {HAIR_QUESTIONS.length}
            </p>
            <Button className="mt-4 w-full" disabled={!answeredAll} onClick={submit}>
              Собрать план
            </Button>
            {!answeredAll && <p className="mt-2 text-center text-xs text-muted">Ответьте на все вопросы</p>}
          </aside>
        </div>

        {result && (
          <div id="hair-result" className="mt-8 scroll-mt-24">
            <div className="card p-5 sm:p-8">
              <h3 className="font-serif text-2xl sm:text-3xl">Ваш план восстановления</h3>
              <p className="mt-1 text-sm text-accent">{result.tierLabel}</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{result.intro}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {result.steps.map((s) => (
                  <div key={s.title} className="rounded-lg border border-line bg-ivory/60 p-4">
                    <h4 className="text-sm font-semibold text-clay">{s.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-nude bg-sand p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-clay">
                    <Lock size={15} className="text-accent" />
                    Что лучше временно ограничить
                  </h4>
                  <ul className="mt-3 space-y-1.5">
                    {result.restrictions.map((r) => (
                      <li key={r} className="text-sm leading-relaxed text-muted">
                        — {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-line bg-white p-5">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-clay">
                    <UserRoundCheck size={15} className="text-accent" />
                    Когда стоит обратиться к специалисту
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{result.specialist}</p>
                </div>
              </div>

              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted/80">
                <ShieldAlert size={14} className="mt-0.5 shrink-0" />
                План носит информационный характер. Мы не обещаем гарантированное восстановление и не
                заменяем консультацию трихолога или врача при проблемах с кожей головы.
              </p>

              <Button variant="outline" className="mt-5" onClick={() => { setResult(null); setAnswers({}); }}>
                Пройти тест заново
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
