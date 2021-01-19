import * as React from 'react';
import { Link } from 'components/Link';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';
import {manageLicensePath} from "modules/licenses/edit";

export const internalTransfersColumns = data => [
  {
    title: 'Transferm number',
    dataIndex: 'manifest_number',
    key: 'manifest_number',
  },
  {
    title: 'Sender',
    dataIndex: 'senderName',
    key: 'senderName',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'status'),
    sortOrder: data.sorter.columnKey === 'status' && data.sorter.order,
  },
  {
    title: 'Created Date',
    dataIndex: 'created_at',
    key: 'created_at',
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

const InternalTransfers = React.memo((properties: Properties) => {
  const { licenseId } = properties;

  const internalTransfersSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.internalTransfers.records;
    },
    []);

  return (
    <ConnectedTable
      sectionProperties={{ title: 'Internal Transfers' }}
      columns={internalTransfersColumns}
      storePath="companyLicense-internalTransfers"
      dataSources={{
        internalTransfers: {
          url: '/internal-transfer-list',
          payload: { license_id: licenseId },
        },
      }}
      dataSourceSelector={internalTransfersSelector}
    />
  );
});

export { InternalTransfers };
