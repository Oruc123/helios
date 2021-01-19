import { connect } from 'react-redux';

import { UserProvider } from 'components/User';
import { authAccessTokenSelector, authUserSelector } from 'modules/auth/selectors';
import { getUser } from 'modules/auth/user/actions';

const mapStateToProps = state => ({
  accessToken: authAccessTokenSelector(state),
  user: authUserSelector(state)
});

const mapDispatchToProps = dispatch => ({
  userInfo: payload => dispatch(getUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProvider);
