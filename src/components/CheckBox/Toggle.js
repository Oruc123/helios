/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
import { bool, func, instanceOf, node, string } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { InputPropTypes } from 'utils/prop-types';
import { filter, withControlledProps, withRefProps } from 'utils/props';

import { CheckMark, CheckMarkDefaultProps, CheckMarkPropTypes } from './CheckMark';
import './Toggle.scss';

const { FACE_ACTIVE, FACE_DEFAULT, FACE_DANGER, FACES } = CheckMark;

export const [ControlledToggle, ControlledTogglePropTypes, ControlledToggleDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } inputRef
   * @property { React.Ref } selfRef
   */
  class Toggle extends PureComponent {
    static className = 'Toggle';

    static propTypes = {
      ...InputPropTypes,
      ...CheckMarkPropTypes,
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
      const { onChange } = this.props;

      if (typeof onChange === 'function') {
        onChange(value);
      }
    };

    handleInputChange = event => {
      this.handleChange(event.target.checked);
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
          value={htmlValue}
          className={bem.element(this, 'input')}
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
          onChange={this.handleInputChange}
        />
      );
    }

    renderMark() {
      const { children, error, value, ...props } = this.props;
      const { focused } = this.state;
      let face = FACE_DEFAULT;

      if (error) {
        face = FACE_DANGER;
      } else if (focused) {
        face = FACE_ACTIVE;
      }

      return (
        <CheckMark
          {...filter(props, CheckMarkPropTypes)}
          checked={value}
          flat={value}
          face={face}
          className={bem.element(this, 'mark', { label: children != null && children !== '' })}
        />
      );
    }

    render() {
      const { children, disabled } = this.props;
      const { focused } = this.state;

      return (
        <div className={bem.block(this, { disabled, focused })}>
          <label
            ref={this.selfRef}
            className={bem.element(this, 'label', { disabled, focused })}
            onMouseDown={this.handleMouseDown}
          >
            {this.renderInput()}
            {this.renderMark()}
            {children}
          </label>
        </div>
      );
    }
  }
);

ControlledToggle.FACE_DANGER = FACE_DANGER;
ControlledToggle.FACE_DEFAULT = FACE_DEFAULT;
ControlledToggle.FACES = FACES;

export const [Toggle, TogglePropTypes, ToggleDefaultProps] = withControlledProps(ControlledToggle);

Toggle.FACE_DANGER = FACE_DANGER;
Toggle.FACE_DEFAULT = FACE_DEFAULT;
Toggle.FACES = FACES;
