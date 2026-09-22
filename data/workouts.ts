import type { Exercise, WorkoutProgram } from '@/types';

export const GOALS = [
  { id: 'activity', label: 'Больше активности' },
  { id: 'strength', label: 'Укрепить тело' },
  { id: 'endurance', label: 'Улучшить выносливость' },
  { id: 'wellbeing', label: 'Улучшить самочувствие' },
] as const;

export const LEVELS = [
  { id: 'novice', label: 'Новичок', value: 1 },
  { id: 'beginner', label: 'Начинающий', value: 2 },
  { id: 'middle', label: 'Средний', value: 3 },
] as const;

export const TIMES = [5, 10, 15, 20] as const;

export const SPACES = [
  { id: 'minimal', label: 'Очень мало' },
  { id: 'room', label: 'Комната' },
  { id: 'large', label: 'Больше пространства' },
] as const;

type Space = 'minimal' | 'room' | 'large';
type Goal = 'any' | 'activity' | 'strength' | 'endurance' | 'wellbeing';

interface PoolExercise extends Exercise {
  kind: 'warmup' | 'main' | 'stretch';
  space: Space;
  goals: Goal[];
}

const POOL: PoolExercise[] = [
  {
    kind: 'warmup',
    name: 'Лёгкая разминка',
    duration: '2 минуты',
    instruction:
      'Плавные вращения плечами, кистями и головой без запрокидывания. Разогрейте тело и подышите глубже.',
    level: 1,
    space: 'minimal',
    goals: ['any'],
  },
  {
    kind: 'warmup',
    name: 'Шаги на месте с махами рук',
    duration: '1–2 минуты',
    instruction: 'Маршируйте на месте в комфортном темпе, свободно двигая руками. Дыхание ровное.',
    level: 1,
    space: 'minimal',
    goals: ['any', 'endurance', 'activity'],
  },
  {
    kind: 'main',
    name: 'Приседания с собственным весом',
    duration: '10–12 повторений',
    instruction:
      'Стопы на ширине плеч, спина прямая, колени идут по направлению носков. Садитесь на комфортную глубину.',
    level: 1,
    space: 'minimal',
    goals: ['any', 'strength'],
  },
  {
    kind: 'main',
    name: 'Ягодичный мост',
    duration: '12 повторений',
    instruction:
      'Лёжа на спине, стопы рядом с тазом. Поднимайте таз, сжимая ягодицы, и плавно опускайтесь.',
    level: 1,
    space: 'minimal',
    goals: ['any', 'strength'],
  },
  {
    kind: 'main',
    name: 'Отжимания с опорой на стену или стул',
    duration: '8–10 повторений',
    instruction:
      'Корпус — прямая линия. Опускайтесь, сгибая локти, и плавно выталкивайте себя обратно.',
    level: 1,
    space: 'minimal',
    goals: ['any', 'strength'],
  },
  {
    kind: 'main',
    name: 'Планка с опорой на колени',
    duration: '20–30 секунд',
    instruction:
      'Локти под плечами, живот подтянут, поясница не провисает. Держите, пока сохраняется техника.',
    level: 2,
    space: 'minimal',
    goals: ['strength', 'wellbeing'],
  },
  {
    kind: 'main',
    name: 'Выпады на месте',
    duration: '8 повторений на каждую ногу',
    instruction:
      'Шаг вперёд, заднее колено опускается к полу. Держитесь за стену, если нужна опора.',
    level: 2,
    space: 'room',
    goals: ['strength', 'endurance'],
  },
  {
    kind: 'main',
    name: 'Подъёмы на носки',
    duration: '15 повторений',
    instruction:
      'Встаньте ровно, поднимайтесь на носки и медленно опускайтесь. Можно держаться за спинку стула.',
    level: 1,
    space: 'minimal',
    goals: ['any', 'activity', 'wellbeing'],
  },
  {
    kind: 'main',
    name: 'Движения для плеч',
    duration: '1 минута',
    instruction:
      'Вращения плечами вперёд и назад, затем сведение лопаток. Выполняйте плавно, без боли.',
    level: 1,
    space: 'minimal',
    goals: ['any', 'wellbeing'],
  },
  {
    kind: 'main',
    name: 'Ходьба на месте в быстром темпе',
    duration: '2 минуты',
    instruction:
      'Работайте руками и поднимайте колени в комфортной амплитуде. Идеально между силовыми упражнениями.',
    level: 1,
    space: 'minimal',
    goals: ['activity', 'endurance', 'wellbeing'],
  },
  {
    kind: 'main',
    name: 'Махи ногами вперёд и в сторону',
    duration: '10 повторений на каждую ногу',
    instruction:
      'Держитесь за стену или стул. Махи мягкие, без рывков, в комфортной амплитуде.',
    level: 2,
    space: 'room',
    goals: ['activity', 'strength'],
  },
  {
    kind: 'main',
    name: 'Шаги с подъёмом колена',
    duration: '2 минуты',
    instruction:
      'Шагайте на месте, поочерёдно поднимая колено до комфортной высоты. Темп средний, дыхание свободное.',
    level: 2,
    space: 'room',
    goals: ['endurance', 'activity'],
  },
  {
    kind: 'stretch',
    name: 'Лёгкая растяжка',
    duration: '2–3 минуты',
    instruction:
      'Плавные наклоны к ногам, растяжка плеч и боков. Тянитесь до лёгкого натяжения, без боли, дышите ровно.',
    level: 1,
    space: 'minimal',
    goals: ['any'],
  },
  {
    kind: 'stretch',
    name: 'Кошка-корова',
    duration: '1 минута',
    instruction:
      'На четвереньках плавно прогибайте и округляйте спину. Отлично расслабляет спину после дня.',
    level: 1,
    space: 'minimal',
    goals: ['any', 'wellbeing'],
  },
  {
    kind: 'stretch',
    name: 'Спокойное дыхание',
    duration: '1 минута',
    instruction:
      'Сядьте удобно, закройте глаза, дышите медленно: вдох на 4 счёта, выдох на 6. Завершите программу спокойно.',
    level: 1,
    space: 'minimal',
    goals: ['any'],
  },
];

const MAIN_COUNT: Record<number, number> = { 5: 2, 10: 4, 15: 5, 20: 7 };

function pickSeeded<T>(items: T[], count: number, seed: number): T[] {
  const arr = [...items];
  const out: T[] = [];
  let s = seed || 1;
  while (out.length < count && arr.length > 0) {
    s = (s * 1103515245 + 12345) % 2147483648;
    out.push(arr.splice(s % arr.length, 1)[0]);
  }
  return out;
}

export function buildProgram(
  goal: string,
  levelValue: number,
  time: number,
  space: string,
  nonce: number
): WorkoutProgram {
  const allowedSpace: Space[] =
    space === 'minimal' ? ['minimal'] : space === 'room' ? ['minimal', 'room'] : ['minimal', 'room', 'large'];

  const levelMax = levelValue === 1 ? 1 : levelValue === 2 ? 2 : 3;

  const by = (kind: PoolExercise['kind']) =>
    POOL.filter(
      (e) =>
        e.kind === kind &&
        allowedSpace.includes(e.space) &&
        e.level <= levelMax &&
        (e.goals.includes('any') || e.goals.includes(goal as Goal))
    );

  const goalLabel = GOALS.find((g) => g.id === goal)?.label ?? 'общий тонус';
  const main = pickSeeded(
    by('main'),
    MAIN_COUNT[time] ?? 4,
    goal.length * 31 + time * 7 + levelValue * 13 + space.length * 3 + nonce * 101
  );
  const warmup = by('warmup').slice(0, time >= 10 ? 2 : 1);
  const stretch = by('stretch').slice(0, time >= 10 ? 2 : 1);

  return {
    title: 'Твоя программа на сегодня',
    summary: `${goalLabel} · ${time} минут · ${
      LEVELS.find((l) => l.value === levelValue)?.label.toLowerCase() ?? 'лёгкий уровень'
    }`,
    exercises: [...warmup, ...main, ...stretch].map(({ kind, space, goals, ...rest }) => rest),
  };
}
