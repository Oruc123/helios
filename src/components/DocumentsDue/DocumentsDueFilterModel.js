import { FormFieldModel, FormModel } from 'utils/form';

export const DocumentsDueFilterFields = {
  company_id: new FormFieldModel(''),
  internal: new FormFieldModel(''),
  license_id: new FormFieldModel(''),
  frequency: new FormFieldModel('')
};

export const DocumentsDueFilterModel = FormModel.Factory(DocumentsDueFilterFields, false);
