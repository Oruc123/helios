import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthPage } from 'components/Auth';
import { LoginPage } from 'modules/auth/login/container';
import { ForgotPasswordPage } from 'modules/auth/forgot/container';
import { NewPasswordPage } from 'modules/auth/newPassword/container';
import { MAIN_PATH } from 'modules/main/main-constants';
import { authAccessTokenSelector } from 'modules/auth/selectors';
import { useSelector } from 'react-redux';
import { AUTH_FORGOT_PATH, AUTH_LOGIN_PATH, AUTH_NEW_PASSWORD_PATH } from './constants';

export default () => {
  const authorized = !!useSelector(authAccessTokenSelector);

  if (authorized) {
    return <Redirect to={MAIN_PATH} />;
  }

  const renderAuthPage = props => (
    <AuthPage {...props}>
      <Switch>
        <Route path={AUTH_LOGIN_PATH} component={LoginPage} />
        <Route path={AUTH_FORGOT_PATH} component={ForgotPasswordPage} />
        <Route path={AUTH_NEW_PASSWORD_PATH} component={NewPasswordPage} />
        <Redirect to={AUTH_LOGIN_PATH} />
      </Switch>
    </AuthPage>
  );

  return (
    <Switch>
      <Route render={renderAuthPage} />
    </Switch>
  );
};
