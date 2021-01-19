import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { Button, ButtonPropTypes } from 'components/Button';
import './AuthButton.scss';

export const AuthButtonPropTypes = {
  ...ButtonPropTypes
};

export const AuthButtonDefaultProps = {
  error: null
};

export class AuthButton extends PureComponent {
  static propTypes = { ...AuthButtonPropTypes };

  static defaultProps = AuthButtonDefaultProps;

  static className = 'AuthButton';

  render() {
    const { type, ...props } = this.props;

    // noinspection RequiredAttributes
    return (
      <Button
        {...props}
        size="large"
        rounded
        icon-className={bem.element(this, 'icon', null, props['icon-className'])}
        className={bem.block(this)}
      />
    );
  }
}
