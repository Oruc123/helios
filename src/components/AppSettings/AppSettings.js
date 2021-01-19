import { ControlledFormPropTypes, FormButtons, withForm } from 'components/Form';
import { Layer } from 'components/Layer';
import isEqual from 'lodash/isEqual';
import { instanceOf, oneOf } from 'prop-types';
import React from 'react';
import bem from 'utils/bem';
import { ListModel } from 'utils/list';
import './AppSettings.scss';
import { AppSettingsAudit } from './AppSettingsAudit';
import { AppSettingsDocuments } from './AppSettingsDocuments';
import { AppSettingsGeneral } from './AppSettingsGeneral';
import { AppSettingsMetrc } from './AppSettingsMetrc';
import { AppSettingsModel } from './AppSettingsModel';
import { AppSettingsReports } from './AppSettingsReports';

const SECTION_AUDIT = 1;
const SECTION_GENERAL = 2;
const SECTION_DOCUMENTS = 4;
const SECTION_METRC = 8;
const SECTION_REPORTS = 16;

const SECTION_ALL = SECTION_AUDIT | SECTION_DOCUMENTS | SECTION_GENERAL | SECTION_METRC | SECTION_REPORTS;

const SECTIONS = [SECTION_ALL, SECTION_AUDIT, SECTION_DOCUMENTS, SECTION_GENERAL, SECTION_METRC, SECTION_REPORTS];

// eslint-disable-next-line import/prefer-default-export
export const [AppSettings, AppSettingsPropTypes, AppSettingsDefaultProps] = withForm(
  class AppSettings extends React.PureComponent {
    static className = 'AppSettings';

    static propTypes = {
      ...ControlledFormPropTypes,
      // eslint-disable-next-line react/no-unused-prop-types
      value: instanceOf(AppSettingsModel).isRequired,
      companyList: instanceOf(ListModel).isRequired,
      section: oneOf(SECTIONS)
    };

    static defaultProps = {
      section: SECTION_ALL
    };

    handleSubmitClick = () => {
      const { onSubmit } = this.props;

      if (typeof onSubmit === 'function') {
        onSubmit();
      }
    };

    handleCancelClick = () => {
      const { value, onChange } = this.props;

      if (typeof onChange === 'function') {
        onChange(value.resetValue());
      }
    };

    renderGeneral() {
      const { value, onChange } = this.props;

      return (
        <Layer rounded shadowed className={bem.element(this, 'layer', 'general')}>
          <AppSettingsGeneral value={value} onChange={onChange} />
        </Layer>
      );
    }

    renderAudit() {
      const { companyList, value, onChange } = this.props;

      return (
        <Layer rounded shadowed className={bem.element(this, 'layer', 'audit')}>
          <AppSettingsAudit companyList={companyList} value={value} onChange={onChange} />
        </Layer>
      );
    }

    renderDocuments() {
      const { value, onChange } = this.props;

      return (
        <Layer rounded shadowed className={bem.element(this, 'layer', 'documents')}>
          <AppSettingsDocuments value={value} onChange={onChange} />
        </Layer>
      );
    }

    renderMetrc() {
      const { value, onChange } = this.props;

      return (
        <Layer rounded shadowed className={bem.element(this, 'layer', 'metrc')}>
          <AppSettingsMetrc value={value} onChange={onChange} />
        </Layer>
      );
    }

    renderReports() {
      const { value, onChange } = this.props;

      return (
        <Layer rounded shadowed className={bem.element(this, 'layer', 'tax')}>
          <AppSettingsReports value={value} onChange={onChange} />
        </Layer>
      );
    }

    renderFooter() {
      const { value } = this.props;
      const isPending = value.isPending();
      const visible = !isEqual(value.getValue(), value.getInitialValue());

      return (
        <div className={bem.element(this, 'footer', { visible })}>
          <FormButtons
            cancel-className={bem.element(this, 'cancel')}
            cancel-disabled={isPending}
            cancel-onClick={this.handleCancelClick}
            submit-pending={isPending}
            submit-disabled={isPending || value.hasError()}
            submit-className={bem.element(this, 'submit')}
            submit-onClick={this.handleSubmitClick}
          />
        </div>
      );
    }

    render() {
      const { section } = this.props;

      // noinspection JSBitwiseOperatorUsage
      return (
        <div className={bem.block(this)}>
          {section & SECTION_GENERAL ? this.renderGeneral() : null}
          {section & SECTION_AUDIT ? this.renderAudit() : null}
          {section & SECTION_DOCUMENTS ? this.renderDocuments() : null}
          {section & SECTION_METRC ? this.renderMetrc() : null}
          {section & SECTION_REPORTS ? this.renderReports() : null}

          {this.renderFooter()}
        </div>
      );
    }
  }
);

AppSettings.SECTION_ALL = SECTION_ALL;
AppSettings.SECTION_AUDIT = SECTION_AUDIT;
AppSettings.SECTION_DOCUMENTS = SECTION_DOCUMENTS;
AppSettings.SECTION_GENERAL = SECTION_GENERAL;
AppSettings.SECTION_METRC = SECTION_METRC;
AppSettings.SECTION_REPORTS = SECTION_REPORTS;
AppSettings.SECTIONS = SECTIONS;
