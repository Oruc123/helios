import { bool, element } from 'prop-types';
import React, { Children, cloneElement, PureComponent } from 'react';

import bem from 'utils/bem';
import { Icon, Iconed, IconedDefaultProps, IconedPropTypes } from 'components/Icon';
import { Sized, SizedDefaultProps, SizedPropTypes } from 'components/Sized';
import { filter } from 'utils/props';

import './InputLike.scss';
import { isElement } from 'react-is';

const { FACE_DEFAULT, FACE_ACTIVE, FACE_DANGER, SIZE_MEDIUM } = Icon;

export const InputLikePropTypes = {
  ...IconedPropTypes,
  ...SizedPropTypes,
  children: element,
  disabled: bool,
  focused: bool,
  invalid: bool,
  rounded: bool
};

export const InputLikeDefaultProps = {
  ...IconedDefaultProps,
  ...SizedDefaultProps,
  disabled: false,
  invalid: false,
  focused: false,
  rounded: false,
  'icon-size': SIZE_MEDIUM
};

export class InputLike extends PureComponent {
  static className = 'InputLike';

  static propTypes = {
    ...InputLikePropTypes
  };

  static defaultProps = {
    ...InputLikeDefaultProps
  };

  renderElement(element) {
    const { props: elementProps } = element;
    const { disabled, focused, invalid, rounded, size, ...props } = this.props;
    const className = bem.block(this, { disabled, focused, invalid, rounded }, elementProps.className);

    let iconFace = FACE_DEFAULT;

    if (invalid) {
      iconFace = FACE_DANGER;
    } else if (focused) {
      iconFace = FACE_ACTIVE;
    }

    return (
      <Sized size={size}>
        <Iconed
          {...filter(props, IconedPropTypes)}
          icon-face={iconFace}
          icon-className={bem.element(this, 'icon', null, props['icon-className'])}
        >
          {cloneElement(element, { className })}
        </Iconed>
      </Sized>
    );
  }

  render() {
    const { children } = this.props;
    const element = Children.only(children);

    return isElement(element) ? this.renderElement(element) : element;
  }
}
