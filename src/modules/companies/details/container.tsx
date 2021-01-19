import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CompanyFormModel } from 'components/CompanyForm';
import { useDispatch, useSelector } from 'react-redux';
import { licenseListSelectors } from 'modules/licenses/list';
import { companyDetailsActions } from './actions';
import { companyDetailsSelectors } from './selectors';
import { CompanyDetails } from './components/CompanyDetails';

const container = (properties: RouteComponentProps) => {
  const { match: { params } } = properties;
  const companyId = +params.id;
  const dispatch = useDispatch();
  const entity = useSelector(companyDetailsSelectors.getEntity);
  const value = entity.getValue();

  React.useEffect(
    () => {
      dispatch(
        companyDetailsActions.read.call(new CompanyFormModel().setValue({ id: companyId })));
    },
    [companyId]);

  const allLicenses = useSelector(licenseListSelectors.getValue);

  const companyLicenses = React.useMemo(
    () =>
      Array.isArray(allLicenses) ? allLicenses.filter(i => +i.company_id === companyId) : [],
    [companyId, allLicenses]);

  return (<CompanyDetails
    companyId={companyId}
    isPending={entity.isPending()}
    value={Array.isArray(value) && value.length === 1 ? value[0] : {}}
    licenses={companyLicenses}
  />);
};

export { container as CompanyDetailsPage };
