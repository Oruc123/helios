import { bool } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import './Layer.scss';

export const LayerPropTypes = {
  rounded: bool,
  shadowed: bool
};

export const LayerDefaultProps = {
  rounded: true,
  shadowed: true
};

export class Layer extends PureComponent {
  static className = 'Layer';

  static propTypes = LayerPropTypes;

  static defaultProps = LayerDefaultProps;

  render() {
    const { rounded, shadowed, ...props } = this.props;

    return (
      <div
        {...filter(props, ElementPropTypes)}
        className={bem.block(this, { rounded: Boolean(rounded), shadowed: Boolean(shadowed) })}
      />
    );
  }
}
