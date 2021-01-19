import { bool } from 'prop-types';
import React, { PureComponent } from 'react';

import { Button, ButtonDefaultProps, ButtonPropTypes } from 'components/Button';
import bem from 'utils/bem';

import './MainBarButton.scss';
import { Icon } from 'components/Icon';

export const MainBarButtonPropTypes = {
  ...ButtonPropTypes,
  minimized: bool
};

export const MainBarButtonDefaultProps = {
  ...ButtonDefaultProps
};

export class MainBarButton extends PureComponent {
  static propTypes = MainBarButtonPropTypes;

  static defaultProps = MainBarButtonDefaultProps;

  static className = 'MainBarButton';

  render() {
    const { minimized, ...props } = this.props;

    // noinspection RequiredAttributes
    return (
      <Button
        {...props}
        face="link"
        icon={minimized ? 'menu-minimized' : 'menu'}
        size={Button.SIZE_MEDIUM}
        icon-size={Icon.SIZE_LARGE}
        icon-className={bem.element(this, 'icon', { minimized }, props['icon-className'])}
        className={bem.block(this, { minimized })}
      />
    );
  }
}
