import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';

import { FormPropTypes, withForm } from 'components/Form';
import { Select } from 'components/Select';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixed, unprefixed } from 'utils/props';

import { DocumentsDueFilterModel } from './DocumentsDueFilterModel';
import './DocumentsDueFilter.scss';

// eslint-disable-next-line import/prefer-default-export
export const [DocumentsDueFilter, DocumentsDueFilterPropTypes, DocumentsDueFilterDefaultProps] = withForm(
  class DocumentsDueFilter extends PureComponent {
    static className = 'DocumentsDueFilter';

    static propTypes = {
      ...FormPropTypes,
      value: instanceOf(DocumentsDueFilterModel).isRequired
    };

    renderCustomer() {
      const { Field, format, ...props } = this.props;
      const customerProps = prefixed(props, 'customer');

      return (
        <Field
          name="company_id"
          label="Customer"
          input={Select}
          input-placeholder="All"
          {...customerProps}
          className={bem.element(this, 'field', 'customer')}
        />
      );
    }

    renderInternal() {
      const { Field, format, ...props } = this.props;
      const internalProps = prefixed(props, 'internal');

      return (
        <Field
          name="internal"
          label="Internal"
          input={Select}
          input-placeholder="All"
          {...internalProps}
          className={bem.element(this, 'field', 'internal')}
        />
      );
    }

    renderLicense() {
      const { Field, format, ...props } = this.props;
      const businessTypeProps = prefixed(props, 'license');

      return (
        <Field
          name="license_id"
          label="License"
          input={Select}
          input-placeholder="All"
          {...businessTypeProps}
          className={bem.element(this, 'field', 'license')}
        />
      );
    }

    renderFrequency() {
      const { Field, format, ...props } = this.props;
      const frequencyProps = prefixed(props, 'frequency');

      return (
        <Field
          name="frequency"
          label="Frequency"
          input={Select}
          input-placeholder="All"
          {...frequencyProps}
          className={bem.element(this, 'field', 'frequency')}
        />
      );
    }

    render() {
      const { Field, value, ...props } = this.props;

      return (
        <div
          {...filter(unprefixed(props, 'customer', 'internal', 'type', 'businessType', 'frequency'), ElementPropTypes)}
          className={bem.block(this)}
        >
          {this.renderCustomer()}
          {this.renderLicense()}
          {this.renderInternal()}
          {this.renderFrequency()}
        </div>
      );
    }
  }
);
