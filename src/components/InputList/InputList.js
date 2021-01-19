import { Focusable } from 'components/Focus';
import { Selectable, SelectableDefaultProps, SelectablePropTypes } from 'components/Selectable';
import { any, arrayOf, oneOfType, shape } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixPropBy, withControlledProps, withRefProps } from 'utils/props';

import { InputListElement, InputListElementPropTypes } from './InputListElement';
import './InputList.scss';

const { isArray } = Array;

export const InputListValueType = oneOfType([any, arrayOf(any)]);

export const [ControlledList, ControlledListPropTypes, ControlledListDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } selectableRef
   * @property { Selectable } selectable
   */
  class ControlledList extends PureComponent {
    static className = 'InputList';

    static propTypes = {
      ...ElementPropTypes,
      ...SelectablePropTypes,
      defaultValue: InputListValueType,
      items: arrayOf(shape(InputListElementPropTypes)),
      value: InputListValueType
    };

    static defaultProps = {
      ...SelectableDefaultProps,
      Element: InputListElement,
      [prefixPropBy('item', 'Element')]: InputListElement,
      value: undefined
    };

    static refProps = ['selectable'];

    static controlledProps = {
      value: { onChangeProp: 'onChange', readOnlyProps: ['disabled'] }
    };

    state = {
      focused: false
    };

    handleFocusedChange = focused => {
      this.setState({ focused });
    };

    handleSelectionChange = indexes => {
      const { onChange } = this.props;

      onChange(this.getValueFromSelection(indexes));
    };

    handleKeyDown = event => {
      this.selectable.selectFromKeyboardEvent(event);
    };

    getSelectionFromValue() {
      const { items, value } = this.props;
      const arrayValue = isArray(value) ? value : [value];

      return arrayValue.map(value => items.findIndex(item => item.value === value)).filter(index => index !== -1);
    }

    getValueFromSelection(indexes) {
      const { multiple, items } = this.props;
      const values = indexes
        .map(index => items[index])
        .filter(item => item)
        .map(item => item.value);

      return multiple ? values : values[0];
    }

    render() {
      const { children, defaultValue, value, ...props } = this.props;
      const { focused } = this.state;

      return (
        <Focusable focused={focused} onFocusedChange={this.handleFocusedChange} onKeyDown={this.handleKeyDown}>
          <div {...filter(props, ElementPropTypes)} className={bem.block(this)}>
            <Selectable
              {...filter(props, SelectablePropTypes)}
              ref={this.selectableRef}
              value={this.getSelectionFromValue()}
              focused={focused}
              onChange={this.handleSelectionChange}
            />
            {children}
          </div>
        </Focusable>
      );
    }
  }
);

export const [InputList, InputListPropTypes, InputListDefaultProps] = withControlledProps(ControlledList);
