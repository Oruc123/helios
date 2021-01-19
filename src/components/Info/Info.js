import { node } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes, LabelPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import 'components/Info/Info.scss';

export const InfoPropTypes = {
  ...ElementPropTypes,
  ...prefixBy('label', LabelPropTypes),
  label: node
};

export const InfoDefaultProps = {
  label: undefined
};

export class Info extends PureComponent {
  static propTypes = {
    ...InfoPropTypes
  };

  static defaultProps = {
    ...InfoDefaultProps
  };

  static className = 'Info';

  renderLabel() {
    const { invalid, label } = this.props;

    if (label) {
      const labelProps = prefixed(this.props, 'label');

      return (
        // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
        <label
          {...filter(labelProps, LabelPropTypes)}
          className={bem.element(this, 'label', { invalid }, labelProps.className)}
        >
          {label}
        </label>
      );
    }

    return null;
  }

  render() {
    const { children, label, ...props } = unprefixed(this.props, 'label', 'message');

    return (
      <div {...filter(props, ElementPropTypes)} className={bem.block(this, { label: Boolean(label) })}>
        {this.renderLabel()}
        <div className={bem.element(this, 'content')}>{children}</div>
      </div>
    );
  }
}
