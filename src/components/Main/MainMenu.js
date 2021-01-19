import { arrayOf, bool, shape } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';

import { MainMenuItem, MainMenuItemPropTypes } from 'components/Main/MainMenuItem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import './MainMenu.scss';

export const MainMenuItemsType = arrayOf(shape(MainMenuItemPropTypes));

export const MainMenuPropTypes = {
  ...ElementPropTypes,
  items: MainMenuItemsType.isRequired,
  minimized: bool
};

export const MainMenuDefaultProps = {
  minimized: false
};

export class MainMenu extends PureComponent {
  static propTypes = MainMenuPropTypes;

  static defaultProps = MainMenuDefaultProps;

  static className = 'MainMenu';

  render() {
    const { items, minimized, ...props } = this.props;

    // noinspection RequiredAttributes
    return (
      <nav {...filter(props, ElementPropTypes)} className={bem.block(this, { minimized })}>
        {items.map(item => (
          <MainMenuItem key={item.to} {...item} minimized={minimized} />
        ))}
      </nav>
    );
  }
}
