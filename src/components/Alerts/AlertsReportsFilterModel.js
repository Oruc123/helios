import { FormFieldModel, FormModel } from 'utils/form';

export const AlertsReportsFilterFields = {
  status: new FormFieldModel('incomplete'),
  company_id: new FormFieldModel(''),
  license: new FormFieldModel('')
};

export const AlertsReportsFilterModel = FormModel.Factory(AlertsReportsFilterFields, false);
