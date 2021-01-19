import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { licenseListSelectors } from 'modules/licenses/list';
import { companyListSelectors } from 'modules/companies/list';
import { InternalTransferPage } from './components/InternalTransferPage';
import { internalTransferActions } from './actions';
import internalTransferSelector from './selectors';

const mapStateToProps = (state, props) => {
  const { params } = props.match;

  return {
    transferId: +params.id,
    licenses: licenseListSelectors.getEntity(state),
    companies: companyListSelectors.getEntity(state),
    ...internalTransferSelector(state)
  };
};

const mapDispatchToProps = createDispatchers({
  onRead: internalTransferActions.read.call
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalTransferPage);
