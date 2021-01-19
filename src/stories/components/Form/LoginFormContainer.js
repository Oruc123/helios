import { connect } from 'react-redux';

import { LoginForm } from './LoginForm';
import { loginFormUpdate, loginFormSubmit } from './LoginFormActions';

const mapStateToProps = value => ({
  value
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(loginFormUpdate(value)),
  onSubmit: value => dispatch(loginFormSubmit(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
