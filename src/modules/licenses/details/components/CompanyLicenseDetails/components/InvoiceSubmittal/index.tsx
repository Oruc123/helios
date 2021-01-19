import * as React from 'react';
import { Link } from 'components/Link';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';
import {manageLicensePath} from "modules/licenses/edit";

export const invoiceSubmittalColumns = data => [
  {
    title: 'Invoice Submittal Number',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
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
    render: (text, record) => (
      <React.Fragment>
        <Link to={`${manageLicensePath}/${record.id}}`} face={Link.FACE_DEFAULT}>
          Edit
        </Link>
        <Link to={`${manageLicensePath}/${record.id}}/delete`} face={Link.FACE_DEFAULT}>
          Delete
        </Link>
      </React.Fragment>
    ),
  },
];

interface Properties {
  licenseId: number;
}

const InvoiceSubmittal = React.memo((properties: Properties) => {
  const { licenseId } = properties;

  const invoiceSubmittalSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.invoiceSubmittal.records;
    },
    []);

  return (
    <ConnectedTable
      sectionProperties={{ title: 'Invoice Submittal' }}
      columns={invoiceSubmittalColumns}
      storePath="companyLicense-invoiceSubmittal"
      dataSources={{
        invoiceSubmittal: {
          url: '/invoice-submittal-list',
          payload: { license_id: licenseId },
        },
      }}
      dataSourceSelector={invoiceSubmittalSelector}
    />
  );
});

export { InvoiceSubmittal };
