import React from 'react';
import { twMerge } from 'tailwind-merge';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface GlassAvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  showRing?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-[10px]', status: 'h-1.5 w-1.5 border' },
  sm: { container: 'h-8 w-8', text: 'text-xs', status: 'h-2 w-2 border' },
  md: { container: 'h-10 w-10', text: 'text-sm', status: 'h-2.5 w-2.5 border-2' },
  lg: { container: 'h-12 w-12', text: 'text-base', status: 'h-3 w-3 border-2' },
  xl: { container: 'h-16 w-16', text: 'text-lg', status: 'h-4 w-4 border-2' },
  '2xl': { container: 'h-24 w-24', text: 'text-2xl', status: 'h-5 w-5 border-2' },
};

const statusColors = {
  online: 'bg-status-success',
  offline: 'bg-text-muted',
  busy: 'bg-status-error',
  away: 'bg-status-warning',
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const GlassAvatar: React.FC<GlassAvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className,
  showRing = false,
  status,
}) => {
  const styles = sizeStyles[size];
  const initials = name ? getInitials(name) : '??';

  return (
    <div className={twMerge('relative inline-block', className)}>
      <div
        className={twMerge(
          'relative flex items-center justify-center overflow-hidden rounded-full',
          'bg-glass-300 backdrop-blur-glass-sm',
          showRing && 'ring-2 ring-glass-border-light ring-offset-2 ring-offset-glass-black',
          styles.container
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className={twMerge(
              'font-semibold text-text-secondary',
              styles.text
            )}
          >
            {initials}
          </span>
        )}
      </div>
      {status && (
        <span
          className={twMerge(
            'absolute bottom-0 right-0 rounded-full border-glass-black',
            statusColors[status],
            styles.status
          )}
        />
      )}
    </div>
  );
};

export default GlassAvatar;

// Avatar Group component
interface GlassAvatarGroupProps {
  avatars: Array<{
    src?: string | null;
    name?: string;
    alt?: string;
  }>;
  size?: AvatarSize;
  max?: number;
  className?: string;
}

export const GlassAvatarGroup: React.FC<GlassAvatarGroupProps> = ({
  avatars,
  size = 'md',
  max = 4,
  className,
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  const styles = sizeStyles[size];

  return (
    <div className={twMerge('flex -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) => (
        <GlassAvatar
          key={index}
          src={avatar.src}
          name={avatar.name}
          alt={avatar.alt}
          size={size}
          showRing
          className="relative"
        />
      ))}
      {remainingCount > 0 && (
        <div
          className={twMerge(
            'relative flex items-center justify-center rounded-full',
            'bg-glass-400 backdrop-blur-glass-sm',
            'ring-2 ring-glass-black',
            styles.container
          )}
        >
          <span className={twMerge('font-semibold text-text-secondary', styles.text)}>
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};
