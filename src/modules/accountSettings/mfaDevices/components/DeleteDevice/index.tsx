import * as React from 'react';
import { Confirm } from 'components/Dialog';
import { FormModel } from 'utils/form';

import * as styles from './styles.module.css';

interface Properties {
  value: FormModel;
  onClose: () => any;
  onDelete: () => any;
}

const deleteDevice = (properties: Properties) => {
  const { value, onDelete, onClose } = properties;
  const plain = value.getValue();
  const handleSubmit = React.useCallback(() => onDelete(), [value]);

  return (
    <Confirm
      value={value}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttons-submit-children="Delete"
    >
      Are you sure want to delete <span className={styles.deviceName}>
        {plain.phone_number || plain.email || 'MFA application'}
      </span> device?
    </Confirm>
  );
};

export {
  deleteDevice as DeleteDevice,
};
