import { Icon } from 'components/Icon';
import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';

import { Button } from 'components/Button';
import bem from 'utils/bem';
import { FormPropTypes, withForm } from 'components/Form';
import { InputText } from 'components/Input';
import { FormPropTypes as FormElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import { LoginFormModel } from './LoginFormModel';

// eslint-disable-next-line import/prefer-default-export
export const [LoginForm, LoginFormPropTypes, LoginFormDefaultProps] = withForm(
  class extends PureComponent {
    static className = 'LoginForm';

    static propTypes = {
      ...FormPropTypes,
      value: instanceOf(LoginFormModel).isRequired
    };

    render() {
      const { Field, value, ...props } = this.props;

      // noinspection RequiredAttributes
      return (
        <form {...filter(props, FormElementPropTypes)} autoComplete="off" className={bem.block(this)}>
          <Field
            name="username"
            input={InputText}
            input-icon="envelop"
            input-id="login-username"
            input-type="text"
            input-autoComplete="off"
            input-className={bem.element(this, 'input')}
            label="Username"
            label-htmlFor="login-username"
            message="username or email"
          />
          <Field
            name="password"
            input={InputText}
            input-icon="lock"
            input-id="login-password"
            input-type="password"
            input-autoComplete="new-password"
            input-className={bem.element(this, 'input')}
            label="Password"
            label-htmlFor="login-password"
          />
          <div className={bem.element(this, 'buttons')}>
            <Button type="submit" face="primary" className={bem.element(this, 'submit')}>
              {value.isPending() ? <Icon type="loading" style={{ fontSize: 24 }} /> : 'Submit'}
            </Button>
          </div>
        </form>
      );
    }
  }
);
