import { FormFieldModel, FormModel } from 'utils/form';

const newPasswordFormFields = {
  key: new FormFieldModel('', value => (value === '' ? '' : null)),
  password: new FormFieldModel('', value => (value === '' ? '' : null)),
};

const newPasswordFormModel = FormModel.Factory(newPasswordFormFields);

export {
  newPasswordFormModel as NewPasswordFormModel,
};
