import * as React from 'react';
import { Page } from 'components/Page';
import { Delimiter } from 'components/Delimiter';
import { ListModel } from 'utils/list';
import { Devices } from '../../mfaDevices/components/Devices';

interface Properties {
  onLoadDevices: () => any;
  devices: ListModel;
  paths: { [key: string]: string; };
  children: React.ReactNode;
  onSetDeviceAsDefault: (id: number) => any;
}

const accountSettings = (properties: Properties) => {
  const { onLoadDevices, devices, paths, children, onSetDeviceAsDefault } = properties;

  React.useEffect(
    () => {
      onLoadDevices();
    },
    []);

  return (<Page title="Account settings">
    <Delimiter/>
    <Devices
      devices={devices}
      paths={paths}
      onSetAsDefault={onSetDeviceAsDefault}
    />
    {children}
  </Page>);
};

export {
  accountSettings as AccountSettings,
};
