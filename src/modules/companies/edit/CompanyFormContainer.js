import { CompanyForm } from 'components/CompanyForm';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { companyFormActions, companyFormSelectors } from './companyForm';

const mapStateToProps = state => ({
  value: companyFormSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onChange: companyFormActions.value.set,
  onSubmit: companyFormActions.write.call
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyForm);
