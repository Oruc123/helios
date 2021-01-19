import { FormFieldModel, FormModel } from 'utils/form';

export const CompanyFormFields = {
  id: new FormFieldModel(null),
  accountingSyncStatus: new FormFieldModel(null),
  active: new FormFieldModel(null),
  bankSyncStatus: new FormFieldModel(null),
  business_type: new FormFieldModel(null),
  cif: new FormFieldModel(null),
  city: new FormFieldModel(null),
  country: new FormFieldModel(null),
  customer_status: new FormFieldModel(null),
  dba: new FormFieldModel(null),
  description: new FormFieldModel(null),
  ein: new FormFieldModel(null),
  employees: new FormFieldModel(null),
  entity_type: new FormFieldModel(null),
  fax: new FormFieldModel(null),
  name: new FormFieldModel(null),
  state: new FormFieldModel(null),
  date: new FormFieldModel(null),
  requiredApprovalsCount: new FormFieldModel(0),
  legal_name: new FormFieldModel(null)
};

export const CompanyFormModel = FormModel.Factory(CompanyFormFields);
