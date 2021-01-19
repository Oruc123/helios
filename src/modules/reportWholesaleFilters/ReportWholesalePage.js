import React from 'react';
import { connect } from 'react-redux';
import { Layer } from 'components/Layer';
import { Table } from 'components/Table';
import { PageSection, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Search } from 'components/Search';
import { columns } from 'components/Alerts/data';
import { createDispatchers } from 'utils/redux';
import { ReportWholesaleFilterPanel } from 'components/Alerts';
import { addPrefix, getLicenseInfo } from 'utils/common';
import { licenseListSelectors } from 'modules/licenses/list';
import { companyListSelectors } from '../companies/list';
import { reportWholesaleListActions, reportWholesaleListSelectors } from '../reportWholesaleList';
import { reportWholesaleFiltersActions, reportWholesaleFiltersSelectors } from './reportWholesaleFilters';

export const ReportWholesalePagePropTypes = {
  ...PagePropTypes
};

export const ReportWholesalePageDefaultProps = {
  ...PageDefaultProps
};

class ReportWholesalePage extends React.PureComponent {
  static propTypes = {
    ...ReportWholesalePagePropTypes
  };

  static defaultProps = {
    ...ReportWholesalePageDefaultProps
  };

  static className = 'ReportWholesalePage';

  render() {
    const { data, companies, licenses, ...props } = this.props;
    const dataSource = [...data.getValue().values()];
    return (
      <PageSection title="Wholesale Reports Queue" actions={<Search />}>
        <Layer rounded shadowed>
          <ReportWholesaleFilterPanel {...props} licenses={licenses} companies={companies} />
          <Table
            loading={data.isPending()}
            locale={{ emptyText: dataSource?.length === 0 ? 'No data' : 'No results found' }}
            customColumns={columns.reportsQueue({
              licenseInfo: getLicenseInfo({ licenses, companies }),
              addPrefix: addPrefix('WR')
            })}
            dataSource={dataSource}
          />
        </Layer>
      </PageSection>
    );
  }
}

const mapStateToProps = state => ({
  value: reportWholesaleFiltersSelectors.getEntity(state),
  data: reportWholesaleListSelectors.getEntity(state),
  companies: companyListSelectors.getEntity(state),
  licenses: licenseListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onToggle: reportWholesaleFiltersActions.value.toggle,
  onRead: reportWholesaleListActions.read.call,
  onSet: reportWholesaleFiltersActions.value.set
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportWholesalePage);
