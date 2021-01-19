/* eslint-disable camelcase */
import { loginActionTypes } from './constants';

// TODO: define payload type.
export const updatePasswordForm = payload =>
  ({ payload, type: loginActionTypes.LOGIN_UPDATE_PASSWORD_FORM });

// TODO: define payload type.
export const submitUsernamePassword = payload =>
  ({ payload, type: loginActionTypes.LOGIN_SUBMIT_PASSWORD });

// TODO: define payload type.
export const submitUsernamePasswordSuccess = payload =>
  ({ payload, type: loginActionTypes.LOGIN_SUBMIT_PASSWORD_SUCCESS });

export const submitUsernamePasswordFailure = (form, error: Error) => ({
  error,
  type: loginActionTypes.LOGIN_SUBMIT_PASSWORD_FAILURE,
  payload: form,
});

export const setMFAData =
  (data: { mfa_required: boolean; mfa_token: string; mfa_devices: any[] }) => ({
    type: loginActionTypes.LOGIN_SET_MFA_DATA,
    payload: {
      required: data.mfa_required,
      token: data.mfa_token,
      devices: data.mfa_devices,
    },
  });

// TODO: define payload type.
export const updateDeviceForm = payload =>
  ({ payload, type: loginActionTypes.LOGIN_UPDATE_DEVICE_FORM });

export const createDevice = payload =>
  ({ payload, type: loginActionTypes.LOGIN_CREATE_DEVICE });

// TODO: define payload type.
export const createDeviceFailure = (error: Error) => ({
  error,
  type: loginActionTypes.LOGIN_CREATE_DEVICE_FAILURE,
});

export const chooseMfaDevice =
  (payload: { id: number; type: string, name: string; totpUrl: string; }) => ({
    payload,
    type: loginActionTypes.LOGIN_CHOOSE_MFA_DEVICE,
  });

export const sendChallenge = payload => ({
  payload,
  type: loginActionTypes.LOGIN_SEND_CHALLENGE,
});

export const resetChallenge = () => ({ type: loginActionTypes.LOGIN_RESET_CHALLENGE });

export const retryChallenge = () => ({ type: loginActionTypes.LOGIN_RETRY_CHALLENGE });

// TODO: define payload type.
export const sendChallengeSuccess = payload =>
  ({ payload, type: loginActionTypes.LOGIN_SEND_CHALLENGE_SUCCESS });

export const sendChallengeFailure = (error: Error) => ({
  error,
  type: loginActionTypes.LOGIN_SEND_CHALLENGE_FAILURE,
});

// TODO: define payload type.
export const updateSecurityCodeForm = payload =>
  ({ payload, type: loginActionTypes.LOGIN_UPDATE_SECURITY_CODE_FORM });

export const sendSecurityCode = payload => ({
  payload, type: loginActionTypes.LOGIN_SEND_SECURITY_CODE,
});

export const sendSecurityCodeFailure = (error: Error) => ({
  error,
  type: loginActionTypes.LOGIN_SEND_SECURITY_CODE_FAILURE,
});

export const setToken = payload => ({ payload, type: loginActionTypes.LOGIN_SET_TOKEN });

export const updateChooseDeviceForm = payload =>
  ({ payload, type: loginActionTypes.LOGIN_UPDATE_CHOOSE_DEVICE_FORM });

export const submitChooseDeviceForm = payload =>
  ({ payload, type: loginActionTypes.LOGIN_SUBMIT_CHOOSE_DEVICE_FORM });
