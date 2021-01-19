import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { internalTransferActions } from 'modules/internalTransfer/actions';
import { InternalTransferFilterModel } from 'modules/internalTransfer/models';
import { licenseListSelectors } from 'modules/licenses/list';
import { companyListSelectors } from 'modules/companies/list';
import { internalTransferWriteActions } from '../actions';
import { EditInternalTransferForm } from '../components/EditInternalTransferForm';
import { internalTransferFormSelector } from '../selectors';

interface Properties {
  children: React.ReactNode;
}

const container = (properties: Properties & RouteComponentProps) => {
  const dispatch = useDispatch();
  const { match: { params: { id } } } = properties;
  const { children } = properties;
  const value = useSelector(internalTransferFormSelector.getEntity);
  const licenses = useSelector(licenseListSelectors.getEntity);
  const companies = useSelector(companyListSelectors.getEntity);

  // Load internal transfer.
  React.useEffect(
    () => {
      dispatch(internalTransferActions.read.call(
        new InternalTransferFilterModel().setValue({ id: +id })));
    },
    []);

  const onChange = React.useCallback(
    value => dispatch(internalTransferWriteActions.value.set(value)),
    []);

  const onSubmit = React.useCallback(
    () => dispatch(internalTransferWriteActions.write.call(value)),
    [value]);

  return (<EditInternalTransferForm
    value={value}
    onChange={onChange}
    onSubmit={onSubmit}
    licenses={licenses}
    companies={companies}
  >{children}</EditInternalTransferForm>);
};

export {
  container as InternalTransferEditPage,
};
