import React from 'react';
import isEqual from 'lodash/isEqual';

import { PageDefaultProps, PagePropTypes } from 'components/Page';
import { FilterPanel } from 'components/FilterPanel';

import { TransfersFilter } from './TransfersFilter';
import { TransfersFilterModel } from './TransfersFilterModel';

export const TransfersFilterPanelPropTypes = {
  ...PagePropTypes
};

export const TransfersFilterPanelDefaultProps = {
  ...PageDefaultProps,
  title: 'Internal Transfers'
};

export class TransfersFilterPanel extends React.PureComponent {
  static propTypes = { ...TransfersFilterPanelPropTypes };

  static defaultProps = { ...TransfersFilterPanelDefaultProps };

  static className = 'TransfersFilterPanel';

  static defaultTransfersFilterModel = new TransfersFilterModel();

  componentDidMount() {
    const { onRead } = this.props;
    onRead(TransfersFilterPanel.defaultTransfersFilterModel);
  }

  get expanded() {
    const { value } = this.props;
    return value.getToggle();
  }

  get activeClear() {
    const { value } = this.props;
    return this.expanded && !isEqual(TransfersFilterPanel.defaultTransfersFilterModel, value);
  }

  handleClearClick = () => {
    this.handleUpdate(TransfersFilterPanel.defaultTransfersFilterModel);
  };

  handleUpdate = model => {
    const { onRead, onSet } = this.props;
    onSet(model);
    onRead(model);
  };

  render() {
    const { onToggle, ...props } = this.props;
    return (
      <FilterPanel
        clear={this.activeClear}
        onClearClick={this.handleClearClick}
        expanded={this.expanded}
        onExpandedChange={onToggle}
      >
        <TransfersFilter onChange={this.handleUpdate} {...props} />
      </FilterPanel>
    );
  }
}
