import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import { FormPropTypes, withForm } from 'components/Form';
import { Select } from 'components/Select';
import bem from 'utils/bem';
import { ListModel } from 'utils/list';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';
import { AlertsReportsFilterModel } from './AlertsReportsFilterModel';
import { dataSource } from './data';

import './AlertsReportsFilter.scss';

const all = { label: 'All', value: '' };
const mapper = i => ({ label: i.name, value: i.id });

// eslint-disable-next-line import/prefer-default-export
export const [AlertsReportsFilter, AlertsReportsFilterPropTypes, AlertsReportsFilterDefaultProps] = withForm(
  class AlertsReportsFilter extends PureComponent {
    static className = 'AlertsReportsFilter';

    static propTypes = {
      ...FormPropTypes,
      value: instanceOf(AlertsReportsFilterModel).isRequired,
      licenses: instanceOf(ListModel),
      companies: instanceOf(ListModel)
    };

    static defaultProps = {
      licenses: new ListModel(),
      companies: new ListModel()
    };

    render() {
      const { Field, value, licenses, companies, ...props } = this.props;
      const companiesDataSource = [...companies.getValue().values()].map(mapper);
      const licensesDataSource = [...licenses.getValue().values()].map(mapper);

      return (
        <div {...filter(props, ElementPropTypes)} className={bem.block(this)}>
          <Field
            name="status"
            label="Status"
            input={Select}
            input-placeholder="All"
            input-dataSource={[all, ...dataSource.reportStatusList]}
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
          <Field
            name="license"
            label="License"
            input={Select}
            input-placeholder="All"
            input-dataSource={[all, ...licensesDataSource]}
            className={bem.element(this, 'field', 'license')}
          />
        </div>
      );
    }
  }
);
