import { DocumentsDueFilterPanel } from 'components/DocumentsDue';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { documentsDueFiltersActions, documentsDueFiltersSelectors } from './documentsDueFilters';
import { documentsDueListActions } from '../documentsDueList';

const mapStateToProps = state => ({
  value: documentsDueFiltersSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onToggle: documentsDueFiltersActions.value.toggle,
  onRead: documentsDueListActions.read.call,
  onSet: documentsDueFiltersActions.value.set
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsDueFilterPanel);
