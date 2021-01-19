import React from 'react';
import { CheckMark } from 'components/CheckBox';
import { LicenseInfo } from 'components/License';
import { DateTime } from 'components/DateTime';
import sorters from 'utils/sorters';

// eslint-disable-next-line import/prefer-default-export
export const documentsDue = handlers => data => [
  {
    title: 'Name',
    dataIndex: 'document_name',
    key: 'document_name',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'document_name'),
    sortOrder: data.sorter.columnKey === 'document_name' && data.sorter.order
    // render: (value, record) => [record.firstName, record.lastName].join(' '),
  },
  {
    title: 'Internal',
    dataIndex: 'internal',
    key: 'internal',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'internal'),
    render: active => (active ? <CheckMark checked={active} rounded size={CheckMark.SIZE_SMALL} /> : null)
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
    title: 'Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'frequency'),
    sortOrder: data.sorter.columnKey === 'frequency' && data.sorter.order
    // render: value => _.truncate(value, { length: 170 })
  },
  {
    title: 'Next Due Date',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'end_date'),
    sortOrder: data.sorter.columnKey === 'end_date' && data.sorter.order,
    render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D" />
  }
];
