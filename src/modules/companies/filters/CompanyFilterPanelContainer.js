import { CompanyFilterPanel } from 'components/CompanyFilters';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { companyFiltersActions, companyFiltersSelectors } from './companyFilters';
import { companyListActions } from '../list';

const mapStateToProps = state => ({
  value: companyFiltersSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onToggle: companyFiltersActions.value.toggle,
  onRead: companyListActions.read.call,
  onSet: companyFiltersActions.value.set
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyFilterPanel);
