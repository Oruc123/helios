import { FormPropTypes, withForm } from 'components/Form';
import { InputText } from 'components/Input';
import { instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { filter, prefixed } from 'utils/props';
import './AppSettingsMetrc.scss';
import { AppSettingsModel } from './AppSettingsModel';
import { AppSettingsPanel, AppSettingsPanelDefaultProps, AppSettingsPanelPropTypes } from './AppSettingsPanel';

// eslint-disable-next-line import/prefer-default-export
export const [AppSettingsMetrc, AppSettingsMetrcPropTypes, AppSettingsMetrcDefaultProps] = withForm(
  class AppSettingsMetrc extends PureComponent {
    static className = 'AppSettingsMetrc';

    static propTypes = {
      ...FormPropTypes,
      ...AppSettingsPanelPropTypes,
      value: instanceOf(AppSettingsModel).isRequired
    };

    static defaultProps = {
      ...AppSettingsPanelDefaultProps,
      title: 'METRC Settings'
    };

    handleCancelClick = () => {
      const { initialValue, onChange } = this.props;

      onChange(initialValue);
    };

    render() {
      const { Field, Element, ...props } = this.props;
      const domainProps = prefixed(props, 'domain');

      return (
        <AppSettingsPanel
          {...filter(props, AppSettingsPanelPropTypes)}
          content-className={bem.element(this, 'content')}
          className={bem.block(this)}
          onCancelClick={this.handleCancelClick}
        >
          <Field
            label="Software API Key"
            {...domainProps}
            name="metrc_software_api_key"
            input={InputText}
            className={bem.element(this, 'field', 'domain', domainProps.className)}
          />
        </AppSettingsPanel>
      );
    }
  }
);
