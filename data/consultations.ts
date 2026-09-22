import type { ConsultationFormat, Review, Service, Tariff } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'hair',
    title: 'Персональный разбор волос',
    description: 'Разбор состояния волос и индивидуальные рекомендации по уходу.',
  },
  {
    id: 'skin',
    title: 'Персональный уход за кожей',
    description: 'Общие рекомендации по домашнему beauty-уходу.',
  },
  {
    id: 'beauty30',
    title: 'Красота после 30',
    description: 'Персональный разбор ухода и образа жизни.',
  },
  {
    id: 'fitness',
    title: 'Форма и активность',
    description: 'Индивидуальная программа лёгкой домашней активности.',
  },
  {
    id: 'full',
    title: 'Общий beauty-разбор',
    description: 'Комплекс: волосы + кожа + уход + активность + образ жизни.',
  },
  {
    id: 'custom',
    title: 'Персональный вопрос',
    description: 'Вы самостоятельно описываете свою ситуацию.',
  },
];

export const TARIFFS: Tariff[] = [
  {
    id: 'quick',
    name: 'Quick',
    price: '299 ₽',
    tagline: 'Краткий совет специалиста',
    features: ['Один конкретный вопрос', 'Краткий персональный ответ', 'Основные рекомендации'],
  },
  {
    id: 'personal',
    name: 'Personal',
    price: '799 ₽',
    tagline: 'Персональная рекомендация',
    features: [
      'Анализ информации клиента',
      'Персональные рекомендации',
      'План действий',
      'Дальнейшие рекомендации',
    ],
  },
  {
    id: 'deep',
    name: 'Deep',
    price: '1 499 ₽',
    tagline: 'Подробный разбор',
    features: [
      'Подробная анкета',
      'Анализ нескольких факторов',
      'Персональный план',
      'Рекомендации по уходу',
      'Рекомендации по образу жизни',
      'Дополнительные вопросы в рамках консультации',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '2 999 ₽',
    tagline: 'Персональная консультация',
    features: [
      'Подробная анкета',
      'Персональный разбор',
      'Индивидуальные рекомендации',
      'Подробный план',
      'Видеоконсультация',
      'Дополнительные вопросы в рамках консультации',
    ],
    featured: true,
  },
];

export const FORMATS: ConsultationFormat[] = [
  { id: 'written', title: 'Письменная консультация' },
  { id: 'online', title: 'Онлайн-консультация' },
  { id: 'video', title: 'Видеоконсультация' },
];

export const CONTACT_METHODS = ['Email', 'Telegram', 'WhatsApp', 'Телефон'] as const;

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Анна',
    consultation: 'Персональный разбор волос',
    text: 'Пример отзыва — заменить реальным отзывом.',
    date: 'сентябрь 2026',
  },
  {
    id: 'r2',
    name: 'Мария',
    consultation: 'Красота после 30',
    text: 'Пример отзыва — заменить реальным отзывом.',
    date: 'сентябрь 2026',
  },
  {
    id: 'r3',
    name: 'Екатерина',
    consultation: 'Персональный уход за кожей',
    text: 'Пример отзыва — заменить реальным отзывом.',
    date: 'август 2026',
  },
  {
    id: 'r4',
    name: 'Ольга',
    consultation: 'Форма и активность',
    text: 'Пример отзыва — заменить реальным отзывом.',
    date: 'август 2026',
  },
  {
    id: 'r5',
    name: 'Дарья',
    consultation: 'Общий beauty-разбор',
    text: 'Пример отзыва — заменить реальным отзывом.',
    date: 'июль 2026',
  },
  {
    id: 'r6',
    name: 'Ирина',
    consultation: 'Персональный вопрос',
    text: 'Пример отзыва — заменить реальным отзывом.',
    date: 'июль 2026',
  },
];

export interface FounderProfile {
  name: string;
  role: string;
  bio: string;
  specialization: string;
  experience: string;
  education: string;
  directions: string[];
  achievements: string;
  certificates: string;
}

// Все поля — заглушки: реальные данные о специалисте предоставит владелец.
export const FOUNDER: FounderProfile = {
  name: '',
  role: '',
  bio: '',
  specialization: '',
  experience: '',
  education: '',
  directions: [],
  achievements: '',
  certificates: '',
};
