import MobileMenu from '@app/components/Layout/MobileMenu';
import PullToRefresh from '@app/components/Layout/PullToRefresh';
import SearchInput from '@app/components/Layout/SearchInput';
import Sidebar from '@app/components/Layout/Sidebar';
import UserDropdown from '@app/components/Layout/UserDropdown';
import useLocale from '@app/hooks/useLocale';
import useSettings from '@app/hooks/useSettings';
import { useUser } from '@app/hooks/useUser';
import { ArrowLeftIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import type { AvailableLocale } from '@server/types/languages';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { currentSettings } = useSettings();
  const { setLocale } = useLocale();
  const { data: requestResponse, mutate: revalidateRequestsCount } = useSWR(
    '/api/v1/request/count',
    {
      revalidateOnMount: true,
    }
  );
  const { data: issueResponse, mutate: revalidateIssueCount } = useSWR(
    '/api/v1/issue/count',
    {
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    if (setLocale && user) {
      setLocale(
        (user?.settings?.locale
          ? user.settings.locale
          : currentSettings.locale) as AvailableLocale
      );
    }
  }, [setLocale, currentSettings.locale, user]);

  useEffect(() => {
    const updateScrolled = () => {
      if (window.pageYOffset > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', updateScrolled, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrolled);
    };
  }, []);

  return (
    <div className="flex h-full min-h-full min-w-0 bg-glass-black">
      {/* PWA top border */}
      <div className="pwa-only fixed inset-0 z-20 h-1 w-full border-glass-border md:border-t" />

      {/* Background gradient */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle radial gradient for depth */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-apple-blue/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-apple-blue/3 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar */}
      <Sidebar
        open={isSidebarOpen}
        setClosed={() => setSidebarOpen(false)}
        pendingRequestsCount={requestResponse?.pending ?? 0}
        openIssuesCount={issueResponse?.open ?? 0}
        revalidateIssueCount={() => revalidateIssueCount()}
        revalidateRequestsCount={() => revalidateRequestsCount()}
      />

      {/* Mobile Menu */}
      <div className="sm:hidden">
        <MobileMenu
          pendingRequestsCount={requestResponse?.pending ?? 0}
          openIssuesCount={issueResponse?.open ?? 0}
          revalidateIssueCount={() => revalidateIssueCount()}
          revalidateRequestsCount={() => revalidateRequestsCount()}
        />
      </div>

      {/* Main content area */}
      <div className="relative mb-16 flex w-0 min-w-0 flex-1 flex-col lg:ml-64">
        <PullToRefresh />

        {/* Top navigation bar */}
        <div
          className={`searchbar fixed left-0 right-0 top-0 z-10 flex flex-shrink-0 transition-all duration-300 lg:left-64 ${
            isScrolled
              ? 'bg-glass-200/80 border-b border-glass-border shadow-glass-sm'
              : 'bg-transparent border-b border-transparent'
          }`}
          style={{
            backdropFilter: isScrolled ? 'blur(20px)' : undefined,
            WebkitBackdropFilter: isScrolled ? 'blur(20px)' : undefined,
          }}
        >
          <div className="flex flex-1 items-center justify-between px-4 md:pr-4 md:pl-4">
            {/* Sidebar toggle button (tablet) */}
            <button
              className={`mr-2 hidden text-text-primary sm:block transition-all duration-300 focus:outline-none lg:hidden ${
                isScrolled ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
              aria-label="Open sidebar"
              onClick={() => setSidebarOpen(true)}
              data-testid="sidebar-toggle"
            >
              <Bars3BottomLeftIcon className="h-7 w-7" />
            </button>

            {/* Back button (PWA only) */}
            <button
              className={`mr-2 text-text-primary pwa-only transition-all duration-300 hover:text-white focus:text-white focus:outline-none ${
                isScrolled ? 'opacity-100' : 'opacity-70'
              }`}
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="w-7" />
            </button>

            {/* Search input */}
            <SearchInput />

            {/* User dropdown */}
            <div className="flex items-center">
              <UserDropdown />
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="relative top-16 z-0 focus:outline-none" tabIndex={0}>
          <div className="mb-6">
            <div className="max-w-8xl mx-auto px-4">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
