import { List, Record } from 'immutable';

export const MainRecord = Record({
  barMinimized: false,
  menuItems: List()
});

export class MainModel extends MainRecord {}
