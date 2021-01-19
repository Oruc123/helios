import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';

import { FormPropTypes, withForm } from 'components/Form';
import { Select } from 'components/Select';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixed, unprefixed } from 'utils/props';

import { CompanyFiltersModel } from './CompanyFiltersModel';
import './CompanyFilters.scss';

// eslint-disable-next-line import/prefer-default-export
export const [CompanyFilters, CompanyFiltersPropTypes, CompanyFiltersDefaultProps] = withForm(
  class CompanyFilters extends PureComponent {
    static className = 'CompanyFilters';

    static propTypes = {
      ...FormPropTypes,
      value: instanceOf(CompanyFiltersModel).isRequired
    };

    renderActive() {
      const { Field, format, ...props } = this.props;
      const activeProps = prefixed(props, 'active');

      return (
        <Field
          name="active"
          label="Active"
          input={Select}
          input-placeholder="All"
          {...activeProps}
          className={bem.element(this, 'field', 'active')}
        />
      );
    }

    renderCustomerStatus() {
      const { Field, format, ...props } = this.props;
      const customerStatusProps = prefixed(props, 'customerStatus');

      return (
        <Field
          name="customer_status"
          label="Customer status"
          input={Select}
          input-placeholder="All"
          {...customerStatusProps}
          className={bem.element(this, 'field', 'customerStatus')}
        />
      );
    }

    renderEntityType() {
      const { Field, format, ...props } = this.props;
      const entityTypeProps = prefixed(props, 'entityType');

      return (
        <Field
          name="entity_type"
          label="Entity type"
          input={Select}
          input-placeholder="All"
          {...entityTypeProps}
          className={bem.element(this, 'field', 'entityType')}
        />
      );
    }

    renderBusinessType() {
      const { Field, format, ...props } = this.props;
      const businessTypeProps = prefixed(props, 'businessType');

      return (
        <Field
          name="business_type"
          label="Business type"
          input={Select}
          input-placeholder="All"
          {...businessTypeProps}
          className={bem.element(this, 'field', 'businessType')}
        />
      );
    }

    render() {
      const { Field, value, ...props } = this.props;

      return (
        <div
          {...filter(unprefixed(props, 'active', 'customerStatus', 'entityType', 'businessType'), ElementPropTypes)}
          className={bem.block(this)}
        >
          {this.renderActive()}
          {this.renderCustomerStatus()}
          {this.renderEntityType()}
          {this.renderBusinessType()}
        </div>
      );
    }
  }
);
