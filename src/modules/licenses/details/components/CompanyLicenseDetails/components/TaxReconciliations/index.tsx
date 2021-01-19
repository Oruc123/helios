import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';

export const taxReconciliationsColumns = data => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'start_date'),
    sortOrder: data.sorter.columnKey === 'start_date' && data.sorter.order,
  },
];

interface Properties {
  licenseId: number;
}

const TaxReconciliations = React.memo((properties: Properties) => {
  const { licenseId } = properties;

  const taxReconciliationsSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.taxReconciliations.records;
    },
    []);

  return (
    <ConnectedTable
      sectionProperties={{ title: 'Tax Reconciliations' }}
      columns={taxReconciliationsColumns}
      storePath="companyLicense-taxReconciliations"
      dataSources={{
        taxReconciliations: {
          url: '/report-tax-reconciliation-list',
          payload: { license_id: licenseId },
        },
      }}
      dataSourceSelector={taxReconciliationsSelector}
    />
  );
});

export { TaxReconciliations };
