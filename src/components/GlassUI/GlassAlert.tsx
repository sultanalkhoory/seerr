import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface GlassAlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const variantConfig: Record<
  AlertVariant,
  { icon: React.ElementType; styles: string }
> = {
  info: {
    icon: InformationCircleIcon,
    styles: 'border-status-info/30 bg-status-info/10 text-status-info',
  },
  success: {
    icon: CheckCircleIcon,
    styles: 'border-status-success/30 bg-status-success/10 text-status-success',
  },
  warning: {
    icon: ExclamationTriangleIcon,
    styles: 'border-status-warning/30 bg-status-warning/10 text-status-warning',
  },
  error: {
    icon: ExclamationCircleIcon,
    styles: 'border-status-error/30 bg-status-error/10 text-status-error',
  },
};

const GlassAlert: React.FC<GlassAlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  icon,
  action,
}) => {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <div
      className={twMerge(
        'relative flex gap-3 rounded-glass border p-4 backdrop-blur-glass-sm',
        config.styles,
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0">
        {icon || <IconComponent className="h-5 w-5" />}
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="mb-1 font-semibold text-text-primary">{title}</h4>
        )}
        <div className="text-sm text-text-secondary">{children}</div>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium underline-offset-2 hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-glass-sm p-1 text-text-tertiary transition-colors hover:bg-glass-300 hover:text-text-primary"
          aria-label="Dismiss"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default GlassAlert;

// Toast notification variant (for use with toast system)
interface GlassToastProps {
  variant?: AlertVariant;
  title: string;
  message?: string;
  onClose?: () => void;
  className?: string;
}

export const GlassToast: React.FC<GlassToastProps> = ({
  variant = 'info',
  title,
  message,
  onClose,
  className,
}) => {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <div
      className={twMerge(
        'glass-card-prominent flex items-start gap-3 p-4 shadow-glass-lg',
        'animate-slide-in-right',
        className
      )}
      role="alert"
    >
      <div className={twMerge('flex-shrink-0', config.styles.split(' ').find(s => s.startsWith('text-')))}>
        <IconComponent className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-text-primary">{title}</p>
        {message && (
          <p className="mt-0.5 text-sm text-text-secondary">{message}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-glass-sm p-1 text-text-tertiary transition-colors hover:bg-glass-300 hover:text-text-primary"
          aria-label="Dismiss"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

// Inline alert for form validation, etc.
interface GlassInlineAlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

export const GlassInlineAlert: React.FC<GlassInlineAlertProps> = ({
  variant = 'error',
  children,
  className,
}) => {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <div
      className={twMerge(
        'flex items-center gap-1.5 text-xs',
        config.styles.split(' ').find(s => s.startsWith('text-')),
        className
      )}
      role="alert"
    >
      <IconComponent className="h-3.5 w-3.5 flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
};
