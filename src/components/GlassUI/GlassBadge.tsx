import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type GlassBadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type GlassBadgeSize = 'sm' | 'md' | 'lg';

interface GlassBadgeProps {
  variant?: GlassBadgeVariant;
  size?: GlassBadgeSize;
  className?: string;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<GlassBadgeVariant, string> = {
  default: 'glass-badge',
  primary: 'glass-badge-primary',
  success: 'glass-badge-success',
  warning: 'glass-badge-warning',
  error: 'glass-badge-error',
  info: 'glass-badge-info',
};

const sizeStyles: Record<GlassBadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const GlassBadge = React.forwardRef<HTMLElement, GlassBadgeProps>(
  (
    { variant = 'default', size = 'md', className, href, icon, children },
    ref
  ) => {
    const badgeClasses = twMerge(
      variantStyles[variant],
      sizeStyles[size],
      href && 'cursor-pointer transition-all duration-200 hover:scale-105',
      className
    );

    const content = (
      <>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </>
    );

    if (href?.includes('://')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={badgeClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }

    if (href) {
      return (
        <Link
          href={href}
          className={badgeClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    return (
      <span className={badgeClasses} ref={ref as React.Ref<HTMLSpanElement>}>
        {content}
      </span>
    );
  }
);

GlassBadge.displayName = 'GlassBadge';

export default GlassBadge;

// Status badge with dot indicator
interface GlassStatusBadgeProps {
  status: 'online' | 'offline' | 'pending' | 'error' | 'success';
  label?: string;
  className?: string;
}

const statusConfig: Record<
  GlassStatusBadgeProps['status'],
  { dotColor: string; variant: GlassBadgeVariant; defaultLabel: string }
> = {
  online: { dotColor: 'bg-status-success', variant: 'success', defaultLabel: 'Online' },
  offline: { dotColor: 'bg-text-muted', variant: 'default', defaultLabel: 'Offline' },
  pending: { dotColor: 'bg-status-warning', variant: 'warning', defaultLabel: 'Pending' },
  error: { dotColor: 'bg-status-error', variant: 'error', defaultLabel: 'Error' },
  success: { dotColor: 'bg-status-success', variant: 'success', defaultLabel: 'Success' },
};

export const GlassStatusBadge: React.FC<GlassStatusBadgeProps> = ({
  status,
  label,
  className,
}) => {
  const config = statusConfig[status];

  return (
    <GlassBadge
      variant={config.variant}
      className={className}
      icon={
        <span
          className={twMerge(
            'h-2 w-2 rounded-full',
            config.dotColor,
            status === 'pending' && 'animate-pulse'
          )}
        />
      }
    >
      {label || config.defaultLabel}
    </GlassBadge>
  );
};
