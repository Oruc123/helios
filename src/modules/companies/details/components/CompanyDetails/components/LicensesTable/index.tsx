import * as React from 'react';
import sorters from 'utils/sorters';
import { ConnectedTable } from 'modules/tables';
import { Link } from 'components/Link';
import { licenseListPath } from 'modules/licenses/list';

const licensesColumns = (data) => {
  return [
    {
      title: 'License Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
      sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
      render: (value, { company_id: companyId, id }) => {
        return (
          <Link to={`${licenseListPath}/${companyId}/${id}`} face={Link.FACE_DEFAULT}>
            {value}
          </Link>
        );
      },
    },
    {
      title: 'License Subtype',
      dataIndex: 'subtype',
      key: 'subtype',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'subtype'),
      sortOrder: data.sorter.columnKey === 'subtype' && data.sorter.order,
    },
    {
      title: 'License Number',
      dataIndex: 'license_number',
      key: 'license_number',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'license_number'),
      sortOrder: data.sorter.columnKey === 'license_number' && data.sorter.order,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'city'),
      sortOrder: data.sorter.columnKey === 'city' && data.sorter.order,
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'state'),
      sortOrder: data.sorter.columnKey === 'state' && data.sorter.order,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'phone'),
      sortOrder: data.sorter.columnKey === 'phone' && data.sorter.order,
    },
    {
      title: 'POS Type',
      dataIndex: 'pos_type',
      key: 'pos_type',
      sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'pos_type'),
      sortOrder: data.sorter.columnKey === 'pos_type' && data.sorter.order,
    },
  ];
};

interface Properties {
  companyId: number;
}

const licensesTable = React.memo((properties: Properties) => {
  const { companyId } = properties;

  const licensesSelector = React.useCallback(
    (data: any) => {
      if (!data) {
        return [];
      }

      return data.licenses.records;
    },
    []);

  return (<ConnectedTable
    sectionProperties={{ title: 'Licenses' }}
    columns={licensesColumns}
    storePath="company-licenses"
    dataSources={{
      licenses: {
        url: '/license-list',
        payload: { company_id: companyId },
      },
    }}
    dataSourceSelector={licensesSelector}
  />);
});

export { licensesTable as LicensesTable };
