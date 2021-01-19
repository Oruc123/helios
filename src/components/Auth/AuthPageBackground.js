import { string } from 'prop-types';
import React from 'react';
import bem from 'utils/bem';

import tablet1x from 'assets/auth-tablet@1x.jpg';
import tablet2x from 'assets/auth-tablet@2x.jpg';
import tablet3x from 'assets/auth-tablet@3x.jpg';

import desktop1x from 'assets/auth-desktop@1x.jpg';
import desktop2x from 'assets/auth-desktop@2x.jpg';
import desktop3x from 'assets/auth-desktop@3x.jpg';

import './AuthPageBackground.scss';

const tabletSet = `${tablet1x}, ${tablet2x} 2x, ${tablet3x} 3x`;
const desktopSet = `${desktop1x}, ${desktop2x} 2x, ${desktop3x} 3x`;

export const AuthPageBackgroundPropTypes = {
  className: string
};

export const AuthPageBackgroundDefaultProps = {
  className: null
};

export const AuthPageBackground = ({ className }) => (
  <picture className={bem.block(AuthPageBackground, null, className)}>
    <source srcSet={tabletSet} media="(max-width: 1024px)" />
    <source srcSet={desktopSet} media="(min-width: 1025px)" />
    <img className={bem.element(AuthPageBackground, 'image')} src={desktop1x} alt="background" />
  </picture>
);

AuthPageBackground.className = 'AuthPageBackground';
AuthPageBackground.propTypes = AuthPageBackgroundPropTypes;
AuthPageBackground.defaultProps = AuthPageBackgroundDefaultProps;
