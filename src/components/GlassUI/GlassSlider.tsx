import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface GlassSliderProps {
  title?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  gap?: 'sm' | 'md' | 'lg';
}

const gapStyles = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const GlassSlider: React.FC<GlassSliderProps> = ({
  title,
  href,
  children,
  className,
  showNavigation = true,
  gap = 'md',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={twMerge('relative', className)}>
      {/* Header */}
      {title && (
        <div className="glass-slider-header">
          {href ? (
            <Link href={href} className="glass-slider-title group">
              <span className="transition-colors duration-200 group-hover:text-apple-blue">
                {title}
              </span>
              <ChevronRightIcon className="h-5 w-5 text-text-tertiary transition-all duration-200 group-hover:translate-x-1 group-hover:text-apple-blue" />
            </Link>
          ) : (
            <h2 className="glass-slider-title">{title}</h2>
          )}

          {/* Navigation buttons */}
          {showNavigation && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={twMerge(
                  'flex h-8 w-8 items-center justify-center rounded-glass-full',
                  'border border-glass-border bg-glass-200 backdrop-blur-glass-sm',
                  'transition-all duration-200',
                  canScrollLeft
                    ? 'text-text-primary hover:bg-glass-300 hover:border-glass-border-light'
                    : 'text-text-muted cursor-not-allowed opacity-50'
                )}
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={twMerge(
                  'flex h-8 w-8 items-center justify-center rounded-glass-full',
                  'border border-glass-border bg-glass-200 backdrop-blur-glass-sm',
                  'transition-all duration-200',
                  canScrollRight
                    ? 'text-text-primary hover:bg-glass-300 hover:border-glass-border-light'
                    : 'text-text-muted cursor-not-allowed opacity-50'
                )}
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Slider container */}
      <div className="relative">
        {/* Left fade */}
        <div
          className={twMerge(
            'absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-glass-black to-transparent pointer-events-none transition-opacity duration-200',
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Scrollable content */}
        <div
          ref={scrollContainerRef}
          className={twMerge(
            'flex overflow-x-auto hide-scrollbar scroll-smooth',
            '-mx-4 px-4',
            gapStyles[gap]
          )}
        >
          {children}
        </div>

        {/* Right fade */}
        <div
          className={twMerge(
            'absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-glass-black to-transparent pointer-events-none transition-opacity duration-200',
            canScrollRight ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    </div>
  );
};

export default GlassSlider;

// Slider item wrapper for consistent sizing
interface GlassSliderItemProps {
  children: React.ReactNode;
  width?: 'auto' | 'poster' | 'backdrop' | 'card';
  className?: string;
}

const widthStyles = {
  auto: '',
  poster: 'w-36 sm:w-40 md:w-44 flex-shrink-0',
  backdrop: 'w-64 sm:w-72 md:w-80 flex-shrink-0',
  card: 'w-72 sm:w-80 md:w-96 flex-shrink-0',
};

export const GlassSliderItem: React.FC<GlassSliderItemProps> = ({
  children,
  width = 'poster',
  className,
}) => (
  <div className={twMerge(widthStyles[width], className)}>{children}</div>
);

// Hero slider for featured content
interface GlassHeroSliderProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  className?: string;
}

export const GlassHeroSlider: React.FC<GlassHeroSliderProps> = ({
  children,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const totalSlides = childrenArray.length;

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className={twMerge('relative overflow-hidden rounded-glass-lg', className)}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-glass"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-glass-full bg-glass-black/50 text-text-primary backdrop-blur-glass-sm transition-all duration-200 hover:bg-glass-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-glass-full bg-glass-black/50 text-text-primary backdrop-blur-glass-sm transition-all duration-200 hover:bg-glass-black/70"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={twMerge(
                'h-2 rounded-glass-full transition-all duration-200',
                index === currentIndex
                  ? 'w-6 bg-apple-blue'
                  : 'w-2 bg-text-muted hover:bg-text-tertiary'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
