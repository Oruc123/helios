import { bool, node } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes, LabelPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import 'components/Field/Field.scss';

export const FieldPropTypes = {
  ...ElementPropTypes,
  ...prefixBy('label', LabelPropTypes),
  ...prefixBy('message', ElementPropTypes),
  invalid: bool,
  label: node,
  message: node
};

export const FieldDefaultProps = {
  invalid: false,
  label: null,
  message: null
};

export class Field extends PureComponent {
  static propTypes = FieldPropTypes;

  static defaultProps = FieldDefaultProps;

  static className = 'Field';

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

  renderMessage() {
    const { invalid, message } = this.props;

    if (message) {
      const messageProps = prefixed(this.props, 'message');

      return (
        <div
          {...filter(messageProps, ElementPropTypes)}
          className={bem.element(this, 'message', { invalid }, messageProps.className)}
        >
          {message}
        </div>
      );
    }

    return null;
  }

  render() {
    const { children, invalid, label, message, ...props } = unprefixed(this.props, 'label', 'message');

    return (
      <div
        {...filter(props, ElementPropTypes)}
        className={bem.block(this, { invalid, label: Boolean(label), message: Boolean(message) })}
      >
        {this.renderLabel()}
        {children}
        {this.renderMessage()}
      </div>
    );
  }
}
