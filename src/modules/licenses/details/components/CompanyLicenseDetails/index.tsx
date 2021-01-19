import * as React from 'react';
import { Page } from 'components/Page';
import { Link } from 'components/Link';
import { AuthButton } from 'components/Auth/AuthButton';
import { manageLicensePath } from 'modules/licenses/edit';
import { filter } from 'utils/props';
import { LicenseInformation, LicenseInformationPropTypes } from './components/LicenseInformation';
import { RetailReports } from './components/RetailReports';
import { TaxReconciliations } from './components/TaxReconciliations';
import { InternalTransfers } from './components/InternalTransfers';
import { InvoiceSubmittal } from './components/InvoiceSubmittal';
import { LicenseDocuments } from './components/LicenseDocuments';

interface Properties {
  licenseId: number;
  license: any;
  company: any;
  isPending: boolean;
  children?: React.ReactNode;
}

const companyLicenseDetails = (properties: Properties) => {
  const { children, license, licenseId, isPending } = properties;

  const renderActions = React.useCallback(
    () => (
      <Link to={`${manageLicensePath}/${licenseId}`} face={Link.FACE_DEFAULT}>
        <AuthButton>Clone</AuthButton>
      </Link>
      ),
    [licenseId]);

  return (
    <Page
      isPending={isPending}
      title="License Page"
      face={Page.FACE_SECONDARY}
      subTitle={license?.name}
      actions={renderActions()}
    >
      <LicenseInformation {...filter(properties, LicenseInformationPropTypes)} />
      <RetailReports licenseId={licenseId} />
      <TaxReconciliations licenseId={licenseId} />
      <InternalTransfers licenseId={licenseId} />
      <InvoiceSubmittal licenseId={licenseId} />
      <LicenseDocuments licenseId={licenseId} />
      {children}
    </Page>
  );
};

export { companyLicenseDetails as CompanyLicenseDetails };
