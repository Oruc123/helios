import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';
import { CheckMark } from 'components/CheckBox';

const startDateTypes = {
  account_opening: 'Account Opening',
  calendar: 'Calendar',
  license_issue: 'License Issue',
  last_delivery: 'Last Delivery',
};

const documentsColumns = data => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
  },
  {
    title: 'Internal',
    dataIndex: 'internal',
    key: 'internal',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'internal'),
    sortOrder: data.sorter.columnKey === 'internal' && data.sorter.order,
    render: isDocuments =>
      (isDocuments ? <CheckMark checked rounded size={CheckMark.SIZE_SMALL}/> : null),
  },
  {
    title: 'Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'frequency'),
    sortOrder: data.sorter.columnKey === 'frequency' && data.sorter.order,
  },
  {
    title: 'Start DateType',
    dataIndex: 'start_date_type',
    key: 'start_date_type',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'start_date_type'),
    sortOrder: data.sorter.columnKey === 'start_date_type' && data.sorter.order,
    render: type => startDateTypes[type] || '-',
  },
  {
    title: 'Expiration Delay Days',
    dataIndex: 'expiration_delay_days',
    key: 'expiration_delay_days',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'expiration_delay_days'),
    sortOrder: data.sorter.columnKey === 'expiration_delay_days' && data.sorter.order,
    render: days => days.toString(10),
  },
  {
    title: 'Last Modified Date',
    dataIndex: 'updated_at',
    key: 'updated_at',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'updated_at'),
    sortOrder: data.sorter.columnKey === 'updated_at' && data.sorter.order,
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

const documentsTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const documentsSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.documents.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Documents' }}
    columns={documentsColumns}
    storePath="company-documents"
    dataSources={{
      documents: {
        url: '/document-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={documentsSelector}
  />);
});

export { documentsTable as DocumentsTable };
