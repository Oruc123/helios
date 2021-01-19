import { DatePicker } from 'components/DatePicker';
import { instanceOf, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { FormPropTypes, withForm } from 'components/Form';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixed, unprefixed } from 'utils/props';

import { DateRangeModel } from './DateRangeModel';
import './DateRange.scss';

// eslint-disable-next-line import/prefer-default-export
export const [DateRange, DateRangePropTypes, DateRangeDefaultProps] = withForm(
  class DateRange extends PureComponent {
    static className = 'DateRange';

    static propTypes = {
      ...FormPropTypes,
      format: string,
      value: instanceOf(DateRangeModel).isRequired
    };

    static defaultProps = {
      format: 'YYYY/MM/DD'
    };

    renderStartDate() {
      const { Field, format, ...props } = this.props;
      const startDateProps = prefixed(props, 'startDate');

      return (
        <Field
          name="startDate"
          input={DatePicker}
          input-placeholder={format}
          input-format={format}
          label="Start Date"
          {...startDateProps}
          className={bem.element(this, 'startDate', null, startDateProps.className)}
        />
      );
    }

    renderEndDate() {
      const { Field, format, ...props } = this.props;
      const endDateProps = prefixed(props, 'endDate');

      return (
        <Field
          name="endDate"
          input={DatePicker}
          input-placeholder={format}
          input-format={format}
          label="End Date"
          {...endDateProps}
          className={bem.element(this, 'endDate', null, endDateProps.className)}
        />
      );
    }

    render() {
      const { Field, value, ...props } = this.props;

      return (
        <div
          {...filter(unprefixed(props, 'startDate', 'endDate'), ElementPropTypes)}
          className={bem.block(this, null, props.className)}
        >
          {this.renderStartDate()}
          {this.renderEndDate()}
        </div>
      );
    }
  }
);
