import { object, node } from 'prop-types';
import React, { Component } from 'react';
import Rollbar from 'rollbar';

export const rollbar = new Rollbar({
  accessToken: '',
  verbose: true,
  captureUncaught: true,
  captureUnhandledRejections: true
});

rollbar.configure({
  enabled: false,
  autoInstrument: false,
  payload: {
    client: {
      javascript: {
        code_version: process.env.CODE_VERSION || undefined,
        source_map_enabled: false
      }
    }
  }
});

if (process.env.NODE_ENV === 'development') {
  rollbar.instrumenter.deinstrumentConnectivity();
  rollbar.instrumenter.deinstrumentConsole();
  rollbar.instrumenter.deinstrumentDom();
  rollbar.instrumenter.deinstrumentNavigation();
  rollbar.instrumenter.deinstrumentNetwork();
}

export class RollbarProvider extends Component {
  static childContextTypes = {
    rollbar: object
  };

  static propTypes = {
    children: node
  };

  static defaultProps = {
    children: null
  };

  getChildContext() {
    return { rollbar };
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withRollbar(WrappedComponent) {
  const WithRollbar = props => <WrappedComponent rollbar={rollbar} {...props} />;

  WithRollbar.displayName = `WithRollbar(${getDisplayName(WrappedComponent)})`;
  WithRollbar.WrappedComponent = WrappedComponent;

  return WithRollbar;
}
