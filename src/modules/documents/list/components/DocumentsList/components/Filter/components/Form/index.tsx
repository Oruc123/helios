import * as React from 'react';
import { withForm } from 'components/Form';
import { Select } from 'components/Select';
import { InputText } from 'components/Input';
import { ListModel } from 'utils/list';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  companies: ListModel;
  licenses: ListModel;
  onChange: (value: any) => any;
}

const [form] = withForm((properties: Properties) => {
  const { Field, companies, licenses } = properties;

  const plainCompanies = companies.getValue();
  const plainLicenses = licenses.getValue();

  const companyDataSource = [{ label: 'All', value: '' }]
    .concat((Array.isArray(plainCompanies) ? plainCompanies : [])
      .map(i => ({ label: i.name, value: i.id })));

  const licenseDataSource = [{ label: 'All', value: '' }]
    .concat((Array.isArray(plainLicenses) ? plainLicenses : [])
      .map(i => ({ label: i.name, value: i.id })));

  return (<div className={styles.columns}>
    <div className={styles.column}>
      <Field
        name="company_id"
        label="Relationship"
        input={Select}
        input-className={styles.field}
        input-dataSource={companyDataSource}
      />
      <Field
        name="almost_due"
        label="Almost Due"
        input={Select}
        input-className={styles.field}
        input-dataSource={[
          { label: 'All', value: '' },
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ]}
      />
    </div>
    <div className={styles.column}>
      <Field
        name="license_id"
        label="License"
        input={Select}
        input-className={styles.field}
        input-dataSource={licenseDataSource}
      />
      <Field
        name="expiration_delay_days"
        label="Days Before Expiration"
        input={InputText}
        input-className={styles.field}
      />
    </div>
    <div className={styles.column}>
      <Field
        name="internal"
        label="Internal"
        input={Select}
        input-className={styles.field}
        input-dataSource={[
          { label: 'All', value: '' },
          { label: 'Yes', value: 'true' },
          { label: 'No', value: 'false' },
        ]}
      />
    </div>
    <div className={styles.column}>
      <Field
        name="frequency"
        label="Frequency"
        input={Select}
        input-className={styles.field}
        input-dataSource={[
          { label: 'All', value: '' },
          { label: 'Every 2 years', value: 'every_2_years' },
          { label: 'Annual', value: 'annual' },
          { label: 'Semi-Annual', value: 'semi-annual' },
          { label: 'Quarterly', value: 'quarterly' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'One-Time', value: 'one-time' },
        ]}
      />
    </div>
  </div>);
});

export { form as Form };
