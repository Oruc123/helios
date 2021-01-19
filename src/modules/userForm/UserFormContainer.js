import { UserForm } from 'components/UserForm';
import { userListSelectors } from 'modules/userList';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { userFormActions, userFormSelectors } from './userForm';

const mapStateToProps = (state, props) => {
  const { params } = props.match;

  return {
    userId: params.userId,
    users: userListSelectors.getEntity(state),
    value: userFormSelectors.getEntity(state)
  };
};

const mapDispatchToProps = createDispatchers({
  onChange: userFormActions.value.set,
  onSubmit: userFormActions.write.call
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
