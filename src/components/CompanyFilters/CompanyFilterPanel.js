import React from 'react';
import isEqual from 'lodash/isEqual';

import { PageDefaultProps, PagePropTypes } from 'components/Page';
import { FilterPanel } from 'components/FilterPanel';

import { CompanyFilters } from './CompanyFilters';
import { CompanyFiltersModel } from './CompanyFiltersModel';

export const CompanyFilterPanelPropTypes = {
  ...PagePropTypes
};

export const CompanyFilterPanelDefaultProps = {
  ...PageDefaultProps
};

export class CompanyFilterPanel extends React.PureComponent {
  static propTypes = { ...CompanyFilterPanelPropTypes };

  static defaultProps = { ...CompanyFilterPanelDefaultProps };

  static className = 'CompanyFilterPanel';

  static defaultCompaniesFilterModel = new CompanyFiltersModel();

  get expanded() {
    const { value } = this.props;
    return value.getToggle();
  }

  get activeClear() {
    const { value } = this.props;
    return this.expanded && !isEqual(CompanyFilterPanel.defaultCompaniesFilterModel, value);
  }

  handleClearClick = () => {
    this.handleUpdate(CompanyFilterPanel.defaultCompaniesFilterModel);
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
        <CompanyFilters onChange={this.handleUpdate} {...props} />
      </FilterPanel>
    );
  }
}
