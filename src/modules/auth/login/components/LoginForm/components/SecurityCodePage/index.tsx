import * as React from 'react';
import * as QR from 'qrcode';
import { AuthInput } from 'components/Auth';
import { Link } from 'react-router-dom';
import { Retry } from './components/Retry';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  isPending: boolean;
  totpUrl: string;
  deviceType: string;
  deviceName: string;
  challengeStartedAt: number;
  onResetChallenge: () => any;
  onRetryChallenge: () => any;
}

const CODE_MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
const resetUrl = '#';

const securityCodePage = (properties: Properties) => {
  const {
    Field,
    totpUrl,
    deviceType,
    deviceName,
    onResetChallenge,
    onRetryChallenge,
    challengeStartedAt,
  } = properties;
  const canvas = React.useRef(null);

  const postfix = {
    totp: 'shown in your MFA application:',
    email: `from email we've sent you to ${deviceName}:`,
    sms: `we've sent you by SMS to number ${deviceName}:`,
  };

  React.useEffect(
    () => {
      if (!!totpUrl && !!canvas) {
        QR.toCanvas(canvas.current, totpUrl).then();
      }
    },
    []);

  return (<>
    <span className={styles.hint}>Enter security code {postfix[deviceType] || ''}</span>
    <Field
      name="code"
      input-className={styles.codeInput}
      input={AuthInput}
      input-mask={CODE_MASK}
      input-type="text"
      input-placeholder="• • • • • •"
    />
    {!!totpUrl && <div className={styles.qr}>
      <canvas
        id="qr-code-box"
        ref={canvas}
      />
    </div>}
    {!totpUrl && <span className={styles.additionalHint}>
      {deviceType === 'totp' ? <span/> : <Retry
        startedAt={challengeStartedAt}
        onRetry={onRetryChallenge}
      />}
      {!!onResetChallenge && <Link
        className={styles.resetLink}
        to={resetUrl}
        onClick={onResetChallenge}
      >
        Try another device
      </Link>}
    </span>}
  </>);
};

export {
  securityCodePage as SecurityCodePage,
};
