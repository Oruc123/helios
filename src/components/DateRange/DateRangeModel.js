import moment from 'moment';
import { FormFieldModel, FormModel } from 'utils/form';

export const DateRangeFields = {
  startDate: new FormFieldModel(moment()),
  endDate: new FormFieldModel(moment())
};

export const DateRangeModel = FormModel.Factory(DateRangeFields);
