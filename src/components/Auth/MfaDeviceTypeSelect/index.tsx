import * as React from 'react';
import { Select } from 'components/Select';

interface Properties {
  value: string;
  onChange: (value: string) => any;
}

const mfaDeviceTypeSelect = (properties: Properties) => {
  const { value, onChange } = properties;

  return (<Select
    value={value}
    onChange={onChange}
    dataSource={[
      { label: 'E-mail', value: 'email' },
      { label: 'Sms', value: 'sms' },
      { label: 'Application', value: 'totp' },
    ]}
  />);
};

export {
  mfaDeviceTypeSelect as MfaDeviceTypeSelect,
};
