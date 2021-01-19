import { node } from 'prop-types';
import React from 'react';
import bem from 'utils/bem';

import { AuthPageBackground } from './AuthPageBackground';

import './AuthPage.scss';

export const AuthPagePropTypes = {
  children: node
};

export const AuthPageDefaultProps = {
  children: null
};

export const AuthPage = ({ children }) => (
  <div className={bem.block(AuthPage)}>
    <AuthPageBackground className={bem.element(AuthPage, 'background')} />
    {children}
  </div>
);

AuthPage.className = 'AuthPage';
AuthPage.propTypes = AuthPagePropTypes;
AuthPage.defaultProps = AuthPageDefaultProps;
