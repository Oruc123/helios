import React from 'react';
import { instanceOf } from 'prop-types';
import isEqual from 'lodash/isEqual';
import { ListModel } from 'utils/list';
import { PageDefaultProps, PagePropTypes } from 'components/Page';
import { FilterPanel } from 'components/FilterPanel';
import { AlertsReportsFilter } from './AlertsReportsFilter';
import { AlertsReportsFilterModel } from './AlertsReportsFilterModel';

export const ReportWholesaleFilterPanelPropTypes = {
  ...PagePropTypes,
  licenses: instanceOf(ListModel),
  companies: instanceOf(ListModel)
};

export const ReportWholesaleFilterPanelDefaultProps = {
  ...PageDefaultProps
};

export class ReportWholesaleFilterPanel extends React.PureComponent {
  static propTypes = {
    ...ReportWholesaleFilterPanelPropTypes,
    value: instanceOf(AlertsReportsFilterModel).isRequired
  };

  static defaultProps = { ...ReportWholesaleFilterPanelDefaultProps };

  static className = 'ReportWholesaleFilterPanel';

  static defaultAlertsReviewsFilterModel = new AlertsReportsFilterModel();

  componentDidMount() {
    const { onRead } = this.props;
    onRead(ReportWholesaleFilterPanel.defaultAlertsReviewsFilterModel);
  }

  get expanded() {
    const { value } = this.props;
    return value.getToggle();
  }

  get activeClear() {
    const { value } = this.props;
    return this.expanded && !isEqual(ReportWholesaleFilterPanel.defaultAlertsReviewsFilterModel, value);
  }

  handleClearClick = () => {
    this.handleUpdate(ReportWholesaleFilterPanel.defaultAlertsReviewsFilterModel);
  };

  handleUpdate = model => {
    const { onRead, onSet } = this.props;
    onSet(model);
    onRead(model);
  };

  render() {
    const { onToggle, licenses, companies, ...props } = this.props;
    return (
      <FilterPanel
        clear={this.activeClear}
        onClearClick={this.handleClearClick}
        expanded={this.expanded}
        onExpandedChange={onToggle}
      >
        <AlertsReportsFilter {...props} licenses={licenses} companies={companies} onChange={this.handleUpdate} />
      </FilterPanel>
    );
  }
}
