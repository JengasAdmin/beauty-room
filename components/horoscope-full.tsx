'use client';

import { useMemo, useState } from 'react';
import { Briefcase, Coins, Heart, Leaf, Sparkles, Sun } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { getHoroscope, SIGNS } from '@/data/horoscope';

const FIELDS = [
  { key: 'love', label: 'Отношения', icon: Heart },
  { key: 'work', label: 'Работа и учёба', icon: Briefcase },
  { key: 'money', label: 'Финансы', icon: Coins },
  { key: 'mood', label: 'Настроение', icon: Sun },
  { key: 'health', label: 'Самочувствие', icon: Leaf },
  { key: 'advice', label: 'Совет дня', icon: Sparkles },
] as const;

export function HoroscopeFull() {
  const [signIndex, setSignIndex] = useState(6); // Весы — как пример по умолчанию
  const horoscope = useMemo(() => getHoroscope(signIndex), [signIndex]);

  return (
    <div id="horoscope" className="scroll-mt-20 border-y border-line bg-sand/50">
      <div className="container-x py-10 lg:py-12">
        <SectionHeading
          index="02"
          eyebrow="Гороскоп"
          title="Гороскоп на сегодня"
          subtitle="Выберите знак — остальное мы уже приготовили."
        />

        <div className="flex flex-wrap gap-2">
          {SIGNS.map((s, i) => (
            <button
              key={s}
              onClick={() => setSignIndex(i)}
              aria-pressed={i === signIndex}
              className={`btn-ring rounded-full px-4 py-2 text-sm transition-colors ${
                i === signIndex
                  ? 'bg-ink text-ivory'
                  : 'border border-line bg-white text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-serif text-2xl">{SIGNS[signIndex]}</h3>
            <span className="text-xs text-muted">
              {horoscope.date} · Обновлено сегодня
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FIELDS.map(({ key, label, icon: Icon }) => (
              <div key={key} className="card p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-clay">
                  <Icon size={15} className="text-accent" />
                  {label}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{horoscope[key]}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted/80">
          Гороскоп — развлекательный контент и не является научным или медицинским прогнозом.
        </p>
      </div>
    </div>
  );
}
