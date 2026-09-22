import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { REVIEWS } from '@/data/consultations';

export function Reviews() {
  return (
    <div id="reviews" className="scroll-mt-20 border-y border-line bg-sand/50">
      <div className="container-x py-10 lg:py-12">
        <SectionHeading
          index="10"
          eyebrow="Отзывы"
          title="Отзывы клиентов"
          subtitle="Скоро здесь появятся реальные истории. Мы не публикуем выдуманные отзывы от имени реальных людей."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.id} className="card p-5">
              <Quote size={18} className="text-nude" aria-hidden="true" />
              <blockquote className="mt-3 text-sm leading-relaxed text-muted">{r.text}</blockquote>
              <figcaption className="mt-4 border-t border-line pt-3">
                <span className="text-sm font-medium">{r.name}</span>
                <span className="mt-0.5 block text-xs text-muted">
                  {r.consultation} · {r.date}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
