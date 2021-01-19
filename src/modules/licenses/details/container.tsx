import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouterComponentProps } from 'react-router-dom';
import { companyDetailsActions } from 'modules/companies/details';
import { CompanyFormModel } from 'components/CompanyForm';
import { licenseDetailsSelector } from './selectors';
import { licenseDetailsActions } from './actions';
import { LicenseDetailsFilterModel } from './models';
import { CompanyLicenseDetails } from './components/CompanyLicenseDetails';

const container = (properties: RouterComponentProps) => {
  const dispatch = useDispatch();
  const { match: { params: { id, company_id: companyId } } } = properties;
  const data = useSelector(licenseDetailsSelector.getEntity);
  const licenses = data.details.getValue();
  const companies = data.company.getValue();

  const loadData = React.useCallback(
    () => {
      dispatch(
        licenseDetailsActions.read.call(new LicenseDetailsFilterModel().setValue({ id: +id })));
      dispatch(
        companyDetailsActions.read.call(new CompanyFormModel().setValue({ id: +companyId })));
    },
    [id, companyId]);

  React.useEffect(
    () => loadData(),
    [id, companyId, loadData]);

  return (<CompanyLicenseDetails
    licenseId={+id}
    isPending={data.details.isPending()}
    license={Array.isArray(licenses) && !!licenses.length ? licenses[0] : {}}
    company={Array.isArray(companies) && !!companies.length ? companies[0] : {}}
  />);
};

export { container as CompanyLicenseDetailsPage };
