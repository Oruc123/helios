import { number } from 'prop-types';
import React, { Children, cloneElement, Component, createElement } from 'react';
import { Route, withRouter } from 'react-router';

import { RouterRoutePropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import { Dialog, DialogDefaultProps, DialogPropTypes } from './Dialog';

export const DialogRoutePropTypes = {
  ...RouterRoutePropTypes,
  ...prefixBy('dialog', DialogPropTypes),
  closePath: RouterRoutePropTypes.path.isRequired,
  timeout: number
};

export const DialogRouteDefaultProps = {
  ...prefixBy('dialog', DialogDefaultProps),
  timeout: 300
};

export const DialogRoute = withRouter(
  class DialogRoute extends Component {
    static propTypes = {
      ...DialogRoutePropTypes
    };

    static defaultProps = {
      ...DialogRouteDefaultProps
    };

    state = { visible: false };

    componentDidMount() {
      this.setShowTimeout();
    }

    componentWillUnmount() {
      this.clearHideTimeout();
      this.clearShowTimeout();
    }

    hideTimeout = null;

    showTimeout = null;

    close() {
      const { history, closePath } = this.props;

      setTimeout(() => history.push(closePath));
    }

    open() {
      const { visible } = this.state;

      if (!visible) {
        this.setState({ visible: true });
      }
    }

    handleHideTimeout = () => {
      this.hideTimeout = null;
      this.close();
    };

    setHideTimeout() {
      const { timeout } = this.props;

      this.clearShowTimeout();

      if (!this.hideTimeout) {
        this.hideTimeout = setTimeout(this.handleHideTimeout, timeout);
      }
    }

    clearHideTimeout() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
    }

    handleShowTimeout = () => {
      this.showTimeout = null;
      this.open();
    };

    setShowTimeout() {
      this.clearHideTimeout();

      if (!this.showTimeout) {
        this.showTimeout = setTimeout(this.handleShowTimeout);
      }
    }

    clearShowTimeout() {
      if (this.showTimeout) {
        clearTimeout(this.showTimeout);
        this.showTimeout = null;
      }
    }

    handleDialogVisibleChange = visible => {
      if (visible === false) {
        this.setState({ visible });
        this.setHideTimeout();
      }
    };

    handleComponentClose = () => {
      this.handleDialogVisibleChange(false);
    };

    renderChild = routeProps => {
      const { children, component, render } = this.props;
      const childProps = { ...routeProps, onClose: this.handleComponentClose };
      let child;

      if (component) {
        child = createElement(component, childProps);
      } else if (render) {
        child = render(childProps);
      } else if (typeof children === 'function') {
        child = children(childProps);
      } else if (children && Children.count(children) !== 0) {
        child = cloneElement(React.Children.only(children), childProps);
      }

      return child;
    };

    renderDialog = routeProps => {
      const { visible } = this.state;
      const { timeout, ...props } = this.props;

      return (
        <Dialog
          {...filter(prefixed(props, 'dialog'), DialogPropTypes)}
          visible={visible}
          onVisibleChange={this.handleDialogVisibleChange}
          timeout={timeout}
        >
          {this.renderChild(routeProps)}
        </Dialog>
      );
    };

    render() {
      const { children, component, render, ...props } = this.props;

      return <Route {...filter(unprefixed(props, 'dialog'), RouterRoutePropTypes)} render={this.renderDialog} />;
    }
  }
);
