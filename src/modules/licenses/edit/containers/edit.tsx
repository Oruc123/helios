import * as React from 'react';
import { push } from 'modules/router/effects';
import { useSelector, useDispatch } from 'react-redux';
import { RouterComponentProps } from 'react-router-dom';
import { licenseDetailsActions } from 'modules/licenses/details/actions';
import { LicenseDetailsFilterModel } from 'modules/licenses/details/models';
import { companyListSelectors } from 'modules/companies/list';
import { licenseFormSelector } from '../selectors';
import { licenseWriteActions } from '../actions';
import { EditLicenseForm } from '../components/EditLicenseForm';

interface Properties {
  children: React.ReactNode;
}

const edit = (properties: Properties & RouterComponentProps) => {
  const { children } = properties;
  const dispatch = useDispatch();
  const { match: { params: { id } } } = properties;
  const value = useSelector(licenseFormSelector.getEntity);
  const companies = useSelector(companyListSelectors.getEntity);

  React.useEffect(
    () => {
      dispatch(licenseDetailsActions.read.call(
        new LicenseDetailsFilterModel().setValue({ id: +id })));
    },
    []);

  const onChange = React.useCallback(
    value => dispatch(licenseWriteActions.value.set(value)),
    []);

  const onSubmit = React.useCallback(
    () => dispatch(licenseWriteActions.write.call(value)),
    [value]);

  const onCancel = React.useCallback(
    () => push(`/main/licenses/info/${value.company_id}/${value.id}`),
    [value]);

  return (<EditLicenseForm
    value={value}
    onChange={onChange}
    onSubmit={onSubmit}
    onCancel={onCancel}
    companies={companies}
  >{children}</EditLicenseForm>);
};

export { edit as EditLicensePage };
