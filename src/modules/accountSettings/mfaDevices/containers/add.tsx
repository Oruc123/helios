import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddDevice } from '../components/AddDevice';
import { mfaDeviceWriteActions, activateMFADevice, retryChallenge } from '../actions';
import { mfaDeviceAddSelector } from '../selectors';
import { MFADeviceFormModel } from '../models';

interface Properties {
  onClose: () => any;
}

const container = (properties: Properties) => {
  const dispatch = useDispatch();
  const value = useSelector(mfaDeviceAddSelector);
  const previousState = React.useRef({ type: '', name: '' });

  const onAdd = React.useCallback(
    () => dispatch(mfaDeviceWriteActions.write.call(value)),
    [value]);

  const onActivate = React.useCallback(
    (code?: number) => dispatch(activateMFADevice(code || value.getValue().code)),
    [value]);

  const onChange = React.useCallback(
    (form) => {
      const plain = form.getValue();
      const newFormState = { type: plain.type, name: plain.email || plain.phone_number };
      const chosenTypeChanged = newFormState.type !== previousState.current.type;
      const chosenNameChanged = newFormState.name !== previousState.current.name;

      previousState.current = newFormState;

      if (chosenTypeChanged || chosenNameChanged) {
        let newForm = new MFADeviceFormModel().setField('type', form.getField('type'));

        if (!chosenTypeChanged) {
          newForm = newForm
            .setField('email', form.getField('email'))
            .setField('phone_number', form.getField('phone_number'));
        }

        dispatch(mfaDeviceWriteActions.value.set(newForm));
      } else {
        dispatch(mfaDeviceWriteActions.value.set(form));

        if (plain.code.length === 6) {
          onActivate(plain.code);
        }
      }
    },
    [onActivate]);

  const onClose = React.useCallback(
    () => {
      dispatch(mfaDeviceWriteActions.value.set(new MFADeviceFormModel()));
      properties.onClose();
    },
    []);

  const onRetryChallenge = React.useCallback(() => dispatch(retryChallenge()), []);

  React.useEffect(() => () => onClose(), []);

  return (<AddDevice
    value={value}
    onRetryChallenge={onRetryChallenge}
    challengeStartedAt={value.getValue().challenge_started_at}
    onChange={onChange}
    onSubmit={onAdd}
    onClose={onClose}
    type={value.getValue().type}
  />);
};

export {
  container as AddMFADeviceContainer,
};
