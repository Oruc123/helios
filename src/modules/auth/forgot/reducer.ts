import { ForgotFormModel } from './components/ForgotForm/ForgotFormModel';
import { actionTypes } from './constants';

export const forgotInitialState = new ForgotFormModel();

export const forgotReducer = (state = forgotInitialState, action) => {
  switch (action.type) {
    case actionTypes.FORGOT_UPDATE_FORM:
      return action.payload;
    case actionTypes.FORGOT_SUBMIT:
      return action.payload.pending();
    case actionTypes.FORGOT_SUBMIT_FAILURE:
      return state.setError(action.error).ready();
    case actionTypes.FORGOT_SUBMIT_SUCCESS:
      return state.setError(null).setMessage(null).ready();
    default:
      return state;
  }
};
