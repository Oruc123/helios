import { DateRangeModel } from 'components/DateRange';
import { FormFieldModel, FormModel } from 'utils/form';
// import { TransferParticipantModel } from './TransferParticipantModel';

export const TransfersFilterFields = {
  status: new FormFieldModel(''),
  period: new FormFieldModel(new DateRangeModel()),
  date: new FormFieldModel(null),
  recipient_name: new FormFieldModel(''),
  recipient_license_id: new FormFieldModel(''),
  // recipient: new FormFieldModel(new TransferParticipantModel()),
  sender_name: new FormFieldModel(''),
  sender_license_id: new FormFieldModel('')
  // sender: new FormFieldModel(new TransferParticipantModel())
};

export const TransfersFilterModel = FormModel.Factory(TransfersFilterFields, false);
