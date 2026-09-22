'use client';

import { useState } from 'react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { SmartImage } from '@/components/smart-image';
import { Modal } from '@/components/ui/modal';
import { ARTICLES, ARTICLE_CATEGORIES } from '@/data/articles';
import type { Article } from '@/types';
import { cn } from '@/lib/utils';

export function Journal() {
  const [category, setCategory] = useState<string>('Все');
  const [active, setActive] = useState<Article | null>(null);

  const list =
    category === 'Все' ? ARTICLES : ARTICLES.filter((a) => a.category === category);
  const featured = list[0];
  const rest = list.slice(1);

  return (
    <div id="journal" className="scroll-mt-20 border-y border-line bg-sand/50">
      <div className="container-x py-10 lg:py-12">
        <SectionHeading
          index="04"
          eyebrow="Beauty Journal"
          title="Beauty Journal"
          subtitle="Статьи об уходе, волосах, коже и образе жизни — коротко и по делу."
        />

        <div className="flex flex-wrap gap-2">
          {ARTICLE_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={c === category}
              className={cn(
                'btn-ring rounded-full px-3.5 py-1.5 text-xs transition-colors',
                c === category
                  ? 'bg-ink text-ivory'
                  : 'border border-line bg-white text-muted hover:border-ink/40 hover:text-ink'
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="card mt-6 p-8 text-center text-sm text-muted">
            В этой категории пока нет статей — загляните позже.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured && (
              <button
                onClick={() => setActive(featured)}
                className="card btn-ring group overflow-hidden text-left md:col-span-2 lg:row-span-2 lg:flex"
              >
                <SmartImage
                  src={featured.image}
                  alt={featured.title}
                  className="aspect-[16/9] w-full lg:aspect-auto lg:h-full lg:w-1/2"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="flex flex-col p-5">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-clay">
                    <span className="text-accent">{featured.category}</span>
                    <span className="flex items-center gap-1 text-muted">
                      <CalendarDays size={12} />
                      {featured.date}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl leading-snug sm:text-2xl">
                    {featured.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{featured.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-ink group-hover:text-accent">
                    Читать
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </button>
            )}
            {rest.map((a) => (
              <button key={a.slug} onClick={() => setActive(a)} className="card btn-ring group overflow-hidden text-left">
                <SmartImage
                  src={a.image}
                  alt={a.title}
                  className="aspect-[16/9] w-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="p-4">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider">
                    <span className="text-accent">{a.category}</span>
                    <span className="flex items-center gap-1 text-muted">
                      <CalendarDays size={12} />
                      {a.date}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-lg leading-snug">{a.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">{a.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-ink group-hover:text-accent">
                    Читать
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.category ?? ''} wide>
        {active && (
          <article>
            <h3 className="font-serif text-2xl leading-snug">{active.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted">
              <CalendarDays size={12} />
              {active.date}
            </div>
            <SmartImage
              src={active.image}
              alt={active.title}
              className="mt-4 aspect-[16/9] w-full rounded-lg"
              sizes="(max-width: 768px) 100vw, 700px"
            />
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink">
              {active.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-5 rounded-lg bg-sand px-4 py-3 text-xs leading-relaxed text-muted">
              Информация на сайте носит информационный характер и не заменяет консультацию врача или
              другого профильного специалиста.
            </p>
          </article>
        )}
      </Modal>
    </div>
  );
}
