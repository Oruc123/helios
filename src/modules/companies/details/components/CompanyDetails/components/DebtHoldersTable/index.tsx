import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';

export const debtHoldersColumns = data => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
    // render: (value, record) => [record.firstName, record.lastName].join(' '),
  },
  {
    title: 'Entity Name',
    dataIndex: 'entityName',
    key: 'entityName',
    // sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'phone'),
    // sortOrder: data.sorter.columnKey === 'phone' && data.sorter.order,
    // render: value => _.truncate(value, { length: 170 })
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    // render: value => _.truncate(value, { length: 170 })
  },
];

interface Properties {
  companyId: number;
}

const debtHoldersTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const debtHoldersSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.debtHolders.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Debt Holders' }}
    columns={debtHoldersColumns}
    storePath="company-debtHolders"
    dataSources={{
      debtHolders: {
        url: '/contact-metadata-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={debtHoldersSelector}
  />);
});

export { debtHoldersTable as DebtHoldersTable };
