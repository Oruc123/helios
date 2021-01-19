import { newPasswordActionTypes } from './constants';

export const updateNewPasswordForm = payload => ({
  payload,
  type: newPasswordActionTypes.NEW_PASSWORD_UPDATE_FORM,
});

export const submitNewPasswordForm = payload => ({
  payload,
  type: newPasswordActionTypes.NEW_PASSWORD_SUBMIT,
});

export const submitNewPasswordFormSuccess = () => ({
  type: newPasswordActionTypes.NEW_PASSWORD_SUBMIT_SUCCESS,
});

export const submitNewPasswordFormFailure = error => ({
  error,
  type: newPasswordActionTypes.NEW_PASSWORD_SUBMIT_FAILURE,
});
