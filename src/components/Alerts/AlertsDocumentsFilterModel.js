import { FormFieldModel, FormModel } from 'utils/form';

export const AlertsDocumentsFilterFields = {
  status: new FormFieldModel('')
};

export const AlertsDocumentsFilterModel = FormModel.Factory(AlertsDocumentsFilterFields, false);
