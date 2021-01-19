import { AppSettingsModel } from 'components/AppSettings/AppSettingsModel';
import { CompanySelector } from 'components/Company';
import { Delimiter } from 'components/Delimiter';
import { FieldSet } from 'components/Field';
import { FormPropTypes, withForm } from 'components/Form';
import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ListModel } from 'utils/list';
import { filter } from 'utils/props';
import './AppSettingsAudit.scss';
import { AppSettingsPanel, AppSettingsPanelDefaultProps, AppSettingsPanelPropTypes } from './AppSettingsPanel';

// eslint-disable-next-line import/prefer-default-export
export const [AppSettingsAudit, AppSettingsAuditPropTypes, AppSettingsAuditDefaultProps] = withForm(
  class AppSettingsAudit extends PureComponent {
    static className = 'AppSettingsAudit';

    static propTypes = {
      ...AppSettingsPanelPropTypes,
      ...FormPropTypes,
      value: instanceOf(AppSettingsModel).isRequired,
      companyList: instanceOf(ListModel).isRequired
    };

    static defaultProps = {
      ...AppSettingsPanelDefaultProps,
      title: 'Audit & Exam Settings'
    };

    handleCancelClick = () => {
      const { initialValue, onChange } = this.props;

      onChange(initialValue);
    };

    renderAudit() {
      const { Element, companyList } = this.props;

      return (
        <FieldSet legend="Audit Settings" className={bem.element(this, 'section', 'audit')}>
          <Element
            name="audit_companies_ids"
            input={CompanySelector}
            input-items={[...companyList.getValue().values()]}
            input-values-label="Selected for Audit"
            className={bem.element(this, 'field', 'audit')}
          />
        </FieldSet>
      );
    }

    renderExam() {
      const { Element, companyList } = this.props;

      return (
        <FieldSet legend="Exam Settings" className={bem.element(this, 'section', 'exam')}>
          <Element
            name="exam_companies_ids"
            input={CompanySelector}
            input-items={[...companyList.getValue().values()]}
            input-values-label="Selected for Exam"
            className={bem.element(this, 'field', 'exam')}
          />
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
          {this.renderAudit()}
          <Delimiter />
          {this.renderExam()}
        </AppSettingsPanel>
      );
    }
  }
);
