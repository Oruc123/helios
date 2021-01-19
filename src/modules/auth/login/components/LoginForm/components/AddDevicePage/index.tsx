import * as React from 'react';
import { AuthInput, AuthLink, AuthSubmitButton } from 'components/Auth';
import { Button } from 'components/Button';
import { TransitionAppearance } from 'components/TransitionAppearance';
import { FirstDeviceFormModel } from '../../../../models';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  isPending: boolean;
  value: typeof FirstDeviceFormModel;
  onChange: (value: any) => any;
  onResetLogin: () => any;
}

const PHONE_MASK =
  ['+', /\d/, ' ',  '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

const addDevicePage = (properties: Properties) => {
  const { Field, isPending, value, onChange, onResetLogin } = properties;
  const plain = value.getValue();
  const type = plain.type;

  const onChangeType = React.useCallback(
    (type: string, name: string) => onChange(value.setValue({ ...plain, type, name })),
    []);

  return (<>
    <div className={styles.hint}>
      <b>Please, choose a type of your first MFA device.</b>
      <b>We will send you security code there.</b>
        Later you can change preferred method in your account settings.
    </div>
    <div className={`${styles.switcher} ${type === 'totp' ? styles.switcherTotp : ''}`}>
      <Button
        rounded
        className={type === 'sms' ? styles.chosen : ''}
        type="button"
        onClick={() => onChangeType('sms', '+1(')}
        >
          SMS
      </Button>
      <Button
        rounded
        className={type === 'email' ? styles.chosen : ''}
        type="button"
        onClick={() => onChangeType( 'email', '')}
        >
          Email
      </Button>
      <Button
        rounded
        className={type === 'totp' ? styles.chosen : ''}
        type="button"
        onClick={() => onChangeType( 'totp', '')}
        >
          Application
      </Button>
    </div>
    <TransitionAppearance visible={type !== 'totp'}>
      <Field
        name="name"
        input={AuthInput}
        input-type={type === 'sms' ? 'phone' : type}
        input-mask={type === 'sms' ? PHONE_MASK : undefined}
        input-placeholder={type === 'sms' ? 'Phone' : 'Email'}
        input-autoComplete="firstDeviceForm.name"
        />
    </TransitionAppearance>
    <div className={styles.buttons}>
      <AuthSubmitButton isPending={isPending} className={styles.submit}>
          Send code
      </AuthSubmitButton>
      <AuthLink to="#" onClick={onResetLogin}>Return to Log in</AuthLink>
    </div>
  </>
  );
};

export {
  addDevicePage as AddDevicePage,
};
