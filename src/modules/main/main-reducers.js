import { List } from 'immutable';
import { MainModel } from 'components/Main/MainModel';

import { MAIN_COLLAPSE_BAR, MAIN_EXPAND_BAR, MAIN_TOGGLE_BAR } from './main-constants';
import menuItems from './main-menu-items';

export const mainInitialState = new MainModel({ barMinimized: false, menuItems: List(menuItems) });

export const mainReducer = (state = mainInitialState, action) => {
  switch (action.type) {
    case MAIN_COLLAPSE_BAR:
      return state.set('barMinimized', true);
    case MAIN_EXPAND_BAR:
      return state.set('barMinimized', false);
    case MAIN_TOGGLE_BAR:
      return state.set('barMinimized', !state.get('barMinimized'));
    default:
      return state;
  }
};
