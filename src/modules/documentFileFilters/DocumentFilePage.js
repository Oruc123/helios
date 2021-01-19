import React from 'react';
import { connect } from 'react-redux';
import { Layer } from 'components/Layer';
import { Table } from 'components/Table';
import { PageSection, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Search } from 'components/Search';
import { columns } from 'components/Alerts/data';
import { createDispatchers } from 'utils/redux';
import { DocumentFileFilterPanel } from 'components/Alerts';
import { documentFileListActions, documentFileListSelectors } from '../documentFileList';
import { documentFileFiltersActions, documentFileFiltersSelectors } from './documentFileFilters';

export const DocumentFilePagePropTypes = {
  ...PagePropTypes
};

export const DocumentFilePageDefaultProps = {
  ...PageDefaultProps
};

class DocumentFilePage extends React.PureComponent {
  static propTypes = {
    ...DocumentFilePagePropTypes
  };

  static defaultProps = {
    ...DocumentFilePageDefaultProps
  };

  static className = 'DocumentsDuePage';

  render() {
    const { data, ...props } = this.props;
    const dataSource = [...data.getValue().values()];
    return (
      <PageSection title="Documents Files Approval" actions={<Search />}>
        <Layer rounded shadowed>
          <DocumentFileFilterPanel {...props} />
          <Table
            loading={data.isPending()}
            locale={{ emptyText: dataSource?.length === 0 ? 'No data' : 'No results found' }}
            customColumns={columns.documentsApproval}
            dataSource={dataSource}
          />
        </Layer>
      </PageSection>
    );
  }
}

const mapStateToProps = state => ({
  value: documentFileFiltersSelectors.getEntity(state),
  data: documentFileListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onToggle: documentFileFiltersActions.value.toggle,
  onRead: documentFileListActions.read.call,
  onSet: documentFileFiltersActions.value.set
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentFilePage);
