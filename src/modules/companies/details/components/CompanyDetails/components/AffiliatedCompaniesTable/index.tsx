import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';

export const affiliatedCompaniesColumns = data => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
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

const affiliatedCompaniesTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const affiliatedCompaniesSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.affiliatedCompanies.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Affiliated Companies' }}
    columns={affiliatedCompaniesColumns}
    storePath="company-affiliatedCompanies"
    dataSources={{
      affiliatedCompanies: {
        url: '/affiliated-company-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={affiliatedCompaniesSelector}
  />);
});

export { affiliatedCompaniesTable as AffiliatedCompaniesTable };
