import { FormFieldModel, FormModel } from 'utils/form';

export const LoginFormFields = {
  username: new FormFieldModel('user', false, value => (value === '' ? 'Username is required' : null)),
  password: new FormFieldModel('password', false, value => (value === '' ? '' : null))
};

export const LoginFormModel = FormModel.Factory(LoginFormFields);
