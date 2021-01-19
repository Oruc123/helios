import { bool, func } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { Item, ItemDefaultProps, ItemPropTypes } from 'components/Items';

import './SelectableItem.scss';

export const SelectableItemPropTypes = {
  ...ItemPropTypes,
  anchor: bool,
  disabled: bool,
  focused: bool,
  lead: bool,
  selected: bool,
  onSelect: func
};

export const SelectableItemDefaultProps = {
  ...ItemDefaultProps,
  anchor: bool,
  disabled: false,
  focused: bool,
  lead: bool,
  selected: bool,
  onSelect: undefined
};

export class SelectableItem extends PureComponent {
  static className = 'SelectableItem';

  static propTypes = {
    ...SelectableItemPropTypes
  };

  static defaultProps = {
    ...SelectableItemDefaultProps
  };

  handleMouseDown = event => {
    const { index, onMouseDown, onSelect } = this.props;

    event.preventDefault();

    if (typeof onSelect === 'function') {
      onSelect(event, index);
    }

    if (typeof onMouseDown === 'function') {
      onMouseDown(event);
    }
  };

  render() {
    const { anchor, disabled, focused, lead, selected, ...props } = this.props;
    const mods = disabled ? { disabled } : { anchor, focused, lead, selected };

    return (
      <Item
        {...props}
        selected={selected}
        className={bem.block(this, mods)}
        onMouseDown={disabled ? undefined : this.handleMouseDown}
      />
    );
  }
}
