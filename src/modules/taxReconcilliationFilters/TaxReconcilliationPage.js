import React from 'react';
import { connect } from 'react-redux';
import { Layer } from 'components/Layer';
import { Table } from 'components/Table';
import { PageSection, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Search } from 'components/Search';
import { columns } from 'components/Alerts/data';
import { createDispatchers } from 'utils/redux';
import { TaxReconcilliationFilterPanel } from 'components/Alerts';
import { addPrefix, getLicenseInfo } from 'utils/common';
import { licenseListSelectors } from 'modules/licenses/list';
import { companyListSelectors } from '../companies/list';
import { taxReconcilliationListActions, taxReconcilliationListSelectors } from '../taxReconcilliationList';
import { taxReconcilliationFiltersActions, taxReconcilliationFiltersSelectors } from './taxReconcilliationFilters';

export const TaxReconcilliationPagePropTypes = {
  ...PagePropTypes
};

export const TaxReconcilliationPageDefaultProps = {
  ...PageDefaultProps
};

class TaxReconcilliationPage extends React.PureComponent {
  static propTypes = {
    ...TaxReconcilliationPagePropTypes
  };

  static defaultProps = {
    ...TaxReconcilliationPageDefaultProps
  };

  static className = 'TaxReconcilliationPage';

  render() {
    const { data, companies, licenses, ...props } = this.props;
    const dataSource = [...data.getValue().values()];
    return (
      <PageSection title="Tax Reconcilliation Queue" actions={<Search />}>
        <Layer rounded shadowed>
          <TaxReconcilliationFilterPanel {...props} licenses={licenses} companies={companies} />
          <Table
            loading={data.isPending()}
            locale={{ emptyText: dataSource?.length === 0 ? 'No data' : 'No results found' }}
            customColumns={columns.reportsQueue({
              licenseInfo: getLicenseInfo({ licenses, companies }),
              addPrefix: addPrefix('TR')
            })}
            dataSource={dataSource}
          />
        </Layer>
      </PageSection>
    );
  }
}

const mapStateToProps = state => ({
  value: taxReconcilliationFiltersSelectors.getEntity(state),
  data: taxReconcilliationListSelectors.getEntity(state),
  companies: companyListSelectors.getEntity(state),
  licenses: licenseListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onToggle: taxReconcilliationFiltersActions.value.toggle,
  onRead: taxReconcilliationListActions.read.call,
  onSet: taxReconcilliationFiltersActions.value.set
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaxReconcilliationPage);
