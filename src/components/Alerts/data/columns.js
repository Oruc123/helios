import React from 'react';
import { LicenseInfo } from 'components/License';
import { DateTime } from 'components/DateTime';
// import { Link } from 'components/Link';
// import { MAIN_ALERTS_PATH } from 'modules/main/main-constants';
import sorters from 'utils/sorters';

export const documentsApproval = data => [
  {
    title: 'File',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'name'),
    sortOrder: data.sorter.columnKey === 'name' && data.sorter.order
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'status'),
    sortOrder: data.sorter.columnKey === 'status' && data.sorter.order
    // render: value => _.truncate(value, { length: 170 })
  },
  {
    title: 'Document Period',
    dataIndex: 'document_period_id',
    key: 'document_period_id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'document_period_id'),
    sortOrder: data.sorter.columnKey === 'document_period_id' && data.sorter.order
    // render: value => _.truncate(value, { length: 170 })
  },
  {
    title: 'Created Date',
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'created_at'),
    sortOrder: data.sorter.columnKey === 'created_at' && data.sorter.order,
    render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D" />
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
    // render: value => _.truncate(value, { length: 170 })
  }
];

export const reportsQueue = handlers => data => [
  {
    title: 'Report',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'id'),
    sortOrder: data.sorter.columnKey === 'id' && data.sorter.order,
    render: value => handlers.addPrefix(value)
    // render: value => (
    //   <Link to={`${MAIN_ALERTS_PATH}/${value}`} face={Link.FACE_DEFAULT}>
    //     {`IT-${value}`}
    //   </Link>
    // )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'status'),
    sortOrder: data.sorter.columnKey === 'status' && data.sorter.order
  },
  {
    title: 'License',
    dataIndex: 'license_id',
    key: 'license_id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'license_id'),
    sortOrder: data.sorter.columnKey === 'license_id' && data.sorter.order,
    render: value => <LicenseInfo {...handlers.licenseInfo(value)} />
  },
  {
    title: 'Last Modified Date',
    dataIndex: 'updated_at',
    key: 'updated_at',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'updated_at'),
    sortOrder: data.sorter.columnKey === 'updated_at' && data.sorter.order,
    render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D" />
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
    // render: value => _.truncate(value, { length: 170 })
  }
];

export const annualReviewsApproval = handlers => data => [
  {
    title: 'Name',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'id'),
    sortOrder: data.sorter.columnKey === 'id' && data.sorter.order,
    render: value => handlers.addPrefix(value)
  },
  {
    title: 'Period Collected',
    dataIndex: 'questionnaire',
    key: 'questionnaire',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'questionnaire'),
    sortOrder: data.sorter.columnKey === 'questionnaire' && data.sorter.order,
    render: value => JSON.parse(value).financials_period_collected
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'status'),
    sortOrder: data.sorter.columnKey === 'status' && data.sorter.order
  },
  {
    title: 'Company',
    dataIndex: 'company_id',
    key: 'company_id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'company_id'),
    sortOrder: data.sorter.columnKey === 'company_id' && data.sorter.order,
    render: value => <LicenseInfo {...handlers.companyInfo(value)} />
    // render: (value, record) => [record.firstName, record.lastName].join(' '),
  },
  {
    title: 'Last Modified Date',
    dataIndex: 'updated_at',
    key: 'updated_at',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'updated_at'),
    sortOrder: data.sorter.columnKey === 'updated_at' && data.sorter.order,
    render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D" />
  },
  {
    title: 'Date of Last Annual Review',
    dataIndex: 'last_ar_date',
    key: 'last_ar_date',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'last_ar_date'),
    sortOrder: data.sorter.columnKey === 'last_ar_date' && data.sorter.order,
    render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D" />
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
    // render: value => _.truncate(value, { length: 170 })
  }
];
