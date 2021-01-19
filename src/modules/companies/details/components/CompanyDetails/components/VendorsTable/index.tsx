import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';

export const vendorsColumns = data => [
  {
    title: 'Vendor Name',
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

const vendorsTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const vendorsSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.vendors.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Vendors' }}
    columns={vendorsColumns}
    storePath="company-vendors"
    dataSources={{
      vendors: {
        url: '/vendor-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={vendorsSelector}
  />);
});

export { vendorsTable as VendorsTable };
