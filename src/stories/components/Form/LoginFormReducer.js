import { LoginFormModel } from 'modules/auth/login/models';
import { LOGIN_FORM_UPDATE, LOGIN_FORM_SUBMIT, LOGIN_FORM_SUBMIT_SUCCESS } from './LoginFormActionTypes';

export default (state = new LoginFormModel(), action) => {
  switch (action.type) {
    case LOGIN_FORM_UPDATE:
      return action.payload;
    case LOGIN_FORM_SUBMIT:
      return action.payload.pending();
    case LOGIN_FORM_SUBMIT_SUCCESS:
      return state.ready();
    default:
      return state;
  }
};
