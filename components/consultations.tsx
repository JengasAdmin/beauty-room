'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Crown, ImagePlus, Send, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import {
  CONTACT_METHODS,
  FORMATS,
  SERVICES,
  TARIFFS,
} from '@/data/consultations';
import { cn } from '@/lib/utils';

interface Confirmation {
  id: string;
  service: string;
  tariff: string;
  format: string;
  price: string;
}

const STEP_TITLES = ['Направление', 'Формат', 'Описание', 'Материалы', 'Контакты'];

export function Consultations() {
  const [tariff, setTariff] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [service, setService] = useState('');
  const [format, setFormat] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState<string>(CONTACT_METHODS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const selectedTariff = TARIFFS.find((t) => t.id === tariff);

  function stepValid(): boolean {
    if (step === 0) return !!service;
    if (step === 1) return !!format;
    if (step === 2) return description.trim().length >= 20;
    if (step === 3) return true;
    return !!name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function next() {
    if (!stepValid()) {
      setError('Заполните текущий шаг, чтобы продолжить.');
      return;
    }
    setError('');
    setStep((s) => Math.min(s + 1, 4));
  }

  async function submit() {
    if (!stepValid() || !tariff || !selectedTariff) {
      setError('Проверьте заполнение полей.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          tariff,
          format,
          description,
          attachments: files,
          name,
          email,
          contact,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Ошибка отправки');
      setConfirmation({
        id: data.id,
        service: SERVICES.find((s) => s.id === service)?.title ?? service,
        tariff: selectedTariff.name,
        format: FORMATS.find((f) => f.id === format)?.title ?? format,
        price: selectedTariff.price,
      });
      document.getElementById('consultations')?.scrollIntoView({ behavior: 'smooth' });
    } catch {
      // Нет серверной части (например, GitHub Pages) — demo-подтверждение на клиенте.
      setConfirmation({
        id: `BR-DEMO-${Date.now().toString(36).toUpperCase()}`,
        service: SERVICES.find((s) => s.id === service)?.title ?? service,
        tariff: selectedTariff.name,
        format: FORMATS.find((f) => f.id === format)?.title ?? format,
        price: selectedTariff.price,
      });
      document.getElementById('consultations')?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  }

  function resetAll() {
    setConfirmation(null);
    setStep(0);
    setService('');
    setFormat('');
    setDescription('');
    setFiles([]);
    setName('');
    setEmail('');
    setContact(CONTACT_METHODS[0]);
    setTariff(null);
  }

  const chip = (activeState: boolean) =>
    cn(
      'btn-ring rounded-full px-3.5 py-1.5 text-xs transition-colors',
      activeState
        ? 'bg-ink text-ivory'
        : 'border border-line bg-white text-muted hover:border-ink/40 hover:text-ink'
    );

  return (
    <div id="consultations" className="scroll-mt-20 border-y border-line bg-sand/50">
      <div className="container-x py-10 lg:py-12">
        <SectionHeading
          index="07"
          eyebrow="Консультации"
          title="Персональные консультации"
          subtitle="Индивидуальные рекомендации от специалиста — с учётом вашей ситуации и целей."
        />

        {confirmation ? (
          <div className="card mx-auto max-w-xl p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15">
              <Check size={22} className="text-accent" />
            </div>
            <h3 className="mt-4 font-serif text-2xl">Заявка отправлена</h3>
            <p className="mt-1 text-sm text-muted">Номер заявки: {confirmation.id}</p>
            <dl className="mt-5 space-y-2 rounded-lg border border-line bg-ivory/60 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Услуга</dt>
                <dd className="text-right font-medium">{confirmation.service}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Тариф</dt>
                <dd className="text-right font-medium">{confirmation.tariff}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Формат</dt>
                <dd className="text-right font-medium">{confirmation.format}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-2">
                <dt className="text-muted">Стоимость</dt>
                <dd className="text-right font-serif text-lg">{confirmation.price}</dd>
              </div>
            </dl>
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-clay">
              <ShieldCheck size={16} className="text-accent" />
              Статус: ожидает подтверждения специалистом
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Оплата будет доступна после подтверждения консультации специалистом. Ссылка на
              видеоконсультацию (для тарифа Premium) будет предоставлена после подтверждения заявки.
            </p>
            <Button className="mt-5 w-full" onClick={resetAll}>
              Вернуться в Beauty Room
            </Button>
          </div>
        ) : (
          <>
            {/* Услуги */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setService(s.id)}
                  aria-pressed={service === s.id}
                  className={cn(
                    'card btn-ring p-5 text-left transition-all',
                    service === s.id && 'border-accent shadow-sm'
                  )}
                >
                  <h3 className="font-serif text-lg leading-snug">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.description}</p>
                </button>
              ))}
            </div>

            {/* Тарифы */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TARIFFS.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    'card relative flex flex-col p-5',
                    t.featured && 'border-ink',
                    tariff === t.id && 'border-accent shadow-md'
                  )}
                >
                  {t.featured && (
                    <span className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ivory">
                      <Crown size={10} />
                      Premium
                    </span>
                  )}
                  <h3 className="font-serif text-xl">{t.name}</h3>
                  <p className="mt-0.5 text-xs text-muted">{t.tagline}</p>
                  <p className="mt-3 font-serif text-3xl">{t.price}</p>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                        <Check size={13} className="mt-0.5 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={t.id === tariff ? 'primary' : 'outline'}
                    size="sm"
                    className="mt-5 w-full"
                    onClick={() => {
                      setTariff(t.id);
                      document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t.id === tariff ? 'Тариф выбран' : 'Выбрать тариф'}
                  </Button>
                </div>
              ))}
            </div>

            {/* Форма */}
            <div id="consultation-form" className="card mt-10 scroll-mt-24 p-5 sm:p-8">
              <h3 className="font-serif text-2xl">Заявка на консультацию</h3>
              <p className="mt-1 text-sm text-muted">
                {selectedTariff
                  ? `Тариф: ${selectedTariff.name} · ${selectedTariff.price}`
                  : 'Выберите тариф выше — он будет прикреплён к заявке.'}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5" aria-hidden="true">
                {STEP_TITLES.map((t, i) => (
                  <span
                    key={t}
                    className={cn(
                      'rounded-full px-3 py-1 text-[11px]',
                      i === step
                        ? 'bg-ink text-ivory'
                        : i < step
                          ? 'bg-accent/15 text-clay'
                          : 'bg-sand text-muted/70'
                    )}
                  >
                    {i + 1}. {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 min-h-52">
                {step === 0 && (
                  <div>
                    <p className="text-sm font-medium">Шаг 1. Выберите направление</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SERVICES.map((s) => (
                        <button key={s.id} onClick={() => setService(s.id)} className={chip(service === s.id)}>
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <p className="text-sm font-medium">Шаг 2. Выберите формат</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {FORMATS.map((f) => (
                        <button key={f.id} onClick={() => setFormat(f.id)} className={chip(format === f.id)}>
                          {f.title}
                        </button>
                      ))}
                    </div>
                    {format === 'video' && tariff !== 'premium' && (
                      <p className="mt-3 text-xs leading-relaxed text-muted">
                        Видеоконсультация входит в тариф Premium. Ссылка на встречу будет
                        предоставлена после подтверждения заявки.
                      </p>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <label htmlFor="description" className="text-sm font-medium">
                      Шаг 3. Опишите ситуацию
                    </label>
                    <textarea
                      id="description"
                      className="field mt-3 h-32 resize-none py-3"
                      placeholder="Опишите ваш вопрос, цель или ситуацию как можно подробнее…"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="mt-1.5 text-xs text-muted">
                      Минимум 20 символов. Чем подробнее, тем точнее рекомендации.
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="text-sm font-medium">Шаг 4. Дополнительные материалы</p>
                    <label
                      htmlFor="files"
                      className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line bg-ivory/60 px-4 py-8 text-center transition-colors hover:border-accent"
                    >
                      <ImagePlus size={22} className="text-accent" />
                      <span className="text-sm text-muted">
                        Прикрепить фотографии (фото волос или кожи, если уместно)
                      </span>
                      <span className="text-xs text-muted/70">Demo-режим: файлы не отправляются</span>
                    </label>
                    <input
                      id="files"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) =>
                        setFiles(Array.from(e.target.files ?? []).map((f) => f.name))
                      }
                    />
                    {files.length > 0 && (
                      <p className="mt-2 text-xs text-clay">Выбрано: {files.join(', ')}</p>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <p className="text-sm font-medium">Шаг 5. Контакты</p>
                    <p className="mt-1 text-xs text-muted">Регистрация не нужна.</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <label className="flex flex-col gap-1 text-xs text-muted">
                        Имя *
                        <input
                          className="field"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ваше имя"
                        />
                      </label>
                      <label className="flex flex-col gap-1 text-xs text-muted">
                        Email *
                        <input
                          className="field"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                        />
                      </label>
                      <label className="flex flex-col gap-1 text-xs text-muted">
                        Предпочтительный способ связи
                        <select
                          className="field"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        >
                          {CONTACT_METHODS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {error && <p className="text-sm text-clay">{error}</p>}

              <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                <Button
                  variant="ghost"
                  disabled={step === 0}
                  onClick={() => {
                    setError('');
                    setStep((s) => Math.max(s - 1, 0));
                  }}
                >
                  <ArrowLeft size={15} />
                  Назад
                </Button>
                {step < 4 ? (
                  <Button onClick={next}>
                    Далее
                    <ArrowRight size={15} />
                  </Button>
                ) : (
                  <Button onClick={submit} disabled={submitting || !tariff}>
                    <Send size={15} />
                    {submitting ? 'Отправляем…' : 'Отправить заявку'}
                  </Button>
                )}
              </div>
              {step === 4 && !tariff && (
                <p className="mt-2 text-right text-xs text-muted">Выберите тариф, чтобы отправить заявку.</p>
              )}
            </div>
          </>
        )}

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted/80">
          Информация на сайте носит информационный характер и не заменяет консультацию врача или
          другого профильного специалиста. Мы не обещаем гарантированных результатов.
        </p>
      </div>
    </div>
  );
}
