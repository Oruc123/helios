# Form

---

## Usage

At first you need to create form model:

```js
// file: LoginFormModel.js

import { FormModelFactory, FormModelField } from 'modules/form/model';

export const LoginFormFields = {
  username: new FormModelField('user', value => (value === '' ? new Error('Username is required') : null)),
  password: new FormModelField('password', value => (value === '' ? new Error() : null))
};

export const LoginFormModel = FormModelFactory(LoginFormFields);
```

Then create actions, reducer and sagas:

```js
// file: LoginFormActionTypes.js

export const LOGIN_FORM_UPDATE = 'LOGIN_FORM/UPDATE';
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM/SUBMIT';
export const LOGIN_FORM_SUBMIT_SUCCESS = 'LOGIN_FORM/SUBMIT_SUCCESS';
```

```js
// file: LoginFormActions.js

import { LOGIN_FORM_UPDATE, LOGIN_FORM_SUBMIT, LOGIN_FORM_SUBMIT_SUCCESS } from './LoginFormActionTypes';

export const loginFormUpdate = payload => ({
  type: LOGIN_FORM_UPDATE,
  payload
});

export const loginFormSubmit = payload => ({
  type: LOGIN_FORM_SUBMIT,
  payload
});

export const loginFormSubmitSuccess = () => ({
  type: LOGIN_FORM_SUBMIT_SUCCESS
});
```

```js
// file: LoginFormReducer.js

import { LOGIN_FORM_UPDATE, LOGIN_FORM_SUBMIT, LOGIN_FORM_SUBMIT_SUCCESS } from './LoginFormActionTypes';
import { LoginFormModel } from './LoginFormModel';

export default (state = new LoginFormModel(), action) => {
  switch (action.type) {
    case LOGIN_FORM_UPDATE:
      return action.payload;
    case LOGIN_FORM_SUBMIT:
      return action.payload.pending();
    case LOGIN_FORM_SUBMIT_SUCCESS:
      return state.ready();
    default:
      return state;
  }
};
```

```js
// file: LoginFormSagas.js

import { put, takeEvery } from 'redux-saga/effects';

import { loginFormSubmitSuccess } from './LoginFormActions';
import { LOGIN_FORM_SUBMIT } from './LoginFormActionTypes';

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* loginFormSubmitSaga() {
  // here should be API call
  yield delay(1000);
  yield put(loginFormSubmitSuccess());
}

export function* loginFormSaga() {
  yield takeEvery(LOGIN_FORM_SUBMIT, loginFormSubmitSaga);
}
```

And now create form

```js
// file: LoginForm.js

import { Icon } from 'components/Icon';
import { func, instanceOf } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'modules/bem';
import { withForm } from write;
import { FormPropTypes } from 'utils/prop-types';
import { filter } from 'utils/props';

import { LoginFormModel } from './LoginFormModel';

export const LoginFormPropTypes = {
  Field: func.isRequired,
  value: instanceOf(LoginFormModel).isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired
};

export const LoginForm = withForm(
  class extends PureComponent {
    static displayName = 'LoginForm';

    static className = 'LoginForm';

    static propTypes = LoginFormPropTypes;

    render() {
      const { Field, value, ...props } = this.props;

      return (
        <form {...filter(props, FormPropTypes)} autoComplete="off" className={bem.block(this)}>
          <Field
            name="username"
            input="input"
            input-id="login-username"
            input-type="text"
            input-autoComplete="off"
            input-className={bem.element(this, 'input')}
            label="Username"
            label-htmlFor="login-username"
            message="username or email"
          />
          <Field
            name="password"
            input="input"
            input-id="login-password"
            input-type="password"
            input-autoComplete="new-password"
            input-className={bem.element(this, 'input')}
            label="Password"
            label-htmlFor="login-password"
          />
          <div className={bem.element(this, 'buttons')}>
            <button type="submit" className={bem.element(this, 'submit')}>
              {value.isPending() ? <Icon type="loading" style={{ fontSize: 32 }} /> : 'Submit'}
            </button>
          </div>
        </form>
      );
    }
  }
);
```

Connect form to store

```js
// file: LoginFormContainer.js

import { connect } from 'react-redux';

import { LoginForm } from './LoginForm';
import { loginFormUpdate, loginFormSubmit } from './LoginFormActions';

const mapStateToProps = value => ({
  value
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(loginFormUpdate(value)),
  onSubmit: value => dispatch(loginFormSubmit(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
```

```js
// file: index.js

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import LoginForm from './LoginFormContainer';
import LoginFormReducer from './LoginFormReducer';
import { loginFormSaga } from './LoginFormSagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(LoginFormReducer, sagaMiddleware);

sagaMiddleware.run(loginFormSaga);

render(
  <Provider store={store}>
    <LoginForm />
  </Provider>,
  document.getElementById('app')
);
```

### Example
