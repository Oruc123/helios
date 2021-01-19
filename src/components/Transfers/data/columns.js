import React from 'react';
import { LicenseInfo } from 'components/License';
import { DateTime } from 'components/DateTime';
import { Link } from 'components/Link';
import { MAIN_INTERNAL_TRANSFERS_PATH } from 'modules/main/main-constants';
import sorters from 'utils/sorters';

export const internalTransfers = handlers => data => [
  {
    title: 'Transfer Number',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'id'),
    sortOrder: data.sorter.columnKey === 'id' && data.sorter.order,
    render: value => (
      <Link to={`${MAIN_INTERNAL_TRANSFERS_PATH}/${value}`} face={Link.FACE_DEFAULT}>
        {handlers.addPrefix(value)}
      </Link>
    )
  },
  {
    title: 'Sender',
    dataIndex: 'sender_license_id',
    key: 'sender_license_id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'sender_license_id'),
    sortOrder: data.sorter.columnKey === 'sender_license_id' && data.sorter.order,
    render: value => <LicenseInfo {...handlers.licenseInfo(value)} />
  },
  {
    title: 'Recipient',
    dataIndex: 'recipient_license_id',
    key: 'recipient_license_id',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'recipient_license_id'),
    sortOrder: data.sorter.columnKey === 'recipient_license_id' && data.sorter.order,
    render: value => <LicenseInfo {...handlers.licenseInfo(value)} />
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'amount'),
    sortOrder: data.sorter.columnKey === 'amount' && data.sorter.order,
    render: value => `$ ${value}`
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'status'),
    sortOrder: data.sorter.columnKey === 'status' && data.sorter.order
  },
  {
    title: 'Created Date',
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'created_at'),
    sortOrder: data.sorter.columnKey === 'created_at' && data.sorter.order,
    render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D" />
  }
];

export const internalTransfersStatusHistory = data => [
  {
    title: 'User',
    dataIndex: 'username',
    key: 'username',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'username'),
    sortOrder: data.sorter.columnKey === 'username' && data.sorter.order
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'email'),
    sortOrder: data.sorter.columnKey === 'email' && data.sorter.order
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'action'),
    sortOrder: data.sorter.columnKey === 'action' && data.sorter.order
  },
  {
    title: 'Timestamp',
    dataIndex: 'actionMilliseconds',
    key: 'actionMilliseconds',
    sorter: (a, b) => sorters.sortCollectionByPath(a, b, 'actionMilliseconds'),
    sortOrder: data.sorter.columnKey === 'actionMilliseconds' && data.sorter.order,
    render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D" />
  }
];

export const internalTransfersRecordHistory = data => [...internalTransfersStatusHistory(data)];
