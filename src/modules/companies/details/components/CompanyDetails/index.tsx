import * as React from 'react';
import { Switch } from 'react-router-dom';
import { generatePath } from 'react-router';
import { Page, PageDefaultProps, PagePropTypes } from 'components/Page';
import { DialogRoute } from 'components/Dialog';
import { Link } from 'components/Link';
import { AuthButton } from 'components/Auth/AuthButton';
import { Delimiter } from 'components/Delimiter';
import { CompanyInviteContainer } from 'modules/companies/invite';
import { companyListPath, companyListPaths } from 'modules/companies/list';
import { CompanyInformation } from './components/CompanyInformation';
import { LicensesTable } from './components/LicensesTable';
import { AnnualReviewsTable } from './components/AnnualReviewsTable';
import { VendorsTable } from './components/VendorsTable';
import { CustomersTable } from './components/CustomersTable';
import { AffiliatedCompaniesTable } from './components/AffiliatedCompaniesTable';
import { ContactsTable } from './components/ContactsTable';
import { DocumentsTable } from './components/DocumentsTable';
import { OwnersTable } from './components/OwnersTable';
import { DebtHoldersTable } from './components/DebtHoldersTable';
import { AccountSignersTable } from './components/AccountSignersTable';

interface Properties extends ReturnType<typeof PagePropTypes> {
  companyId: number;
  licenses: any[];
  value: any;
}

const defaultProperties = {
  ...PageDefaultProps,
  title: 'Company Profile',
  face: Page.FACE_SECONDARY,
  companyId: undefined,
  licenses: [],
};

const companyDetails = React.memo((properties: Properties) => {
  const extendedProperties: Properties = { ...defaultProperties, ...properties };
  const { value, licenses, children, companyId, ...rest } = extendedProperties;

  const renderActions = React.useCallback(
    () => (<Link
      to={generatePath(companyListPaths.invite, { id: companyId })}
      face={Link.FACE_DEFAULT}
    >
      <AuthButton>Client Portal Invite</AuthButton>
    </Link>),
    [companyId]);

  return (<Page {...rest} subTitle={value?.name} actions={renderActions()}>
    <Switch>
      <DialogRoute
        path={companyListPaths.invite}
        component={CompanyInviteContainer}
        closePath={`${companyListPath}/detail/${companyId}`}
        dialog-title={`Send invite ${value?.name ? 'for' : ''}`}
        dialog-subTitle={value?.name || ''}
        />
      </Switch>
      <CompanyInformation value={value} licenses={licenses}/>
      <Delimiter/>
      <DocumentsTable companyId={companyId}/>
      <Delimiter/>
      <ContactsTable companyId={companyId}/>
      <Delimiter/>
      <OwnersTable companyId={companyId}/>
      <Delimiter/>
      <DebtHoldersTable companyId={companyId}/>
      <Delimiter/>
      <AccountSignersTable companyId={companyId}/>
      <Delimiter/>
      <AffiliatedCompaniesTable companyId={companyId}/>
      <Delimiter/>
      <LicensesTable companyId={companyId}/>
      <Delimiter/>
      <CustomersTable companyId={companyId}/>
      <Delimiter/>
      <VendorsTable companyId={companyId}/>
      <Delimiter/>
      <AnnualReviewsTable companyId={companyId}/>
      {children}
    </Page>
  );
});

export { companyDetails as CompanyDetails };
