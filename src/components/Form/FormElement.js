import { bool, func, instanceOf, string } from 'prop-types';
import { createElement, PureComponent } from 'react';

import bem from 'utils/bem';
import { ReactElementType, ComponentDefaultProperties } from 'utils/prop-types';
import { prefixed } from 'utils/props';

import { FormEntity, FormModel } from 'utils/form';

const isEvent = maybeEvent => Boolean(maybeEvent && maybeEvent.stopPropagation && maybeEvent.preventDefault);

const getEventValue = event => {
  const { target } = event;
  const { type, value } = target;

  if (type === 'checkbox') {
    const { checked } = target;

    return Boolean(checked);
  }

  if (type === 'file') {
    const { dataTransfer } = event;

    return target.files || (dataTransfer && dataTransfer.files);
  }

  return value;
};

const getValue = eventOrValue => (isEvent(eventOrValue) ? getEventValue(eventOrValue) : eventOrValue);

export const FormElementPropTypes = {
  className: string,
  disabled: bool,
  field: instanceOf(FormEntity),
  form: instanceOf(FormModel).isRequired,
  formatValue: func,
  input: ReactElementType.isRequired,
  name: string,
  parseValue: func,
  readOnly: bool,
  onChange: func.isRequired
};

export const FormElementDefaultProps = {
  className: undefined,
  disabled: false,
  field: undefined,
  formatValue: undefined,
  name: undefined,
  parseValue: undefined,
  readOnly: false
};

export class FormElement extends PureComponent {
  static propTypes = {
    ...FormElementPropTypes
  };

  static defaultProps = {
    ...FormElementDefaultProps
  };

  static className = 'FormElement';

  formatValue(value) {
    const { form, formatValue } = this.props;

    return formatValue ? formatValue(value, form) : value;
  }

  parseValue(value) {
    const { parseValue } = this.props;

    return parseValue ? parseValue(value) : value;
  }

  getValue() {
    const { field } = this.props;

    return field ? this.formatValue(field.getValue()) : undefined;
  }

  getError() {
    const { field } = this.props;

    return field ? field.getError() : undefined;
  }

  handleChange = eventOrValue => {
    const { field, 'input-onChange': onInputChange } = this.props;

    if (field) {
      const { name, onChange } = this.props;
      const nextField = field.setValue(this.parseValue(getValue(eventOrValue)));

      if (nextField !== field) {
        onChange(name, nextField);
      }
    }

    if (typeof onInputChange === 'function') {
      onInputChange(eventOrValue);
    }
  };

  handleErrorChange = error => {
    const { field } = this.props;

    if (field) {
      const { name, onChange } = this.props;
      const nextField = field.setError(error);

      if (nextField !== field) {
        onChange(name, nextField);
      }
    }
  };

  render() {
    const { disabled, field, input, name, readOnly, ...props } = this.props;
    const inputProps = prefixed(props, 'input');
    const componentName = input.className || input.name;
    const defaultProperties = ComponentDefaultProperties[componentName];
    const mergedProperties = Object.assign({}, defaultProperties, inputProps);

    return createElement(input, {
      ...mergedProperties,
      name,
      error: this.getError(),
      value: mergedProperties.formatValue ? mergedProperties.formatValue(this.getValue()) : this.getValue(),
      disabled: disabled || inputProps.disabled,
      readOnly: disabled || inputProps.readOnly,
      className: bem.block(this, null, inputProps.className),
      onChange: this.handleChange,
      onErrorChange: this.handleErrorChange
    });
  }
}
