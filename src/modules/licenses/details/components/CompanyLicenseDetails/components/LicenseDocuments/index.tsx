import * as React from 'react';
import { Link } from 'components/Link';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';
import {manageLicensePath} from "modules/licenses/edit";

export const licenseDocumentsColumns = data => [
  {
    title: 'License Document Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Internal',
    dataIndex: 'internal',
    key: 'internal',
  },
  {
    title: 'Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'status'),
    sortOrder: data.sorter.columnKey === 'status' && data.sorter.order,
  },
  {
    title: 'Next Due Date',
    dataIndex: 'next_created',
    key: 'next_created',
  },
  {
    title: 'Almost Due',
    dataIndex: 'end_date',
    key: 'end_date',
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

const LicenseDocuments = React.memo((properties: Properties) => {
  const { licenseId } = properties;

  const licenseDocumentsSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.licenseDocuments.records;
    },
    []);

  return (
    <ConnectedTable
      sectionProperties={{ title: 'License Documents' }}
      columns={licenseDocumentsColumns}
      storePath="companyLicense-licenseDocuments"
      dataSources={{
        licenseDocuments: {
          url: '/document-list',
          payload: { license_id: licenseId },
        },
      }}
      dataSourceSelector={licenseDocumentsSelector}
    />
  );
});

export { LicenseDocuments };
