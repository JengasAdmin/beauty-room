'use client';

import { useState } from 'react';
import { CloudSun, Lightbulb, MapPin, RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { getAdvice, ADVICE_TOTAL } from '@/data/advice';
import { getHoroscope, SIGNS } from '@/data/horoscope';
import { CITIES, demoWeather } from '@/data/weather';
import { apiUrl } from '@/lib/paths';
import type { WeatherData } from '@/types';

function CardShell({
  id,
  eyebrow,
  children,
}: {
  id?: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="card scroll-mt-24 p-5 transition-shadow hover:shadow-sm">
      <div className="eyebrow">{eyebrow}</div>
      {children}
    </section>
  );
}

function WeatherCard() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  async function selectCity(city: string) {
    setPickerOpen(false);
    setLoading(true);
    setError('');
    try {
      const res = await fetch(apiUrl(`/api/weather?city=${encodeURIComponent(city)}`));
      if (!res.ok) throw new Error();
      setWeather(await res.json());
    } catch {
      // Нет серверной части (например, GitHub Pages) — показываем demo-погоду.
      setWeather(demoWeather(city));
    } finally {
      setLoading(false);
    }
  }

  const filtered = CITIES.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <CardShell id="weather" eyebrow="Погода">
      {weather ? (
        <>
          <div className="mt-3 flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <MapPin size={14} className="text-accent" />
              {weather.city}
              {weather.demo && <span className="text-xs text-muted/70">· demo</span>}
            </div>
            <div className="text-right">
              <div className="font-serif text-4xl leading-none">{weather.temp}°</div>
              <div className="mt-1 text-xs text-muted">{weather.condition}</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted">
            <span>Ощущается: {weather.feels}°</span>
            <span>Осадки: {weather.precip}%</span>
            <span>Влажность: {weather.humidity}%</span>
            <span>Ветер: {weather.wind} км/ч</span>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5 border-t border-line pt-3">
            {weather.daily.slice(0, 5).map((d) => (
              <div key={d.date} className="text-center">
                <div className="text-[11px] capitalize text-muted">{d.date.split(',')[0]}</div>
                <div className="text-xs font-medium">{d.max}°</div>
                <div className="text-[11px] text-muted">{d.min}°</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {loading ? (
            'Загружаем погоду…'
          ) : error ? (
            <span className="text-ink">{error}</span>
          ) : (
            'Выберите город — покажем температуру, осадки и прогноз на несколько дней.'
          )}
        </p>
      )}
      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        onClick={() => setPickerOpen(true)}
        disabled={loading}
      >
        {weather ? 'Изменить город' : 'Выбрать город'}
      </Button>

      <Modal open={pickerOpen} onClose={() => setPickerOpen(false)} title="Выбор города">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className="field pl-9"
            placeholder="Введите город…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Поиск города"
          />
        </div>
        <ul className="mt-3 space-y-1">
          {filtered.length === 0 && (
            <li className="rounded-lg bg-sand px-3 py-2.5 text-sm text-muted">
              Ничего не найдено. Попробуйте ближайший крупный город.
            </li>
          )}
          {filtered.map((c) => (
            <li key={c.name}>
              <button
                className="btn-ring w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-sand"
                onClick={() => selectCity(c.name)}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </CardShell>
  );
}

function HoroscopeCard() {
  const [signIndex, setSignIndex] = useState<number | null>(null);

  return (
    <CardShell id="today-horoscope" eyebrow="Гороскоп">
      {signIndex === null ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Выберите свой знак — и получите прогноз на сегодня по любви, работе и самочувствию.
        </p>
      ) : (
        <>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-2xl">{SIGNS[signIndex]}</span>
            <span className="text-xs text-muted">· ваш прогноз на сегодня</span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
            {getHoroscope(signIndex).mood}
          </p>
        </>
      )}
      <div className="mt-4 flex gap-2">
        <select
          aria-label="Знак зодиака"
          className="field h-9 flex-1 text-sm"
          value={signIndex ?? ''}
          onChange={(e) => setSignIndex(e.target.value === '' ? null : Number(e.target.value))}
        >
          <option value="">Выберите знак…</option>
          {SIGNS.map((s, i) => (
            <option key={s} value={i}>
              {s}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          className="h-9 px-4"
          onClick={() => document.getElementById('horoscope')?.scrollIntoView({ behavior: 'smooth' })}
          disabled={signIndex === null}
        >
          Открыть
        </Button>
      </div>
    </CardShell>
  );
}

function AdviceCard() {
  const [index, setIndex] = useState(new Date().getDate() % ADVICE_TOTAL);

  return (
    <CardShell eyebrow="Совет дня">
      <div className="mt-3 flex gap-3">
        <span className="card flex h-10 w-10 shrink-0 items-center justify-center !rounded-lg border-nude bg-sand">
          <Lightbulb size={18} className="text-accent" />
        </span>
        <p className="text-sm leading-relaxed text-ink">{getAdvice(index)}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        onClick={() => setIndex((i) => (i + 1) % ADVICE_TOTAL)}
      >
        <RefreshCw size={14} />
        Ещё совет
      </Button>
    </CardShell>
  );
}

export function TodayForYou() {
  return (
    <div id="today" className="container-x scroll-mt-20 py-10 lg:py-12">
      <div className="mb-7 flex items-center gap-3">
        <span className="text-xs tabular-nums text-muted">01</span>
        <span className="eyebrow">Сегодня</span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>
      <h2 className="mb-6 font-serif text-3xl sm:text-4xl">Сегодня для тебя</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <WeatherCard />
        <HoroscopeCard />
        <AdviceCard />
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted">
        <CloudSun size={14} className="shrink-0" />
        Погода и гороскоп носят информационно-развлекательный характер.
      </p>
    </div>
  );
}
