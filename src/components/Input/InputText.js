import ReactTextMask from 'react-text-mask';
import { bool, func, node, oneOf, string, number, array } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed, withControlledProps, withRefProps } from 'utils/props';
import { Input, InputDefaultProps, InputPropTypes } from './Input';
import { TextArea } from './TextArea';
import { InputClear, InputClearDefaultProps, InputClearPropTypes } from './InputClear';
import { InputLike, InputLikeDefaultProps, InputLikePropTypes } from './InputLike';
import './InputText.scss';

const TYPE_EMAIL = 'email';
const TYPE_NUMBER = 'number';
const TYPE_PASSWORD = 'password';
const TYPE_PHONE = 'phone';
const TYPE_TEXT = 'text';
const TYPES = [TYPE_EMAIL, TYPE_NUMBER, TYPE_PASSWORD, TYPE_TEXT, TYPE_PHONE];

export const [ControlledInputText, ControlledInputTextPropTypes, ControlledInputDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } inputRef
   */
  class ControlledInputText extends PureComponent {
    static className = 'InputText';

    static propTypes = {
      ...InputLikePropTypes,
      ...prefixBy('clear', InputClearPropTypes),
      ...prefixBy('wrapper', ElementPropTypes),
      children: node,
      clearable: bool,
      error: string,
      type: oneOf(TYPES),
      validator: func,
      value: string,
      onChange: func,
      onErrorChange: func,
      multiline: bool,
      maxLength: number,
      mask: array,
      placeholder: string
    };

    static defaultProps = {
      ...InputDefaultProps,
      ...InputLikeDefaultProps,
      ...prefixBy('clear', InputClearDefaultProps),
      defaultValue: '',
      error: undefined,
      type: TYPE_TEXT,
      validator: undefined,
      value: '',
      children: undefined,
      onChange: undefined,
      onErrorChange: undefined,
      multiline: false,
      mask: undefined
    };

    static controlledProps = {
      error: { onChangeProp: 'onErrorChange' },
      value: { onChangeProp: 'onChange', readOnlyProps: ['readOnly', 'disabled'] }
    };

    static refProps = ['input'];

    state = {
      focused: false
    };

    handleInputBlur = (...args) => {
      const { onBlur } = this.props;

      this.setState({ focused: false });

      if (typeof onBlur === 'function') {
        onBlur(...args);
      }
    };

    handleInputFocus = (...args) => {
      const { onFocus } = this.props;

      this.setState({ focused: true });

      if (typeof onFocus === 'function') {
        onFocus(...args);
      }
    };

    handleChange = value => {
      const { validator, onChange, onErrorChange } = this.props;

      if (typeof onChange === 'function') {
        onChange(value);
      }

      if (typeof validator === 'function' && typeof onErrorChange === 'function') {
        onErrorChange(validator(value));
      }
    };

    handleInputChange = event => {
      this.handleChange(event.target.value);
    };

    handleClearMouseDown = event => {
      event.preventDefault();

      this.handleChange('');
      this.focus();
    };

    focus() {
      const { current } = this.inputRef;

      current.focus();
    }

    renderInput() {
      // Leave "children" here, because we pass {...props} to <input/> and don't want to pass
      // children there.
      const { mask, children, multiline, ...props } = this.props;

      if (mask) {
        return (
          <ReactTextMask
            showMask
            guide={false}
            {...filter(props, InputPropTypes)}
            ref={this.inputRef}
            // eslint-disable-next-line react/destructuring-assignment
            className={bem.block(Input, null, this.props.className)}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            onChange={this.handleInputChange}
            mask={mask}
          />
        );
      }

      return multiline ? (
        <TextArea
          {...filter(props, InputPropTypes)}
          ref={this.inputRef}
          className={bem.block(this)}
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
          onChange={this.handleInputChange}
        />
      ) : (
        <Input
          {...filter(props, InputPropTypes)}
          ref={this.inputRef}
          className={bem.block(this)}
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
          onChange={this.handleInputChange}
        />
      );
    }

    renderClear() {
      const { clearable, disabled, readOnly, value, ...props } = this.props;
      const clearProps = prefixed(props, 'clear');

      if (clearable && !disabled && !readOnly && value !== '') {
        return (
          <InputClear
            {...clearProps}
            className={bem.element(this, 'clear', clearProps.className)}
            onMouseDown={this.handleClearMouseDown}
          />
        );
      }

      return null;
    }

    render() {
      const { children, clearable, error, type, ...props } = this.props;
      const wrapperProps = prefixed(props, 'wrapper');
      const { focused } = this.state;
      const invalid = error != null;

      return (
        <>
          <InputLike
            {...filter(unprefixed(props, 'clear', 'wrapper'), InputLikePropTypes)}
            focused={focused}
            invalid={invalid}
            icon-className={bem.element(this, 'icon', null, props['icon-className'])}
          >
            <div
              {...filter(wrapperProps, ElementPropTypes)}
              className={bem.element(this, 'wrapper', null, wrapperProps.className)}
            >
              {this.renderInput()}

              {this.renderClear()}
              {children}
            </div>
          </InputLike>
          {error && <div className={bem.element(this, 'error-message')}>{error}</div>}
        </>
      );
    }
  }
);

ControlledInputText.TYPE_EMAIL = TYPE_EMAIL;
ControlledInputText.TYPE_NUMBER = TYPE_NUMBER;
ControlledInputText.TYPE_PASSWORD = TYPE_PASSWORD;
ControlledInputText.TYPE_TEXT = TYPE_TEXT;
ControlledInputText.TYPES = TYPES;

export const [InputText, InputTextPropTypes, InputTextDefaultProps] = withControlledProps(ControlledInputText);

InputText.TYPE_EMAIL = TYPE_EMAIL;
InputText.TYPE_NUMBER = TYPE_NUMBER;
InputText.TYPE_PASSWORD = TYPE_PASSWORD;
InputText.TYPE_TEXT = TYPE_TEXT;
InputText.TYPE_PHONE = TYPE_PHONE;
InputText.TYPES = TYPES;
