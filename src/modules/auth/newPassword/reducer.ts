import { NewPasswordFormModel } from './models';
import { newPasswordActionTypes } from './constants';

export const newPasswordFormInitialState = new NewPasswordFormModel();

export const newPasswordFormReducer = (state = newPasswordFormInitialState, action) => {
  switch (action.type) {
    case newPasswordActionTypes.NEW_PASSWORD_UPDATE_FORM:
      return action.payload;
    case newPasswordActionTypes.NEW_PASSWORD_SUBMIT:
      return action.payload.pending();
    case newPasswordActionTypes.NEW_PASSWORD_SUBMIT_FAILURE:
      return state.setError(action.error).ready();
    case newPasswordActionTypes.NEW_PASSWORD_SUBMIT_SUCCESS:
      return state.setError(null).setMessage(null).ready();
    default:
      return state;
  }
};
