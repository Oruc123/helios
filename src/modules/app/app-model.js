import { Record } from 'immutable';

export const AppRecord = Record({
  user: null
});

export class AppModel extends AppRecord {
  get isLoggedIn() {
    return this.user !== null;
  }
}
