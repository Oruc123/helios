import { FormFieldModel, FormModel } from 'utils/form';

export const AlertsReviewsFilterFields = {
  status: new FormFieldModel('new'),
  company_id: new FormFieldModel('')
};

export const AlertsReviewsFilterModel = FormModel.Factory(AlertsReviewsFilterFields, false);
