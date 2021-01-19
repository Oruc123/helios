import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { DeleteDevice } from '../components/DeleteDevice';
import { mfaDeviceDeleteActions } from '../actions';
import { mfaDeviceDeletionSelector, mfaDevicesSelector } from '../selectors';
import { MFADevicesFormModel } from '../models';

interface Properties {
  onClose: () => any;
}

const container = (properties: Properties & RouteComponentProps) => {
  const dispatch = useDispatch();
  const id = +properties.match.params.id;
  const devices = useSelector(mfaDevicesSelector).getValue();

  React.useEffect(
    () => {
      dispatch(
        mfaDeviceDeleteActions.value.set(
          (new MFADevicesFormModel).setValue(
            (Array.isArray(devices) ? devices : []).find(i => +i.id === id))));
    },
    [id, devices]);

  const value = useSelector(mfaDeviceDeletionSelector);

  const onDelete = React.useCallback(
    () => dispatch(mfaDeviceDeleteActions.delete.call(value)),
    [value]);

  return (<DeleteDevice
    value={value}
    onDelete={onDelete}
    onClose={properties.onClose}
  />);
};

export {
  container as MFADeviceDeletionContainer,
};
