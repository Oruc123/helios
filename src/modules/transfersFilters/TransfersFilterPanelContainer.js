import { TransfersFilterPanel } from 'components/Transfers';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { transfersFiltersActions, transfersFiltersSelectors } from './transfersFilters';
import { transfersListActions } from '../transfersList';

const mapStateToProps = state => ({
  value: transfersFiltersSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onToggle: transfersFiltersActions.value.toggle,
  onRead: transfersListActions.read.call,
  onSet: transfersFiltersActions.value.set
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransfersFilterPanel);
