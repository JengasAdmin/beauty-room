'use client';

import { useState } from 'react';
import { Dumbbell, RotateCcw, Timer } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { buildProgram, GOALS, LEVELS, SPACES, TIMES } from '@/data/workouts';
import type { WorkoutProgram } from '@/types';

export function Fitness() {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [time, setTime] = useState('');
  const [space, setSpace] = useState('');
  const [nonce, setNonce] = useState(0);
  const [program, setProgram] = useState<WorkoutProgram | null>(null);
  const [error, setError] = useState('');

  const ready = goal && level && time && space;

  function generate() {
    if (!ready) {
      setError('Выберите все параметры — и программа соберётся сама.');
      return;
    }
    setError('');
    setProgram(
      buildProgram(goal, Number(level), Number(time), space, nonce + Date.now() % 1000)
    );
  }

  function regenerate() {
    setNonce((n) => n + 1);
    if (ready) {
      setProgram(
        buildProgram(goal, Number(level), Number(time), space, nonce + 1 + Date.now() % 1000)
      );
    }
  }

  const selectClass =
    'field h-10 flex-1 min-w-[130px] text-sm';

  return (
    <div id="form" className="container-x scroll-mt-20 py-10 lg:py-12">
      <SectionHeading
        index="03"
        eyebrow="Форма"
        title="Привести себя в форму — без изнурительных тренировок"
        subtitle="Небольшие домашние активности, которые легко встроить в обычный день."
      />

      <div className="card p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-clay">
            Цель
            <select className={selectClass} value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="">Выберите…</option>
              {GOALS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-clay">
            Уровень
            <select className={selectClass} value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">Выберите…</option>
              {LEVELS.map((l) => (
                <option key={l.id} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-clay">
            Время
            <select className={selectClass} value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">Выберите…</option>
              {TIMES.map((t) => (
                <option key={t} value={t}>
                  {t} минут
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-clay">
            Пространство
            <select className={selectClass} value={space} onChange={(e) => setSpace(e.target.value)}>
              <option value="">Выберите…</option>
              {SPACES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button onClick={generate}>
            <Dumbbell size={15} />
            Сформировать программу
          </Button>
          {program && (
            <Button variant="outline" onClick={regenerate}>
              <RotateCcw size={14} />
              Сформировать новую программу
            </Button>
          )}
        </div>
        {error && <p className="mt-3 text-sm text-clay">{error}</p>}

        {program && (
          <div className="mt-6 border-t border-line pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-2xl">{program.title}</h3>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <Timer size={13} />
                {program.summary}
              </span>
            </div>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {program.exercises.map((ex, i) => (
                <li key={`${ex.name}-${i}`} className="rounded-lg border border-line bg-ivory/60 p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">
                      {i + 1}. {ex.name}
                    </span>
                    <span className="shrink-0 text-xs text-accent">{ex.duration}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{ex.instruction}</p>
                  <span className="mt-2 inline-block rounded-full bg-sand px-2 py-0.5 text-[11px] text-clay">
                    Сложность: {ex.level === 1 ? 'лёгкая' : ex.level === 2 ? 'средняя' : 'выше средней'}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-muted/80">
              Двигайтесь в комфортном темпе и без боли. Программа носит информационный характер и не
              заменяет консультацию врача или другого профильного специалиста.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
