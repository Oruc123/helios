import { arrayOf, func, object } from 'prop-types';
import React, { createRef, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import scrollIntoView from 'scroll-into-view-if-needed';
import { ReactElementType } from 'utils/prop-types';
import { prefixBy, prefixed } from 'utils/props';
import { Item, ItemPropTypes } from './Item';

export const ItemsPropTypes = {
  ...prefixBy('item', ItemPropTypes),
  Element: ReactElementType.isRequired,
  items: arrayOf(object),
  renderer: func
};

export const ItemsDefaultProps = {
  items: undefined,
  renderer: props => <Item {...props} />
};

const $itemRefs = Symbol('Items.itemRefs');

export class Items extends PureComponent {
  static propTypes = {
    ...ItemsPropTypes
  };

  static defaultProps = {
    ...ItemsDefaultProps
  };

  [$itemRefs] = [];

  /**
   * @param { number } index
   *
   * @return { ?Object }
   */
  getItem(index) {
    const { items } = this.props;

    return items[index];
  }

  /**
   * @param { number } index
   *
   * @return { ?React.Ref }
   */
  getItemRef(index) {
    return this[$itemRefs][index];
  }

  /**
   * @param { number } index
   *
   * @return { ?HTMLElement }
   */
  getItemDOMNode(index) {
    const itemRef = this.getItemRef(index);

    // eslint-disable-next-line react/no-find-dom-node
    return itemRef ? findDOMNode(itemRef.current) : undefined;
  }

  /**
   * @param { number } index
   */
  scrollToIndex(index) {
    const node = this.getItemDOMNode(index);

    if (node) {
      scrollIntoView(node, { scrollMode: 'if-needed', block: 'nearest', inline: 'nearest' });
    }
  }

  render() {
    const { [$itemRefs]: itemRefs } = this;
    const { Element, items, renderer, ...props } = this.props;
    const itemProps = prefixed(props, 'item');

    if (itemRefs.length !== items.length) {
      itemRefs.length = items.length;
    }

    return items.map((item, index) => {
      if (!itemRefs[index]) {
        itemRefs[index] = createRef();
      }

      return renderer({
        key: index,
        ...item,
        ...itemProps,
        Element,
        ref: itemRefs[index],
        index
      });
    });
  }
}
