import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import { FormPropTypes, withForm } from 'components/Form';
import { Select } from 'components/Select';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';
import { ListModel } from 'utils/list';
import { dataSource } from './data';
import { AlertsReviewsFilterModel } from './AlertsReviewsFilterModel';

import './AlertsReviewsFilter.scss';

const all = { label: 'All', value: '' };

// eslint-disable-next-line import/prefer-default-export
export const [AlertsReviewsFilter, AlertsReviewsFilterPropTypes, AlertsReviewsFilterDefaultProps] = withForm(
  class AlertsReviewsFilter extends PureComponent {
    static className = 'AlertsReviewsFilter';

    static propTypes = {
      ...FormPropTypes,
      value: instanceOf(AlertsReviewsFilterModel).isRequired,
      companies: instanceOf(ListModel)
    };

    static defaultProps = {
      companies: new ListModel()
    };

    render() {
      const { Field, value, companies, ...props } = this.props;
      const companiesDataSource = [...companies.getValue().values()].map(i => ({ label: i.name, value: i.id }));

      return (
        <div {...filter(props, ElementPropTypes)} className={bem.block(this)}>
          <Field
            name="status"
            label="Status"
            input={Select}
            input-placeholder="All"
            input-dataSource={[all, ...dataSource.annualReviewStatusList]}
            className={bem.element(this, 'field', 'status')}
          />
          <Field
            name="company_id"
            label="Company"
            input={Select}
            input-placeholder="All"
            input-dataSource={[all, ...companiesDataSource]}
            className={bem.element(this, 'field', 'customer')}
          />
        </div>
      );
    }
  }
);
