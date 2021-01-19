import { FormFieldModel, FormModel } from 'utils/form';

export const licenseFormFields = {
  id: new FormFieldModel(''),
  license_number: new FormFieldModel(''),
  company_id: new FormFieldModel(''),
  name: new FormFieldModel(''),
  bank_account: new FormFieldModel(''),
  internal_transfers: new FormFieldModel(''),
  issue_date: new FormFieldModel(''),
  account_opening_date: new FormFieldModel(''),
  expiration_date: new FormFieldModel(''),
  type: new FormFieldModel(''),
  subtype: new FormFieldModel(''),
  pos_type: new FormFieldModel(''),
  city_tax: new FormFieldModel(''),
  county_tax: new FormFieldModel(''),
  mj_retail_tax: new FormFieldModel(''),
  special_tax: new FormFieldModel(''),
  state_tax: new FormFieldModel(''),
  state: new FormFieldModel(''),
  city: new FormFieldModel(''),
  street_address: new FormFieldModel(''),
  postal_code: new FormFieldModel(''),
  phone: new FormFieldModel('+1 ('),
  created_at: new FormFieldModel(''),
  updated_at: new FormFieldModel(''),
  deleted_at: new FormFieldModel(''),
  sf_external_id: new FormFieldModel(''),
};

const licenseFormModel = FormModel.Factory(licenseFormFields);

export { licenseFormModel as LicenseFormModel };
