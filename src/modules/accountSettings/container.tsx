import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mfaDevicesListActions, setMFADeviceAsDefault } from './mfaDevices/actions';
import { AccountSettings } from './components/AccountSettings';
import { MFADevicesFormModel } from './mfaDevices/models';
import { mfaDevicesSelector } from './mfaDevices/selectors';
import { mfaDevicesPaths } from './mfaDevices/constants';

const AccountSettingsPage = ({children}: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const devices = useSelector(mfaDevicesSelector);

  const onLoad = React.useCallback(
    () => dispatch(mfaDevicesListActions.read.call(new MFADevicesFormModel())),
    []);

  const onSetDeviceAsDefault = React.useCallback(
    (id: number) => dispatch(setMFADeviceAsDefault(id)),
    []);

  return (<AccountSettings
    onLoadDevices={onLoad}
    onSetDeviceAsDefault={onSetDeviceAsDefault}
    devices={devices}
    paths={mfaDevicesPaths}
  >{children}</AccountSettings>);
};

export {
  AccountSettingsPage,
};
