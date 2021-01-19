import { connect } from 'react-redux';

import { UserMenu } from 'components/User';
import { logout } from 'modules/auth/logout/actions';
import { AUTH_LOGIN_PATH } from 'modules/auth/constants';
import { authUserSelector } from 'modules/auth/selectors';
import { ACCOUNT_SETTINGS_PATH } from 'modules/accountSettings';

const mapStateToProps = state => ({
  user: authUserSelector(state),
  'settings-to': ACCOUNT_SETTINGS_PATH,
  'logout-to': AUTH_LOGIN_PATH
});

const mapDispatchToProps = dispatch => ({
  'logout-onClick': () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);
