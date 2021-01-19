import { UserListPage } from 'components/UserList';
import { connect } from 'react-redux';
import { createDispatchers } from 'utils/redux';
import { userListActions, userListPaths, userListSelectors } from './userList';

const mapStateToProps = state => ({
  paths: userListPaths,
  value: userListSelectors.getEntity(state)
});

const mapDispatchToProps = createDispatchers({
  onRead: userListActions.read.call,
  onReadAbort: userListActions.read.abort
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListPage);
