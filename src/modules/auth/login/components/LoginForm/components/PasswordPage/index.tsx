import * as React from 'react';
import {
  AuthInput,
  AuthLink,
  AuthSubmitButton,
} from 'components/Auth';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  isPending: boolean;
  forgotLink: string;
}

const passwordPage = (properties: Properties) => {
  const { Field, isPending, forgotLink } = properties;

  return (<>
    <Field
      name="username"
      input={AuthInput}
      input-type="email"
      input-placeholder="Email"
      input-autoComplete="username"
    />
    <Field
      name="password"
      input={AuthInput}
      input-type="password"
      input-placeholder="Password"
      input-autoComplete="current-password"
    />
    <div className={styles.buttons}>
      <AuthSubmitButton
        isPending={isPending}
        className={styles.submit}
      >
        Log in
      </AuthSubmitButton>
      <AuthLink to={forgotLink}>Forgot password?</AuthLink>
    </div>
  </>);
};

export {
  passwordPage as PasswordPage,
};
