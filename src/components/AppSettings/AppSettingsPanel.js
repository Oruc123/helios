import { Panel, PanelDefaultProps, PanelPropTypes } from 'components/Panel';
import { func } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { filter } from 'utils/props';
import './AppSettingsPanel.scss';

export const AppSettingsPanelPropTypes = {
  ...PanelPropTypes,
  onCancelClick: func,
  onSubmitClick: func
};

export const AppSettingsPanelDefaultProps = {
  ...PanelDefaultProps,
  face: Panel.FACE_PRIMARY
};

// eslint-disable-next-line import/prefer-default-export
export class AppSettingsPanel extends PureComponent {
  static className = 'AppSettingsPanel';

  static propTypes = {
    ...AppSettingsPanelPropTypes
  };

  static defaultProps = {
    ...AppSettingsPanelDefaultProps
  };

  render() {
    return <Panel {...filter(this.props, PanelPropTypes)} className={bem.block(this)} />;
  }
}
