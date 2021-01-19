import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';
import { CheckMark } from 'components/CheckBox';

export const contactsColumns = data => [
  {
    title: 'Name',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
    render: (value, record) => [record.first_name, record.last_name].join(' '),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'email'),
    sortOrder: data.sorter.columnKey === 'email' && data.sorter.order,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'phone'),
    sortOrder: data.sorter.columnKey === 'phone' && data.sorter.order,
  },
  {
    title: 'Documents',
    dataIndex: 'is_documents',
    key: 'is_documents',
    render: isDocuments =>
      (isDocuments ? <CheckMark checked rounded size={CheckMark.SIZE_SMALL}/> : null),
  },
  {
    title: 'Financials',
    dataIndex: 'is_financials',
    key: 'is_financials',
    render: isFinancials =>
      (isFinancials ? <CheckMark checked rounded size={CheckMark.SIZE_SMALL}/> : null),
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

const contactsTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const contactsSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.contacts.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Contacts' }}
    columns={contactsColumns}
    storePath="company-contacts"
    dataSources={{
      contacts: {
        url: '/contact-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={contactsSelector}
  />);
});

export { contactsTable as ContactsTable };
