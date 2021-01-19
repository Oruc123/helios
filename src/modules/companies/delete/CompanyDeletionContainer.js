import { CompanyDeletion } from 'components/CompanyDeletion';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { companyListSelectors } from 'modules/companies/list';
import { companyDeletionActions, companyDeletionSelectors } from './companyDeletion';

const mapStateToProps = (state, props) => {
  const { params } = props.match;

  return {
    companyId: +params.id,
    companies: companyListSelectors.getEntity(state),
    value: companyDeletionSelectors.getEntity(state)
  };
};

const mapDispatchToProps = createDispatchers({
  onChange: companyDeletionActions.value.set,
  onSubmit: companyDeletionActions.delete.call
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDeletion);
