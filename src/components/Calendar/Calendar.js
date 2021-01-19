import React, { PureComponent } from 'react';
import 'rc-calendar/assets/index.css';

import { MomentType } from 'utils/prop-types';
import { withControlledProps, withRefProps } from 'utils/props';

const MODE_DATE = 'date';
const MODE_MONTH = 'month';
const MODE_YEAR = 'year';
const MODE_DECADE = 'decade';

export const [ControlledCalendar, ControlledCalendarPropTypes, ControlledCalendarDefaultProps] = withRefProps(
  class Calendar extends PureComponent {
    static className = 'Calendar';

    static propTypes = {
      value: MomentType
    };

    static defaultProps = {
      value: null
    };

    static controlledProps = {
      mode: { onChangeProp: 'onModeChange' },
      value: { onChangeProp: 'onChange', readOnlyProps: ['disabled'] }
    };

    static refProps = ['input'];

    render() {
      const { ...props } = this.props;

      return <div {...props}>1</div>;
    }
  }
);

ControlledCalendar.MODE_DATE = MODE_DATE;
ControlledCalendar.MODE_MONTH = MODE_MONTH;
ControlledCalendar.MODE_YEAR = MODE_YEAR;
ControlledCalendar.MODE_DECADE = MODE_DECADE;

export const [Calendar, CalendarPropTypes, CalendarDefaultProps] = withControlledProps(ControlledCalendar);

Calendar.MODE_DATE = MODE_DATE;
Calendar.MODE_MONTH = MODE_MONTH;
Calendar.MODE_YEAR = MODE_YEAR;
Calendar.MODE_DECADE = MODE_DECADE;
