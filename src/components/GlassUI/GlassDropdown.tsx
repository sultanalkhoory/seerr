import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

interface GlassDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

const GlassDropdown: React.FC<GlassDropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className,
}) => {
  return (
    <Menu as="div" className={twMerge('relative inline-block text-left', className)}>
      <Menu.Button as={Fragment}>{trigger}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={twMerge(
            'glass-dropdown mt-2',
            align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
          )}
        >
          {items.map((item) => {
            if (item.divider) {
              return (
                <div
                  key={item.id}
                  className="my-1 border-t border-glass-border"
                />
              );
            }

            return (
              <Menu.Item key={item.id} disabled={item.disabled}>
                {({ active }) => {
                  const itemClasses = twMerge(
                    'glass-dropdown-item',
                    active && 'glass-dropdown-item-active',
                    item.disabled && 'opacity-50 cursor-not-allowed',
                    item.danger && 'text-status-error hover:bg-status-error/10'
                  );

                  if (item.href) {
                    return (
                      <a href={item.href} className={itemClasses}>
                        {item.icon && (
                          <span className="h-4 w-4 flex-shrink-0">{item.icon}</span>
                        )}
                        <span>{item.label}</span>
                      </a>
                    );
                  }

                  return (
                    <button
                      type="button"
                      onClick={item.onClick}
                      disabled={item.disabled}
                      className={twMerge(itemClasses, 'w-full text-left')}
                    >
                      {item.icon && (
                        <span className="h-4 w-4 flex-shrink-0">{item.icon}</span>
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                }}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default GlassDropdown;

// Button trigger with dropdown
interface GlassDropdownButtonProps {
  label: string;
  items: DropdownItem[];
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'right';
  className?: string;
}

const variantStyles = {
  default: 'glass-button',
  primary: 'glass-button-primary',
  ghost: 'glass-button-ghost',
};

const sizeStyles = {
  sm: 'glass-button-sm',
  md: '',
  lg: 'glass-button-lg',
};

export const GlassDropdownButton: React.FC<GlassDropdownButtonProps> = ({
  label,
  items,
  variant = 'default',
  size = 'md',
  align = 'right',
  className,
}) => {
  return (
    <GlassDropdown
      align={align}
      className={className}
      items={items}
      trigger={
        <button className={twMerge(variantStyles[variant], sizeStyles[size])}>
          <span>{label}</span>
          <ChevronDownIcon className="ml-1 h-4 w-4" />
        </button>
      }
    />
  );
};
