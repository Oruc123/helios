import { FormFieldModel, FormModel } from 'utils/form';

const licenseDetailsFilterModelFields = {
  id: new FormFieldModel(0),
};

const licenseDetailsFilterModel = FormModel.Factory(licenseDetailsFilterModelFields, false);

export { licenseDetailsFilterModel as LicenseDetailsFilterModel };
