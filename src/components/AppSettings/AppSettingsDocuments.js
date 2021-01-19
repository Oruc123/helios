import { Delimiter } from 'components/Delimiter';
import { Field as CommonField, FieldSet } from 'components/Field';
import { FormPropTypes, withForm } from 'components/Form';
import { InputNumber, InputText } from 'components/Input';
import { Link } from 'components/Link';
import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { filter } from 'utils/props';
import './AppSettingsDocuments.scss';
import { AppSettingsModel } from './AppSettingsModel';
import { AppSettingsPanel, AppSettingsPanelDefaultProps, AppSettingsPanelPropTypes } from './AppSettingsPanel';

// eslint-disable-next-line import/prefer-default-export
export const [AppSettingsDocuments, AppSettingsDocumentsPropTypes, AppSettingsDocumentsDefaultProps] = withForm(
  class AppSettingsDocuments extends PureComponent {
    static className = 'AppSettingsDocuments';

    static propTypes = {
      ...FormPropTypes,
      ...AppSettingsPanelPropTypes,
      value: instanceOf(AppSettingsModel).isRequired
    };

    static defaultProps = {
      ...AppSettingsPanelDefaultProps,
      title: 'Documents Settings'
    };

    handleCancelClick = () => {
      const { initialValue, onChange } = this.props;

      onChange(initialValue);
    };

    AlertItem = ({ id, label, ...props }) => (
      <div className={bem.element(this, 'field', ['alert', id])}>
        <span className={bem.element(this, 'label', ['alert', 'sup'])}>{label}</span>
        <InputNumber {...props} wrapper-className={bem.element(this, 'inputWrapper', 'alert', props.className)} />
        <span className={bem.element(this, 'label', 'alert')}>days</span>
      </div>
    );

    renderAlerts() {
      const { Element } = this.props;

      return (
        <CommonField label="Document templates" className={bem.element(this, 'field', 'alerts')}>
          <Element
            name="bank_document_first_notification_before_expiration"
            input={this.AlertItem}
            input-id="first"
            input-label="1st"
          />
          <Element
            name="bank_document_last_notification_before_expiration"
            input={this.AlertItem}
            input-id="second"
            input-label="2nd"
          />
        </CommonField>
      );
    }

    renderDocumentTemplates() {
      return (
        <CommonField label="Document templates" className={bem.element(this, 'field', 'templates')}>
          <Link to="/" className={bem.element(this, 'link', 'all')}>
            View All
          </Link>
        </CommonField>
      );
    }

    renderSettings() {
      return (
        <FieldSet legend="Section Name" className={bem.element(this, 'section', 'settings')}>
          {this.renderAlerts()}
          {this.renderDocumentTemplates()}
        </FieldSet>
      );
    }

    renderAmazonLeftColumn() {
      const { Field } = this.props;

      return (
        <div className={bem.element(this, 'column', ['amazon', 'left'])}>
          <Field
            name="aws_s3_accesskey"
            label="Access Key"
            input={InputText}
            className={bem.element(this, 'field', 'accessKey')}
          />
          <Field
            name="aws_s3_secretkey"
            label="Access Secret"
            input={InputText}
            className={bem.element(this, 'field', 'accessSecret')}
          />
        </div>
      );
    }

    renderAmazonRightColumn() {
      const { Field } = this.props;

      return (
        <div className={bem.element(this, 'column', ['amazon', 'right'])}>
          <Field
            name="aws_s3_bucket_name"
            label="S3 Bucket Name"
            input={InputText}
            className={bem.element(this, 'field', 's3BucketName')}
          />
          <Field
            name="aws_sns_topic_arn"
            label="SNS TopicArn"
            input={InputText}
            className={bem.element(this, 'field', 'snsTopicArn')}
          />
        </div>
      );
    }

    renderAmazon() {
      return (
        <FieldSet legend="Amazon Settings" className={bem.element(this, 'section', 'amazon')}>
          {this.renderAmazonLeftColumn()}
          {this.renderAmazonRightColumn()}
        </FieldSet>
      );
    }

    render() {
      const { Field, Element, ...props } = this.props;

      return (
        <AppSettingsPanel
          {...filter(props, AppSettingsPanelPropTypes)}
          content-className={bem.element(this, 'content')}
          className={bem.block(this)}
          onCancelClick={this.handleCancelClick}
        >
          {this.renderSettings()}
          <Delimiter />
          {this.renderAmazon()}
        </AppSettingsPanel>
      );
    }
  }
);
