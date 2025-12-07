import { GlassBadge } from '@app/components/GlassUI';
import UserWarnings from '@app/components/Layout/UserWarnings';
import VersionStatus from '@app/components/Layout/VersionStatus';
import useClickOutside from '@app/hooks/useClickOutside';
import { Permission, useUser } from '@app/hooks/useUser';
import defineMessages from '@app/utils/defineMessages';
import { Transition } from '@headlessui/react';
import {
  ClockIcon,
  CogIcon,
  ExclamationTriangleIcon,
  EyeSlashIcon,
  FilmIcon,
  SparklesIcon,
  TvIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

export const menuMessages = defineMessages('components.Layout.Sidebar', {
  dashboard: 'Discover',
  browsemovies: 'Movies',
  browsetv: 'Series',
  requests: 'Requests',
  blacklist: 'Blacklist',
  issues: 'Issues',
  users: 'Users',
  settings: 'Settings',
});

interface SidebarProps {
  open?: boolean;
  setClosed: () => void;
  pendingRequestsCount: number;
  openIssuesCount: number;
  revalidateIssueCount: () => void;
  revalidateRequestsCount: () => void;
}

interface SidebarLinkProps {
  href: string;
  svgIcon: React.ReactNode;
  messagesKey: keyof typeof menuMessages;
  activeRegExp: RegExp;
  as?: string;
  requiredPermission?: Permission | Permission[];
  permissionType?: 'and' | 'or';
  dataTestId?: string;
}

const SidebarLinks: SidebarLinkProps[] = [
  {
    href: '/',
    messagesKey: 'dashboard',
    svgIcon: <SparklesIcon className="mr-3 h-6 w-6" />,
    activeRegExp: /^\/(discover\/?)?$/,
  },
  {
    href: '/discover/movies',
    messagesKey: 'browsemovies',
    svgIcon: <FilmIcon className="mr-3 h-6 w-6" />,
    activeRegExp: /^\/discover\/movies$/,
  },
  {
    href: '/discover/tv',
    messagesKey: 'browsetv',
    svgIcon: <TvIcon className="mr-3 h-6 w-6" />,
    activeRegExp: /^\/discover\/tv$/,
  },
  {
    href: '/requests',
    messagesKey: 'requests',
    svgIcon: <ClockIcon className="mr-3 h-6 w-6" />,
    activeRegExp: /^\/requests/,
  },
  {
    href: '/blacklist',
    messagesKey: 'blacklist',
    svgIcon: <EyeSlashIcon className="mr-3 h-6 w-6" />,
    activeRegExp: /^\/blacklist/,
    requiredPermission: [
      Permission.MANAGE_BLACKLIST,
      Permission.VIEW_BLACKLIST,
    ],
    permissionType: 'or',
  },
  {
    href: '/issues',
    messagesKey: 'issues',
    svgIcon: <ExclamationTriangleIcon className="mr-3 h-6 w-6" />,
    activeRegExp: /^\/issues/,
    requiredPermission: [
      Permission.MANAGE_ISSUES,
      Permission.CREATE_ISSUES,
      Permission.VIEW_ISSUES,
    ],
    permissionType: 'or',
  },
  {
    href: '/users',
    messagesKey: 'users',
    svgIcon: <UsersIcon className="mr-3 h-6 w-6" />,
    activeRegExp: /^\/users/,
    requiredPermission: Permission.MANAGE_USERS,
    dataTestId: 'sidebar-menu-users',
  },
  {
    href: '/settings',
    messagesKey: 'settings',
    svgIcon: <CogIcon className="mr-3 h-6 w-6" />,
    activeRegExp: /^\/settings/,
    requiredPermission: Permission.ADMIN,
    dataTestId: 'sidebar-menu-settings',
  },
];

const Sidebar = ({
  open,
  setClosed,
  pendingRequestsCount,
  openIssuesCount,
  revalidateIssueCount,
  revalidateRequestsCount,
}: SidebarProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const intl = useIntl();
  const { hasPermission } = useUser();
  useClickOutside(navRef, () => setClosed());

  useEffect(() => {
    if (openIssuesCount) {
      revalidateIssueCount();
    }

    if (pendingRequestsCount) {
      revalidateRequestsCount();
    }
  }, [
    revalidateIssueCount,
    revalidateRequestsCount,
    pendingRequestsCount,
    openIssuesCount,
  ]);

  return (
    <>
      {/* Mobile/Tablet Sidebar */}
      <div className="lg:hidden">
        <Transition as={Fragment} show={open}>
          <div className="fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <Transition.Child
              as="div"
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0">
                <div className="absolute inset-0 bg-glass-black/90 backdrop-blur-sm"></div>
              </div>
            </Transition.Child>

            {/* Sidebar panel */}
            <Transition.Child
              as="div"
              enter="transition-transform ease-glass duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform ease-glass duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <>
                <div className="sidebar relative flex h-full w-full max-w-xs flex-1 flex-col border-r border-glass-border bg-glass-100/95 backdrop-blur-glass">
                  {/* Close button */}
                  <div className="sidebar-close-button absolute right-0 -mr-14 p-1">
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-glass-full bg-glass-200/50 backdrop-blur-glass-sm transition-all duration-200 hover:bg-glass-300 focus:outline-none focus:ring-2 focus:ring-apple-blue/50"
                      aria-label="Close sidebar"
                      onClick={() => setClosed()}
                    >
                      <XMarkIcon className="h-6 w-6 text-text-primary" />
                    </button>
                  </div>

                  <div
                    ref={navRef}
                    className="flex flex-1 flex-col overflow-y-auto pt-4 pb-8 sm:pb-4"
                  >
                    {/* Logo */}
                    <div className="flex flex-shrink-0 items-center px-2">
                      <span className="w-full px-4 text-xl text-text-primary">
                        <Link href="/" className="relative block h-24 w-64">
                          <Image src="/logo_full.svg" alt="Logo" fill />
                        </Link>
                      </span>
                    </div>

                    {/* Navigation links */}
                    <nav className="mt-10 flex-1 space-y-2 px-4">
                      {SidebarLinks.filter((link) =>
                        link.requiredPermission
                          ? hasPermission(link.requiredPermission, {
                              type: link.permissionType ?? 'and',
                            })
                          : true
                      ).map((sidebarLink) => {
                        const isActive = router.pathname.match(
                          sidebarLink.activeRegExp
                        );
                        return (
                          <Link
                            key={`mobile-${sidebarLink.messagesKey}`}
                            href={sidebarLink.href}
                            as={sidebarLink.as}
                            onClick={() => setClosed()}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                setClosed();
                              }
                            }}
                            role="button"
                            tabIndex={0}
                            className={`flex items-center rounded-glass px-3 py-3 text-base font-medium leading-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-apple-blue/50
                            ${
                              isActive
                                ? 'bg-apple-blue text-white shadow-glass-glow'
                                : 'text-text-secondary hover:bg-glass-200 hover:text-text-primary'
                            }
                          `}
                            data-testid={`${sidebarLink.dataTestId}-mobile`}
                          >
                            {sidebarLink.svgIcon}
                            {intl.formatMessage(
                              menuMessages[sidebarLink.messagesKey]
                            )}
                          </Link>
                        );
                      })}
                    </nav>

                    {/* User warnings */}
                    <div className="px-2">
                      <UserWarnings onClick={() => setClosed()} />
                    </div>

                    {/* Version status */}
                    {hasPermission(Permission.ADMIN) && (
                      <div className="px-2">
                        <VersionStatus onClick={() => setClosed()} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-14 flex-shrink-0">
                  {/* Force sidebar to shrink to fit close icon */}
                </div>
              </>
            </Transition.Child>
          </div>
        </Transition>
      </div>

      {/* Desktop Sidebar */}
      <div className="fixed top-0 bottom-0 left-0 z-30 hidden lg:flex lg:flex-shrink-0">
        <div className="sidebar flex w-64 flex-col border-r border-glass-border bg-glass-100/80 backdrop-blur-glass">
          <div className="flex h-0 flex-1 flex-col">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center">
                <span className="w-full px-4 py-2 text-2xl text-text-primary">
                  <Link href="/" className="relative block h-24">
                    <Image src="/logo_full.svg" alt="Logo" fill />
                  </Link>
                </span>
              </div>

              {/* Navigation links */}
              <nav className="mt-8 flex-1 space-y-2 px-4">
                {SidebarLinks.filter((link) =>
                  link.requiredPermission
                    ? hasPermission(link.requiredPermission, {
                        type: link.permissionType ?? 'and',
                      })
                    : true
                ).map((sidebarLink) => {
                  const isActive = router.pathname.match(
                    sidebarLink.activeRegExp
                  );
                  return (
                    <Link
                      key={`desktop-${sidebarLink.messagesKey}`}
                      href={sidebarLink.href}
                      as={sidebarLink.as}
                      className={`group flex items-center rounded-glass px-3 py-3 text-base font-medium leading-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-apple-blue/50
                              ${
                                isActive
                                  ? 'bg-apple-blue text-white shadow-glass-glow'
                                  : 'text-text-secondary hover:bg-glass-200 hover:text-text-primary'
                              }
                            `}
                      data-testid={sidebarLink.dataTestId}
                    >
                      {sidebarLink.svgIcon}
                      {intl.formatMessage(
                        menuMessages[sidebarLink.messagesKey]
                      )}
                      {sidebarLink.messagesKey === 'requests' &&
                        pendingRequestsCount > 0 &&
                        hasPermission(Permission.MANAGE_REQUESTS) && (
                          <div className="ml-auto flex">
                            <GlassBadge
                              variant={isActive ? 'default' : 'primary'}
                              size="sm"
                            >
                              {pendingRequestsCount}
                            </GlassBadge>
                          </div>
                        )}
                      {sidebarLink.messagesKey === 'issues' &&
                        openIssuesCount > 0 &&
                        hasPermission(Permission.MANAGE_ISSUES) && (
                          <div className="ml-auto flex">
                            <GlassBadge
                              variant={isActive ? 'default' : 'primary'}
                              size="sm"
                            >
                              {openIssuesCount}
                            </GlassBadge>
                          </div>
                        )}
                    </Link>
                  );
                })}
              </nav>

              {/* User warnings */}
              <div className="px-2">
                <UserWarnings />
              </div>

              {/* Version status */}
              {hasPermission(Permission.ADMIN) && (
                <div className="px-2">
                  <VersionStatus />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
