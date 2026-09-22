import { NextRequest, NextResponse } from 'next/server';
import { demoWeather } from '@/data/weather';
import type { WeatherData } from '@/types';

export const runtime = 'nodejs';

const CODE_MAP: [number[], string][] = [
  [[0], 'Ясно'],
  [[1, 2, 3], 'Переменная облачность'],
  [[45, 48], 'Туман'],
  [[51, 53, 55, 56, 57, 61, 63, 65, 66, 67], 'Дождь'],
  [[71, 73, 75, 77, 85, 86], 'Снег'],
  [[80, 81, 82], 'Ливень'],
  [[95, 96, 99], 'Гроза'],
];

function codeToCondition(code: number): string {
  for (const [codes, label] of CODE_MAP) if (codes.includes(code)) return label;
  return 'Облачно';
}

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city')?.trim();
  if (!city) return NextResponse.json({ error: 'Укажите город' }, { status: 400 });

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru&format=json`,
      { signal: AbortSignal.timeout(3500) }
    );
    if (!geoRes.ok) throw new Error('geocoding failed');
    const geo = await geoRes.json();
    const loc = geo?.results?.[0];
    if (!loc) throw new Error('city not found');

    const wRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`,
      { signal: AbortSignal.timeout(3500) }
    );
    if (!wRes.ok) throw new Error('forecast failed');
    const w = await wRes.json();

    const data: WeatherData = {
      city: loc.name,
      temp: Math.round(w.current.temperature_2m),
      feels: Math.round(w.current.apparent_temperature),
      condition: codeToCondition(w.current.weather_code),
      precip: w.current.precipitation_probability ?? 0,
      humidity: Math.round(w.current.relative_humidity_2m ?? 0),
      wind: Math.round(w.current.wind_speed_10m ?? 0),
      daily: (w.daily?.time ?? []).slice(0, 5).map((time: string, i: number) => {
        const d = new Date(time);
        return {
          date: d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'numeric' }),
          min: Math.round(w.daily.temperature_2m_min[i]),
          max: Math.round(w.daily.temperature_2m_max[i]),
          condition: codeToCondition(w.daily.weather_code[i]),
        };
      }),
      demo: false,
    };
    return NextResponse.json(data);
  } catch {
    // Open-Meteo недоступен или город не найден — graceful fallback на demo-данные
    return NextResponse.json(demoWeather(city));
  }
}
