'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

// Картинка с элегантным fallback: если Unsplash недоступен, остаётся песочная плашка.
export function SmartImage({ src, alt, className, sizes, priority, fill }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn('flex items-center justify-center bg-sand', className)}
        role="img"
        aria-label={alt}
      >
        <span className="font-serif text-2xl text-clay/50">BR</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-sand', className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill ?? true}
        sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
        priority={priority}
        onError={() => setFailed(true)}
        className="object-cover"
      />
    </div>
  );
}
