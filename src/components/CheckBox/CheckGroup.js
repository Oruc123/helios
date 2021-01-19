/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
import { CheckMark } from 'components/CheckBox/CheckMark';
import { Items } from 'components/Items';
import { any, array, arrayOf, bool, func, node, shape } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { withControlledProps, withRefProps } from 'utils/props';
import { ControlledCheckBox } from './CheckBox';
import './CheckGroup.scss';

export const [ControlledCheckGroup, ControlledCheckGroupPropTypes, ControlledCheckGroupDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } itemsRef
   */
  class CheckGroup extends PureComponent {
    static className = 'CheckGroup';

    static propTypes = {
      ...ElementPropTypes,
      children: node,
      disabled: bool,
      items: arrayOf(shape({ value: any, label: node })),
      readOnly: bool,
      value: array,
      onChange: func
    };

    static defaultProps = {
      children: undefined,
      disabled: false,
      items: [],
      readOnly: false,
      value: [],
      onChange: undefined
    };

    static controlledProps = {
      value: { onChangeProp: 'onChange', readOnlyProps: ['readOnly', 'disabled'] }
    };

    static refProps = ['items'];

    handleChange = value => {
      const { onChange } = this.props;

      if (typeof onChange === 'function') {
        onChange(value);
      }
    };

    handleItemChange = (checked, htmlValue) => {
      const { value } = this.props;

      this.handleChange(checked ? [...value, htmlValue] : value.filter(val => val !== htmlValue));
    };

    renderItems() {
      const { disabled, items, readOnly, value } = this.props;

      return items.map(item => ({
        children: item.label,
        value: value.includes(item.value),
        flat: true,
        disabled,
        readOnly,
        size: CheckMark.SIZE_SMALL,
        htmlValue: item.value,
        'label-className': bem.element(this, 'itemLabel'),
        className: bem.element(this, 'item', item.value),
        onChange: this.handleItemChange
      }));
    }

    render() {
      const { children } = this.props;

      return (
        <div className={bem.block(this)}>
          <Items ref={this.itemsRef} Element={ControlledCheckBox} items={this.renderItems()} />
          {children}
        </div>
      );
    }
  }
);

export const [CheckGroup, CheckGroupPropTypes, CheckGroupDefaultProps] = withControlledProps(ControlledCheckGroup);
