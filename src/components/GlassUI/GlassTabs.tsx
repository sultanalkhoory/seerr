import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface GlassTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const GlassTabs: React.FC<GlassTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className,
}) => {
  const containerStyles = {
    default: 'glass-tabs',
    pills: 'flex gap-2',
    underline: 'flex gap-1 border-b border-glass-border',
  };

  const tabStyles = {
    default: {
      base: 'glass-tab',
      active: 'glass-tab-active',
    },
    pills: {
      base: 'rounded-glass-full px-4 py-2 text-text-secondary transition-all duration-200 hover:text-text-primary hover:bg-glass-200',
      active: 'bg-apple-blue text-white hover:bg-apple-blue hover:text-white',
    },
    underline: {
      base: 'px-4 py-2 text-text-secondary transition-all duration-200 hover:text-text-primary border-b-2 border-transparent -mb-[2px]',
      active: 'text-apple-blue border-apple-blue hover:text-apple-blue',
    },
  };

  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div
      className={twMerge(containerStyles[variant], className)}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={twMerge(
              tabStyles[variant].base,
              sizeStyles[size],
              isActive && tabStyles[variant].active,
              fullWidth && 'flex-1',
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span
                className={twMerge(
                  'ml-2 rounded-glass-full px-1.5 py-0.5 text-xs',
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-glass-300 text-text-secondary'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default GlassTabs;

// Tab Panel component
interface GlassTabPanelProps {
  id: string;
  activeTab: string;
  children: React.ReactNode;
  className?: string;
}

export const GlassTabPanel: React.FC<GlassTabPanelProps> = ({
  id,
  activeTab,
  children,
  className,
}) => {
  if (activeTab !== id) return null;

  return (
    <div
      role="tabpanel"
      aria-labelledby={id}
      className={twMerge('animate-fade-in pt-4', className)}
    >
      {children}
    </div>
  );
};
