import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';

export const accountSignersColumns = data => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
  },
  {
    title: 'Entity Name',
    dataIndex: 'entityName',
    key: 'entityName',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

interface Properties {
  companyId: number;
}

const accountSignersTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const accountSignersSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.accountSigners.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Account Signers' }}
    columns={accountSignersColumns}
    storePath="company-accountSigners"
    dataSources={{
      accountSigners: {
        url: '/contact-metadata-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={accountSignersSelector}
  />);
});

export { accountSignersTable as AccountSignersTable };
