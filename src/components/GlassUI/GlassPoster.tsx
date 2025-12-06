import { PlayIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import GlassBadge from './GlassBadge';

interface GlassPosterProps {
  src?: string | null;
  alt: string;
  href?: string;
  title?: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  };
  rating?: number;
  year?: string | number;
  showPlayButton?: boolean;
  onPlayClick?: () => void;
  aspectRatio?: 'poster' | 'backdrop' | 'square';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const aspectRatioStyles = {
  poster: 'aspect-[2/3]',
  backdrop: 'aspect-video',
  square: 'aspect-square',
};

const sizeStyles = {
  sm: 'w-24',
  md: 'w-36',
  lg: 'w-48',
};

const GlassPoster: React.FC<GlassPosterProps> = ({
  src,
  alt,
  href,
  title,
  subtitle,
  badge,
  rating,
  year,
  showPlayButton = false,
  onPlayClick,
  aspectRatio = 'poster',
  size,
  className,
}) => {
  const content = (
    <div
      className={twMerge(
        'group relative overflow-hidden rounded-glass',
        'border border-glass-border bg-glass-200',
        'shadow-glass transition-all duration-300 ease-glass',
        'hover:shadow-glass-lg hover:border-glass-border-light',
        'hover:scale-[1.03]',
        aspectRatioStyles[aspectRatio],
        size && sizeStyles[size],
        className
      )}
    >
      {/* Image */}
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-glass-300">
          <svg
            className="h-12 w-12 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="glass-poster-overlay" />

      {/* Badge */}
      {badge && (
        <div className="absolute left-2 top-2 z-10">
          <GlassBadge variant={badge.variant} size="sm">
            {badge.text}
          </GlassBadge>
        </div>
      )}

      {/* Rating */}
      {rating !== undefined && (
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-glass-full bg-glass-black/70 px-2 py-1 backdrop-blur-glass-sm">
          <svg
            className="h-3 w-3 text-status-warning"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-semibold text-text-primary">
            {rating.toFixed(1)}
          </span>
        </div>
      )}

      {/* Play button overlay */}
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPlayClick?.();
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-apple-blue/90 text-white shadow-glass-glow backdrop-blur-glass-sm transition-transform duration-200 hover:scale-110"
          >
            <PlayIcon className="h-6 w-6 ml-1" />
          </button>
        </div>
      )}

      {/* Title overlay */}
      {(title || subtitle || year) && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-glass-black via-glass-black/80 to-transparent p-3 pt-8">
          {title && (
            <h3 className="truncate text-sm font-semibold text-text-primary">
              {title}
            </h3>
          )}
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            {year && <span>{year}</span>}
            {year && subtitle && <span>•</span>}
            {subtitle && <span className="truncate">{subtitle}</span>}
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

export default GlassPoster;

// Poster skeleton for loading states
export const GlassPosterSkeleton: React.FC<{
  aspectRatio?: 'poster' | 'backdrop' | 'square';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ aspectRatio = 'poster', size, className }) => (
  <div
    className={twMerge(
      'glass-shimmer rounded-glass',
      aspectRatioStyles[aspectRatio],
      size && sizeStyles[size],
      className
    )}
  />
);

// Poster grid container
export const GlassPosterGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={twMerge(
      'grid gap-4',
      'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
      className
    )}
  >
    {children}
  </div>
);
