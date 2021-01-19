import { instanceOf, object } from 'prop-types';
import React, { PureComponent } from 'react';
import { connect, Provider } from 'react-redux';
import { Router } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import { bundled } from 'components/Bundle';
import { Spinner } from 'components/Spinner';
import { StylesProvider } from 'components/StylesProvider';

import { configDataSelector } from 'modules/config/config-selectors';
import ConfigModel from 'modules/config/model/config-model';
import { AUTH_PATH } from 'modules/auth/constants';
import { AuthRoutePage } from 'modules/auth/authorizedContainer';
import { MAIN_PATH } from 'modules/main/main-constants';
import bem from 'utils/bem';

import './App.scss';

window.addEventListener('DOMContentLoaded', () => {
  const timerId = setInterval(() => {
    const launcher = document.getElementById('launcher');
    if (launcher) {
      launcher.setAttribute('hidden', true);
      window.zE.hide();
      clearInterval(timerId);
    }
  }, 50);
});

// eslint-disable-next-line import/no-webpack-loader-syntax
const AuthPage = bundled(require('bundle-loader?lazy!modules/auth/loginContainer'));
// eslint-disable-next-line import/no-webpack-loader-syntax
const MainPage = bundled(require('bundle-loader?lazy!modules/main/main-page-container'));

const AppPropTypes = {
  store: object.isRequired,
  history: object.isRequired,
  config: instanceOf(ConfigModel)
};

const AppDefaultProps = {
  config: null
};

class App extends PureComponent {
  static propTypes = AppPropTypes;

  static defaultProps = AppDefaultProps;

  static className = 'App';

  renderChildren() {
    const { history, store } = this.props;

    return (
      <Provider store={store}>
        <StylesProvider>
          <Router history={history}>
            <Switch>
              <Route path={AUTH_PATH} component={AuthPage} />
              <AuthRoutePage path={MAIN_PATH} component={MainPage} />
              <Redirect to={MAIN_PATH} />
            </Switch>
          </Router>
        </StylesProvider>
      </Provider>
    );
  }

  render() {
    const { config } = this.props;

    return (
      <div className={bem.block(this)}>
        {config ? this.renderChildren() : <Spinner centered size="medium" className={bem.element(this, 'spinner')} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  config: configDataSelector(state)
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
