import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';

import { ControlledFormPropTypes, withForm } from 'components/Form';
import { Select } from 'components/Select';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import { AlertsDocumentsFilterModel } from './AlertsDocumentsFilterModel';
import './AlertsDocumentsFilter.scss';

// eslint-disable-next-line import/prefer-default-export
export const [AlertsDocumentsFilter, AlertsDocumentsFilterPropTypes, AlertsDocumentsFilterDefaultProps] = withForm(
  class AlertsDocumentsFilter extends PureComponent {
    static className = 'AlertsDocumentsFilter';

    static propTypes = {
      ...ControlledFormPropTypes,
      value: instanceOf(AlertsDocumentsFilterModel).isRequired
    };

    render() {
      const { Field, value, ...props } = this.props;

      return (
        <div {...filter(props, ElementPropTypes)} className={bem.block(this)}>
          <Field
            name="status"
            label="Status"
            input={Select}
            input-placeholder="All"
            className={bem.element(this, 'field', 'customer')}
          />
        </div>
      );
    }
  }
);
