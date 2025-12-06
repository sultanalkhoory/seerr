import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useClickOutside from '@app/hooks/useClickOutside';
import { useLockBodyScroll } from '@app/hooks/useLockBodyScroll';
import type { MouseEvent } from 'react';
import React, { Fragment, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { twMerge } from 'tailwind-merge';
import GlassButton, { type GlassButtonVariant } from './GlassButton';

export interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  full: 'max-w-[95vw]',
};

const GlassModal: React.FC<GlassModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
  footer,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeOnBackdropRef = useRef(closeOnBackdropClick);

  useEffect(() => {
    closeOnBackdropRef.current = closeOnBackdropClick;
  }, [closeOnBackdropClick]);

  useClickOutside(modalRef, () => {
    if (closeOnBackdropRef.current && isOpen) {
      onClose();
    }
  });

  useLockBodyScroll(isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="glass-overlay" aria-hidden="true" />
        </Transition.Child>

        {/* Modal container */}
        <div className="flex min-h-full items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="transition-all duration-300 ease-out"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition-all duration-200 ease-in"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <div
              ref={modalRef}
              className={twMerge(
                'glass-modal relative w-full',
                sizeStyles[size],
                className
              )}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              aria-describedby={description ? 'modal-description' : undefined}
            >
              {/* Close button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-glass-sm p-1.5 text-text-tertiary transition-colors hover:bg-glass-300 hover:text-text-primary"
                  aria-label="Close modal"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}

              {/* Header */}
              {(title || description) && (
                <div className="mb-4 pr-8">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-display-xs text-text-primary"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p
                      id="modal-description"
                      className="mt-1 text-sm text-text-secondary"
                    >
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Content */}
              {children && <div className="text-text-secondary">{children}</div>}

              {/* Footer */}
              {footer && (
                <div className="mt-6 flex items-center justify-end gap-3 border-t border-glass-border pt-4">
                  {footer}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>,
    document.body
  );
};

export default GlassModal;

// Confirm dialog variant
interface GlassConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: GlassButtonVariant;
  isLoading?: boolean;
}

export const GlassConfirmModal: React.FC<GlassConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  isLoading = false,
}) => {
  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={false}
      closeOnBackdropClick={!isLoading}
      footer={
        <>
          <GlassButton
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </GlassButton>
          <GlassButton
            variant={confirmVariant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </GlassButton>
        </>
      }
    >
      <p className="text-text-secondary">{message}</p>
    </GlassModal>
  );
};
