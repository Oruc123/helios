import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';

export const ownersColumns = data => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
  },
  {
    title: 'Ownership',
    dataIndex: 'ownership',
    key: 'ownership',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'ownership'),
    sortOrder: data.sorter.columnKey === 'ownership' && data.sorter.order,
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

const ownersTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const ownersSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.contacts.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Owners' }}
    columns={ownersColumns}
    storePath="company-owners"
    dataSources={{
      contacts: {
        url: '/contact-metadata-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={ownersSelector}
  />);
});

export { ownersTable as OwnersTable };
