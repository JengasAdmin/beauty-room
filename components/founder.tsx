import { SectionHeading } from '@/components/section-heading';
import { FOUNDER } from '@/data/consultations';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-line py-2.5 sm:flex-row sm:gap-6">
      <dt className="shrink-0 text-xs font-semibold uppercase tracking-wider text-clay sm:w-48">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-muted">
        {value.trim() ? value : 'Информация о специалисте будет добавлена'}
      </dd>
    </div>
  );
}

export function Founder() {
  return (
    <div id="founder" className="container-x scroll-mt-20 py-10 lg:py-12">
      <SectionHeading index="09" eyebrow="Основатель" title="Основатель Beauty Room" />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="card flex aspect-[4/5] flex-col items-center justify-center gap-3 bg-sand/60 p-6 text-center">
          <span className="card flex h-20 w-20 items-center justify-center rounded-full font-serif text-3xl text-clay">
            BR
          </span>
          <p className="text-xs leading-relaxed text-muted">
            Фотография основателя будет добавлена
          </p>
        </div>

        <div className="card p-5 sm:p-8">
          <h3 className="font-serif text-2xl">
            {FOUNDER.name.trim() || 'Имя и фамилия — будут добавлены'}
          </h3>
          <p className="mt-1 text-sm text-accent">
            {FOUNDER.role.trim() || 'Должность — будет добавлена'}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            {FOUNDER.bio.trim() ||
              'Краткая биография основателя будет добавлена. Все поля этого блока легко заменить на реальные данные — они хранятся в файле data/consultations.ts.'}
          </p>

          <dl className="mt-6">
            <Field label="Специализация" value={FOUNDER.specialization} />
            <Field label="Опыт" value={FOUNDER.experience} />
            <Field label="Образование" value={FOUNDER.education} />
            <Field
              label="Профессиональные направления"
              value={FOUNDER.directions.filter(Boolean).join(', ')}
            />
            <Field label="Достижения" value={FOUNDER.achievements} />
            <Field label="Сертификаты и квалификации" value={FOUNDER.certificates} />
          </dl>
        </div>
      </div>
    </div>
  );
}
