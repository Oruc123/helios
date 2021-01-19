import * as React from 'react';
import { useSelector } from 'react-redux';
import { AuthRoute } from 'components/Auth';
import { AUTH_LOGIN_PATH } from 'modules/auth/constants';
import { authAccessTokenSelector } from 'modules/auth/selectors';

const authorizedContainer = (properties: any) => {
  const authorized = useSelector(authAccessTokenSelector) !== null;

  return(<AuthRoute
    {...properties}
    authorized={authorized}
    loginUri={AUTH_LOGIN_PATH}
  />);
};

export {
  authorizedContainer as AuthRoutePage,
};
