import * as React from 'react';
import { AuthForm, AuthFormPropTypes } from 'components/Auth';
import { withForm } from 'components/Form';
import { filter } from 'utils/props';
import { MfaDevice } from 'types/DTO';
import { LoginFormModel } from '../../models';
import { PasswordPage } from './components/PasswordPage';
import { AddDevicePage } from './components/AddDevicePage';
import { ChooseDevicePage } from './components/ChooseDevicePage';
import { SecurityCodePage } from './components/SecurityCodePage';

export enum LoginFormPage {
  Password = 'password',
  AddFirstDevice = 'add_first_device',
  ChooseDevice = 'choose_device',
  EnterCode = 'enter_code',
}

interface Properties {
  page: LoginFormPage;
  value: typeof LoginFormModel;
  devices: MfaDevice[];
  onResetChallenge: () => any;
  onRetryChallenge: () => any;
  onResetLogin: () => any;
  onChange: () => any;
  forgotLink: string;
  Field: any;
  message?: string;
}

const [LoginForm] = withForm((properties: Properties) => {
  const {
    Field,
    value,
    forgotLink,
    page,
    message,
    devices,
    onResetChallenge,
    onRetryChallenge,
    onResetLogin,
    ...rest
  } = properties;
  const error = value.getError();
  const formMessage = error ? error.message : message || value.getMessage();

  const getPage = () => {
    switch (page) {
      case LoginFormPage.Password:
        return (<PasswordPage
          Field={Field}
          isPending={value.isPending()}
          forgotLink={forgotLink}
        />);
      case LoginFormPage.AddFirstDevice:
        return (<AddDevicePage
          Field={Field}
          isPending={value.isPending()}
          value={value}
          onChange={properties.onChange}
          onResetLogin={onResetLogin}
        />);
      case LoginFormPage.ChooseDevice:
        return (<ChooseDevicePage
          Field={Field}
          isPending={value.isPending()}
          devices={devices}
        />);
      case LoginFormPage.EnterCode:
        return (<SecurityCodePage
          Field={Field}
          isPending={value.isPending()}
          totpUrl={value.getValue().totpUrl}
          deviceType={value.getValue().deviceType}
          deviceName={value.getValue().deviceName}
          challengeStartedAt={value.getValue().startedAt}
          onResetChallenge={onResetChallenge}
          onRetryChallenge={onRetryChallenge}
        />);
      default:
        return null;
    }
  };

  return (<AuthForm
    {...filter(rest, AuthFormPropTypes)}
    message={formMessage}
    messageType={error ? 'error' : null}
  >
    {getPage()}
  </AuthForm>);
});

export {
  LoginForm,
};
