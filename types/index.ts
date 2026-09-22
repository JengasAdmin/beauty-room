export interface WeatherDay {
  date: string;
  min: number;
  max: number;
  condition: string;
}

export interface WeatherData {
  city: string;
  temp: number;
  feels: number;
  condition: string;
  precip: number;
  humidity: number;
  wind: number;
  daily: WeatherDay[];
  demo?: boolean;
}

export type ArticleCategory =
  | 'Уход'
  | 'Волосы'
  | 'Кожа'
  | 'Тело'
  | 'Красота после 30'
  | 'Образ жизни'
  | 'Самочувствие';

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  date: string;
  image: string;
  content: string[];
}

export interface Exercise {
  name: string;
  duration: string;
  instruction: string;
  level: 1 | 2 | 3;
}

export interface WorkoutProgram {
  title: string;
  summary: string;
  exercises: Exercise[];
}

export interface HoroscopeResult {
  love: string;
  work: string;
  money: string;
  mood: string;
  health: string;
  advice: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface Tariff {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

export interface ConsultationFormat {
  id: string;
  title: string;
}

export interface Review {
  id: string;
  name: string;
  consultation: string;
  text: string;
  date: string;
}
