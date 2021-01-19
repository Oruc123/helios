import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoginForm, LoginFormPage } from './components/LoginForm';
import { AUTH_FORGOT_PATH, AUTH_LOGIN_PATH } from '../constants';
import {
  submitUsernamePassword,
  updatePasswordForm,
  updateChooseDeviceForm,
  updateDeviceForm,
  updateSecurityCodeForm,
  createDevice,
  sendSecurityCode,
  submitChooseDeviceForm,
  resetChallenge,
  retryChallenge,
} from './actions';
import { logout } from '../logout/actions';
import { loginSelector } from './selectors';

const container = () => {
  const dispatch = useDispatch();
  const value = useSelector(loginSelector);
  const data = value.getValue();
  const pendingChallenge = value.getField('challenge').isPending();
  const page = React.useRef(LoginFormPage.Password);

  // If we have challengeId, it means that we already have passed all necessary
  // steps to enter the security code.
  if (data.challenge.challengeId) {
    page.current = LoginFormPage.EnterCode;

    // If we have already obtained MFA token and it seems like user doesn't have any
    // devices, show form to add the first one.
  } else if (!!data.mfa.token && !data.mfa.devices.length) {
    page.current = LoginFormPage.AddFirstDevice;

    // if we have several devices and there is no current challenge or challenge
    // request wasn't sent yet, show form to choose MFA device.
  } else if (data.mfa.devices.length > 1 && page.current !== LoginFormPage.Password) {
    page.current = LoginFormPage.ChooseDevice;

    // If user doesn't have token, or already obtained it and send challenge, but challenge
    // hasn't completed yet, stay on the password page.
  } else if (
    !data.mfa.token ||
    (!!data.mfa.token && pendingChallenge && page.current === LoginFormPage.Password)
  ) {
    page.current = LoginFormPage.Password;
  }

  const changes = {
    [LoginFormPage.Password]: updatePasswordForm,
    [LoginFormPage.AddFirstDevice]: updateDeviceForm,
    [LoginFormPage.ChooseDevice]: updateChooseDeviceForm,
    [LoginFormPage.EnterCode]: updateSecurityCodeForm,
  };

  const submits = {
    [LoginFormPage.Password]: submitUsernamePassword,
    [LoginFormPage.AddFirstDevice]: createDevice,
    [LoginFormPage.ChooseDevice]: submitChooseDeviceForm,
    [LoginFormPage.EnterCode]: sendSecurityCode,
  };

  const values = {
    [LoginFormPage.Password]: value.getField('passwordForm'),
    [LoginFormPage.AddFirstDevice]: value.getField('firstDeviceForm'),
    [LoginFormPage.ChooseDevice]: value.getField('chooseDeviceForm'),
    [LoginFormPage.EnterCode]: value.getField('challenge'),
  };

  const onSubmit =
    React.useCallback(form => dispatch(submits[page.current](form)), [page.current]);

  const onChange =
    React.useCallback(
      (form) => {
        dispatch(changes[page.current](form));

        if (page.current === LoginFormPage.EnterCode) {
          const code = form.getValue().code;

          if (code.length === 6) {
            onSubmit(form);
          }
        }
      },
      [page.current, onSubmit]);

  const onResetChallenge = React.useCallback(() => dispatch(resetChallenge()), []);
  const onRetryChallenge = React.useCallback(() => dispatch(retryChallenge()), []);
  const resetLogin = React.useCallback(() => dispatch(logout()), []);

  return (<LoginForm
    page={page.current}
    value={values[page.current]}
    forgotLink={AUTH_FORGOT_PATH}
    passwordStepLink={AUTH_LOGIN_PATH}
    onChange={onChange}
    onSubmit={onSubmit}
    devices={data.mfa.devices || []}
    onResetChallenge={data.mfa.devices.length > 1 ? onResetChallenge : null}
    onResetLogin={resetLogin}
    onRetryChallenge={onRetryChallenge}
  />);
};

export {
  container as LoginPage,
};
