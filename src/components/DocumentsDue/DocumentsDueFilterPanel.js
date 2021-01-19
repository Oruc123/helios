import React from 'react';
import isEqual from 'lodash/isEqual';

import { PageDefaultProps, PagePropTypes } from 'components/Page';
import { FilterPanel } from 'components/FilterPanel';

import { DocumentsDueFilter } from './DocumentsDueFilter';
import { DocumentsDueFilterModel } from './DocumentsDueFilterModel';

export const DocumentsDueFilterPanelPropTypes = {
  ...PagePropTypes
};

export const DocumentsDueFilterPanelDefaultProps = {
  ...PageDefaultProps,
  title: 'Internal Transfers'
};

export class DocumentsDueFilterPanel extends React.PureComponent {
  static propTypes = { ...DocumentsDueFilterPanelPropTypes };

  static defaultProps = { ...DocumentsDueFilterPanelDefaultProps };

  static className = 'DocumentsDueFilterPanel';

  static defaultDocumentsDueFilterModel = new DocumentsDueFilterModel();

  componentDidMount() {
    const { onRead } = this.props;
    onRead(DocumentsDueFilterPanel.defaultDocumentsDueFilterModel);
  }

  get expanded() {
    const { value } = this.props;
    return value.getToggle();
  }

  get activeClear() {
    const { value } = this.props;
    return this.expanded && !isEqual(DocumentsDueFilterPanel.defaultDocumentsDueFilterModel, value);
  }

  handleClearClick = () => {
    this.handleUpdate(DocumentsDueFilterPanel.defaultDocumentsDueFilterModel);
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
        <DocumentsDueFilter onChange={this.handleUpdate} {...props} />
      </FilterPanel>
    );
  }
}
