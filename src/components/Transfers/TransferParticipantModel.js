import { FormFieldModel, FormModel } from 'utils/form';

export const TransferParticipantFields = {
  name: new FormFieldModel(''),
  license: new FormFieldModel('')
};

export const TransferParticipantModel = FormModel.Factory(TransferParticipantFields);
