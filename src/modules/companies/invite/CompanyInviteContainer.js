import { CompanyInvite } from 'components/CompanyInvite';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { companyInviteActions, companyInviteSelectors } from './companyInvite';
import { companyDetailsSelectors } from '../details';

const mapStateToProps = (state, props) => {
  const { params } = props.match;
  const entity = companyDetailsSelectors.getEntity(state);
  const value = entity.getValue();

  return {
    companyId: +params.id,
    companyDetails: Array.isArray(value) && value.length === 1 ? value[0] : {},
    isPending: entity.isPending(),
    value: companyInviteSelectors.getEntity(state)
  };
};

const mapDispatchToProps = createDispatchers({
  onChange: companyInviteActions.value.set,
  onSubmit: companyInviteActions.write.call
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyInvite);
