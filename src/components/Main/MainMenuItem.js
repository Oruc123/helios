import { bool } from 'prop-types';
import React, { PureComponent } from 'react';

import { Icon } from 'components/Icon';
import { Link, LinkDefaultProps, LinkPropTypes } from 'components/Link';
import { withRouted } from 'components/Routed';
import bem from 'utils/bem';

import './MainMenuItem.scss';

export const MainMenuItemPropTypes = {
  ...LinkPropTypes,
  minimized: bool
};

export const MainMenuItemDefaultProps = {
  ...LinkDefaultProps,
  minimized: false
};

export const MainMenuItem = withRouted(
  class MainMenuItem extends PureComponent {
    static propTypes = {
      ...MainMenuItemPropTypes
    };

    static defaultProps = {
      ...MainMenuItemDefaultProps
    };

    static className = 'MainMenuItem';

    render() {
      const { active, children, minimized, ...props } = this.props;

      return (
        <Link
          {...props}
          active={active}
          className={bem.block(this, { minimized, active })}
          icon-className={bem.element(this, 'icon', { minimized, active })}
          icon-face={active ? Icon.FACE_ACTIVE : Icon.FACE_DEFAULT}
          icon-bordered={!active}
        >
          <span className={bem.element(this, 'label', { minimized, active })}>{children}</span>
        </Link>
      );
    }
  }
);
