import { NextRequest, NextResponse } from 'next/server';
import {
  callDeepSeek,
  callOpenRouter,
  callYandexGPT,
  demoReply,
  getProvider,
  type ChatMessage,
} from '@/lib/ai';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    if (Array.isArray(body?.messages)) {
      messages = body.messages
        .filter(
          (m: unknown) =>
            m &&
            typeof m === 'object' &&
            (m as ChatMessage).role in { user: 1, assistant: 1 } &&
            typeof (m as ChatMessage).content === 'string'
        )
        .slice(-12)
        .map((m: ChatMessage) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content.slice(0, 2000),
        }));
    }
  } catch {
    // некорректный JSON — отвечаем демо-режимом на пустой ввод
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser) {
    return NextResponse.json({ reply: demoReply(''), demo: true });
  }

  const { provider, apiKey } = getProvider();

  if (provider === 'deepseek' && apiKey) {
    const reply = await callDeepSeek(apiKey, messages);
    if (reply) return NextResponse.json({ reply, demo: false });
  }

  if (provider === 'yandexgpt' && apiKey) {
    const reply = await callYandexGPT(apiKey, messages);
    if (reply) return NextResponse.json({ reply, demo: false });
  }

  if (provider === 'openrouter' && apiKey) {
    const reply = await callOpenRouter(apiKey, messages);
    if (reply) return NextResponse.json({ reply, demo: false });
  }

  // Бесплатный запасной AI: OpenRouter :free-модели (если задан OPENROUTER_API_KEY),
  // полезен когда основной провайдер недоступен (например, нет баланса).
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey && provider !== 'openrouter') {
    const reply = await callOpenRouter(openRouterKey, messages);
    if (reply) return NextResponse.json({ reply, demo: false });
  }

  return NextResponse.json({ reply: demoReply(lastUser.content), demo: true });
}
