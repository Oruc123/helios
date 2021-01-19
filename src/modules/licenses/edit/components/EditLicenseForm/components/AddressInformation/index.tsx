import * as React from 'react';
import { withForm } from 'components/Form';
import { FieldSet } from 'components/Field';
import { Delimiter } from 'components/Delimiter';
import { InputText } from 'components/Input';
import { LicenseFormModel } from '../../../../models';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  value: typeof LicenseFormModel;
  onChange: (value: typeof LicenseFormModel) => any;
}

const [addressInformation] = withForm((properties: Properties) => {
  const { Field } = properties;

  return (<FieldSet legend="Address Information" className={styles.section}>
    <div className={styles.columns}>
      <div className={styles.left}>
        <Field
          className={styles.streetInput}
          name="street_address"
          label="Street Address"
          input={InputText}
        />
        <Field
          className={styles.zipCodeInput}
          name="postal_code"
          label="Zip Code"
          input={InputText}
        />
      </div>
      <div className={styles.right}>
        <Field
          className={styles.stateInput}
          name="state"
          label="State"
          input={InputText}
        />
        <Field
          className={styles.cityInput}
          name="city"
          label="City"
          input={InputText}
        />
      </div>
    </div>
    <Delimiter/>
  </FieldSet>);
});

export { addressInformation as AddressInformation };
