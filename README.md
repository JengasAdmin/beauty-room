# BEAUTY ROOM

Современное пространство о красоте, уходе и заботе о себе: Beauty Journal, интерактивные тесты, гороскоп, погода, Beauty AI и персональные консультации.

**Стек:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

## Режимы работы

| Функция | С ключами / сервером | Без (demo mode) |
|---|---|---|
| Beauty AI (`/api/chat`) | DeepSeek или YandexGPT | заготовленные ответы по темам Beauty Room |
| Погода (`/api/weather`) | Open-Meteo (без ключа) | demo-данные |
| Заявки (`/api/consultations`) | сохранение (Perspective: PostgreSQL/Prisma) | подтверждение заявки без сохранения |
| Оплата (`/api/payment`) | ЮKassa / CloudPayments / Stripe (будущее) | «оплата после подтверждения» |

## DeepSeek (AI-помощник)

1. Получите ключ на [platform.deepseek.com](https://platform.deepseek.com) → API Keys (аккаунт требует пополнения баланса, но сам API очень дешёвый).
2. Создайте `.env.local` (или отредактируйте существующий):

```
AI_PROVIDER=deepseek
AI_API_KEY=sk-ваш-ключ
AI_MODEL=deepseek-chat
```

3. Перезапустите `npm run dev`.

### Бесплатный вариант (OpenRouter)

Не хотите платить — используйте бесплатные модели [openrouter.ai](https://openrouter.ai)
(регистрация бесплатная, лимит ~50 запросов/сутки на `:free`-моделях):

```
AI_PROVIDER=openrouter
AI_API_KEY=sk-or-v1-ваш-ключ
OPENROUTER_MODEL=qwen/qwen3.8-27b:free
```

Или оставьте DeepSeek основным, а OpenRouter — бесплатным запасным: задайте только
`OPENROUTER_API_KEY`, и при недоступности основного провайдера (нет баланса и т.п.)
чат автоматически переключится на бесплатную модель.

Ключ хранится только на сервере в `.env.local` и не попадает в клиентский код.
Без ключей чат работает в demo-режиме. Если AI-провайдер недоступен, сервер автоматически
возвращается к demo-ответам — сайт не ломается.

## Деплой

- **GitHub Pages (статика, demo-режим):** push в `main` → workflow `.github/workflows/deploy-pages.yml`
  соберёт сайт командой `npm run build:pages` (скрипт временно выносит `app/api`, строит
  статику с `output: 'export'` и basePath `/beauty-room`, затем возвращает API-роуты).
  Клиентские fallback-и позволяют чату, погоде и форме работать без сервера.
- **Vercel (полный режим с DeepSeek):** импортируйте репозиторий в Vercel,
  добавьте переменные `AI_PROVIDER=deepseek` и `AI_API_KEY` в Environment Variables —
  API-роуты заработают как serverless-функции.

## Структура

```
app/            страницы и API-роуты (chat, weather, consultations, payment)
components/     UI-компоненты разделов
data/           demo-контент (статьи, гороскоп, упражнения, тарифы…)
lib/            утилиты, AI-провайдеры, demo-движок чата
types/          общие TypeScript-типы
```

## Дисклеймеры

Информация на сайте носит информационный характер и не заменяет консультацию врача
или другого профильного специалиста. Гороскоп — развлекательный контент. Реальная оплата
на первом этапе не подключена.
