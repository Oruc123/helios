import { bool, string } from 'prop-types';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { RouterRoutePropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

export const AuthRoutePropTypes = {
  ...RouterRoutePropTypes,
  authorized: bool.isRequired,
  loginUri: string.isRequired
};

export const AuthRouteDefaultProps = {};

export const AuthRoute = withRouter(
  class AuthRoute extends PureComponent {
    static propTypes = AuthRoutePropTypes;

    static defaultProps = AuthRouteDefaultProps;

    render() {
      const { authorized, loginUri, ...props } = this.props;

      return authorized ? <Route {...filter(props, RouterRoutePropTypes)} /> : <Redirect to={loginUri} />;
    }
  }
);
