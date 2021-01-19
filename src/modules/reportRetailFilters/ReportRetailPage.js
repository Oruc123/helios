import React from 'react';
import { connect } from 'react-redux';
import { Layer } from 'components/Layer';
import { Table } from 'components/Table';
import { PageSection, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Search } from 'components/Search';
import { columns } from 'components/Alerts/data';
import { createDispatchers } from 'utils/redux';
import { ReportRetailFilterPanel } from 'components/Alerts';
import { addPrefix, getLicenseInfo } from 'utils/common';
import { licenseListSelectors } from 'modules/licenses/list';
import { companyListSelectors } from '../companies/list';
import { reportRetailListActions, reportRetailListSelectors } from '../reportRetailList';
import { reportRetailFiltersActions, reportRetailFiltersSelectors } from './reportRetailFilters';

export const ReportRetailPagePropTypes = {
  ...PagePropTypes
};

export const ReportRetailPageDefaultProps = {
  ...PageDefaultProps
};

class ReportRetailPage extends React.PureComponent {
  static propTypes = {
    ...ReportRetailPagePropTypes
  };

  static defaultProps = {
    ...ReportRetailPageDefaultProps
  };

  static className = 'ReportRetailPage';

  render() {
    const { data, companies, licenses, ...props } = this.props;
    const dataSource = [...data.getValue().values()];
    return (
      <PageSection title="Retail Reports Queue" actions={<Search />}>
        <Layer rounded shadowed>
          <ReportRetailFilterPanel {...props} licenses={licenses} companies={companies} />
          <Table
            loading={data.isPending()}
            locale={{ emptyText: dataSource?.length === 0 ? 'No data' : 'No results found' }}
            customColumns={columns.reportsQueue({
              licenseInfo: getLicenseInfo({ licenses, companies }),
              addPrefix: addPrefix('RR')
            })}
            dataSource={dataSource}
          />
        </Layer>
      </PageSection>
    );
  }
}

const mapStateToProps = state => ({
  value: reportRetailFiltersSelectors.getEntity(state),
  data: reportRetailListSelectors.getEntity(state),
  companies: companyListSelectors.getEntity(state),
  licenses: licenseListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onToggle: reportRetailFiltersActions.value.toggle,
  onRead: reportRetailListActions.read.call,
  onSet: reportRetailFiltersActions.value.set
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportRetailPage);
