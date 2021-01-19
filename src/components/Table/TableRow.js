import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import './TableRow.scss';

export const TableRowPropTypes = {
  ...ElementPropTypes
};

export const TableRowDefaultProps = {
  children: null
};

export class TableRow extends PureComponent {
  static className = 'TableRow';

  static propTypes = TableRowPropTypes;

  static defaultProps = TableRowDefaultProps;

  render() {
    return <tr {...filter(this.props, ElementPropTypes)} className={bem.block(this)} />;
  }
}
