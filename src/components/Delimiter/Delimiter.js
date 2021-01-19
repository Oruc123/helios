import React, { PureComponent } from 'react';

import { Sized, SizedPropTypes } from 'components/Sized';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import './Delimiter.scss';

export const DelimiterPropTypes = {
  ...ElementPropTypes,
  ...SizedPropTypes
};

export const DelimiterDefaultProps = {
  size: Sized.SIZE_MEDIUM
};

/**
 * Delimiter component
 */
export class Delimiter extends PureComponent {
  static propTypes = { ...DelimiterPropTypes };

  static defaultProps = { ...DelimiterDefaultProps };

  static className = 'Delimiter';

  render() {
    const { size, ...props } = this.props;

    return (
      <Sized size={size}>
        <div {...filter(props, ElementPropTypes)} className={bem.block(this)} />
      </Sized>
    );
  }
}
