import Link from 'next/link';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Разделы',
    links: [
      { label: 'Beauty', href: '#journal' },
      { label: 'Волосы', href: '#hair' },
      { label: 'Форма', href: '#form' },
      { label: 'Гороскоп', href: '#horoscope' },
      { label: 'Погода', href: '#weather' },
    ],
  },
  {
    title: 'Сервис',
    links: [
      { label: 'Консультации', href: '#consultations' },
      { label: 'AI-помощник', href: '#ai' },
      { label: 'Основатель', href: '#founder' },
      { label: 'Отзывы', href: '#reviews' },
    ],
  },
  {
    title: 'Информация',
    links: [
      { label: 'Политика конфиденциальности', href: '#' },
      { label: 'Пользовательское соглашение', href: '#' },
      { label: 'Контакты', href: '#' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-x grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-serif text-lg uppercase tracking-[0.18em]">Beauty Room</div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Пространство о красоте, уходе и заботе о себе.
          </p>
          <p className="mt-4 text-xs text-muted/80">«Твоя красота. Твои правила.»</p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">{col.title}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-1 py-5 text-xs text-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Beauty Room. Юридические данные будут добавлены.</span>
          <span>
            Информация на сайте носит информационный характер и не заменяет консультацию врача.
          </span>
        </div>
      </div>
    </footer>
  );
}
