import React from 'react';
import { Link } from 'components/Link';
import { CheckMark } from 'components/CheckBox';
import { companyListPaths } from 'modules/companies/list';
import sorters from 'utils/sorters';
import { generatePath } from 'react-router';

export const companies = render => data => [
  {
    title: 'Account Name',
    align: 'center',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order,
    render: (value, { id }) => (
      <Link to={generatePath(companyListPaths.detail, { id })} face={Link.FACE_DEFAULT}>
        {value}
      </Link>
    )
  },
  {
    title: 'Phone',
    align: 'center',
    dataIndex: 'phone',
    key: 'phone',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'phone'),
    sortOrder: data.sorter.columnKey === 'phone' && data.sorter.order
  },
  {
    title: 'DBA',
    align: 'center',
    dataIndex: 'dba',
    key: 'dba',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'dba'),
    sortOrder: data.sorter.columnKey === 'dba' && data.sorter.order
  },
  {
    title: 'Active',
    align: 'center',
    dataIndex: 'active',
    key: 'active',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'active'),
    sortOrder: data.sorter.columnKey === 'active' && data.sorter.order,
    render: active => (active ? <CheckMark checked={active} rounded size={CheckMark.SIZE_SMALL} /> : null)
  },
  {
    title: 'Customer Status',
    align: 'center',
    dataIndex: 'customer_status',
    key: 'customer_status',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'customer_status'),
    sortOrder: data.sorter.columnKey === 'customer_status' && data.sorter.order
  },
  {
    title: 'Entity Type',
    align: 'center',
    dataIndex: 'entity_type',
    key: 'entity_type',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'entity_type'),
    sortOrder: data.sorter.columnKey === 'entity_type' && data.sorter.order
  },
  {
    title: 'Business Type',
    align: 'center',
    dataIndex: 'business_type',
    key: 'business_type',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'business_type'),
    sortOrder: data.sorter.columnKey === 'business_type' && data.sorter.order
  },
  {
    title: 'Action',
    align: 'center',
    dataIndex: 'action',
    key: 'action',
    render: render.action
  }
];
