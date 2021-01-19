import * as React from 'react';
import {
  AuthForm,
  AuthFormPropTypes,
  AuthInput,
  AuthSubmitButton,
} from 'components/Auth';
import { withForm } from 'components/Form';
import { filter } from 'utils/props';
import { NewPasswordFormModel } from '../../models';

import * as styles from './styles.module.css';

interface Properties {
  value: typeof NewPasswordFormModel;
  Field: any;
  message: string;
}

const [newPasswordForm] = withForm((properties: Properties) => {
  const { value, Field, message, ...props } = properties;
  const error = value.getError();

  return (<AuthForm
    {...filter(props, AuthFormPropTypes)}
    message={error ? error.message : message}
    messageType={error ? 'error' : undefined}
    >
    <span className={styles.hint}>Input your new password:</span>
    <Field
      name="password"
      input={AuthInput}
      input-type="password"
      input-placeholder="Password"
      input-autoComplete="password"
      />
    <AuthSubmitButton
      className={styles.buttons}
      isPending={value.isPending()}
      >
        Submit
    </AuthSubmitButton>
  </AuthForm>
  );
});

export {
  newPasswordForm as NewPasswordForm,
};
