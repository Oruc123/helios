import React from 'react';
import { connect } from 'react-redux';
import { Layer } from 'components/Layer';
import { Table } from 'components/Table';
import { PageSection, PageDefaultProps, PagePropTypes } from 'components/Page';
import { Search } from 'components/Search';
import { columns } from 'components/Alerts/data';
import { createDispatchers } from 'utils/redux';
import { AnnualReviewFilterPanel } from 'components/Alerts';
import { addPrefix, getCompanyInfo } from 'utils/common';
import { companyListSelectors } from '../companies/list';
import { annualReviewListActions, annualReviewListSelectors } from '../annualReviewList';
import { annualReviewFiltersActions, annualReviewFiltersSelectors } from './annualReviewFilters';

export const AnnualReviewPagePropTypes = {
  ...PagePropTypes
};

export const AnnualReviewPageDefaultProps = {
  ...PageDefaultProps
};

class AnnualReviewPage extends React.PureComponent {
  static propTypes = {
    ...AnnualReviewPagePropTypes
  };

  static defaultProps = {
    ...AnnualReviewPageDefaultProps
  };

  static className = 'AnnualReviewPage';

  render() {
    const { data, companies, ...props } = this.props;
    const dataSource = [...data.getValue().values()];
    return (
      <PageSection title="Annual Reviews" actions={<Search />}>
        <Layer rounded shadowed>
          <AnnualReviewFilterPanel {...props} companies={companies} />
          <Table
            loading={data.isPending()}
            locale={{ emptyText: dataSource?.length === 0 ? 'No data' : 'No results found' }}
            customColumns={columns.annualReviewsApproval({
              companyInfo: getCompanyInfo({ companies }),
              addPrefix: addPrefix('AR')
            })}
            dataSource={dataSource}
          />
        </Layer>
      </PageSection>
    );
  }
}

const mapStateToProps = state => ({
  value: annualReviewFiltersSelectors.getEntity(state),
  data: annualReviewListSelectors.getEntity(state),
  companies: companyListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onToggle: annualReviewFiltersActions.value.toggle,
  onRead: annualReviewListActions.read.call,
  onSet: annualReviewFiltersActions.value.set
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnualReviewPage);
