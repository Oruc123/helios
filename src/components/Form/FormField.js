import { Field, FieldPropTypes } from 'components/Field';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { filter, unprefixed } from 'utils/props';
import { FormElement, FormElementDefaultProps, FormElementPropTypes } from './FormElement';
import './FormField.scss';

export const FormFieldPropTypes = {
  ...FieldPropTypes,
  ...FormElementPropTypes
};

export const FormFieldDefaultProps = {
  ...FormElementDefaultProps
};

export class FormField extends PureComponent {
  static propTypes = {
    ...FormFieldPropTypes
  };

  static defaultProps = {
    ...FormFieldDefaultProps
  };

  static className = 'FormField';

  render() {
    const { className, field, message, ...props } = this.props;
    const error = field ? field.getError() : undefined;
    const invalid = error != null;

    return (
      <Field
        {...filter(unprefixed(props, 'input'), FieldPropTypes)}
        invalid={invalid}
        message={invalid ? error : message}
        className={bem.block(this)}
      >
        <FormElement {...props} field={field} className={bem.element(this, 'element')} />
      </Field>
    );
  }
}
