import { LOGIN_STATE } from './constants';

export const loginSelector = state => state[LOGIN_STATE];

export const mfaTokenSelector = state => loginSelector(state).getField('mfa').getValue().token;

export const mfaDevicesSelector = state => loginSelector(state).getField('mfa').getValue().devices;

export const challengeSelector = state => loginSelector(state).getField('challenge').getValue();

export const challengeFormSelector = state => loginSelector(state).getField('challenge');

export const chooseDeviceFormSelector = state => loginSelector(state).getField('chooseDeviceForm');
