import PlexIcon from '@app/assets/services/plex.svg';
import { GlassButton, GlassSpinner } from '@app/components/GlassUI';
import usePlexLogin from '@app/hooks/usePlexLogin';
import defineMessages from '@app/utils/defineMessages';
import { FormattedMessage } from 'react-intl';

const messages = defineMessages('components.Login', {
  loginwithapp: 'Login with {appName}',
});

interface PlexLoginButtonProps {
  onAuthToken: (authToken: string) => void;
  isProcessing?: boolean;
  onError?: (message: string) => void;
  large?: boolean;
}

const PlexLoginButton = ({
  onAuthToken,
  onError,
  isProcessing,
  large,
}: PlexLoginButtonProps) => {
  const { loading, login } = usePlexLogin({ onAuthToken, onError });

  return (
    <GlassButton
      className="relative flex-1 border-[#e5a00d]/50 bg-[#e5a00d]/20 text-[#e5a00d] hover:bg-[#e5a00d]/30 hover:border-[#e5a00d]/70"
      onClick={login}
      disabled={loading || isProcessing}
      data-testid="plex-login-button"
    >
      {loading && (
        <div className="absolute right-3">
          <GlassSpinner size="sm" className="text-[#e5a00d]" />
        </div>
      )}

      {large ? (
        <FormattedMessage
          {...messages.loginwithapp}
          values={{
            appName: <PlexIcon className="mt-[2px] ml-2 w-8" />,
          }}
        >
          {(chunks) => (
            <span className="flex items-center">
              {chunks.map((c, i) =>
                typeof c === 'string' ? <span key={i}>{c}</span> : c
              )}
            </span>
          )}
        </FormattedMessage>
      ) : (
        <PlexIcon className="w-8" />
      )}
    </GlassButton>
  );
};

export default PlexLoginButton;
