import * as React from 'react';
import { Link } from 'components/Link';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';
import {manageLicensePath} from "modules/licenses/edit";

export const retailReportsColumns = data => [
  {
    title: 'Created',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'status'),
    sortOrder: data.sorter.columnKey === 'status' && data.sorter.order,
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'start_date'),
    sortOrder: data.sorter.columnKey === 'start_date' && data.sorter.order,
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

const RetailReports = React.memo((properties: Properties) => {
  const { licenseId } = properties;

  const retailReportsSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.retailReports.records;
    },
    []);

  return (
    <ConnectedTable
      sectionProperties={{ title: 'Retail Reports' }}
      columns={retailReportsColumns}
      storePath="companyLicense-retailReports"
      dataSources={{
        retailReports: {
          url: '/report-retail-list',
          payload: { license_id: licenseId },
        },
      }}
      dataSourceSelector={retailReportsSelector}
    />
  );
});

export { RetailReports };
