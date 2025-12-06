import type { ForwardedRef } from 'react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export type GlassButtonVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'ghost';

export type GlassButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type MergeElementProps<
  T extends React.ElementType,
  P extends Record<string, unknown>
> = Omit<React.ComponentProps<T>, keyof P> & P;

type ElementTypes = 'button' | 'a';

type Element<P extends ElementTypes = 'button'> = P extends 'a'
  ? HTMLAnchorElement
  : HTMLButtonElement;

type BaseProps<P> = {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (
    e: React.MouseEvent<P extends 'a' ? HTMLAnchorElement : HTMLButtonElement>
  ) => void;
};

type GlassButtonProps<P extends React.ElementType> = {
  as?: P;
} & MergeElementProps<P, BaseProps<P>>;

const variantStyles: Record<GlassButtonVariant, string> = {
  default: 'glass-button',
  primary: 'glass-button-primary',
  success: 'glass-button-success',
  danger: 'glass-button-danger',
  warning: 'glass-button-warning',
  ghost: 'glass-button-ghost',
};

const sizeStyles: Record<GlassButtonSize, string> = {
  sm: 'glass-button-sm',
  md: '',
  lg: 'glass-button-lg',
  icon: 'glass-button-icon',
};

function GlassButton<P extends ElementTypes = 'button'>(
  {
    variant = 'default',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    as,
    children,
    className,
    disabled,
    ...props
  }: GlassButtonProps<P>,
  ref?: React.Ref<Element<P>>
): JSX.Element {
  const buttonClasses = twMerge(
    variantStyles[variant],
    sizeStyles[size],
    isLoading && 'opacity-70 cursor-wait',
    className
  );

  const content = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4"
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
      ) : (
        leftIcon
      )}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon}
    </>
  );

  if (as === 'a') {
    return (
      <a
        className={buttonClasses}
        {...(props as React.ComponentProps<'a'>)}
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...(props as React.ComponentProps<'button'>)}
      ref={ref as ForwardedRef<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}

export default React.forwardRef(GlassButton) as typeof GlassButton;
