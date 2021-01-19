import { FormFieldModel, FormModel } from 'utils/form';

export const UserFormFields = {
  active: new FormFieldModel(false),
  created_at: new FormFieldModel(null),
  deleted_at: new FormFieldModel(null),
  email: new FormFieldModel(null),
  first_name: new FormFieldModel(null),
  id: new FormFieldModel(null),
  language: new FormFieldModel(null),
  last_name: new FormFieldModel(null),
  organization_id: new FormFieldModel(null),
  permissions: new FormFieldModel([]),
  profile: new FormFieldModel(null),
  sf_id: new FormFieldModel(null),
  time_zone: new FormFieldModel(null),
  updated_at: new FormFieldModel(null)
};

export const UserFormModel = FormModel.Factory(UserFormFields);
