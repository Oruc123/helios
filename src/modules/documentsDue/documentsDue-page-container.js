import { connect } from 'react-redux';
import { DocumentsDuePage } from 'components/DocumentsDue';
import { licenseListSelectors } from 'modules/licenses/list';
import { companyListSelectors } from '../companies/list';
import { documentsDueListSelectors } from '../documentsDueList';

const mapStateToProps = state => ({
  licenses: licenseListSelectors.getEntity(state),
  companies: companyListSelectors.getEntity(state),
  value: documentsDueListSelectors.getEntity(state)
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentsDuePage);
