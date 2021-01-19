import { Icon, IconDefaultProps, IconPropTypes } from 'components/Icon';
import { bool } from 'prop-types';
import React, { PureComponent } from 'react';
import { SPRITE_DOWN } from 'sprites';
import bem from 'utils/bem';
import './InputArrow.scss';

export const InputArrowPropTypes = {
  ...IconPropTypes,
  rotate: bool
};

export const InputArrowDefaultProps = {
  ...IconDefaultProps,
  type: SPRITE_DOWN,
  rotate: true
};

export class InputArrow extends PureComponent {
  static className = 'InputArrow';

  static propTypes = {
    ...InputArrowPropTypes
  };

  static defaultProps = {
    ...InputArrowDefaultProps
  };

  render() {
    const { rotate, ...props } = this.props;

    return <Icon {...props} face={Icon.FACE_DEFAULT} size={Icon.SIZE_SMALL} className={bem.block(this, { rotate })} />;
  }
}
