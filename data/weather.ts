import type { WeatherData } from '@/types';

export interface CityInfo {
  name: string;
  lat: number;
  lon: number;
}

export const CITIES: CityInfo[] = [
  { name: 'Москва', lat: 55.75, lon: 37.62 },
  { name: 'Калининград', lat: 54.71, lon: 20.51 },
  { name: 'Санкт-Петербург', lat: 59.94, lon: 30.31 },
  { name: 'Амстердам', lat: 52.37, lon: 4.9 },
  { name: 'Берлин', lat: 52.52, lon: 13.4 },
  { name: 'Екатеринбург', lat: 56.84, lon: 60.61 },
  { name: 'Казань', lat: 55.8, lon: 49.11 },
  { name: 'Сочи', lat: 43.6, lon: 39.73 },
  { name: 'Новосибирск', lat: 55.03, lon: 82.92 },
  { name: 'Минск', lat: 53.9, lon: 27.57 },
];

const CONDITIONS = ['Ясно', 'Переменная облачность', 'Облачно', 'Пасмурно', 'Небольшой дождь'];

function hash(str: string): number {
  let h = 7;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 1000000;
  return h;
}

// Детерминированные demo-данные: для одного города в течение дня — одинаковые значения.
export function demoWeather(city: string): WeatherData {
  const seed = hash(city) + new Date().getDate();
  const temp = ((seed % 22) + 4) * (city === 'Сочи' ? 1.4 : 1);
  const t = Math.round(temp * 10) / 10;
  const condition = CONDITIONS[seed % CONDITIONS.length];

  const daily = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const delta = ((seed + i * 17) % 7) - 3;
    return {
      date: d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'numeric' }),
      min: Math.round(t + delta - 3),
      max: Math.round(t + delta + 2),
      condition: CONDITIONS[(seed + i * 3) % CONDITIONS.length],
    };
  });

  return {
    city,
    temp: Math.round(t),
    feels: Math.round(t - 1 - (seed % 2)),
    condition,
    precip: 10 + (seed % 60),
    humidity: 50 + (seed % 35),
    wind: 2 + (seed % 8),
    daily,
    demo: true,
  };
}
