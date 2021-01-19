import { APP_LOGIN, APP_LOGOUT } from 'modules/app/app-constants';
import { AppModel } from 'modules/app/app-model';
import { createReducer } from 'utils/redux';

export default createReducer({
  initialState: new AppModel(),
  actions: {
    [APP_LOGIN]: (state, payload) => state.set('user', payload),
    [APP_LOGOUT]: state => state.set('user', null)
  }
});
