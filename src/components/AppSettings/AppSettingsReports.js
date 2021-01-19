import { CheckBox } from 'components/CheckBox';
import { Delimiter } from 'components/Delimiter';
import { FieldSet } from 'components/Field';
import { FormPropTypes, withForm } from 'components/Form';
import { Panel } from 'components/Panel';
import { Select } from 'components/Select';
import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { filter } from 'utils/props';
import { AppSettingsModel } from './AppSettingsModel';
import { AppSettingsPanel, AppSettingsPanelDefaultProps, AppSettingsPanelPropTypes } from './AppSettingsPanel';
import './AppSettingsReports.scss';

const REPORT_PERIODS = [{ value: 'monthly', label: 'Monthly' }, { value: 'quarterly', label: 'Quarterly' }];

const TAX_PERIODS = [
  { value: 'none', label: 'None' },
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'semi_annual', label: 'Semi Annual' },
  { value: 'annual', label: 'Annual' }
];

// eslint-disable-next-line import/prefer-default-export
export const [AppSettingsReports, AppSettingsReportsPropTypes, AppSettingsReportsDefaultProps] = withForm(
  class AppSettingsReports extends PureComponent {
    static className = 'AppSettingsReports';

    static propTypes = {
      ...FormPropTypes,
      ...AppSettingsPanelPropTypes,
      value: instanceOf(AppSettingsModel).isRequired
    };

    static defaultProps = {
      ...AppSettingsPanelDefaultProps,
      face: Panel.FACE_PRIMARY,
      title: 'Reports Settings'
    };

    renderCommon() {
      const { Field } = this.props;

      return (
        <FieldSet legend="Common" className={bem.element(this, 'section', 'common')}>
          <div className={bem.element(this, 'column', 'left')}>
            <Field
              name="report_setting.period"
              label="Reports Period"
              input={Select}
              input-dataSource={REPORT_PERIODS}
              className={bem.element(this, 'field', 'reportsPeriod')}
            />
          </div>
          <div className={bem.element(this, 'column', 'right')}>
            <Field
              name="tax_period"
              label="Tax Period"
              input={Select}
              input-dataSource={TAX_PERIODS}
              className={bem.element(this, 'field', 'taxPeriod')}
            />
          </div>
        </FieldSet>
      );
    }

    renderRetailProduct() {
      const { Field } = this.props;

      return (
        <FieldSet legend="Retail Product" className={bem.element(this, 'section', 'retailProduct')}>
          <div className={bem.element(this, 'column', 'left')}>
            <Field name="report_setting.retail.prod_amount" label="Enable Amount" input={CheckBox} />
            <Field name="report_setting.retail.prod_per_qty" label="Enable per Qty" input={CheckBox} />
          </div>
          <div className={bem.element(this, 'column', 'right')}>
            <Field name="report_setting.retail.prod_qty" label="Enable Quantity" input={CheckBox} />
          </div>
        </FieldSet>
      );
    }

    renderRetailSales() {
      const { Field } = this.props;

      return (
        <FieldSet legend="Retail Sales" className={bem.element(this, 'section', 'retailSales')}>
          <div className={bem.element(this, 'column', 'left')}>
            <Field name="report_setting.retail.sales_amount" label="Enable Amount" input={CheckBox} />
            <Field name="report_setting.retail.sales_per_qty" label="Enable per Qty" input={CheckBox} />
            <Field name="report_setting.retail.tax" label="Enable Retail Tax" input={CheckBox} />
          </div>
          <div className={bem.element(this, 'column', 'right')}>
            <Field name="report_setting.retail.sales_qty" label="Enable Quantity" input={CheckBox} />
            <Field name="report_setting.retail.sales_pos" label="Enable POS" input={CheckBox} />
          </div>
        </FieldSet>
      );
    }

    renderWholesaleProduct() {
      const { Field } = this.props;

      return (
        <FieldSet legend="Wholesale Product" className={bem.element(this, 'section', 'wholesaleProduct')}>
          <div className={bem.element(this, 'column', 'left')}>
            <Field name="report_setting.wholesale.prod_amount" label="Enable Amount" input={CheckBox} />
            <Field name="report_setting.wholesale.prod_per_qty" label="Enable per Qty" input={CheckBox} />
          </div>
          <div className={bem.element(this, 'column', 'right')}>
            <Field name="report_setting.wholesale.prod_qty" label="Enable Quantity" input={CheckBox} />
          </div>
        </FieldSet>
      );
    }

    renderWholesaleSales() {
      const { Field } = this.props;

      return (
        <FieldSet legend="Wholesale Sales" className={bem.element(this, 'section', 'wholesaleSales')}>
          <div className={bem.element(this, 'column', 'left')}>
            <Field name="report_setting.wholesale.sales_amount" label="Enable Amount" input={CheckBox} />
            <Field name="report_setting.wholesale.sales_per_qty" label="Enable per Qty" input={CheckBox} />
          </div>
          <div className={bem.element(this, 'column', 'right')}>
            <Field name="report_setting.wholesale.sales_qty" label="Enable Quantity" input={CheckBox} />
            <Field name="report_setting.wholesale.tax" label="Enable Wholesale Tax" input={CheckBox} />
          </div>
        </FieldSet>
      );
    }

    render() {
      const { Field, Element, ...props } = this.props;

      return (
        <AppSettingsPanel
          {...filter(props, AppSettingsPanelPropTypes)}
          className={bem.block(this)}
          content-className={bem.element(this, 'content')}
        >
          {this.renderCommon()}
          <Delimiter />
          {this.renderRetailProduct()}
          <Delimiter />
          {this.renderRetailSales()}
          <Delimiter />
          {this.renderWholesaleProduct()}
          <Delimiter />
          {this.renderWholesaleSales()}
        </AppSettingsPanel>
      );
    }
  }
);
