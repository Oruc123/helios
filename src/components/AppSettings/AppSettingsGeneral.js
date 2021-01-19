import { DatePicker } from 'components/DatePicker';
import { Delimiter } from 'components/Delimiter';
import { FieldSet } from 'components/Field';
import { FormPropTypes, withForm } from 'components/Form';
import { InputNumber, InputText } from 'components/Input';
import { momentDate } from 'utils/moment';
import { instanceOf } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import bem from 'utils/bem';
import { filter } from 'utils/props';
import './AppSettingsGeneral.scss';
import { AppSettingsModel } from './AppSettingsModel';
import { AppSettingsPanel, AppSettingsPanelDefaultProps, AppSettingsPanelPropTypes } from './AppSettingsPanel';

// eslint-disable-next-line import/prefer-default-export
export const [AppSettingsGeneral, AppSettingsGeneralPropTypes, AppSettingsGeneralDefaultProps] = withForm(
  class AppSettingsGeneral extends PureComponent {
    static className = 'AppSettingsGeneral';

    static propTypes = {
      ...FormPropTypes,
      ...AppSettingsPanelPropTypes,
      value: instanceOf(AppSettingsModel).isRequired
    };

    static defaultProps = {
      ...AppSettingsPanelDefaultProps,
      title: 'General'
    };

    handleCancelClick = () => {
      const { initialValue, onChange } = this.props;

      onChange(initialValue);
    };

    formatMoment = value => (value == null ? value : momentDate(value));

    parseMoment = value => momentDate(value).format('YYYY-MM-DDTHH:mm:ssZ');

    renderEmail() {
      const { Field } = this.props;

      return (
        <FieldSet legend="Section Name" className={bem.element(this, 'section', 'email')}>
          <Field
            name="bank_notification_emails"
            label="Bank Notification Emails"
            input={InputText}
            input-placeholder=""
            className={bem.element(this, 'field', 'email')}
          />
        </FieldSet>
      );
    }

    ReportsAlertCriteria = props => (
      <Fragment>
        <InputNumber
          {...props}
          wrapper-className={bem.element(this, 'inputWrapper', ['flex', 'reportsAlertCriteria'])}
        />
        {'%'}
      </Fragment>
    );

    LicenseExpirationDate = props => (
      <Fragment>
        <InputNumber
          {...props}
          wrapper-className={bem.element(this, 'inputWrapper', ['flex', 'licenseExpirationDate'])}
        />
        {'years'}
      </Fragment>
    );

    renderSettings() {
      const { Field } = this.props;

      return (
        <FieldSet legend="Section Name" className={bem.element(this, 'section', 'settings')}>
          <div className={bem.element(this, 'column', 'left')}>
            <Field
              name="report_completion_day"
              label="Reports Completion Day"
              input={InputNumber}
              className={bem.element(this, 'field', 'reportsCompletionDay')}
            />
            <Field
              name="bank_documents_start_date"
              input={DatePicker}
              input-format="YYYY-MM-DD"
              parseValue={this.parseMoment}
              formatValue={this.formatMoment}
              label="Bank Documents Start Date"
              className={bem.element(this, 'field', 'bankStartDate')}
            />
          </div>
          <div className={bem.element(this, 'column', 'right')}>
            <Field
              name="report_alerts_criteria"
              label="Reports Alert Criteria %"
              input={this.ReportsAlertCriteria}
              className={bem.element(this, 'field', ['flex', 'reportsAlertCriteria'])}
            />
            <Field
              name="report_alerts_criteria_abs"
              label="Reports Alert Criteria $"
              input={InputNumber}
              className={bem.element(this, 'field', ['flex', 'reportsAlertCriteria'])}
            />
          </div>
        </FieldSet>
      );
    }

    render() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { Field, Element, ...props } = this.props;

      return (
        <AppSettingsPanel
          {...filter(props, AppSettingsPanelPropTypes)}
          className={bem.block(this)}
          content-className={bem.element(this, 'content')}
          onCancelClick={this.handleCancelClick}
        >
          {this.renderEmail()}
          <Delimiter />
          {this.renderSettings()}
        </AppSettingsPanel>
      );
    }
  }
);
