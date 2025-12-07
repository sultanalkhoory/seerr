import { GlassButton, GlassInput } from '@app/components/GlassUI';
import SensitiveInput from '@app/components/Common/SensitiveInput';
import useSettings from '@app/hooks/useSettings';
import defineMessages from '@app/utils/defineMessages';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { ApiErrorCode } from '@server/constants/error';
import { MediaServerType, ServerType } from '@server/constants/server';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useIntl } from 'react-intl';
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';

const messages = defineMessages('components.Login', {
  loginwithapp: 'Login with {appName}',
  username: 'Username',
  password: 'Password',
  validationusernamerequired: 'Username required',
  validationpasswordrequired: 'Password required',
  loginerror: 'Something went wrong while trying to sign in.',
  adminerror: 'You must use an admin account to sign in.',
  noadminerror: 'No admin user found on the server.',
  credentialerror: 'The username or password is incorrect.',
  invalidurlerror: 'Unable to connect to {mediaServerName} server.',
  signingin: 'Signing In…',
  signin: 'Sign In',
  forgotpassword: 'Forgot Password?',
});

interface JellyfinLoginProps {
  revalidate: () => void;
  serverType?: MediaServerType;
}

const JellyfinLogin: React.FC<JellyfinLoginProps> = ({
  revalidate,
  serverType,
}) => {
  const toasts = useToasts();
  const intl = useIntl();
  const settings = useSettings();

  const mediaServerFormatValues = {
    mediaServerName:
      serverType === MediaServerType.JELLYFIN
        ? ServerType.JELLYFIN
        : serverType === MediaServerType.EMBY
        ? ServerType.EMBY
        : 'Media Server',
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(
      intl.formatMessage(messages.validationusernamerequired)
    ),
    password: Yup.string(),
  });

  const baseUrl = settings.currentSettings.jellyfinExternalHost
    ? settings.currentSettings.jellyfinExternalHost
    : settings.currentSettings.jellyfinHost;
  const jellyfinForgotPasswordUrl =
    settings.currentSettings.jellyfinForgotPasswordUrl;

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      validateOnBlur={false}
      onSubmit={async (values) => {
        try {
          await axios.post('/api/v1/auth/jellyfin', {
            username: values.username,
            password: values.password,
            email: values.username,
          });
        } catch (e) {
          let errorMessage = null;
          switch (e?.response?.data?.message) {
            case ApiErrorCode.InvalidUrl:
              errorMessage = messages.invalidurlerror;
              break;
            case ApiErrorCode.InvalidCredentials:
              errorMessage = messages.credentialerror;
              break;
            case ApiErrorCode.NotAdmin:
              errorMessage = messages.adminerror;
              break;
            case ApiErrorCode.NoAdminUser:
              errorMessage = messages.noadminerror;
              break;
            default:
              errorMessage = messages.loginerror;
              break;
          }
          toasts.addToast(
            intl.formatMessage(errorMessage, mediaServerFormatValues),
            {
              autoDismiss: true,
              appearance: 'error',
            }
          );
        } finally {
          revalidate();
        }
      }}
    >
      {({ errors, touched, isSubmitting, isValid }) => {
        return (
          <Form data-form-type="login">
            {/* Header */}
            <h2 className="mb-6 text-center text-xl font-semibold text-text-primary">
              {intl.formatMessage(messages.loginwithapp, {
                appName: mediaServerFormatValues.mediaServerName,
              })}
            </h2>

            {/* Username Field */}
            <div className="mb-4">
              <Field
                as={GlassInput}
                id="username"
                name="username"
                type="text"
                placeholder={intl.formatMessage(messages.username)}
                data-form-type="username"
                error={
                  errors.username && touched.username
                    ? errors.username
                    : undefined
                }
                autoComplete="username"
              />
            </div>

            {/* Password Field */}
            <div className="mb-2">
              <div className="relative">
                <SensitiveInput
                  as="field"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={intl.formatMessage(messages.password)}
                  className="glass-input w-full pr-10"
                  data-form-type="password"
                  data-1pignore="false"
                  data-lpignore="false"
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                {errors.password && touched.password ? (
                  <span className="text-xs text-status-error">
                    {errors.password}
                  </span>
                ) : (
                  <span />
                )}
                {baseUrl && (
                  <a
                    href={
                      jellyfinForgotPasswordUrl
                        ? `${jellyfinForgotPasswordUrl}`
                        : `${baseUrl}/web/index.html#!/${
                            settings.currentSettings.mediaServerType ===
                            MediaServerType.EMBY
                              ? 'startup/'
                              : ''
                          }forgotpassword.html`
                    }
                    className="text-sm text-apple-blue transition-colors hover:text-apple-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {intl.formatMessage(messages.forgotpassword)}
                  </a>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <GlassButton
              variant="primary"
              type="submit"
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              className="mt-4 w-full"
              rightIcon={!isSubmitting && <ArrowRightOnRectangleIcon className="h-5 w-5" />}
            >
              {isSubmitting
                ? intl.formatMessage(messages.signingin)
                : intl.formatMessage(messages.signin)}
            </GlassButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default JellyfinLogin;
