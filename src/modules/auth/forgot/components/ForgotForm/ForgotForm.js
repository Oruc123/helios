import { instanceOf, string } from 'prop-types';
import React, { PureComponent } from 'react';

import {
  AuthForm,
  AuthFormDefaultProps,
  AuthFormPropTypes,
  AuthInput,
  AuthLink,
  AuthSubmitButton
} from 'components/Auth';
import { FormPropTypes, withForm } from 'components/Form';
import bem from 'utils/bem';
import { filter } from 'utils/props';

import { ForgotFormModel } from './ForgotFormModel';
import './ForgotForm.scss';

// eslint-disable-next-line import/prefer-default-export
export const [ForgotForm, ForgotFormPropTypes, ForgotFormDefaultProps] = withForm(
  class ForgotForm extends PureComponent {
    static className = 'ForgotForm';

    static propTypes = {
      ...AuthFormPropTypes,
      ...FormPropTypes,
      loginLink: string.isRequired,
      value: instanceOf(ForgotFormModel).isRequired
    };

    static defaultProps = {
      ...AuthFormDefaultProps
    };

    render() {
      const { value, Field, loginLink, ...props } = this.props;
      const error = value.getError();

      let message = props.message;
      let messageType;

      if (error) {
        message = error.message;
        messageType = 'error';
      }

      // noinspection RequiredAttributes
      return (
        <AuthForm
          {...filter(props, AuthFormPropTypes)}
          message={message}
          messageType={messageType}
          className={bem.block(this)}
        >
          <Field
            name="email"
            input={AuthInput}
            input-type="email"
            input-placeholder="Email"
            input-autoComplete="email"
          />

          <div className={bem.element(this, 'buttons')}>
            <AuthSubmitButton isPending={value.isPending()} className={bem.element(this, 'submit')}>
              Reset
            </AuthSubmitButton>
            <AuthLink to={loginLink} className={bem.element(this, 'login')}>
              Return to Log In
            </AuthLink>
          </div>
        </AuthForm>
      );
    }
  }
);
