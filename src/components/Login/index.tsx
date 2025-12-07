import EmbyLogo from '@app/assets/services/emby-icon-only.svg';
import JellyfinLogo from '@app/assets/services/jellyfin-icon.svg';
import PlexLogo from '@app/assets/services/plex.svg';
import CachedImage from '@app/components/Common/CachedImage';
import PageTitle from '@app/components/Common/PageTitle';
import { GlassAlert, GlassButton, GlassCard } from '@app/components/GlassUI';
import LanguagePicker from '@app/components/Layout/LanguagePicker';
import JellyfinLogin from '@app/components/Login/JellyfinLogin';
import LocalLogin from '@app/components/Login/LocalLogin';
import PlexLoginButton from '@app/components/Login/PlexLoginButton';
import useSettings from '@app/hooks/useSettings';
import { useUser } from '@app/hooks/useUser';
import defineMessages from '@app/utils/defineMessages';
import { Transition } from '@headlessui/react';
import { MediaServerType } from '@server/constants/server';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import useSWR from 'swr';

const messages = defineMessages('components.Login', {
  signin: 'Sign In',
  signinheader: 'Sign in to continue',
  signinwithplex: 'Use your Plex account',
  signinwithjellyfin: 'Use your {mediaServerName} account',
  signinwithoverseerr: 'Use your {applicationTitle} account',
  orsigninwith: 'Or sign in with',
});

const Login = () => {
  const intl = useIntl();
  const router = useRouter();
  const settings = useSettings();
  const { user, revalidate } = useUser();

  const [error, setError] = useState('');
  const [isProcessing, setProcessing] = useState(false);
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [mediaServerLogin, setMediaServerLogin] = useState(
    settings.currentSettings.mediaServerLogin
  );
  const [activeBackdrop, setActiveBackdrop] = useState(0);

  // Effect that is triggered when the `authToken` comes back from the Plex OAuth
  useEffect(() => {
    const login = async () => {
      setProcessing(true);
      try {
        const response = await axios.post('/api/v1/auth/plex', { authToken });

        if (response.data?.id) {
          revalidate();
        }
      } catch (e) {
        setError(e.response?.data?.message);
        setAuthToken(undefined);
        setProcessing(false);
      }
    };
    if (authToken) {
      login();
    }
  }, [authToken, revalidate]);

  // Redirect on successful login
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const { data: backdrops } = useSWR<string[]>('/api/v1/backdrops', {
    refreshInterval: 0,
    refreshWhenHidden: false,
    revalidateOnFocus: false,
  });

  // Backdrop rotation
  useEffect(() => {
    if (!backdrops?.length) return;
    const interval = setInterval(() => {
      setActiveBackdrop((prev) => (prev + 1) % backdrops.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backdrops]);

  const mediaServerName =
    settings.currentSettings.mediaServerType === MediaServerType.PLEX
      ? 'Plex'
      : settings.currentSettings.mediaServerType === MediaServerType.JELLYFIN
      ? 'Jellyfin'
      : settings.currentSettings.mediaServerType === MediaServerType.EMBY
      ? 'Emby'
      : undefined;

  const MediaServerLogo =
    settings.currentSettings.mediaServerType === MediaServerType.PLEX
      ? PlexLogo
      : settings.currentSettings.mediaServerType === MediaServerType.JELLYFIN
      ? JellyfinLogo
      : settings.currentSettings.mediaServerType === MediaServerType.EMBY
      ? EmbyLogo
      : undefined;

  const isJellyfin =
    settings.currentSettings.mediaServerType === MediaServerType.JELLYFIN ||
    settings.currentSettings.mediaServerType === MediaServerType.EMBY;
  const mediaServerLoginRef = useRef<HTMLDivElement>(null);
  const localLoginRef = useRef<HTMLDivElement>(null);
  const loginRef = mediaServerLogin ? mediaServerLoginRef : localLoginRef;

  const loginFormVisible =
    (isJellyfin && settings.currentSettings.mediaServerLogin) ||
    settings.currentSettings.localLogin;

  const additionalLoginOptions = [
    settings.currentSettings.mediaServerLogin &&
      (settings.currentSettings.mediaServerType === MediaServerType.PLEX ? (
        <PlexLoginButton
          key="plex"
          isProcessing={isProcessing}
          onAuthToken={(authToken) => setAuthToken(authToken)}
          large={!isJellyfin && !settings.currentSettings.localLogin}
        />
      ) : (
        settings.currentSettings.localLogin &&
        (mediaServerLogin ? (
          <GlassButton
            key="seerr"
            data-testid="seerr-login-button"
            variant="ghost"
            className="flex-1"
            onClick={() => setMediaServerLogin(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/os_icon.svg"
              alt={settings.currentSettings.applicationTitle}
              className="mr-2 h-5"
            />
            <span>{settings.currentSettings.applicationTitle}</span>
          </GlassButton>
        ) : (
          <GlassButton
            key="mediaserver"
            data-testid="mediaserver-login-button"
            variant="ghost"
            className="flex-1"
            onClick={() => setMediaServerLogin(true)}
          >
            <MediaServerLogo className="mr-2 h-5 w-5" />
            <span>{mediaServerName}</span>
          </GlassButton>
        ))
      )),
  ].filter((o): o is JSX.Element => !!o);

  return (
    <div className="relative flex min-h-screen flex-col bg-glass-black">
      <PageTitle title={intl.formatMessage(messages.signin)} />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {backdrops?.map((backdrop, i) => (
          <div
            key={`backdrop-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === activeBackdrop ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <CachedImage
              type="tmdb"
              src={`https://image.tmdb.org/t/p/original${backdrop}`}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
          </div>
        ))}
        {/* Gradient overlays for glass effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-glass-black via-glass-black/80 to-glass-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-glass-black/50 via-transparent to-glass-black/50" />
        {/* Radial glow */}
        <div className="absolute inset-0 glass-gradient-radial opacity-50" />
      </div>

      {/* Language Picker */}
      <div className="absolute top-4 right-4 z-50">
        <LanguagePicker />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <div className="relative h-32 w-64 sm:h-40 sm:w-80">
            <Image
              src="/logo_stacked.svg"
              alt="Logo"
              fill
              priority
              className="drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md animate-fade-in-up">
          <GlassCard variant="prominent" className="p-0 overflow-hidden">
            {/* Error Alert */}
            <Transition
              show={!!error}
              enter="transition-all duration-300"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition-all duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="p-4 pb-0">
                <GlassAlert variant="error" onClose={() => setError('')}>
                  {error}
                </GlassAlert>
              </div>
            </Transition>

            {/* Login Form */}
            <div className="p-8">
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={mediaServerLogin ? 'ms' : 'local'}
                  nodeRef={loginRef}
                  addEndListener={(done) => {
                    loginRef.current?.addEventListener(
                      'transitionend',
                      done,
                      false
                    );
                  }}
                  onEntered={() => {
                    document
                      .querySelector<HTMLInputElement>('#email, #username')
                      ?.focus();
                  }}
                  classNames={{
                    appear: 'opacity-0',
                    appearActive: 'transition-opacity duration-300 opacity-100',
                    enter: 'opacity-0',
                    enterActive: 'transition-opacity duration-300 opacity-100',
                    exitActive: 'transition-opacity duration-150 opacity-0',
                  }}
                >
                  <div ref={loginRef}>
                    {isJellyfin &&
                    (mediaServerLogin ||
                      !settings.currentSettings.localLogin) ? (
                      <JellyfinLogin
                        serverType={settings.currentSettings.mediaServerType}
                        revalidate={revalidate}
                      />
                    ) : (
                      settings.currentSettings.localLogin && (
                        <LocalLogin revalidate={revalidate} />
                      )
                    )}
                  </div>
                </CSSTransition>
              </SwitchTransition>

              {/* Additional Login Options */}
              {additionalLoginOptions.length > 0 && (
                <>
                  {loginFormVisible ? (
                    <div className="flex items-center py-6">
                      <div className="flex-grow border-t border-glass-border" />
                      <span className="mx-4 text-sm text-text-tertiary">
                        {intl.formatMessage(messages.orsigninwith)}
                      </span>
                      <div className="flex-grow border-t border-glass-border" />
                    </div>
                  ) : (
                    <h2 className="mb-6 text-center text-lg font-semibold text-text-primary">
                      {intl.formatMessage(messages.signinheader)}
                    </h2>
                  )}

                  <div
                    className={`flex w-full flex-wrap gap-3 ${
                      !loginFormVisible ? 'flex-col' : ''
                    }`}
                  >
                    {additionalLoginOptions}
                  </div>
                </>
              )}
            </div>
          </GlassCard>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-text-muted">
            Powered by{' '}
            <span className="text-seerr font-medium">Seerr</span>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-glass-black to-transparent pointer-events-none z-5" />
    </div>
  );
};

export default Login;
