import * as React from 'react';
import { withForm } from 'components/Form';
import { FieldSet } from 'components/Field';
import { Delimiter } from 'components/Delimiter';
import { InputNumber } from 'components/Input';
import { LicenseFormModel } from '../../../../models';

import * as styles from './styles.module.css';

interface Properties {
  Field: any;
  value: typeof LicenseFormModel;
  onChange: (value: typeof LicenseFormModel) => any;
}

const [taxRates] = withForm((properties: Properties) => {
  const { Field } = properties;

  const perCentInput = React.useRef(properties => (<div className={styles.perCentInput}>
    <InputNumber{...properties}/>
    <span>%</span>
  </div>));

  return (<FieldSet legend="Tax rates for License" className={styles.section}>
    <div className={styles.columns}>
      <div className={styles.left}>
        <Field
          className={styles.input}
          name="city_tax"
          label="City Tax"
          input={perCentInput.current}
        />
        <Field
          className={styles.input}
          name="mj_retail_tax"
          label="MJ Retail Tax"
          input={perCentInput.current}
        />
        <Field
          className={styles.input}
          name="special_tax"
          label="Special Tax"
          input={perCentInput.current}
        />
      </div>
      <div className={styles.right}>
        <Field
          className={styles.input}
          name="county_tax"
          label="Country Tax"
          input={perCentInput.current}
        />
        <Field
          className={styles.input}
          name="state_tax"
          label="State Tax"
          input={perCentInput.current}
        />
      </div>
    </div>
    <Delimiter/>
  </FieldSet>);
});

export { taxRates as TaxRates };
