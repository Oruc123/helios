import React from 'react';
import AntTable from 'antd/es/table';
import { func, bool, array } from 'prop-types';
import bem from 'utils/bem';
import TableController from './TableController';
import './Table.scss';

export const TablePropTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...AntTable.propTypes,
  dataSource: array,
  loading: bool,
  customColumns: func,
  withRowSelection: bool
};

export const TableDefaultProps = {
  withRowSelection: false,
  dataSource: undefined,
  loading: false,
  customColumns: () => []
};

export class Table extends TableController {
  static propTypes = TablePropTypes;

  static defaultProps = TableDefaultProps;

  static className = 'Table';

  get columns() {
    const { sorter } = this.state;
    const { customColumns } = this.props;
    return customColumns({ sorter });
  }

  render() {
    const { withRowSelection, dataSource, ...props } = this.props;
    return (
      <div className={bem.block(this)}>
        <AntTable
          dataSource={dataSource}
          rowKey={o => o.id}
          onChange={this.onTableChange}
          pagination={dataSource?.length > 10}
          rowSelection={withRowSelection ? this.rowSelection : undefined}
          columns={this.columns}
          {...props}
        />
      </div>
    );
  }
}
