import React from 'react';
import { instanceOf } from 'prop-types';
import isEqual from 'lodash/isEqual';
import { PageDefaultProps, PagePropTypes } from 'components/Page';
import { FilterPanel } from 'components/FilterPanel';
import { ListModel } from 'utils/list';
import { AlertsReportsFilter } from './AlertsReportsFilter';
import { AlertsReportsFilterModel } from './AlertsReportsFilterModel';

export const TaxReconcilliationFilterPanelPropTypes = {
  ...PagePropTypes
};

export const TaxReconcilliationFilterPanelDefaultProps = {
  ...PageDefaultProps
};

export class TaxReconcilliationFilterPanel extends React.PureComponent {
  static propTypes = {
    ...TaxReconcilliationFilterPanelPropTypes,
    value: instanceOf(AlertsReportsFilterModel).isRequired,
    licenses: instanceOf(ListModel),
    companies: instanceOf(ListModel)
  };

  static defaultProps = { ...TaxReconcilliationFilterPanelDefaultProps };

  static className = 'TaxReconcilliationFilterPanel';

  static defaultTaxReconcilliationFilterModel = new AlertsReportsFilterModel();

  componentDidMount() {
    const { onRead } = this.props;
    onRead(TaxReconcilliationFilterPanel.defaultTaxReconcilliationFilterModel);
  }

  get expanded() {
    const { value } = this.props;
    return value.getToggle();
  }

  get activeClear() {
    const { value } = this.props;
    return this.expanded && !isEqual(TaxReconcilliationFilterPanel.defaultTaxReconcilliationFilterModel, value);
  }

  handleClearClick = () => {
    this.handleUpdate(TaxReconcilliationFilterPanel.defaultTaxReconcilliationFilterModel);
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
        <AlertsReportsFilter onChange={this.handleUpdate} {...props} />
      </FilterPanel>
    );
  }
}
