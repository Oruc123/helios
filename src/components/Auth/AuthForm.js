import { node, string } from 'prop-types';
import React, { PureComponent } from 'react';

import { Sprite } from 'components/Sprite';
import bem from 'utils/bem';
import { filter } from 'utils/props';
import { FormPropTypes } from 'utils/prop-types';

import './AuthForm.scss';

export const AuthFormPropTypes = {
  ...FormPropTypes,
  title: node,
  message: node,
  messageType: string
};

export const AuthFormDefaultProps = {
  title: 'Welcome to Helios',
  message: null,
  messageType: 'info'
};

export class AuthForm extends PureComponent {
  static propTypes = AuthFormPropTypes;

  static defaultProps = AuthFormDefaultProps;

  static className = 'AuthForm';

  renderMessage() {
    const { message, messageType: type } = this.props;

    return (
      <div className={bem.element(this, 'message', type)}>
        <Sprite type="info" className={bem.element(this, 'messageIcon')} />
        {message}
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    return <h1 className={bem.element(this, 'title')}>{title}</h1>;
  }

  render() {
    const { children, message, title, ...props } = this.props;

    return (
      <form {...filter(props, FormPropTypes)} noValidate className={bem.block(this, { message: Boolean(message) })}>
        {message ? this.renderMessage() : null}
        {title ? this.renderTitle() : null}
        {children}
      </form>
    );
  }
}
