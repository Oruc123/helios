/* eslint-disable react/no-this-in-sfc */
import { arrayOf, bool, func, number, object, oneOfType } from 'prop-types';
import React, { PureComponent } from 'react';

import { ItemPropTypes, Items, ItemsDefaultProps, ItemsPropTypes } from 'components/Items';
import { ClassType } from 'utils/prop-types';
import { prefixBy, withControlledProps, withRefProps } from 'utils/props';
import { SelectableItem } from './SelectableItem';
import SelectableHelper from './SelectableHelper';

export const [ControlledSelectable, ControlledSelectablePropTypes, ControlledSelectableDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } itemsRef
   */
  class ControlledSelectable extends PureComponent {
    static className = 'Selectable';

    static propTypes = {
      ...ItemsPropTypes,
      ...prefixBy('item', ItemPropTypes),
      anchorIndex: number,
      cols: number,
      disabled: bool,
      focused: bool,
      helper: ClassType(SelectableHelper).isRequired,
      items: arrayOf(object.isRequired).isRequired,
      leadIndex: number,
      multiple: bool,
      value: oneOfType([number.isRequired, arrayOf(number.isRequired)]),
      onChange: func.isRequired,
      onAnchorIndexChange: func.isRequired,
      onLeadIndexChange: func.isRequired
    };

    static defaultProps = {
      ...ItemsDefaultProps,
      Item: SelectableItem,
      anchorIndex: undefined,
      cols: 1,
      disabled: false,
      focused: false,
      helper: SelectableHelper,
      leadIndex: undefined,
      multiple: false,
      value: undefined
    };

    static refProps = ['items'];

    static controlledProps = {
      anchorIndex: { onChangeProp: 'onAnchorIndexChange' },
      leadIndex: { onChangeProp: 'onLeadIndexChange' },
      value: { onChangeProp: 'onChange', readOnlyProps: ['disabled'] }
    };

    /**
     * @return { React.Ref }
     */
    getItemRef(index) {
      const { items } = this;

      return items ? items.getItemRef(index) : undefined;
    }

    /**
     * @return { ?HTMLElement }
     */
    getItemDOMNode(index) {
      const { items } = this;

      return items ? items.getItemDOMNode(index) : undefined;
    }

    /**
     */
    scrollToIndex(index) {
      const { items } = this;

      if (items) {
        items.scrollToIndex(index);
      }
    }

    selectFromKeyboardEvent(event) {
      const { helper } = this.props;

      helper.selectFromKeyboardEvent(this, event);
    }

    handleItemSelect = (event, index) => {
      const { helper } = this.props;

      helper.selectFromMouseEvent(this, event, index);
    };

    getRenderer() {
      const { disabled, focused, helper } = this.props;
      const anchorIndex = helper.getAnchorIndex(this);
      const leadIndex = helper.getLeadIndex(this);

      return props => {
        const { index, ...itemProps } = props;

        return (
          <SelectableItem
            {...itemProps}
            index={index}
            disabled={disabled || itemProps.disabled}
            focused={focused}
            anchor={index === anchorIndex}
            lead={index === leadIndex}
            selected={helper.isSelected(this, index)}
            onSelect={this.handleItemSelect}
          />
        );
      };
    }

    render() {
      const { helper, ...props } = this.props;

      return <Items {...props} ref={this.itemsRef} renderer={this.getRenderer()} />;
    }
  }
);

export const [Selectable, SelectablePropTypes, SelectableDefaultProps] = withControlledProps(ControlledSelectable);
