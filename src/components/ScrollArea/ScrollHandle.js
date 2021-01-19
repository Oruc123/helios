import { number, oneOf } from 'prop-types';
import React, { PureComponent } from 'react';

import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';
import { translate3d } from 'utils/html';

class ScrollHandle extends PureComponent {
  static propTypes = {
    ...ElementPropTypes,
    orientation: oneOf(['horizontal', 'vertical']).isRequired,
    pos: number,
    size: number
  };

  static defaultProps = {
    pos: 0,
    size: 0
  };

  static get name() {
    return 'ScrollHandle';
  }

  render() {
    const { orientation, pos, size, ...props } = this.props;

    const style = {
      ...translate3d({ [orientation === 'horizontal' ? 'left' : 'top']: pos }),
      [orientation === 'horizontal' ? 'width' : 'height']: `${size}%`
    };

    return (
      <div
        ref={this.ref('element')}
        {...filter(props, ElementPropTypes)}
        className={this.block({ [orientation]: true })}
        style={style}
      />
    );
  }
}

export default ScrollHandle;
