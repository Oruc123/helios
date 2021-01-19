import React from 'react';
import { Page, PageDefaultProps, PagePropTypes } from 'components/Page';
import bem from 'utils/bem';
import { filter } from 'utils/props';
// import { DocumentFilePage } from 'modules/documentFileFilters';
import { ReportRetailPage } from 'modules/reportRetailFilters';
import { ReportWholesalePage } from 'modules/reportWholesaleFilters';
import { TaxReconcilliationPage } from 'modules/taxReconcilliationFilters';
import { AnnualReviewPage } from 'modules/annualReviewFilters';

import './AlertsPage.scss';

export const AlertsPagePropTypes = {
  ...PagePropTypes
};

export const AlertsPageDefaultProps = {
  ...PageDefaultProps
};

export class AlertsPage extends React.PureComponent {
  static propTypes = {
    ...AlertsPagePropTypes
  };

  static defaultProps = {
    ...AlertsPageDefaultProps
  };

  static className = 'AlertsPage';

  render() {
    return (
      <Page {...filter(this.props, PagePropTypes)} className={bem.block(this)} title="Alerts">
        {/* <DocumentFilePage /> */}
        <ReportWholesalePage />
        <ReportRetailPage />
        <TaxReconcilliationPage />
        <AnnualReviewPage />
      </Page>
    );
  }
}
