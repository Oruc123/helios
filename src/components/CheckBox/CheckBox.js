/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
import { bool, func, instanceOf, node, string } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes, InputPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, withControlledProps, withRefProps } from 'utils/props';
import './CheckBox.scss';

import { CheckMark, CheckMarkDefaultProps, CheckMarkPropTypes } from './CheckMark';

const { FACE_ACTIVE, FACE_DEFAULT, FACE_DANGER, FACES } = CheckMark;

export const [ControlledCheckBox, ControlledCheckBoxPropTypes, ControlledCheckBoxDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } inputRef
   * @property { React.Ref } selfRef
   */
  class CheckBox extends PureComponent {
    static className = 'CheckBox';

    static propTypes = {
      ...InputPropTypes,
      ...CheckMarkPropTypes,
      ...prefixBy('label', ElementPropTypes),
      children: node,
      error: instanceOf(Error),
      htmlValue: string,
      value: bool,
      onChange: func,
      onErrorChange: func
    };

    static defaultProps = {
      ...CheckMarkDefaultProps,
      children: undefined,
      error: undefined,
      htmlValue: undefined,
      value: false,
      onChange: undefined,
      onErrorChange: undefined
    };

    static controlledProps = {
      error: { onChangeProp: 'onErrorChange' },
      value: { onChangeProp: 'onChange', readOnlyProps: ['readOnly', 'disabled'] }
    };

    static refProps = ['input', 'self'];

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
      const { onChange, htmlValue } = this.props;

      if (typeof onChange === 'function') {
        onChange(value, htmlValue);
      }
    };

    handleInputChange = event => {
      const { target } = event;

      this.handleChange(target.checked);
    };

    handleMouseDown = event => {
      event.preventDefault();

      this.focus();
    };

    focus() {
      const { current } = this.inputRef;

      current.focus();
    }

    renderInput() {
      const { disabled, htmlValue, readOnly, value } = this.props;

      return (
        <input
          ref={this.inputRef}
          checked={value}
          disabled={disabled}
          readOnly={readOnly}
          type="checkbox"
          defaultValue={htmlValue}
          className={bem.element(this, 'input')}
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
          onChange={this.handleInputChange}
        />
      );
    }

    renderMark() {
      const { children, error, flat, value, ...props } = this.props;
      const { focused } = this.state;
      let face = FACE_DEFAULT;

      if (error) {
        face = FACE_DANGER;
      } else if (value || focused) {
        face = FACE_ACTIVE;
      }

      return (
        <CheckMark
          {...filter(props, CheckMarkPropTypes)}
          checked={value}
          flat={flat || value}
          face={face}
          className={bem.element(this, 'mark', { label: children != null && children !== '' })}
        />
      );
    }

    renderLabel() {
      const { children, disabled, ...props } = this.props;
      const { focused } = this.state;
      const labelProps = prefixed(props, 'label');

      return (
        <label
          {...filter(labelProps, ElementPropTypes)}
          ref={this.selfRef}
          className={bem.element(this, 'label', { disabled, focused }, labelProps.className)}
          onMouseDown={this.handleMouseDown}
        >
          {this.renderInput()}
          {this.renderMark()}
          {children}
        </label>
      );
    }

    render() {
      const { disabled } = this.props;
      const { focused } = this.state;

      return <div className={bem.block(this, { disabled, focused })}>{this.renderLabel()}</div>;
    }
  }
);

ControlledCheckBox.FACE_DANGER = FACE_DANGER;
ControlledCheckBox.FACE_DEFAULT = FACE_DEFAULT;
ControlledCheckBox.FACES = FACES;

export const [CheckBox, CheckBoxPropTypes, CheckBoxDefaultProps] = withControlledProps(ControlledCheckBox);

CheckBox.FACE_DANGER = FACE_DANGER;
CheckBox.FACE_DEFAULT = FACE_DEFAULT;
CheckBox.FACES = FACES;
