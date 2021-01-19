import React from 'react';
import { instanceOf } from 'prop-types';
import isEqual from 'lodash/isEqual';
import { PageDefaultProps, PagePropTypes } from 'components/Page';
import { FilterPanel } from 'components/FilterPanel';
import { ListModel } from 'utils/list';
import { AlertsReportsFilter } from './AlertsReportsFilter';
import { AlertsReportsFilterModel } from './AlertsReportsFilterModel';

export const ReportRetailFilterPanelPropTypes = {
  ...PagePropTypes
};

export const ReportRetailFilterPanelDefaultProps = {
  ...PageDefaultProps
};

export class ReportRetailFilterPanel extends React.PureComponent {
  static propTypes = {
    ...ReportRetailFilterPanelPropTypes,
    value: instanceOf(AlertsReportsFilterModel).isRequired,
    licenses: instanceOf(ListModel),
    companies: instanceOf(ListModel)
  };

  static defaultProps = { ...ReportRetailFilterPanelDefaultProps };

  static className = 'ReportRetailFilterPanel';

  static defaultAlertsReviewsFilterModel = new AlertsReportsFilterModel();

  componentDidMount() {
    const { onRead } = this.props;
    onRead(ReportRetailFilterPanel.defaultAlertsReviewsFilterModel);
  }

  get expanded() {
    const { value } = this.props;
    return value.getToggle();
  }

  get activeClear() {
    const { value } = this.props;
    return this.expanded && !isEqual(ReportRetailFilterPanel.defaultAlertsReviewsFilterModel, value);
  }

  handleClearClick = () => {
    this.handleUpdate(ReportRetailFilterPanel.defaultAlertsReviewsFilterModel);
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
