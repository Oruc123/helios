import { Icon, IconDefaultProps, IconPropTypes } from 'components/Icon';
import React, { PureComponent } from 'react';
import { SPRITE_CLEAR } from 'sprites';
import bem from 'utils/bem';
import './InputClear.scss';

export const InputClearPropTypes = {
  ...IconPropTypes
};

export const InputClearDefaultProps = {
  ...IconDefaultProps,
  type: SPRITE_CLEAR
};

export class InputClear extends PureComponent {
  static className = 'InputClear';

  static propTypes = {
    ...InputClearPropTypes
  };

  static defaultProps = {
    ...InputClearDefaultProps
  };

  render() {
    return <Icon {...this.props} face={Icon.FACE_DEFAULT} size={Icon.SIZE_SMALL} className={bem.block(this)} />;
  }
}
