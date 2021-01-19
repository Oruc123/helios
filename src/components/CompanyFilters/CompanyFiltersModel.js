import { FormFieldModel, FormModel } from 'utils/form';

export const CompanyFiltersFields = {
  active: new FormFieldModel(''),
  customer_status: new FormFieldModel(''),
  entity_type: new FormFieldModel(''),
  business_type: new FormFieldModel('')
};

export const CompanyFiltersModel = FormModel.Factory(CompanyFiltersFields, false);
