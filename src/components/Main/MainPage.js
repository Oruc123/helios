import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import { MainBar, MainBarDefaultProps, MainBarPropTypes } from './MainBar';
import { MainHeader, MainHeaderDefaultProps, MainHeaderPropTypes } from './MainHeader';
import { MainMenu, MainMenuDefaultProps, MainMenuItemsType, MainMenuPropTypes } from './MainMenu';

import './MainPage.scss';

export const MainPagePropTypes = {
  ...ElementPropTypes,
  ...prefixBy('bar', MainBarPropTypes),
  ...prefixBy('header', MainHeaderPropTypes),
  ...prefixBy('menu', { ...MainMenuPropTypes, items: MainMenuItemsType })
};

export const MainPageDefaultProps = {
  ...prefixBy('bar', MainBarDefaultProps),
  ...prefixBy('header', MainHeaderDefaultProps),
  ...prefixBy('menu', { ...MainMenuDefaultProps, items: null })
};

export class MainPage extends PureComponent {
  static propTypes = MainPagePropTypes;

  static defaultProps = MainPageDefaultProps;

  static className = 'MainPage';

  renderMenu() {
    const { minimized } = prefixed(this.props, 'bar');
    const { items, ...menuProps } = prefixed(this.props, 'menu');

    if (items) {
      return (
        <MainMenu
          {...filter(menuProps, MainMenuPropTypes)}
          items={items}
          minimized={minimized}
          className={bem.element(this, 'menu')}
        />
      );
    }

    return null;
  }

  renderBar() {
    const { menu, ...props } = this.props;

    return (
      <MainBar {...filter(prefixed(props, 'bar'), MainBarPropTypes)} className={bem.element(this, 'bar')}>
        {this.renderMenu()}
      </MainBar>
    );
  }

  renderHeader() {
    return (
      <MainHeader
        {...filter(prefixed(this.props, 'header'), MainHeaderPropTypes)}
        className={bem.element(this, 'header')}
      />
    );
  }

  render() {
    const { children, ...props } = this.props;
    const { minimized: barMinimized } = prefixed(props, 'bar');

    return (
      <div {...filter(unprefixed(props), ElementPropTypes)} className={bem.block(this, { barMinimized })}>
        {this.renderHeader()}
        {this.renderBar()}
        <div className={bem.element(this, 'content')}>{children}</div>
      </div>
    );
  }
}
