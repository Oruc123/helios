import React, { forwardRef } from 'react';
import bem from 'utils/bem';
import { InputDefaultProps, InputPropTypes } from './Input';

import './TextArea.scss';

export const TextAreaPropTypes = { ...InputPropTypes };
export const TextAreaDefaultProps = { ...InputDefaultProps };

export const TextArea = forwardRef(({ className, disabled, type, value, ...props }, ref) => (
  <textarea
    {...props}
    ref={ref}
    disabled={disabled}
    value={value == null ? '' : String(value)}
    className={bem.block(TextArea, { [type]: !!type, disabled }, className)}
  />
));

TextArea.className = 'TextArea';
TextArea.propTypes = { ...TextAreaPropTypes };
TextArea.defaultProps = { ...TextAreaDefaultProps };
