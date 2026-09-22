export const BEAUTY_AI_SYSTEM_PROMPT =
  'Ты — Beauty Room AI, цифровой помощник по вопросам красоты, ухода за собой, волос, лёгкой физической активности и lifestyle. ' +
  'Отвечай тепло, профессионально и по делу, в контексте Beauty Room. ' +
  'Ты не ставишь медицинские диагнозы, не назначаешь лекарства и не выдаёшь опасные рекомендации. ' +
  'Ты не заменяешь врача или другого специалиста: если вопрос требует медицинского заключения, мягко посоветуй обратиться к профильному специалисту. ' +
  'Не обещай гарантированных результатов. Отвечай на русском языке, кратко и структурированно.';

export { demoReply } from '@/lib/demo-chat';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function getProvider(): { provider: string; apiKey?: string } {
  const provider = process.env.AI_PROVIDER || 'demo';
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey || provider === 'demo') return { provider: 'demo' };
  return { provider, apiKey };
}

export async function callDeepSeek(
  apiKey: string,
  messages: ChatMessage[]
): Promise<string | null> {
  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'deepseek-chat',
        messages: [{ role: 'system', content: BEAUTY_AI_SYSTEM_PROMPT }, ...messages],
        max_tokens: 800,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) {
      console.warn(
        `[Beauty AI] DeepSeek ответил ${res.status}: ${await res.text().catch(() => 'нет деталей')}`
      );
      return null;
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === 'string' && text.trim() ? text : null;
  } catch (e) {
    console.warn('[Beauty AI] DeepSeek недоступен:', e instanceof Error ? e.message : e);
    return null;
  }
}

export async function callYandexGPT(
  apiKey: string,
  messages: ChatMessage[]
): Promise<string | null> {
  const folderId = process.env.YC_FOLDER_ID;
  if (!folderId) return null;
  try {
    const res = await fetch(
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Api-Key ${apiKey}`,
        },
        body: JSON.stringify({
          modelUri: `gpt://${folderId}/yandexgpt-lite`,
          completionOptions: { temperature: 0.7, maxTokens: 800 },
          messages: [
            { role: 'system', text: BEAUTY_AI_SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, text: m.content })),
          ],
        }),
        signal: AbortSignal.timeout(20000),
      }
    );
    if (!res.ok) {
      console.warn(`[Beauty AI] YandexGPT ответил ${res.status}`);
      return null;
    }
    const data = await res.json();
    const text = data?.result?.alternatives?.[0]?.message?.text;
    return typeof text === 'string' && text.trim() ? text : null;
  } catch (e) {
    console.warn('[Beauty AI] YandexGPT недоступен:', e instanceof Error ? e.message : e);
    return null;
  }
}

// Бесплатный тариф OpenRouter (модели с суффиксом :free) — запасной AI без оплаты.
export async function callOpenRouter(
  apiKey: string,
  messages: ChatMessage[]
): Promise<string | null> {
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Beauty Room',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'qwen/qwen3.8-27b:free',
        messages: [{ role: 'system', content: BEAUTY_AI_SYSTEM_PROMPT }, ...messages],
        max_tokens: 800,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) {
      console.warn(
        `[Beauty AI] OpenRouter ответил ${res.status}: ${await res.text().catch(() => 'нет деталей')}`
      );
      return null;
    }
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === 'string' && text.trim() ? text : null;
  } catch (e) {
    console.warn('[Beauty AI] OpenRouter недоступен:', e instanceof Error ? e.message : e);
    return null;
  }
}
