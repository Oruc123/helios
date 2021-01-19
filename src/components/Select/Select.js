import AntSelect from 'antd/es/select';
import { Icon } from 'components/Icon';
import { array, bool, func, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { SPRITE_DOWN } from 'sprites';
import bem from 'utils/bem';
import './Select.scss';

export const OptionPropTypes = {
  value: oneOfType([string, number]),
  label: oneOfType([string, number])
};

export const OptionDefaultProps = {
  value: '',
  label: ''
};

const Option = ({ label, value }, i) => (
  <AntSelect.Option key={i} value={value}>
    {label || value}
  </AntSelect.Option>
);

Option.className = 'Option';
Option.propTypes = OptionPropTypes;
Option.defaultProps = OptionDefaultProps;

const getPopupContainer = () => document.querySelector('#dropdown-container') || document.body;

export const SelectPropTypes = {
  className: string,
  dataSource: array,
  dropdownMatchSelectWidth: bool,
  getPopupContainer: func,
  label: string,
  onChange: func
};

export const SelectDefaultProps = {
  className: undefined,
  dropdownMatchSelectWidth: false,
  dataSource: [],
  getPopupContainer,
  label: '',
  onChange: undefined
};

export const Select = ({ label, className, dataSource, ...props }) => (
  <div className={bem.block(Select, null, className)}>
    {label && <div className={bem.element(Select, 'label')}>{label}</div>}
    <AntSelect
      {...props}
      suffixIcon={<Icon type={SPRITE_DOWN} size={Icon.SIZE_SMALL} face={Icon.FACE_DEFAULT} />}
      className={bem.element(Select, 'select')}
    >
      {dataSource.map(Option)}
    </AntSelect>
  </div>
);

Select.className = 'Select';
Select.propTypes = SelectPropTypes;
Select.defaultProps = SelectDefaultProps;
