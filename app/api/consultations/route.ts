import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, tariff, format, description, name, email, contact } = body ?? {};

    if (!service || !tariff || !format || !description || !name || !email) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля заявки.' },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: 'Проверьте формат email.' }, { status: 400 });
    }

    // Demo-режим: в будущем здесь — сохранение в PostgreSQL через Prisma и уведомление специалисту.
    const id = `BR-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      id,
      status: 'pending',
      message: 'Заявка отправлена. Специалист свяжется с вами по указанным контактам.',
    });
  } catch {
    return NextResponse.json({ error: 'Не удалось отправить заявку. Попробуйте ещё раз.' }, { status: 500 });
  }
}
