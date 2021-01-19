import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { RelationshipsPage } from 'components/Relationships';
import { companyListPaths, companyListSelectors } from 'modules/companies/list';

const mapStateToProps = state => ({
  paths: companyListPaths,
  value: companyListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationshipsPage);
