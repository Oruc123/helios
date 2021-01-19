import * as React from 'react';
import { withForm } from 'components/Form';
import { FieldSet } from 'components/Field';
import { Delimiter } from 'components/Delimiter';
import { Info } from 'components/Info';
import { InputNumber, InputText } from 'components/Input';
import { Select } from 'components/Select';
import { dataSource } from 'components/Transfers/data';
import { ListModel } from 'utils/list';
import { getLicenseInfo } from 'utils/common';
import { InternalTransferFormModel } from '../../../../models';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  value: typeof InternalTransferFormModel;
  onChange: (value: typeof InternalTransferFormModel) => any;
  licenses: ListModel;
  companies: ListModel;
}

const [relationshipDetails] = withForm((properties: Properties) => {
  const { Field, value, licenses, companies } = properties;
  const licenseInfo = getLicenseInfo({ licenses, companies });
  const plain = value.getValue();
  const plainCompanies = companies.getValue();

  const senderDataSource = (Array.isArray(plainCompanies) ? plainCompanies : [])
    .map(i => ({ label: i.name, value: i.id }));

  const amountInput = React.useRef(properties => (<>
    {'$'}
    <InputNumber{...properties}/>
  </>));

  return (<FieldSet legend="Relationship Detail" className={styles.section}>
    <div className={styles.columns}>
      <div className={styles.left}>
        <Info label="Internal transfer number">IT-{plain.id || '...'}</Info>
        <Info label="Recipient">
          {licenseInfo(plain.recipient_license_id).name}
        </Info>
        <Field
          className={styles.amountInput}
          name="amount"
          label="Amount"
          input={amountInput.current}
        />
      </div>
      <div className={styles.right}>
        <Field
          className={styles.statusSelect}
          name="status"
          label="Status"
          input={Select}
          input-dataSource={dataSource.transferStatuses.filter(s => !!s.value)}
        />
        <Field
          name="sender_license_id"
          input={Select}
          input-dataSource={senderDataSource}
          label="Sender"
        />
        <Field
          name="manifest_number"
          label="Manifest Number"
          input={InputNumber}
        />
      </div>
    </div>
    <Field
      className={styles.notesField}
      input-className={styles.notesInput}
      name="notes"
      label="Notes"
      input={InputText}
      input-multiline
    />
    <Delimiter/>
  </FieldSet>);
});

export {
  relationshipDetails as RelationshipDetails,
};
