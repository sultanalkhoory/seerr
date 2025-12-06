import React from 'react';
import { twMerge } from 'tailwind-merge';

// Spinner Component
interface GlassSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const spinnerSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

export const GlassSpinner: React.FC<GlassSpinnerProps> = ({
  size = 'md',
  className,
}) => (
  <svg
    className={twMerge('animate-spin text-apple-blue', spinnerSizes[size], className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Skeleton Component
interface GlassSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number;
}

export const GlassSkeleton: React.FC<GlassSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  lines = 1,
}) => {
  const baseStyles = 'glass-shimmer';

  const variantStyles = {
    text: 'h-4 rounded-glass-sm',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-glass',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'circular' ? width : undefined),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={twMerge('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={twMerge(baseStyles, variantStyles[variant])}
            style={{
              ...style,
              width: i === lines - 1 ? '70%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={twMerge(baseStyles, variantStyles[variant], className)}
      style={style}
    />
  );
};

// Loading overlay
interface GlassLoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  className?: string;
  children: React.ReactNode;
}

export const GlassLoadingOverlay: React.FC<GlassLoadingOverlayProps> = ({
  isLoading,
  text,
  className,
  children,
}) => (
  <div className={twMerge('relative', className)}>
    {children}
    {isLoading && (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-glass-black/60 backdrop-blur-glass-sm rounded-glass">
        <GlassSpinner size="lg" />
        {text && (
          <p className="mt-3 text-sm font-medium text-text-secondary">{text}</p>
        )}
      </div>
    )}
  </div>
);

// Pulse dot indicator
interface GlassPulseDotProps {
  color?: 'blue' | 'green' | 'red' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const pulseColors = {
  blue: 'bg-apple-blue',
  green: 'bg-status-success',
  red: 'bg-status-error',
  yellow: 'bg-status-warning',
};

const pulseSizes = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

export const GlassPulseDot: React.FC<GlassPulseDotProps> = ({
  color = 'blue',
  size = 'md',
  className,
}) => (
  <span className={twMerge('relative flex', pulseSizes[size], className)}>
    <span
      className={twMerge(
        'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
        pulseColors[color]
      )}
    />
    <span
      className={twMerge(
        'relative inline-flex h-full w-full rounded-full',
        pulseColors[color]
      )}
    />
  </span>
);

// Progress bar
interface GlassProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

const progressSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const progressVariants = {
  default: 'bg-apple-blue',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  error: 'bg-status-error',
};

export const GlassProgress: React.FC<GlassProgressProps> = ({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'default',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={twMerge('w-full', className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-text-secondary">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={twMerge(
          'w-full overflow-hidden rounded-glass-full bg-glass-200',
          progressSizes[size]
        )}
      >
        <div
          className={twMerge(
            'h-full rounded-glass-full transition-all duration-500 ease-out',
            progressVariants[variant]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

// Full page loading
interface GlassPageLoadingProps {
  text?: string;
}

export const GlassPageLoading: React.FC<GlassPageLoadingProps> = ({
  text = 'Loading...',
}) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-glass-black">
    <div className="glass-card-prominent flex flex-col items-center p-8">
      <GlassSpinner size="xl" />
      <p className="mt-4 text-lg font-medium text-text-secondary">{text}</p>
    </div>
  </div>
);
