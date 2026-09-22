import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const PLANNED_PROVIDERS = ['ЮKassa', 'CloudPayments', 'Stripe'];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { requestId, tariff } = body ?? {};

    if (!requestId || !tariff) {
      return NextResponse.json({ error: 'Некорректный запрос оплаты.' }, { status: 400 });
    }

    // Оплата на первом этапе не подключена.
    // В будущем здесь — создание платежной сессии у провайдера (ЮKassa / CloudPayments / Stripe).
    // Платёжные данные пользователя не сохраняются и не обрабатываются.
    return NextResponse.json({
      status: 'payment_pending',
      message: 'Оплата будет доступна после подтверждения консультации специалистом.',
      plannedProviders: PLANNED_PROVIDERS,
    });
  } catch {
    return NextResponse.json({ error: 'Не удалось обработать запрос оплаты.' }, { status: 500 });
  }
}
