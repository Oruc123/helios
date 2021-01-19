import { actionTypes } from './constants';

export const updateForgotForm = payload => ({
  payload,
  type: actionTypes.FORGOT_UPDATE_FORM,
});

export const submitForm = payload => ({
  payload,
  type: actionTypes.FORGOT_SUBMIT,
});

export const submitFormSuccess = () => ({
  type: actionTypes.FORGOT_SUBMIT_SUCCESS,
});

export const submitFormFailure = error => ({
  error,
  type: actionTypes.FORGOT_SUBMIT_FAILURE,
});
