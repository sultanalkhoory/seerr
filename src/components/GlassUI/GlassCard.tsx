import React from 'react';
import { twMerge } from 'tailwind-merge';

export type GlassCardVariant =
  | 'default'
  | 'hover'
  | 'interactive'
  | 'subtle'
  | 'prominent';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassCardVariant;
  as?: 'div' | 'article' | 'section' | 'aside';
  noPadding?: boolean;
}

const variantStyles: Record<GlassCardVariant, string> = {
  default: 'glass-card',
  hover: 'glass-card-hover',
  interactive: 'glass-card-interactive',
  subtle: 'glass-card-subtle',
  prominent: 'glass-card-prominent',
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'default',
      as: Component = 'div',
      noPadding = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={twMerge(
          variantStyles[variant],
          !noPadding && 'p-4',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;

// Additional card sub-components
export const GlassCardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={twMerge('mb-4 border-b border-glass-border pb-4', className)}
    {...props}
  >
    {children}
  </div>
);

export const GlassCardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3 className={twMerge('text-display-xs text-text-primary', className)} {...props}>
    {children}
  </h3>
);

export const GlassCardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p className={twMerge('mt-1 text-sm text-text-secondary', className)} {...props}>
    {children}
  </p>
);

export const GlassCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={twMerge('', className)} {...props}>
    {children}
  </div>
);

export const GlassCardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={twMerge(
      'mt-4 flex items-center justify-end gap-3 border-t border-glass-border pt-4',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
