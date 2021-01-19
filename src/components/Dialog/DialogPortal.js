import { element, number } from 'prop-types';
import React, { Children, cloneElement, PureComponent } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Portal, PortalPropTypes } from 'components/Portal';
import bem from 'utils/bem';
import { UnrequiredType } from 'utils/prop-types';
import { filter } from 'utils/props';

import './DialogPortal.scss';

export const DialogPortalPropTypes = {
  ...PortalPropTypes,
  rootId: UnrequiredType(PortalPropTypes.rootId),
  timeout: number,
  children: element
};

export const DialogPortalDefaultProps = {
  children: undefined,
  timeout: 300,
  rootId: ''
};

export class DialogPortal extends PureComponent {
  static className = 'DialogPortal';

  static propTypes = {
    ...DialogPortalPropTypes
  };

  static defaultProps = {
    ...DialogPortalDefaultProps
  };

  renderElement(element) {
    const { style } = element.props;
    const { timeout } = this.props;

    return (
      <CSSTransition timeout={timeout} classNames={bem.element(this, 'dialog')}>
        {cloneElement(element, {
          className: bem.element(this, 'dialog'),
          style: { ...style, transitionDuration: `${timeout}ms` }
        })}
      </CSSTransition>
    );
  }

  render() {
    const { children, rootId, style, timeout, ...props } = this.props;

    return (
      <Portal
        {...filter(props, PortalPropTypes)}
        rootId={`dialog${rootId}`}
        className={bem.block(this, { hidden: !children })}
        style={{ ...style, transitionDuration: `${timeout}ms` }}
      >
        <TransitionGroup component={null} className={bem.element(this, 'dialogs')}>
          {children ? this.renderElement(Children.only(children)) : null}
        </TransitionGroup>
      </Portal>
    );
  }
}
