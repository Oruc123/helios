import React from 'react';
import { func, object, bool, number } from 'prop-types';
import { Page, PageDefaultProps, PagePropTypes, PageSection } from 'components/Page';
import { Delimiter } from 'components/Delimiter';
import { DateTime } from 'components/DateTime';
import { Info, InfoSet } from 'components/Info';
import { Layer } from 'components/Layer';
import { LicenseInfo } from 'components/License';
import { Table } from 'components/Table';
import bem from 'utils/bem';
import { getLicenseInfo } from 'utils/common';
import { INTERNAL_TRANSFER_EDIT_PATH } from 'modules/internalTransferForm';
import { columns } from 'components/Transfers/data';
import { InternalTransferFilterModel } from '../../models';
import { Actions } from './components/Actions';

import './style.scss';

export const TransferPagePropTypes = {
  ...PagePropTypes,
  match: object.isRequired,
  onRead: func.isRequired,
  transferId: number,
  details: object,
  isPending: bool
};

export const TransferPageDefaultProps = {
  ...PageDefaultProps,
  title: 'Internal Transfer Page',
  face: Page.FACE_SECONDARY,
  transferId: undefined,
  details: {},
  isPending: true
};

export class InternalTransferPage extends React.PureComponent {
  static propTypes = { ...TransferPagePropTypes };

  static defaultProps = { ...TransferPageDefaultProps };

  static className = 'TransferPage';

  static defaultInternalTransferPageFilterModel = new InternalTransferFilterModel();

  componentDidMount() {
    const { transferId, onRead } = this.props;
    const payload = InternalTransferPage.defaultInternalTransferPageFilterModel.setValue({ id: transferId });
    onRead(payload);
  }

  renderInformation() {
    const { licenses, companies, details, transferId } = this.props;
    const licenseInfo = getLicenseInfo({ licenses, companies });
    return (
      <PageSection
        title="Internal Transfer Information"
        face={PageSection.FACE_SECONDARY}
        actions={<Actions editUrl={`${INTERNAL_TRANSFER_EDIT_PATH}/${transferId}`} />}
      >
        <Delimiter />

        <InfoSet direction={InfoSet.DIRECTION_ROW} legend="Internal Transfer Details">
          <div className={bem.element(this, 'column')}>
            <Info label="Internal transfer number">{details?.id ? `IT-${details?.id}` : '---'}</Info>
            <Info label="Recipient">
              <LicenseInfo {...licenseInfo(details.recipient_license_id)} />
            </Info>
            <Info label="Amount">{`$ ${details?.amount || '---'}`}</Info>
          </div>

          <div className={bem.element(this, 'column')}>
            <Info label="Status">{details?.status || '---'}</Info>
            <Info label="Sender">
              <LicenseInfo {...licenseInfo(details.sender_license_id)} />
            </Info>
            <Info label="Manifest Number">{details.manifest_number || '---'}</Info>
          </div>

          <Info label="Notes" className={bem.element(this, 'detailsNotes')}>
            {details.notes || '---'}
          </Info>
        </InfoSet>

        <Delimiter />

        <InfoSet direction={InfoSet.DIRECTION_ROW} legend="System Information">
          <div className={bem.element(this, 'column')}>
            <Info label="Created Date">
              {details.created_at ? <DateTime utc={details.created_at} dateFormat="YYYY/M/D" /> : '---'}
            </Info>
            <Info label="Last Modified">
              {details.updated_at ? <DateTime utc={details.updated_at} dateFormat="YYYY/M/D" /> : '---'}
            </Info>
          </div>

          <div className={bem.element(this, 'column')}>
            <Info label="Approved Date">
              {details.approval_date ? <DateTime utc={details.approval_date} dateFormat="YYYY/M/D" /> : '---'}
            </Info>
          </div>
        </InfoSet>
      </PageSection>
    );
  }

  renderStatusHistory() {
    const {
      details: { history = [] }
    } = this.props;
    return (
      <PageSection title="Status History" face={PageSection.FACE_SECONDARY}>
        <Layer rounded shadowed>
          <Table
            rowKey={o => o.actionMilliseconds}
            customColumns={columns.internalTransfersStatusHistory}
            dataSource={history}
          />
        </Layer>
      </PageSection>
    );
  }

  renderRecordHistory() {
    const {
      details: { history = [] }
    } = this.props;
    return (
      <PageSection title="Record History" face={PageSection.FACE_SECONDARY}>
        <Layer rounded shadowed>
          <Table
            rowKey={o => o.actionMilliseconds}
            customColumns={columns.internalTransfersRecordHistory}
            dataSource={history}
          />
        </Layer>
      </PageSection>
    );
  }

  render() {
    const { details } = this.props;
    return (
      <Page {...this.props} subTitle={details?.id ? `IT-${details?.id}` : undefined} className={bem.block(this)}>
        {this.renderInformation()}
        <Delimiter />
        {this.renderStatusHistory()}
        <Delimiter />
        {this.renderRecordHistory()}
      </Page>
    );
  }
}
