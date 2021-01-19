import { string } from 'prop-types';
import React, { forwardRef } from 'react';
import bem from 'utils/bem';
import { InputNumberPropTypes, InputTextPropTypes } from 'utils/prop-types';

import './Input.scss';

export const InputPropTypes = {
  ...InputTextPropTypes,
  ...InputNumberPropTypes,
  value: string
};

export const InputDefaultProps = {
  value: ''
};

export const Input = forwardRef(({ className, disabled, type, value, ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    type={type}
    disabled={disabled}
    value={value == null ? '' : String(value)}
    className={bem.block(Input, { [type]: !!type, disabled }, className)}
  />
));

Input.className = 'Input';
Input.propTypes = { ...InputPropTypes };
Input.defaultProps = { ...InputDefaultProps };
