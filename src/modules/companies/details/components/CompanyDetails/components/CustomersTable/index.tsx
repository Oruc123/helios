import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';

const customersColumns = data => [
  {
    title: 'Customer Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
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

const customersTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const customersSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.customers.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Customers' }}
    columns={customersColumns}
    storePath="company-customers"
    dataSources={{
      customers: {
        url: '/customer-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={customersSelector}
  />);
});

export { customersTable as CustomersTable };
