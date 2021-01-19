import { FormFieldModel, FormModel } from 'utils/form';

export const ForgotFormFields = {
  email: new FormFieldModel('', value => (value === '' ? '' : null))
};

export const ForgotFormModel = FormModel.Factory(ForgotFormFields);
