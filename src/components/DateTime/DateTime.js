import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import bem from 'utils/bem';
import './DateTime.scss';
import { ElementPropTypes } from 'utils/prop-types';

export const DateTimePropTypes = {
  ...ElementPropTypes,
  dateFormat: PropTypes.string,
  parseFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  utc: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

export const DateTimeDefaultProps = {
  dateFormat: 'll',
  parseFormat: undefined,
  timeFormat: 'LT'
};

export const DateTime = ({ utc, parseFormat, dateFormat, timeFormat, className }) => {
  const localDate = moment.utc(utc, parseFormat).local();
  const children = [];

  if (dateFormat) {
    children.push(
      <span key="date" className={bem.element(DateTime, 'part', 'date')}>
        {localDate.format(dateFormat)}
      </span>
    );
  }

  if (timeFormat) {
    if (children.length) {
      children.push(' ');
    }

    children.push(
      <span key="time" className={bem.element(DateTime, 'part', 'time')}>
        {localDate.format(timeFormat)}
      </span>
    );
  }

  return <span className={bem.block(DateTime, null, className)}>{children}</span>;
};

DateTime.className = 'DateTime';
DateTime.propTypes = DateTimePropTypes;
DateTime.defaultProps = DateTimeDefaultProps;
