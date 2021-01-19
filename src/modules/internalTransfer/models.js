import { FormFieldModel, FormModel } from 'utils/form';

export const InternalTransferFilterModelFields = {
  id: new FormFieldModel(0)
};

export const InternalTransferFilterModel = FormModel.Factory(InternalTransferFilterModelFields, false);
