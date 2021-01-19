import React from 'react';
import { instanceOf } from 'prop-types';
import isEqual from 'lodash/isEqual';

import { PageDefaultProps, PagePropTypes } from 'components/Page';
import { FilterPanel } from 'components/FilterPanel';

import { AlertsDocumentsFilter } from './AlertsDocumentsFilter';
import { AlertsDocumentsFilterModel } from './AlertsDocumentsFilterModel';

export const DocumentFileFilterPanelPropTypes = {
  ...PagePropTypes
};

export const DocumentFileFilterPanelDefaultProps = {
  ...PageDefaultProps
};

export class DocumentFileFilterPanel extends React.PureComponent {
  static propTypes = {
    ...DocumentFileFilterPanelPropTypes,
    value: instanceOf(AlertsDocumentsFilterModel).isRequired
  };

  static defaultProps = { ...DocumentFileFilterPanelDefaultProps };

  static className = 'DocumentFileFilterPanel';

  static defaultAlertsDocumentsFilterModel = new AlertsDocumentsFilterModel();

  componentDidMount() {
    const { onRead } = this.props;
    onRead(DocumentFileFilterPanel.defaultAlertsDocumentsFilterModel);
  }

  get expanded() {
    const { value } = this.props;
    return value.getToggle();
  }

  get activeClear() {
    const { value } = this.props;
    return this.expanded && !isEqual(DocumentFileFilterPanel.defaultAlertsDocumentsFilterModel, value);
  }

  handleClearClick = () => {
    this.handleUpdate(DocumentFileFilterPanel.defaultAlertsDocumentsFilterModel);
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
        <AlertsDocumentsFilter onChange={this.handleUpdate} {...props} />
      </FilterPanel>
    );
  }
}
