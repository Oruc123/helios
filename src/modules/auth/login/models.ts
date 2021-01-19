import { FormFieldModel, FormModel } from 'utils/form';

const passwordFormFields = {
  username: new FormFieldModel(''),
  password: new FormFieldModel(''),
};

const PasswordFormModel = FormModel.Factory(passwordFormFields);

const mfaResponseFormFields = {
  required: new FormFieldModel(true),
  token: new FormFieldModel(''),
  devices: new FormFieldModel(''),
};

const MfaResponseFormModel = FormModel.Factory(mfaResponseFormFields);

const firstDeviceFormFields = {
  type: new FormFieldModel('sms'),
  name: new FormFieldModel('+1'),
};

const FirstDeviceFormModel = FormModel.Factory(firstDeviceFormFields);

const challengeFormFields = {
  deviceId: new FormFieldModel(''),
  deviceType: new FormFieldModel(''),
  deviceName: new FormFieldModel(''),
  totpUrl: new FormFieldModel(''),
  challengeId: new FormFieldModel(''),
  challengeExpiration: new FormFieldModel(''),
  code: new FormFieldModel(''),
  startedAt: new FormFieldModel(''),
};

export const ChallengeFormModel = FormModel.Factory(challengeFormFields);

const chooseDeviceFormFields = {
  chosenId: new FormFieldModel(''),
};

export const ChooseDeviceFormModel = FormModel.Factory(chooseDeviceFormFields);

const loginFormFields = {
  passwordForm: new PasswordFormModel(null),
  mfa: new MfaResponseFormModel(null),
  firstDeviceForm: new FirstDeviceFormModel(null),
  chooseDeviceForm: new ChooseDeviceFormModel(null),
  challenge: new ChallengeFormModel(null),
};

const LoginFormModel = FormModel.Factory(loginFormFields);

export {
  PasswordFormModel,
  MfaResponseFormModel,
  FirstDeviceFormModel,
  LoginFormModel,
};
