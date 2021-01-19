import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Select } from 'components/Select';

import { getYears, getDaysInMonth, arrayByCount } from './helpers';
import './styles.less';

const MONTHS = moment.months().map((e, i) => ({ name: e, id: i + 1 }));

export default class DateSelect extends React.Component {
  state = {
    year: getYears()[0],
    month: MONTHS[0],
    day: 1
  };

  componentWillMount() {
    const { locale } = this.props;

    moment.locale(locale);
  }

  handleChangeDay = day => {
    const { onChange } = this.props;
    const { year, month } = this.state;

    this.setState({ day });

    onChange(moment({ year, month: month.id, day }).format());
  };

  handleChangeMonth = month => {
    const { onChange } = this.props;
    const { year, day } = this.state;
    const dayInMonth = getDaysInMonth(month, year);
    const getDay = day > dayInMonth ? dayInMonth : day;

    this.setState({ month: MONTHS.find(e => e.id === month), day: getDay });
    onChange(moment({ year, month, day }).format());
  };

  handleChangeYear = year => {
    const { onChange } = this.props;
    const { month, day } = this.state;
    const dayInMonth = getDaysInMonth(month.id, year);
    const getDay = day > dayInMonth ? dayInMonth : day;

    this.setState({ year, day: getDay });
    onChange(moment({ year, month: month.id, day }).format());
  };

  render() {
    const { yearRange, initialValue } = this.props;
    const { year, month, day } = this.state;
    const days = getDaysInMonth(month.id, year);

    return (
      <div className="date-select-root">
        <Select
          style={{ width: 60 }}
          {...(initialValue ? { value: `${day}` } : {})}
          onChange={this.handleChangeDay}
          dataSource={arrayByCount(days).map(e => ({ label: e, value: e }))}
        />
        <Select
          style={{ width: 101 }}
          {...(initialValue ? { value: `${month.id}` } : {})}
          onChange={this.handleChangeMonth}
          dataSource={MONTHS.map(e => ({ label: e.name, value: e.id }))}
        />
        <Select
          style={{ width: 78 }}
          {...(initialValue ? { value: `${year}` } : {})}
          onChange={this.handleChangeYear}
          dataSource={getYears(yearRange).map(e => ({ label: e, value: e }))}
        />
      </div>
    );
  }
}

DateSelect.propTypes = {
  yearRange: PropTypes.number,
  initialValue: PropTypes.bool,
  onChange: PropTypes.func,
  locale: PropTypes.string
};

DateSelect.defaultProps = {
  yearRange: 30,
  initialValue: false,
  onChange: () => {},
  locale: 'ru'
};
