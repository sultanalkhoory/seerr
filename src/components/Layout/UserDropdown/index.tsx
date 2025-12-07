import CachedImage from '@app/components/Common/CachedImage';
import MiniQuotaDisplay from '@app/components/Layout/UserDropdown/MiniQuotaDisplay';
import { Permission, useUser } from '@app/hooks/useUser';
import defineMessages from '@app/utils/defineMessages';
import { Menu, Transition } from '@headlessui/react';
import {
  ArrowRightOnRectangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { CogIcon, UserIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { forwardRef, Fragment } from 'react';
import { useIntl } from 'react-intl';

const messages = defineMessages('components.Layout.UserDropdown', {
  myprofile: 'Profile',
  settings: 'Settings',
  requests: 'Requests',
  signout: 'Sign Out',
});

const ForwardedLink = forwardRef<
  HTMLAnchorElement,
  LinkProps & React.ComponentPropsWithoutRef<'a'>
>(({ href, children, ...rest }, ref) => {
  return (
    <Link href={href} ref={ref} {...rest}>
      {children}
    </Link>
  );
});

ForwardedLink.displayName = 'ForwardedLink';

const UserDropdown = () => {
  const intl = useIntl();
  const { user, revalidate, hasPermission } = useUser();

  const logout = async () => {
    const response = await axios.post('/api/v1/auth/logout');

    if (response.data?.status === 'ok') {
      revalidate();
    }
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button
          className="flex max-w-xs items-center rounded-glass-full text-sm ring-2 ring-glass-border transition-all duration-200 hover:ring-glass-border-light focus:outline-none focus:ring-apple-blue/50"
          data-testid="user-menu"
        >
          <CachedImage
            type="avatar"
            className="h-8 w-8 rounded-glass-full object-cover sm:h-10 sm:w-10"
            src={user ? user.avatar : ''}
            alt=""
            width={40}
            height={40}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-glass duration-200"
        enterFrom="opacity-0 scale-95 translate-y-1"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="transition ease-glass duration-150"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 translate-y-1"
        appear
      >
        <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right rounded-glass shadow-glass-lg focus:outline-none">
          <div className="divide-y divide-glass-border rounded-glass border border-glass-border bg-glass-200/95 backdrop-blur-glass">
            {/* User info section */}
            <div className="flex flex-col space-y-4 px-4 py-4">
              <div className="flex items-center space-x-3">
                <CachedImage
                  type="avatar"
                  className="h-10 w-10 rounded-glass-full object-cover ring-2 ring-glass-border"
                  src={user ? user.avatar : ''}
                  alt=""
                  width={40}
                  height={40}
                />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-lg font-semibold text-text-primary">
                    {user?.displayName}
                  </span>
                  {user?.displayName?.toLowerCase() !== user?.email && (
                    <span className="truncate text-sm text-text-tertiary">
                      {user?.email}
                    </span>
                  )}
                </div>
              </div>
              {user && <MiniQuotaDisplay userId={user?.id} />}
            </div>

            {/* Menu items */}
            <div className="p-1.5">
              <Menu.Item>
                {({ active }) => (
                  <ForwardedLink
                    href={`/profile`}
                    className={`flex items-center rounded-glass-sm px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-apple-blue text-white'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    data-testid="user-menu-profile"
                  >
                    <UserIcon className="mr-3 inline h-5 w-5" />
                    <span>{intl.formatMessage(messages.myprofile)}</span>
                  </ForwardedLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <ForwardedLink
                    href={
                      hasPermission(
                        [Permission.MANAGE_REQUESTS, Permission.REQUEST_VIEW],
                        { type: 'or' }
                      )
                        ? `/users/${user?.id}/requests?filter=all`
                        : '/requests'
                    }
                    className={`flex items-center rounded-glass-sm px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-apple-blue text-white'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    data-testid="user-menu-requests"
                  >
                    <ClockIcon className="mr-3 inline h-5 w-5" />
                    <span>{intl.formatMessage(messages.requests)}</span>
                  </ForwardedLink>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <ForwardedLink
                    href={`/profile/settings`}
                    className={`flex items-center rounded-glass-sm px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-apple-blue text-white'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    data-testid="user-menu-settings"
                  >
                    <CogIcon className="mr-3 inline h-5 w-5" />
                    <span>{intl.formatMessage(messages.settings)}</span>
                  </ForwardedLink>
                )}
              </Menu.Item>

              {/* Divider */}
              <div className="my-1.5 border-t border-glass-border" />

              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`flex items-center rounded-glass-sm px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-status-error/20 text-status-error'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => logout()}
                  >
                    <ArrowRightOnRectangleIcon className="mr-3 inline h-5 w-5" />
                    <span>{intl.formatMessage(messages.signout)}</span>
                  </a>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
