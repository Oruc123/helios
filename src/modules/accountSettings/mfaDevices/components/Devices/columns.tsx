import * as React from 'react';
import { DateTime } from 'components/DateTime';
import { MfaDevice } from 'types/DTO';

export const mfaDevicesColumns = render => () => [
  {
    title: 'Name',
    align: 'center',
    dataIndex: 'id',
    key: 'id',
    render: (_, record: MfaDevice) =>
      record.phone_number || record.email || `MFA application #${record.id}`,
  },
  {
    title: 'Created Date',
    align: 'center',
    dataIndex: 'created_at',
    key: 'created_at',
    render: utc => utc && <DateTime utc={utc} dateFormat="YYYY/M/D"/>,
  },
  {
    title: 'Last Used Date',
    align: 'center',
    dataIndex: 'last_used_at',
    key: 'last_used_at',
    render: utc => utc ? <DateTime utc={utc} dateFormat="YYYY/M/D"/> : '-',
  },
  {
    title: 'Type',
    align: 'center',
    dataIndex: 'type',
    key: 'type',
    render: type => ({ sms: 'SMS', email: 'E-mail', totp: 'Application' }[type] || 'Unknown'),
  },
  {
    title: 'Use by default',
    align: 'center',
    dataIndex: 'default',
    key: 'default',
    render: render.defaultActions,
  },
  {
    title: 'Action',
    align: 'center',
    dataIndex: 'action',
    key: 'action',
    render: render.actions,
  },
];
