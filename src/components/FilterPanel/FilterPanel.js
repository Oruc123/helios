import { bool, func } from 'prop-types';
import React from 'react';

import { Panel, PanelDefaultProps, PanelPropTypes } from 'components/Panel';
import { Button } from 'components/Button';
import bem from 'utils/bem';
import { filter } from 'utils/props';

import './FilterPanel.scss';

export const FilterPanelPropTypes = {
  ...PanelPropTypes,
  clear: bool,
  onClearClick: func
};

export const FilterPanelDefaultProps = {
  ...PanelDefaultProps,
  title: 'Filters',
  clear: true,
  onClearClick: undefined
};

export class FilterPanel extends React.PureComponent {
  static propTypes = {
    ...FilterPanelPropTypes
  };

  static defaultProps = {
    ...FilterPanelDefaultProps
  };

  static className = 'FilterPanel';

  handleClearClick = () => {
    const { onClearClick } = this.props;

    if (typeof onClearClick === 'function') {
      onClearClick();
    }
  };

  renderActions() {
    const { clear } = this.props;

    return (
      <Button
        icon="can"
        face="link"
        className={bem.element(this, 'clear', { hidden: !clear })}
        onClick={this.handleClearClick}
      >
        CLEAR
      </Button>
    );
  }

  render() {
    const { 'content-className': contentClassName, ...props } = this.props;

    return (
      <Panel
        {...filter(props, PanelPropTypes)}
        actions={this.renderActions()}
        face={Panel.FACE_SECONDARY}
        className={bem.block(this)}
        content-className={bem.element(this, 'content', null, contentClassName)}
      />
    );
  }
}
