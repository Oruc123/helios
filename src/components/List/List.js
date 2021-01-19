import { Table } from 'components/Table';
import memoize from 'memoize-one';
import { arrayOf, func, instanceOf, object, string } from 'prop-types';
import React from 'react';
import bem from 'utils/bem';
import { ListModel } from 'utils/list';
import './List.scss';

const filterDataSource = memoize((list, dataSource, columns, searchValue) =>
  dataSource.filter(data =>
    columns.some(
      ({ dataIndex }) => dataIndex && data[dataIndex] != null && String(data[dataIndex]).includes(searchValue)
    )
  )
);

export const ListPropTypes = {
  columns: arrayOf(object.isRequired).isRequired,
  searchValue: string,
  value: instanceOf(ListModel).isRequired,
  onSelect: func
};

export const ListDefaultProps = {
  pending: false,
  searchValue: '',
  onSelect: undefined
};

export class List extends React.PureComponent {
  static className = 'List';

  static propTypes = {
    ...ListPropTypes
  };

  static defaultProps = {
    ListDefaultProps
  };

  render() {
    const { columns, value, searchValue } = this.props;
    const dataSource = [...value.getValue().values()];

    return (
      <Table
        loading={value.isPending()}
        locale={{ emptyText: dataSource?.length === 0 ? 'No data' : 'No results found' }}
        columns={columns}
        dataSource={searchValue === '' ? dataSource : filterDataSource(this, dataSource, columns, searchValue)}
        className={bem.block(this)}
      />
    );
  }
}
