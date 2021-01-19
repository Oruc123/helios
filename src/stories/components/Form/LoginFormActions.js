import { LOGIN_FORM_UPDATE, LOGIN_FORM_SUBMIT, LOGIN_FORM_SUBMIT_SUCCESS } from './LoginFormActionTypes';

export const loginFormUpdate = payload => ({
  type: LOGIN_FORM_UPDATE,
  payload
});

export const loginFormSubmit = payload => ({
  type: LOGIN_FORM_SUBMIT,
  payload
});

export const loginFormSubmitSuccess = () => ({
  type: LOGIN_FORM_SUBMIT_SUCCESS
});
