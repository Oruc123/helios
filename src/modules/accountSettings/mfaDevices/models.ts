import { FormFieldModel, FormModel } from 'utils/form';

export const mfaDevicesFormFields = {
  id: new FormFieldModel(''),
  active: new FormFieldModel(false),
  type: new FormFieldModel(''),
  phone_number: new FormFieldModel(''),
  email: new FormFieldModel(''),
  last_used_at: new FormFieldModel(''),
  created_at: new FormFieldModel(''),
  updated_at: new FormFieldModel(''),
  deleted_at: new FormFieldModel(''),
};

const mfaDevicesFormModel = FormModel.Factory(mfaDevicesFormFields, false);

export const mfaDeviceFormFields = {
  type: new FormFieldModel('sms'),
  email: new FormFieldModel(''),
  phone_number: new FormFieldModel('+1 ('),
  challenge_id: new FormFieldModel(''),
  device_id: new FormFieldModel(''),
  challenge_expiration: new FormFieldModel(''),
  challenge_started_at: new FormFieldModel(''),
  code: new FormFieldModel(''),
  totp_url: new FormFieldModel(''),
};

const mfaDeviceFormModel = FormModel.Factory(mfaDeviceFormFields);

export {
  mfaDevicesFormModel as MFADevicesFormModel,
  mfaDeviceFormModel as MFADeviceFormModel,
};
