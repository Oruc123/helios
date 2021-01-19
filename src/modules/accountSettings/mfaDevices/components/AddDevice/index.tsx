import * as React from 'react';
import * as QR from 'qrcode';
import { FormButtons, withForm } from 'components/Form';
import { TransitionAppearance } from 'components/TransitionAppearance';
import { MfaDeviceTypeSelect } from 'components/Auth/MfaDeviceTypeSelect';
import { Retry } from
    'modules/auth/login/components/LoginForm/components/SecurityCodePage/components/Retry';
import { InputText } from 'components/Input';
import { MFADeviceFormModel } from '../../models';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  value: typeof MFADeviceFormModel;
  onClose: () => any;
  onSubmit: () => any;
  onChange: (value: typeof MFADeviceFormModel) => any;
  challengeStartedAt: number;
  onRetryChallenge: () => any;
}

const PHONE_MASK =
  ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

const CODE_MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

const [addDevice] = withForm((properties: Properties) => {
  const { Field, value, onSubmit, onClose, challengeStartedAt, onRetryChallenge } = properties;
  const plain = value.getValue();
  const canvas = React.useRef(null);

  const hasInputErrors = React.useMemo(
    () => (plain.type === 'email' && !plain.email) ||
      (plain.type === 'sms' && plain.phone_number.length < 18),
    [plain]);

  const postfix = {
    totp: 'shown in your MFA application',
    email: 'sent to your email',
    sms: 'sent you by SMS',
  };

  React.useEffect(
    () => {
      if (!!plain.totp_url && !!canvas.current) {
        QR.toCanvas(canvas.current, plain.totp_url).then();
      }
    },
    [plain.totp_url]);

  return (<div className={styles.form}>
    <Field
      className={styles.deviceType}
      name="type"
      input={MfaDeviceTypeSelect}
      input-type="email"
      label="Device type"
      input-autoComplete="firstDeviceForm.name"
    />
    {plain.type === 'email' && <Field
      className={styles.nameInput}
      name="email"
      input={InputText}
      input-type="email"
      label="Email"
      input-autoComplete="add-mfa-device.email"
    />}
    {plain.type === 'sms' && <Field
      className={styles.nameInput}
      name="phone_number"
      input={InputText}
      input-type="phone"
      input-mask={PHONE_MASK}
      label="Phone number"
      input-autoComplete="add-mfa-device.phone_number"
    />}
    <TransitionAppearance visible={!!plain.challenge_id}>
      <b className={styles.sentHeader}>Security code was {postfix[plain.type]}</b>
      <Field
        className={styles.codeInput}
        name="code"
        input={InputText}
        input-mask={CODE_MASK}
        input-type="text"
        input-placeholder="• • • • • •"
        label="Enter security code"
      />
    </TransitionAppearance>
    {!!plain.totp_url && <canvas
      id="qr-code-box"
      className={styles.qr}
      ref={canvas}
    />}
    <TransitionAppearance visible={!!plain.challenge_id && plain.type !== 'totp'}>
      <div className={styles.retryBox}>
        <Retry
          startedAt={challengeStartedAt}
          onRetry={onRetryChallenge}
        />
      </div>
    </TransitionAppearance>
    {!plain.challenge_id && <FormButtons
      cancel-disabled={value.isPending()}
      cancel-onClick={onClose}
      submit-pending={value.isPending()}
      submit-disabled={hasInputErrors || value.isPending() || value.validate().hasError()}
      submit-onClick={onSubmit}
    />}
  </div>);
});

export {
  addDevice as AddDevice,
};
