import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { TableCellPropTypes as TableCellElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import './TableCell.scss';

export const TableCellPropTypes = {
  ...TableCellElementPropTypes
};

export const TableCellDefaultProps = {
  children: null
};

export class TableCell extends PureComponent {
  static className = 'TableCell';

  static propTypes = TableCellPropTypes;

  static defaultProps = TableCellDefaultProps;

  render() {
    return <td {...filter(this.props, TableCellElementPropTypes)} className={bem.block(this)} />;
  }
}
