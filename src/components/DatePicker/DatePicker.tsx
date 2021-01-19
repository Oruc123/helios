import React from 'react'
import AntdDatePicker from 'antd/es/date-picker';
import 'antd/es/date-picker/style/index.less'

import {DatePickerProps as AntdDatePickerProps} from "antd/es/date-picker/interface";

export type DatePickerProps = AntdDatePickerProps

export const DatePicker = (props: DatePickerProps) => <AntdDatePicker {...props} />;

export default DatePicker
