import { bool } from 'prop-types';
import React, { PureComponent } from 'react';

import { Iconed } from 'components/Icon';
import bem from 'utils/bem';
import { filter } from 'utils/props';
import { SPRITE_ARROW_RIGHT_LONG, SPRITE_SPINNER } from 'sprites';

import { AuthButton, AuthButtonDefaultProps, AuthButtonPropTypes } from './AuthButton';
import './AuthSubmitButton.scss';

export const AuthSubmitButtonPropTypes = {
  ...AuthButtonPropTypes,
  isPending: bool
};

export const AuthSubmitButtonDefaultProps = {
  ...AuthButtonDefaultProps,
  isPending: false
};

export class AuthSubmitButton extends PureComponent {
  static propTypes = AuthSubmitButtonPropTypes;

  static defaultProps = AuthSubmitButtonDefaultProps;

  static className = 'AuthSubmitButton';

  render() {
    const { children, isPending, ...props } = this.props;

    return (
      <AuthButton
        {...filter(props, AuthButtonPropTypes)}
        type="submit"
        className={bem.block(this, { isPending })}
        icon={isPending ? SPRITE_SPINNER : SPRITE_ARROW_RIGHT_LONG}
        iconAlign={Iconed.ALIGN_RIGHT}
        icon-size={null}
        icon-face={null}
        icon-className={bem.element(this, 'icon', isPending ? 'spinner' : 'arrow', props['icon-className'])}
      >
        {children}
      </AuthButton>
    );
  }
}
