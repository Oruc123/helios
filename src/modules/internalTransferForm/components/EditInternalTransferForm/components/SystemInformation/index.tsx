import moment from 'moment';
import * as React from 'react';
import { withForm } from 'components/Form';
import { FieldSet } from 'components/Field';
import { Delimiter } from 'components/Delimiter';
import { Info } from 'components/Info';
import { InternalTransferFormModel } from '../../../../models';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  value: typeof InternalTransferFormModel;
  onChange: (value: typeof InternalTransferFormModel) => any;
}

const [systemInformation] = withForm((properties: Properties) => {
  const { value } = properties;
  const plain = value.getValue();

  return (<FieldSet legend="System Information" className={styles.section}>
    <div className={styles.columns}>
      <div className={styles.left}>
        <Info label="Created Date">
          {moment(plain.created_at).format('YYYY-MM-DD')}
        </Info>
      </div>
      <div className={styles.right}>
        <Info label="Approved Date">
          {plain.approval_date ? moment(plain.approval_date).format('YYYY-MM-DD') : '-'}
        </Info>
      </div>
    </div>
    <Delimiter/>
  </FieldSet>);
});

export {
  systemInformation as SystemInformation,
};
