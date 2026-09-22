import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service, tariff, format, description, name, email, contact } = body ?? {};

    if (!service || !tariff || !format || !description || !name || !email) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля заявки.' },
        { status: 400, headers: CORS }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: 'Проверьте формат email.' }, { status: 400, headers: CORS });
    }

    // Demo-режим: в будущем здесь — сохранение в PostgreSQL через Prisma и уведомление специалисту.
    const id = `BR-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        id,
        status: 'pending',
        message: 'Заявка отправлена. Специалист свяжется с вами по указанным контактам.',
      },
      { headers: CORS }
    );
  } catch {
    return NextResponse.json(
      { error: 'Не удалось отправить заявку. Попробуйте ещё раз.' },
      { status: 500, headers: CORS }
    );
  }
}
