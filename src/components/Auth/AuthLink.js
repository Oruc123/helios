import React, { PureComponent } from 'react';

import { Link } from 'components/Link';
import bem from 'utils/bem';
import { ButtonPropTypes } from 'components/Button';
import './AuthLink.scss';

export const AuthLinkPropTypes = {
  ...ButtonPropTypes
};

export const AuthLinkDefaultProps = {
  error: null
};

export class AuthLink extends PureComponent {
  static propTypes = AuthLinkPropTypes;

  static defaultProps = AuthLinkDefaultProps;

  static className = 'AuthLink';

  render() {
    const { type, ...props } = this.props;

    return <Link {...props} className={bem.block(this)} />;
  }
}
