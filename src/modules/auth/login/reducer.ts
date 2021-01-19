import { LoginFormModel, ChallengeFormModel } from './models';
import { loginActionTypes } from './constants';
import { logoutActionTypes } from '../logout/constants';
import { newPasswordActionTypes } from '../newPassword/constants';

export const loginInitialState = new LoginFormModel();

export const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    /**
     * Logout.
     */

    case logoutActionTypes.AUTH_LOGOUT: {
      return loginInitialState;
    }

    /**
     * Password form.
     */

    case loginActionTypes.LOGIN_UPDATE_PASSWORD_FORM:
      return state.setField('passwordForm', action.payload);
    case loginActionTypes.LOGIN_SUBMIT_PASSWORD:
      return state.setField('passwordForm', action.payload.pending());
    case loginActionTypes.LOGIN_SUBMIT_PASSWORD_SUCCESS:
      return state.setField('passwordForm', action.payload.ready());
    case loginActionTypes.LOGIN_SUBMIT_PASSWORD_FAILURE: {
      return state.setField('passwordForm', action.payload.ready().setError(action.error));
    }

    /**
     * Settings new password.
     */

    case newPasswordActionTypes.NEW_PASSWORD_SUBMIT_SUCCESS:
      return state.setField(
        'passwordForm',
        state.getField('passwordForm').setMessage('Now you can login with your new password'));

    /**
     * MFA data section.
     */

    case loginActionTypes.LOGIN_SET_MFA_DATA:
      return state.setField(
        'mfa',
        state.getField('mfa').setValue(action.payload));

    /**
     * First device form.
     */

    case loginActionTypes.LOGIN_UPDATE_DEVICE_FORM:
      return state.setField('firstDeviceForm', action.payload);
    case loginActionTypes.LOGIN_CREATE_DEVICE:
      return state.setField('firstDeviceForm', state.getField('firstDeviceForm').pending());
    case loginActionTypes.LOGIN_CREATE_DEVICE_FAILURE:
      return state.setField(
        'firstDeviceForm',
        state.getField('firstDeviceForm').ready().setError(action.error));
    case loginActionTypes.LOGIN_CHOOSE_MFA_DEVICE:
      return state.setField(
        'challenge',
        state.getField('challenge').setValue({
          deviceId: action.payload.id,
          deviceType: action.payload.type,
          deviceName: action.payload.name,
          totpUrl: action.payload.totpUrl,
          challengeId: '',
        }));

    /**
     * Choose device form.
     */

    case loginActionTypes.LOGIN_UPDATE_CHOOSE_DEVICE_FORM:
      return state.setField('chooseDeviceForm', action.payload);

    /**
     * Challenge.
     */

    case loginActionTypes.LOGIN_RESET_CHALLENGE:
      return state.setField('challenge', new ChallengeFormModel());
    case loginActionTypes.LOGIN_SEND_CHALLENGE:
      return state
        .setField('challenge', state.getField('challenge').pending())
        .setField('passwordForm', state.getField('passwordForm').pending())
        .setField('chooseDeviceForm', state.getField('chooseDeviceForm').pending());
    // TODO: add loader on select device form.
    case loginActionTypes.LOGIN_SEND_CHALLENGE_SUCCESS: {
      const challenge = state.getField('challenge').getValue();
      return state
        .setField('challenge', state.getField('challenge').ready().setValue({
          ...challenge,
          challengeId: action.payload.id,
          challengeExpiration: action.payload.expiration,
          startedAt: Date.now(),
        }))
        .setField('passwordForm', state.getField('passwordForm').ready())
        .setField('chooseDeviceForm', state.getField('chooseDeviceForm').ready());
    }
    case loginActionTypes.LOGIN_SEND_CHALLENGE_FAILURE:
      return state
        .setField(
          'passwordForm',
          state.getField('passwordForm').ready().setMessage(null).setError(action.error))
        .setField(
          'firstDeviceForm',
          state.getField('firstDeviceForm').ready().setMessage(null).setError(action.error))
        .setField(
          'chooseDeviceForm',
          state.getField('chooseDeviceForm').ready().setMessage(null).setError(action.error));

    /**
     * Security code form.
     */

    case loginActionTypes.LOGIN_UPDATE_SECURITY_CODE_FORM:
      return state.setField('challenge', action.payload);
    case loginActionTypes.LOGIN_SEND_SECURITY_CODE:
      return state.setField('challenge', action.payload.pending());
    case loginActionTypes.LOGIN_SEND_SECURITY_CODE_FAILURE:
      return state.setField(
        'challenge',
        state.getField('challenge').ready().setError(action.error));

    default:
      return state;
  }
};
