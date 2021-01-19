import { number, oneOfType, string } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { filter } from 'utils/props';
import './InputNumber.scss';
import { InputText, InputTextDefaultProps, InputTextPropTypes } from './InputText';

export const InputNumberPropTypes = {
  ...InputTextPropTypes,
  value: oneOfType([number, string])
};

export const InputNumberDefaultProps = {
  ...InputTextDefaultProps
};

export class InputNumber extends PureComponent {
  static className = 'InputNumber';

  static propTypes = {
    ...InputNumberPropTypes
  };

  static defaultProps = {
    ...InputNumberDefaultProps
  };

  validator = value => (/^-?(\d+|\d+\.\d+|\.\d+)?$/.test(value) ? null : '');

  handleChange = value => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      const numValue = parseFloat(value);

      onChange(Number.isNaN(numValue) ? value : numValue);
    }
  };

  render() {
    const { validator, value, ...props } = this.props;

    return (
      <InputText
        {...filter(props, InputTextPropTypes)}
        type={InputText.TYPE_NUMBER}
        validator={validator || this.validator}
        value={value == null ? null : String(value)}
        className={bem.block(this)}
        wrapper-className={bem.element(this, 'wrapper', null, props['wrapper-className'])}
        onChange={this.handleChange}
      />
    );
  }
}
