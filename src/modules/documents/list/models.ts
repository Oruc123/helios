import { FormFieldModel, FormModel } from 'utils/form';

export const documentsFilterFields = {
  company_id: new FormFieldModel(''),
  almost_due: new FormFieldModel(''),
  license_id: new FormFieldModel(''),
  expiration_delay_days: new FormFieldModel('5'),
  internal: new FormFieldModel(''),
  frequency: new FormFieldModel(''),
};

const documentsFilterModel = FormModel.Factory(documentsFilterFields);

export { documentsFilterModel as DocumentsFilterModel };
