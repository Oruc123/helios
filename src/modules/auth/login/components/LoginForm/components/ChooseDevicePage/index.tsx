import * as React from 'react';
import { AuthSubmitButton } from 'components/Auth';
import { Select } from 'components/Select';
import { MfaDevice } from 'types/DTO';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  devices: MfaDevice[];
  isPending: boolean;
}

const ChooseDevicePage = (properties: Properties) => {
  const { Field, devices, isPending } = properties;

  const deviceSelect = React.useCallback(
    ({ value, onChange }) => (<Select
      value={value}
      onChange={onChange}
      dataSource={devices.map(d => ({
          label: d.phone_number || d.email || `MFA Application #${d.id}`,
          value: d.id,
        }))}
      />),
    [devices]);

  return (<>
    <span className={styles.hint}>
      Choose preferred device to get security code:
    </span>
    <Field
      name="chosenId"
      input={deviceSelect}
      input-type="email"
      input-placeholder="Email or phone number"
      input-autoComplete="firstDeviceForm.name"
    />
    <AuthSubmitButton isPending={isPending} className={styles.submit}>Send code</AuthSubmitButton>
  </>);
};

export {
  ChooseDevicePage,
};
