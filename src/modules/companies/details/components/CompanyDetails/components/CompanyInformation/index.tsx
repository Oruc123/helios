/* eslint-disable camelcase */
import * as React from 'react';
import { PageSectionDefaultProps, PageSectionPropTypes, PageSection } from 'components/Page';
import { DateTime } from 'components/DateTime';
import { Delimiter } from 'components/Delimiter';
import { Info, InfoSet } from 'components/Info';
import { Icon } from 'components/Icon';
import { filter } from 'utils/props';

import * as styles from './styles.module.css';

interface Properties extends ReturnType<typeof PageSectionPropTypes> {
  value: any;
  licenses: any[];
}

const defaultProperties = {
  ...PageSectionDefaultProps,
  title: 'Company Information',
  face: PageSection.FACE_SECONDARY,
};

const companyInformation = React.memo((properties: Properties) => {
  const extendedProperties: Properties = { ...defaultProperties, ...properties };
  const { value, licenses } = extendedProperties;

  const renderRelationshipDetail = React.useCallback(
    () => (<>
      <Delimiter/>
      <InfoSet direction={InfoSet.DIRECTION_ROW} legend="Relationship Detail">
        <div className={styles.column}>
          <Info label="Account Name">{value?.name || '---'}</Info>
          <Info label="Entity Legal Name">{value?.legal_name || '---'}</Info>
          <Info label="DBA">{value?.dba || '---'}</Info>
          <Info label="Is Holding">
            <Icon
              face={value.is_holding ? Icon.FACE_ACTIVE : Icon.FACE_DEFAULT}
              size={Icon.SIZE_SMALL}
              type="check"
            />
          </Info>
          <Info label="Holding">{value?.holding_id || '---'}</Info>
          <Info label="Customer Status">{value?.customer_status || '---'}</Info>
        </div>

        <div className={styles.column}>
          <Info label="Active">
            <Icon
              face={value.status ? Icon.FACE_ACTIVE : Icon.FACE_DEFAULT}
              size={Icon.SIZE_SMALL}
              type="check"
            />
          </Info>
          {/* <Info label="Account Owner">Helios Developer</Info> */}
          <Info label="Phone">{value?.phone || '---'}</Info>
          <Info label="Website">{value?.website || '---'}</Info>
        </div>
      </InfoSet>
      <Delimiter/>
    </>),
    [value]);

  const renderDescription = React.useCallback(
    () => (<InfoSet direction={InfoSet.DIRECTION_ROW} legend="Description">
      {value?.description || ''}
    </InfoSet>),
    [value]);

  const renderAccountDetails = React.useCallback(
    () => (<>
      <Delimiter/>
      <InfoSet direction={InfoSet.DIRECTION_ROW} legend="Account Details">
        <div className={styles.column}>
          <Info label="Business Type">{value?.business_type || '---'}</Info>
          <Info label="Entity Type">{value?.entity_type || '---'}</Info>
          <Info label="State of Incorporation or Organization">{value?.state}</Info>
        </div>
        <div className={styles.column}>
          <Info label="Primary Account Opening Date">
            {value?.dateFounded ?
              <DateTime utc={value.dateFounded} dateFormat="YYYY/M/D"/> : '---'}
          </Info>
          <Info label="EIN #">{value?.ein || '---'}</Info>
          <Info label="Number of Licenses">{licenses.length}</Info>
          {/* <Info label="Bank Accounts">5</Info> */}
        </div>
      </InfoSet>
      <Delimiter/>
    </>),
    [value, licenses]);

  return (<PageSection {...filter(extendedProperties, PageSectionPropTypes)}>
    {renderRelationshipDetail()}
    {renderDescription()}
    {renderAccountDetails()}
    <InfoSet direction={InfoSet.DIRECTION_ROW} legend="Address Information">
      <Info label="Billing Address">
        {[value?.street, value?.city, value?.state, value?.postal_code, value?.country]
          .filter(i => !!i)
          .join(', ') || '---'}
      </Info>
    </InfoSet>
  </PageSection>);
});

export { companyInformation as CompanyInformation };
