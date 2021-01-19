import { InputText, InputTextDefaultProps, InputTextPropTypes } from 'components/Input';
import React, { PureComponent } from 'react';
import { SPRITE_ENVELOP, SPRITE_LOCK, SPRITE_PHONE } from 'sprites';
import bem from 'utils/bem';
import { filter } from 'utils/props';

import './AuthInput.scss';

export const AuthInputPropTypes = {
  ...InputTextPropTypes
};

export const AuthInputDefaultProps = {
  ...InputTextDefaultProps
};

export class AuthInput extends PureComponent {
  static className = 'AuthInput';

  static propTypes = {
    ...AuthInputPropTypes
  };

  static defaultProps = {
    ...AuthInputDefaultProps
  };

  render() {
    const { type, ...props } = this.props;
    let { icon } = props;

    if (!icon) {
      switch (type) {
        case InputText.TYPE_PASSWORD: {
          icon = SPRITE_LOCK;
          break;
        }
        case InputText.TYPE_EMAIL: {
          icon = SPRITE_ENVELOP;
          break;
        }
        case InputText.TYPE_PHONE: {
          icon = SPRITE_PHONE;
          break;
        }
        default:
          break;
      }
    }

    return (
      <InputText
        {...filter(props, InputTextPropTypes)}
        type={type}
        icon={icon}
        icon-className={bem.element(this, 'icon')}
        icon-size="medium"
        icon-light
        wrapper-className={bem.element(this, 'wrapper')}
        className={bem.block(this)}
      />
    );
  }
}
