/* eslint-disable camelcase */
import React from 'react';
import { object, number } from 'prop-types';
import { PageSectionDefaultProps, PageSectionPropTypes, PageSection } from 'components/Page';
import { Delimiter } from 'components/Delimiter';
import { Info, InfoSet } from 'components/Info';
import { Icon } from 'components/Icon';
import './LicenseInformation.scss';
import { filter } from 'utils/props';
import bem from 'utils/bem';
import { Link } from 'components/Link';
import { DateTime } from 'components/DateTime';
import { manageLicensePath } from 'modules/licenses/edit';

export const LicenseInformationPropTypes = {
  ...PageSectionPropTypes,
  licenseId: number,
  license: object,
  company: object
};

export const LicenseInformationDefaultProps = {
  ...PageSectionDefaultProps,
  title: 'License Information',
  face: PageSection.FACE_SECONDARY,
  license: undefined,
  company: undefined
};

export class LicenseInformation extends React.PureComponent {
  static propTypes = { ...LicenseInformationPropTypes };

  static defaultProps = { ...LicenseInformationDefaultProps };

  static className = 'LicenseInformation';

  renderActions() {
    const { licenseId } = this.props;
    return (
      <Link button to={`${manageLicensePath}/${licenseId}`} face={Link.FACE_SECONDARY}>
        Edit
      </Link>
    );
  }

  renderRelationshipDetail() {
    const { license, company } = this.props;
    return (
      <>
        <Delimiter />
        <InfoSet direction={InfoSet.DIRECTION_ROW} legend="Relationship Detail">
          <div className={bem.element(this, 'column')}>
            <Info label="License Name">{license?.name || '---'}</Info>
            <Info label="Relationship">{company?.name || '---'}</Info>
            <Info label="License Number">{license?.license_number || '---'}</Info>
            <Info label="Bank Account">{license?.bank_account || '---'}</Info>
            <Info label="Issue Date">
              {license?.issue_date && <DateTime utc={license.issue_date} dateFormat="YYYY/M/D" />}
            </Info>
          </div>

          <div className={bem.element(this, 'column')}>
            <Info label="Internal Transfers program">
              <Icon
                face={license?.internal_transfers ? Icon.FACE_ACTIVE : Icon.FACE_DEFAULT}
                size={Icon.SIZE_SMALL}
                type="check"
              />
            </Info>
            <Info label="License Type">{license?.type || '---'}</Info>
            <Info label="License Subtype">{license?.subtype || '---'}</Info>
            <Info label="Account Opening Date">
              {license?.account_opening_date && <DateTime utc={license.account_opening_date} dateFormat="YYYY/M/D" />}
            </Info>
            <Info label="Phone">{license?.phone || '---'}</Info>
          </div>
        </InfoSet>
      </>
    );
  }

  renderTaxRatesForLicense() {
    const { license } = this.props;
    return (
      <>
        <Delimiter />
        <InfoSet direction={InfoSet.DIRECTION_ROW} legend="Tax rates for License">
          <div className={bem.element(this, 'column')}>
            <Info label="City Tax">{`${license?.city_tax || '---'} %`}</Info>
            <Info label="MJ Retail Tax">{`${license?.mj_retail_tax || '---'} %`}</Info>
            <Info label="Special Tax">{`${license?.special_tax || '---'} %`}</Info>
          </div>

          <div className={bem.element(this, 'column')}>
            <Info label="County Tax">{`${license?.county_tax || '---'} %`}</Info>
            <Info label="State Tax">{`${license?.state_tax || '---'} %`}</Info>
          </div>
        </InfoSet>
      </>
    );
  }

  renderAddressInformation() {
    const { license } = this.props;
    return (
      <>
        <Delimiter />
        <InfoSet direction={InfoSet.DIRECTION_ROW} legend="Address Information">
          <div className={bem.element(this, 'column')}>
            <Info label="Address Information">{license?.street_address || '---'}</Info>
            <Info label="Zip Code">{license?.postal_code || '---'}</Info>
          </div>

          <div className={bem.element(this, 'column')}>
            <Info label="State">{license?.state || '---'}</Info>
            <Info label="City">{license?.city || '---'}</Info>
          </div>
        </InfoSet>
      </>
    );
  }

  renderSystemInformation() {
    const { license } = this.props;
    return (
      <>
        <Delimiter />
        <InfoSet direction={InfoSet.DIRECTION_ROW} legend="System Information">
          <div className={bem.element(this, 'column')}>
            <Info label="Created At">
              {license?.created_at && <DateTime utc={license.created_at} dateFormat="YYYY/M/D" />}
            </Info>
          </div>

          <div className={bem.element(this, 'column')}>
            <Info label="Last Modified At">
              {license?.updated_at && <DateTime utc={license.updated_at} dateFormat="YYYY/M/D" />}
            </Info>
          </div>
        </InfoSet>
      </>
    );
  }

  render() {
    const { value, ...props } = this.props;
    return (
      <PageSection {...filter(props, PageSectionPropTypes)} actions={this.renderActions()}>
        {this.renderRelationshipDetail()}
        {this.renderTaxRatesForLicense()}
        {this.renderAddressInformation()}
        {this.renderSystemInformation()}
      </PageSection>
    );
  }
}
