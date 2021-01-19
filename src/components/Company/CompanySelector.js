import { Field } from 'components/Field';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { SPRITE_ADD, SPRITE_REMOVE } from 'sprites';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixed, unprefixed, withRefProps } from 'utils/props';
import { CompanyList } from './CompanyList';
import './CompanySelector.scss';

// eslint-disable-next-line import/prefer-default-export
export const [CompanySelector, CompanySelectorPropTypes, CompanySelectorDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } itemsRef
   * @property { React.Ref } valuesRef
   */
  class ControlledCompanySelector extends PureComponent {
    static className = 'CompanySelector';

    static propTypes = {
      disabled: bool,
      items: arrayOf(shape({ id: number.isRequired, name: string.isRequired })),
      value: arrayOf(number.isRequired),
      onChange: func
    };

    static defaultProps = {
      disabled: false,
      items: [],
      value: [],
      onChange: undefined
    };

    static refProps = ['items', 'selected'];

    static controlledProps = {
      value: { onChangeProp: 'onChange', readOnlyProps: ['disabled'] }
    };

    handleItemsSelect = id => {
      const { value, onChange } = this.props;

      if (typeof onChange === 'function') {
        onChange([...value, id]);
      }
    };

    handleValuesSelect = id => {
      const { value, onChange } = this.props;

      if (typeof onChange === 'function') {
        onChange(value.filter(val => val !== id));
      }
    };

    renderItems() {
      const { items, value, disabled, ...props } = this.props;
      const itemsProps = prefixed(props, 'items');

      return (
        <Field
          label="Add Company"
          {...itemsProps}
          className={bem.element(this, 'field', 'items', itemsProps.className)}
        >
          <CompanyList
            ref={this.itemsRef}
            disabled={disabled}
            items={items.filter(item => !value.includes(item.id))}
            item-icon={SPRITE_ADD}
            className={bem.element(this, 'items')}
            onSelect={this.handleItemsSelect}
          />
        </Field>
      );
    }

    renderValues() {
      const { items, value, disabled, ...props } = this.props;
      const valuesProps = prefixed(props, 'values');

      return (
        <Field
          label="Selected"
          {...valuesProps}
          className={bem.element(this, 'field', 'values', valuesProps.className)}
        >
          <CompanyList
            ref={this.valuesRef}
            disabled={disabled}
            items={items.filter(item => value.includes(item.id))}
            item-icon={SPRITE_REMOVE}
            className={bem.element(this, 'values')}
            onSelect={this.handleValuesSelect}
          />
        </Field>
      );
    }

    render() {
      const { value, ...props } = this.props;

      return (
        <div {...filter(unprefixed(props, 'items', 'values'), ElementPropTypes)} className={bem.block(this)}>
          {this.renderItems()}
          {this.renderValues()}
        </div>
      );
    }
  }
);
