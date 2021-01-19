import { number } from 'prop-types';
import { createElement, forwardRef } from 'react';

import bem from 'utils/bem';
import { ReactElementType } from 'utils/prop-types';

export const ItemPropTypes = {
  Element: ReactElementType,
  index: number
};

export const ItemDefaultProps = {
  Element: undefined,
  index: undefined
};

export const Item = forwardRef(({ Element, className, index, ...props }, ref) =>
  createElement(Element, { ...props, ref, className: bem.block(Item, null, className) })
);

Item.className = 'Item';
Item.defaultProps = { ...ItemDefaultProps };
Item.propTypes = { ...ItemPropTypes };
