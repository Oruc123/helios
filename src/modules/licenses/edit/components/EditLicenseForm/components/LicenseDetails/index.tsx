import * as React from 'react';
import { DatePicker } from 'components/DatePicker'
import { withForm } from 'components/Form';
import { FieldSet } from 'components/Field';
import { Delimiter } from 'components/Delimiter';
import { InputText } from 'components/Input';
import { CheckBox } from 'components/CheckBox';
import { Select } from 'components/Select';
import { ListModel } from 'utils/list';
import { momentDate } from 'utils/moment';
import { LicenseFormModel } from '../../../../models';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  value: typeof LicenseFormModel;
  onChange: (value: typeof LicenseFormModel) => any;
  companies: ListModel;
}

const PHONE_MASK =
  ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

const LICENSE_TYPE_DATA_SOURCE = [{ value: 'med', label: 'Med' }, { value: 'rec', label: 'Rec' }];

const LICENSE_SUB_TYPE_DATA_SOURCE = [
  { value: 'processor', label: 'Processor' },
  { value: 'dispensary', label: 'Dispensary' },
  { value: 'grow', label: 'Grow' },
];

const POS_TYPE_DATA_SOURCE = [
  { value: 'greenbits', label: 'GREENBITS' },
  { value: 'biotrackthc', label: 'BIOTRACKTHC' },
  { value: 'adilas', label: 'ADILAS' },
  { value: 'flowhub', label: 'FLOWHUB' },
  { value: 'mj_freeway', label: 'MJFREEWAY' },
  { value: 'leaf_logix', label: 'LEAF LOGIX' },
  { value: 'thsuite', label: 'Thsuite' },
  { value: 'other', label: 'OTHER' },
  { value: 'manual', label: 'MANUAL' },
];

const toMoment = value => value == null ? value : momentDate(value);
const parseMoment = value => momentDate(value).format('YYYY-MM-DDTHH:mm:ssZ');

const [LicenseDetails] = withForm((properties: Properties) => {
  const { Field, companies } = properties;
  const plainCompanies = companies.getValue();

  const customerDataSource = (Array.isArray(plainCompanies) ? plainCompanies : [])
    .map(i => ({ label: i.name, value: i.id }));

  return (<FieldSet legend="License Detail" className={styles.section}>
    <div className={styles.columns}>
      <div className={styles.left}>
        <Field
          className={styles.nameInput}
          name="name"
          label="License name"
          input={InputText}
        />
        <Field
          className={styles.customerInput}
          name="company_id"
          input={Select}
          input-dataSource={customerDataSource}
          input-disabled
          label="Customer"
        />
        <Field
          className={styles.licenseNumberInput}
          name="license_number"
          label="License Number"
          input={InputText}
        />
        <Field
          className={styles.bankAccountInput}
          name="bank_account"
          label="Bank Account"
          input={InputText}
        />
        <Field
          className={styles.accountOpeningDateInput}
          name="account_opening_date"
          label="Account Opening Date"
          input={DatePicker}
          formatValue={toMoment}
          parseValue={parseMoment}
        />
        <Field
          className={styles.phoneInput}
          name="phone"
          label="Phone"
          input={InputText}
          input-type="phone"
          input-mask={PHONE_MASK}
        />
      </div>
      <div className={styles.right}>
        <Field
          className={styles.internalTransfersInput}
          name="internal_transfers"
          label="Internal Transfers program"
          input={CheckBox}
        />
        <Field
          className={styles.licenseTypeInput}
          name="type"
          input={Select}
          input-dataSource={LICENSE_TYPE_DATA_SOURCE}
          label="License Type"
        />
        <Field
          className={styles.licenseSubTypeInput}
          name="subtype"
          input={Select}
          input-dataSource={LICENSE_SUB_TYPE_DATA_SOURCE}
          label="License Subtype"
        />
        <Field
          className={styles.posTypeInput}
          name="pos_type"
          input={Select}
          input-dataSource={POS_TYPE_DATA_SOURCE}
          label="POS Type"
        />
        <Field
          className={styles.issueDateInput}
          name="issue_date"
          label="Issue Date"
          input={DatePicker}
          formatValue={toMoment}
          parseValue={parseMoment}
        />
      </div>
    </div>
    <Delimiter/>
  </FieldSet>);
});

export { LicenseDetails };
