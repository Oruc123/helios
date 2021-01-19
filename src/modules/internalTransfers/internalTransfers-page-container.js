import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { TransfersPage } from 'components/Transfers';
import { licenseListSelectors } from 'modules/licenses/list';
import { companyListSelectors } from 'modules/companies/list';
import { transfersListSelectors } from '../transfersList';

const mapStateToProps = state => ({
  licenses: licenseListSelectors.getEntity(state),
  companies: companyListSelectors.getEntity(state),
  value: transfersListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransfersPage);
