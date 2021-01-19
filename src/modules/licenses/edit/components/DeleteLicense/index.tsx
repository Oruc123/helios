import * as React from 'react';
import { Confirm } from 'components/Dialog';
import { FormModel } from 'utils/form';

interface Properties {
  value: FormModel;
  onClose: () => any;
  onDelete: () => any;
}

const deleteLicense = (properties: Properties) => {
  const { value, onDelete, onClose } = properties;
  const plain = value.getValue();
  const handleSubmit = React.useCallback(() => onDelete(), [value]);

  return (<Confirm
    value={value}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttons-submit-children="Delete"
  >
    Are you sure want to delete <i>{plain.name}</i> license page?
  </Confirm>);
};

export { deleteLicense as DeleteLicense };
