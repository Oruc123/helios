import React from 'react';
import { instanceOf } from 'prop-types';
import isEqual from 'lodash/isEqual';
import { PageDefaultProps, PagePropTypes } from 'components/Page';
import { FilterPanel } from 'components/FilterPanel';
import { ListModel } from 'utils/list';
import { AlertsReviewsFilter } from './AlertsReviewsFilter';
import { AlertsReviewsFilterModel } from './AlertsReviewsFilterModel';

export const AnnualReviewFilterPanelPropTypes = {
  ...PagePropTypes
};

export const AnnualReviewFilterPanelDefaultProps = {
  ...PageDefaultProps
};

export class AnnualReviewFilterPanel extends React.PureComponent {
  static propTypes = {
    ...AnnualReviewFilterPanelPropTypes,
    value: instanceOf(AlertsReviewsFilterModel).isRequired,
    companies: instanceOf(ListModel)
  };

  static defaultProps = { ...AnnualReviewFilterPanelDefaultProps };

  static className = 'AnnualReviewFilterPanel';

  static defaultAlertsReviewsFilterModel = new AlertsReviewsFilterModel();

  componentDidMount() {
    const { onRead } = this.props;
    onRead(AnnualReviewFilterPanel.defaultAlertsReviewsFilterModel);
  }

  get expanded() {
    const { value } = this.props;
    return value.getToggle();
  }

  get activeClear() {
    const { value } = this.props;
    return this.expanded && !isEqual(AnnualReviewFilterPanel.defaultAlertsReviewsFilterModel, value);
  }

  handleClearClick = () => {
    this.handleUpdate(AnnualReviewFilterPanel.defaultAlertsReviewsFilterModel);
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
        <AlertsReviewsFilter onChange={this.handleUpdate} {...props} />
      </FilterPanel>
    );
  }
}
