import { GlassButton, GlassInput } from '@app/components/GlassUI';
import SensitiveInput from '@app/components/Common/SensitiveInput';
import useSettings from '@app/hooks/useSettings';
import defineMessages from '@app/utils/defineMessages';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';

const messages = defineMessages('components.Login', {
  loginwithapp: 'Login with {appName}',
  username: 'Username',
  email: 'Email Address',
  password: 'Password',
  validationemailrequired: 'You must provide a valid email address',
  validationpasswordrequired: 'You must provide a password',
  loginerror: 'Something went wrong while trying to sign in.',
  signingin: 'Signing In…',
  signin: 'Sign In',
  forgotpassword: 'Forgot Password?',
});

interface LocalLoginProps {
  revalidate: () => void;
}

const LocalLogin = ({ revalidate }: LocalLoginProps) => {
  const intl = useIntl();
  const settings = useSettings();
  const [loginError, setLoginError] = useState<string | null>(null);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(
      intl.formatMessage(messages.validationemailrequired)
    ),
    password: Yup.string().required(
      intl.formatMessage(messages.validationpasswordrequired)
    ),
  });

  const passwordResetEnabled =
    settings.currentSettings.applicationUrl &&
    settings.currentSettings.emailEnabled;

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      validateOnBlur={false}
      onSubmit={async (values) => {
        try {
          setLoginError(null);
          await axios.post('/api/v1/auth/local', {
            email: values.email,
            password: values.password,
          });
        } catch (e) {
          setLoginError(intl.formatMessage(messages.loginerror));
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
                appName: settings.currentSettings.applicationTitle,
              })}
            </h2>

            {/* Email/Username Field */}
            <div className="mb-4">
              <Field
                as={GlassInput}
                id="email"
                name="email"
                placeholder={`${intl.formatMessage(
                  messages.email
                )} / ${intl.formatMessage(messages.username)}`}
                type="text"
                inputMode="email"
                data-testid="email"
                data-form-type="username,email"
                error={
                  errors.email && touched.email && typeof errors.email === 'string'
                    ? errors.email
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
                  placeholder={intl.formatMessage(messages.password)}
                  autoComplete="current-password"
                  data-testid="password"
                  data-form-type="password"
                  className="glass-input w-full pr-10"
                  data-1pignore="false"
                  data-lpignore="false"
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                {errors.password &&
                touched.password &&
                typeof errors.password === 'string' ? (
                  <span className="text-xs text-status-error">
                    {errors.password}
                  </span>
                ) : (
                  <span />
                )}
                {passwordResetEnabled && (
                  <Link
                    href="/resetpassword"
                    className="text-sm text-apple-blue transition-colors hover:text-apple-blue-400"
                  >
                    {intl.formatMessage(messages.forgotpassword)}
                  </Link>
                )}
              </div>
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="mb-4 rounded-glass-sm border border-status-error/30 bg-status-error/10 px-3 py-2">
                <span className="text-sm text-status-error">{loginError}</span>
              </div>
            )}

            {/* Submit Button */}
            <GlassButton
              variant="primary"
              type="submit"
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              data-testid="local-signin-button"
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

export default LocalLogin;
