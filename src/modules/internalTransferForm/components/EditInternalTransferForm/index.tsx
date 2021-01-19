import * as React from 'react';
import { Link } from 'react-router-dom';
import { transfersListPath } from 'modules/transfersList';
import { push } from 'modules/router/effects';
import { Page, PageDefaultProps } from 'components/Page';
import { Panel } from 'components/Panel';
import { Layer } from 'components/Layer';
import { FieldSet } from 'components/Field';
import { Button } from 'components/Button';
import { FormButtons } from 'components/Form';
import { ListModel } from 'utils/list';
import { RelationshipDetails } from './components/RelationshipDetails';
import { SystemInformation } from './components/SystemInformation';
import { InternalTransferFormModel } from '../../models';
import { INTERNAL_TRANSFER_EDIT_PATH } from '../../constants';

import * as styles from './styles.module.css';

interface Properties {
  value: typeof InternalTransferFormModel;
  onChange: (value: typeof InternalTransferFormModel) => any;
  onSubmit: () => any;
  children: React.ReactNode;
  licenses: ListModel;
  companies: ListModel;
}

const editInternalTransferForm = React.memo((properties: Properties) => {
  const { value, children, licenses, companies, onChange, onSubmit } = properties;
  const id = value.getValue().id;
  const onCancel = React.useCallback(() => push(`${transfersListPath}/${id}`), []);

  return (<Page {...properties} subTitle={`IT-${id}`} isPending={!id}>
    {children}
    <Layer rounded shadowed>
      <Panel
        collapsible={false}
        title="Edit Internal Transfer Information"
        content-className={styles.content}
      >
        <RelationshipDetails
          value={value}
          licenses={licenses}
          companies={companies}
          onChange={onChange}
        />
        <SystemInformation
          value={value}
          onChange={onChange}
        />
        <FieldSet legend="Delete Internal Transfer" className={styles.section}>
          <Link className={styles.deleteLink} to={`${INTERNAL_TRANSFER_EDIT_PATH}/${id}/delete`}>
            <Button
              className={styles.deleteButton}
              face={Button.FACE_DANGER}
            >
              Delete
            </Button>
          </Link>
        </FieldSet>
      </Panel>
    </Layer>
    <div className={styles.toolbar}>
      <FormButtons
        cancel-className={styles.cancelButton}
        cancel-disabled={value.isPending()}
        cancel-onClick={onCancel}
        submit-pending={value.isPending()}
        submit-disabled={value.isPending() || value.hasError()}
        submit-className={styles.saveButton}
        submit-onClick={onSubmit}
      />
    </div>
  </Page>);
});

(editInternalTransferForm as any).defaultProps = {
  ...PageDefaultProps,
  title: 'Internal Transfer Page',
  face: Page.FACE_SECONDARY,
};

export { editInternalTransferForm as EditInternalTransferForm };
