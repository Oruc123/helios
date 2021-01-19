import { Dropdown } from 'components/Dropdown';
import moment from 'moment';
import Calendar from 'rc-calendar';
import { string } from 'prop-types';
import React, { PureComponent } from 'react';
import 'rc-calendar/assets/index.css';

import { Icon } from 'components/Icon';
import bem from 'utils/bem';
import { addEventListener } from 'utils/html';
import { filter, withRefProps } from 'utils/props';

import { InputText, InputTextDefaultProps, InputTextPropTypes } from './InputText';

const emptyArray = [];

// eslint-disable-next-line import/prefer-default-export
export const [InputDate, InputDatePropTypes, InputDateDefaultProps] = withRefProps(
  class InputDate extends PureComponent {
    static className = 'InputDate';

    static propTypes = {
      ...InputTextPropTypes,
      format: string
    };

    static defaultProps = {
      ...InputTextDefaultProps,
      format: 'YYYY/MM/DD'
    };

    static refProps = ['input'];

    state = {
      visible: false
    };

    componentDidMount() {
      this.removeDocumentClickListener = addEventListener(document, 'click', this.handleDocumentClickListener);
    }

    componentWillUnmount() {
      if (this.removeDocumentClickListener) {
        this.removeDocumentClickListener();
      }
    }

    handleDocumentClickListener = () => {
      // this.setState({ visible: false });
    };

    handleFocus = () => {
      const { disabled, readOnly } = this.props;

      if (!disabled && !readOnly) {
        this.setState({ visible: true });
      }
    };

    handleVisibleChange = visible => {
      this.setState({ visible });
    };

    handleCalendarChange = value => {
      const { format, onChange } = this.props;

      this.setState({ visible: false });

      if (typeof onChange === 'function') {
        onChange(value.format(format));
      }
    };

    renderCalendar() {
      const { format, value } = this.props;

      return (
        <div>
          <Calendar
            value={moment(value, format)}
            formatter={format}
            showDateInput={false}
            showToday={false}
            focusablePanel={false}
            onChange={this.handleCalendarChange}
          />
        </div>
      );
    }

    render() {
      const { format, ...props } = this.props;
      const { visible } = this.state;

      return (
        <Dropdown
          overlay={this.renderCalendar()}
          visible={visible}
          trigger={emptyArray}
          onVisibleChange={this.handleVisibleChange}
        >
          <InputText
            {...filter(props, InputTextPropTypes)}
            ref={this.inputRef}
            type="text"
            placeholder={format}
            readOnly
            className={bem.block(this)}
            onFocus={this.handleFocus}
          >
            <Icon type="down" size={Icon.SIZE_SMALL} className={bem.element(this, 'arrow', { visible })} />
          </InputText>
        </Dropdown>
      );
    }
  }
);
