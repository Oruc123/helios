import { bool, func, instanceOf } from 'prop-types';
import { createElement, PureComponent } from 'react';
import bem from 'utils/bem';
import { FormModel } from 'utils/form';
import { ReactElementType } from 'utils/prop-types';
import { withControlledProps } from 'utils/props';
import { FormElement } from './FormElement';
import { FormField } from './FormField';

export const ControlledFormPropTypes = {
  Element: ReactElementType,
  Field: ReactElementType,
  Form: ReactElementType,
  disabled: bool,
  readOnly: bool,
  value: instanceOf(FormModel),
  onChange: func,
  onSubmit: func
};

export const ControlledFormDefaultProps = {
  Element: FormElement,
  Field: FormField,
  disabled: false,
  readOnly: false,
  onChange: undefined,
  onSubmit: undefined
};

export class ControlledForm extends PureComponent {
  static propTypes = {
    ...ControlledFormPropTypes
  };

  static defaultProps = {
    ...ControlledFormDefaultProps
  };

  static className = 'Form';

  static controlledProps = {
    value: { onChangeProp: 'onChange', readOnlyProps: ['readOnly', 'disabled'] }
  };

  static getDerivedStateFromProps(props, state) {
    return state.initialValue === undefined ? { initialValue: props.value } : null;
  }

  state = {
    initialValue: undefined
  };

  handleChange = value => {
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(value);
    }

    return value;
  };

  reset() {
    const { initialValue } = this.state;

    this.handleChange(initialValue);
  }

  submit() {
    let { value } = this.props;

    value = this.handleChange(value.validate());

    if (value.isValid()) {
      const { onSubmit } = this.props;

      if (typeof onSubmit === 'function') {
        onSubmit(value);
      }
    }
  }

  handleSubmit = event => {
    if (event && event.type === 'submit') {
      event.preventDefault();
    }

    this.submit();
  };

  handleComponentChange = (name, field) => {
    const { value } = this.props;

    this.handleChange(value.setField(name, field));
  };

  renderComponent(Component, props) {
    const { disabled, readOnly, value } = this.props;
    const field = props.name ? value.getField(props.name) : undefined;

    return createElement(Component, {
      ...props,
      field,
      form: value,
      disabled: disabled || props.disabled,
      readOnly: readOnly || props.readOnly,
      onChange: this.handleComponentChange
    });
  }

  Field = props => {
    const { Field } = this.props;

    return this.renderComponent(Field, props);
  };

  Element = props => {
    const { Element } = this.props;

    return this.renderComponent(Element, props);
  };

  render() {
    const { Form, ...props } = this.props;
    const { initialValue } = this.state;

    return createElement(Form, {
      ...props,
      initialValue,
      Element: this.Element,
      Field: this.Field,
      className: bem.block(this),
      onSubmit: this.handleSubmit
    });
  }
}

export const [Form, FormPropTypes, FormDefaultProps] = withControlledProps(ControlledForm);
