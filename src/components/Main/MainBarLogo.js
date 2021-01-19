import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import 'components/Main/MainBarLogo.scss';
import { Link, LinkDefaultProps, LinkPropTypes } from 'components/Link';
import { filter } from 'utils/props';

export const MainBarLogoPropTypes = {
  ...LinkPropTypes
};

export const MainBarLogoDefaultProps = {
  ...LinkDefaultProps,
  to: '/',
  children: 'HELIOS'
};

export class MainBarLogo extends PureComponent {
  static propTypes = MainBarLogoPropTypes;

  static defaultProps = MainBarLogoDefaultProps;

  static className = 'MainBarLogo';

  render() {
    const { children, ...props } = this.props;

    return (
      <Link {...filter(props, LinkPropTypes)} className={bem.block(this)}>
        {children}
      </Link>
    );
  }
}
