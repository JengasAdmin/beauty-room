import { ArrowRight, MessageCircle } from 'lucide-react';
import { SmartImage } from '@/components/smart-image';

export function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <div className="container-x grid items-center gap-8 py-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
        <div>
          <span className="inline-block rounded-full border border-line bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
            Beauty • Care • Lifestyle
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            Твоя красота.
            <br />
            Твои правила.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
            Уход, волосы, лёгкая активность, вдохновение и персональные рекомендации — в одном
            пространстве.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#today"
              className="btn-ring inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-6 text-[15px] font-medium text-ivory transition-colors hover:bg-ink/85"
            >
              Начать
              <ArrowRight size={16} />
            </a>
            <a
              href="#consultations"
              className="btn-ring inline-flex h-12 items-center rounded-lg border border-ink/20 px-6 text-[15px] font-medium transition-colors hover:border-ink/50 hover:bg-white"
            >
              Получить консультацию
            </a>
          </div>
          <div className="mt-7 flex items-center gap-2 text-sm text-muted">
            <MessageCircle size={16} className="text-accent" />
            Бесплатный контент, тесты и Beauty AI — без регистрации
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -bottom-3 -left-3 hidden h-full w-full border border-accent/40 sm:block" aria-hidden="true" />
          <SmartImage
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=75"
            alt="Женщина в естественном editorial-стиле"
            priority
            className="aspect-[4/5] w-full border border-line"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}
