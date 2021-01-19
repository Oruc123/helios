import { DatePicker } from 'components/DatePicker';
import { FieldSet } from 'components/Field';
import { FormPropTypes, withForm } from 'components/Form';
import { Select } from 'components/Select';
import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';
import { dataSource } from './data';
import { TransfersFilterModel } from './TransfersFilterModel';
import './TransfersFilter.scss';

const all = { label: 'All', value: '' };

// eslint-disable-next-line import/prefer-default-export
export const [TransfersFilter, TransfersFilterPropTypes, TransfersFilterDefaultProps] = withForm(
  class TransfersFilter extends PureComponent {
    static className = 'TransfersFilter';

    static propTypes = {
      ...FormPropTypes,
      value: instanceOf(TransfersFilterModel).isRequired
    };

    renderLeftColumn() {
      const { Field } = this.props;

      return (
        <div className={bem.element(this, 'leftColumn')}>
          <FieldSet legend="Transfer Status">
            <Field
              name="status"
              label="Status"
              input={Select}
              input-placeholder="All"
              input-dataSource={dataSource.transferStatuses}
              className={bem.element(this, 'status')}
            />
          </FieldSet>
          <FieldSet>
            <Field
              name="date"
              label="Select Transfer Date"
              input={DatePicker}
              className={bem.element(this, 'period')}
            />
          </FieldSet>
        </div>
      );
    }

    // @todo Move this code to selectors
    getLicenses = type => {
      const { licenses, value } = this.props;
      const values = Number(value.getValue()[type].value);
      const licensesValues = [...licenses.getValue().values()];
      let records = licensesValues;

      if (values > 0) {
        records = licensesValues.filter(obj => obj.company_id === values);
      }

      return [all, ...records.map(obj => ({ label: obj.name, value: obj.id }))];
    };

    renderRightColumn() {
      const { Field, companies } = this.props;
      const companyList = [...companies.getValue().values()].map(obj => ({ label: obj.name, value: obj.id }));
      return (
        <div className={bem.element(this, 'rightColumn')}>
          <FieldSet legend="Sender Details">
            {/* <Field */}
            {/*  name="sender" */}
            {/*  input={TransferParticipant} */}
            {/*  input-name-input-placeholder="All" */}
            {/*  input-name-input-dataSource={[all, ...companyList]} */}
            {/*  input-name-label="Sender" */}
            {/*  input-license-input-placeholder="All" */}
            {/*  input-license-input-dataSource={this.getLicenses('sender')} */}
            {/*  className={bem.element(this, 'sender')} */}
            {/* /> */}
            <div className={bem.element(this, 'fieldSet')}>
              <Field
                name="sender_name"
                input={Select}
                input-placeholder="All"
                input-dataSource={[all, ...companyList]}
                label="Sender"
                className={bem.element(this, 'name')}
              />
              <Field
                name="sender_license_id"
                input={Select}
                input-placeholder="All"
                input-dataSource={this.getLicenses('sender_license_id')}
                label="License"
                className={bem.element(this, 'license')}
              />
            </div>
          </FieldSet>
          <FieldSet legend="Recipient Details">
            {/* <Field */}
            {/*  name="recipient" */}
            {/*  input={TransferParticipant} */}
            {/*  input-name-input-placeholder="All" */}
            {/*  input-name-input-dataSource={[all, ...companyList]} */}
            {/*  input-name-label="Recipient" */}
            {/*  input-license-input-placeholder="All" */}
            {/*  input-license-input-dataSource={this.getLicenses('recipient')} */}
            {/*  className={bem.element(this, 'recipient')} */}
            {/* /> */}
            <div className={bem.element(this, 'fieldSet')}>
              <Field
                name="recipient_name"
                input={Select}
                input-placeholder="All"
                input-dataSource={[all, ...companyList]}
                label="Recipient"
                className={bem.element(this, 'name')}
              />
              <Field
                name="recipient_license_id"
                input={Select}
                input-placeholder="All"
                input-dataSource={this.getLicenses('recipient_license_id')}
                label="License"
                className={bem.element(this, 'license')}
              />
            </div>
          </FieldSet>
        </div>
      );
    }

    render() {
      const { Field, value, ...props } = this.props;

      return (
        <div {...filter(props, ElementPropTypes)} className={bem.block(this)}>
          {this.renderLeftColumn()}
          {this.renderRightColumn()}
        </div>
      );
    }
  }
);
