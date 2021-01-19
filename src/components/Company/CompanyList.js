/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
import { Items, ItemsDefaultProps, ItemsPropTypes } from 'components/Items';
import { any, arrayOf, bool, func, node, shape } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';
import './CompanyList.scss';
import { CompanyListElement } from './CompanyListElement';

export const CompanyListPropTypes = {
  ...ElementPropTypes,
  ...ItemsPropTypes,
  disabled: bool,
  items: arrayOf(shape({ id: any, name: node })),
  onSelect: func
};

export const CompanyListDefaultProps = {
  ...ItemsDefaultProps,
  Element: CompanyListElement,
  disabled: false,
  items: [],
  onSelect: undefined
};

export class CompanyList extends PureComponent {
  static className = 'CompanyList';

  static propTypes = {
    ...CompanyListPropTypes
  };

  static defaultProps = {
    ...CompanyListDefaultProps
  };

  handleItemSelect = id => {
    const { onSelect } = this.props;

    if (typeof onSelect === 'function') {
      onSelect(id);
    }
  };

  renderItems() {
    const { items } = this.props;

    return items.map(item => ({ ...item, onSelect: this.handleItemSelect }));
  }

  render() {
    const { children, disabled, ...props } = this.props;

    return (
      <div {...filter(props, ElementPropTypes)} className={bem.block(this, { disabled })}>
        <Items {...props} items={this.renderItems()} item-className={bem.element(this, 'item', { disabled })} />
        {children}
      </div>
    );
  }
}
