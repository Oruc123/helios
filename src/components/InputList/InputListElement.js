import { Icon, Iconed, IconedDefaultProps, IconedPropTypes } from 'components/Icon';
import { any, func, node, oneOfType } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import './InputListElement.scss';

const { FACE_DEFAULT, FACE_ACTIVE } = Iconed;

export const InputListElementPropTypes = {
  ...IconedPropTypes,
  ...ElementPropTypes,
  ...prefixBy('label', ElementPropTypes),
  label: oneOfType([func, node]),
  value: any
};

export const InputListElementDefaultProps = {
  ...IconedDefaultProps,
  label: undefined,
  renderer: 'div',
  value: undefined
};

export class InputListElement extends PureComponent {
  static className = 'InputListElement';

  static propTypes = {
    ...InputListElementPropTypes
  };

  static defaultProps = {
    ...InputListElementDefaultProps
  };

  renderLabel() {
    const { label, ...props } = this.props;

    const labelProps = prefixed(props, 'label');

    return (
      <span
        {...filter(labelProps, ElementPropTypes)}
        key="label"
        className={bem.element(this, 'label', null, labelProps.className)}
      >
        {typeof label === 'function' ? label(props) : label}
      </span>
    );
  }

  render() {
    const { children, selected, ...props } = this.props;

    return (
      <Iconed
        {...filter(props, IconedPropTypes)}
        icon-face={selected ? FACE_ACTIVE : FACE_DEFAULT}
        icon-size={Icon.SIZE_MEDIUM}
        icon-className={bem.element(this, 'icon', { selected }, props['icon-className'])}
      >
        <div
          {...unprefixed(filter(props, ElementPropTypes), 'icon', 'label')}
          className={bem.block(this, { selected })}
        >
          {this.renderLabel()}
          {children}
        </div>
      </Iconed>
    );
  }
}
