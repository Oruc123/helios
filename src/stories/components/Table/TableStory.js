/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { withKnobs } from '@storybook/addon-knobs';

import { Table } from 'components/Table';
import { withLayout } from 'stories/StoryLayout';
import sorters from 'utils/sorters';
import notes from './TableStory.md';

const columns = (data = {}) => [
  {
    title: 'Account Name',
    dataIndex: 'accountName',
    key: 'accountName',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'accountName'),
    sortOrder: data.sorter.columnKey === 'accountName' && data.sorter.order
    // render: (value, record) => [record.firstName, record.lastName].join(' '),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'phone'),
    sortOrder: data.sorter.columnKey === 'phone' && data.sorter.order
    // render: value => _.truncate(value, { length: 170 })
  },
  {
    title: 'DBA',
    dataIndex: 'dba',
    key: 'dba',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'dba'),
    sortOrder: data.sorter.columnKey === 'dba' && data.sorter.order
    // render: value => _.truncate(value, { length: 170 })
  }
];

const dataSource = [
  { id: 1, accountName: 'Kind Love, LLC', phone: '(888) 555-0001', dba: 'ABC' },
  { id: 2, accountName: 'Good Meds', phone: '(303) 565-3600', dba: 'ABC' },
  { id: 3, accountName: 'Kind Love, LLC', phone: '(888) 555-0001', dba: 'ABC' },
  { id: 4, accountName: 'Good Meds', phone: '(303) 565-3600', dba: 'ABC' },
  { id: 5, accountName: 'Kind Love, LLC', phone: '(888) 555-0001', dba: 'ABC' },
  { id: 6, accountName: 'Good Meds', phone: '(303) 565-3600', dba: 'ABC' },
  { id: 7, accountName: 'Kind Love, LLC', phone: '(888) 555-0001', dba: 'ABC' },
  { id: 8, accountName: 'Good Meds', phone: '(303) 565-3600', dba: 'ABC' },
  { id: 9, accountName: 'Kind Love, LLC', phone: '(888) 555-0001', dba: 'ABC' },
  { id: 10, accountName: 'Good Meds', phone: '(303) 565-3600', dba: 'ABC' },
  { id: 11, accountName: 'Kind Love, LLC', phone: '(888) 555-0001', dba: 'ABC' }
];

class TableStory extends Component {
  state = {
    pagination: {},
    filters: {},
    sorter: {},

    selectedRowKeys: [],
    selectedData: []
  };

  onTableChange = (pagination, filters, sorter) => {
    this.setState({ pagination, filters, sorter });
  };

  onTableSelectChange = (data, selected) => {
    let { selectedRowKeys = [], selectedData = [] } = this.state;

    if (selected) {
      selectedRowKeys.push(data.id);
      selectedData.push(data);
    } else {
      selectedRowKeys = selectedRowKeys.filter(item => item !== data.id);
      selectedData = selectedData.filter(item => item.id !== data.id);
    }

    this.setState({ selectedRowKeys, selectedData });
  };

  onTableSelectAllChange = (selected, selectedRows, changeRows) => {
    let { selectedRowKeys = [], selectedData = [] } = this.state;

    if (selected) {
      for (let i = 0; i < changeRows.length; i += 1) {
        selectedRowKeys.push(changeRows[i].id);
        selectedData.push(changeRows[i]);
      }
    } else {
      const deletedRowsIds = changeRows.map(e => e.id);

      selectedRowKeys = selectedRowKeys.filter(item => deletedRowsIds.indexOf(item) === -1);
      selectedData = selectedData.filter(item => deletedRowsIds.indexOf(item.id) === -1);
    }
    this.setState({ selectedRowKeys, selectedData });
  };

  render() {
    const { selectedRowKeys, sorter } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onSelect: this.onTableSelectChange,
      onSelectAll: this.onTableSelectAllChange
    };
    return (
      <Table
        // loading
        rowKey={o => o.id}
        rowSelection={rowSelection}
        columns={columns({ sorter })}
        dataSource={dataSource}
        onChange={this.onTableChange}
      />
    );
  }
}

export default storiesOf('components', module)
  .addDecorator(withInfo)
  .addDecorator(withLayout())
  .addDecorator(withKnobs)
  .add('Table', () => <TableStory />, { notes: { markdown: notes } });
