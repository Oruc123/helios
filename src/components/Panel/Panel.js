import { bool, func, node, oneOf } from 'prop-types';
import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed, withControlledProps, withRefProps } from 'utils/props';

import './Panel.scss';
import { Icon } from 'components/Icon';
import { SPRITE_MINUS, SPRITE_PLUS } from 'sprites';

const FACE_PRIMARY = 'primary';
const FACE_SECONDARY = 'secondary';
const FACES = [FACE_PRIMARY, FACE_SECONDARY];

export const [ControlledPanel, ControlledPanelPropTypes, ControlledPanelDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } actionsRef
   * @property { React.Ref } contentRef
   * @property { React.Ref } headerRef
   * @property { React.Ref } selfRef
   * @property { React.Ref } titleRef
   */
  class Panel extends PureComponent {
    static className = 'Panel';

    static propTypes = {
      ...prefixBy('actions', ElementPropTypes),
      ...prefixBy('title', ElementPropTypes),
      ...prefixBy('header', ElementPropTypes),
      ...prefixBy('content', ElementPropTypes),
      actions: node,
      children: node,
      expanded: bool,
      face: oneOf(FACES),
      title: node,
      onExpandedChange: func,
      collapsible: bool
    };

    static defaultProps = {
      actions: undefined,
      children: undefined,
      expanded: true,
      face: FACE_PRIMARY,
      title: undefined,
      onExpandedChange: undefined,
      collapsible: true
    };

    static refProps = ['actions', 'content', 'header', 'self', 'title'];

    static controlledProps = {
      expanded: { onChangeProp: 'onExpandedChange' }
    };

    handleToggleClick = () => {
      const { expanded, onExpandedChange } = this.props;

      if (typeof onExpandedChange === 'function') {
        onExpandedChange(!expanded);
      }
    };

    renderTitle() {
      const { actions, children, face, title, ...props } = this.props;
      const titleProps = prefixed(props, 'title');

      return (
        <h1
          {...filter(titleProps, ElementPropTypes)}
          ref={this.titleRef}
          className={bem.element(this, 'title', { [face]: !!face }, titleProps.className)}
        >
          {title}
        </h1>
      );
    }

    renderActions() {
      const { actions, children, expanded, face, title, ...props } = this.props;

      if (actions) {
        const actionsProps = prefixed(props, 'actions');
        const className = bem.element(this, 'actions', { [face]: !!face, hidden: !expanded }, actionsProps.className);

        return (
          <div {...filter(actionsProps, ElementPropTypes)} ref={this.actionsRef} className={className}>
            {actions}
          </div>
        );
      }

      return null;
    }

    renderHeader() {
      const { actions, children, expanded, face, title, collapsible, ...props } = this.props;
      const headerProps = prefixed(props, 'header');

      return (
        <header
          {...filter(headerProps, ElementPropTypes)}
          ref={this.headerRef}
          className={bem.element(this, 'header', { expanded, [face]: !!face }, headerProps.className)}
        >
          {collapsible && (
            <Icon
              type={expanded ? SPRITE_MINUS : SPRITE_PLUS}
              className={bem.element(this, 'toggle', { [face]: !!face })}
              onClick={this.handleToggleClick}
            />
          )}
          {this.renderTitle()}
          {this.renderActions()}
        </header>
      );
    }

    renderContent() {
      const { actions, children, expanded, face, title, ...props } = this.props;
      const contentProps = prefixed(props, 'content');

      return (
        <div className={bem.element(this, 'contentTransition')}>
          <CSSTransition in={expanded} timeout={200} unmountOnExit classNames={bem.element(this, 'contentTransition')}>
            <div
              {...filter(contentProps, ElementPropTypes)}
              ref={this.contentRef}
              className={bem.element(this, 'content', { [face]: !!face }, contentProps.className)}
            >
              {children}
            </div>
          </CSSTransition>
        </div>
      );
    }

    render() {
      const { actions, children, expanded, face, title, ...props } = this.props;

      return (
        <section
          {...filter(unprefixed(props, 'actions', 'content', 'header', 'title'), ElementPropTypes)}
          ref={this.selfRef}
          className={bem.block(this, { expanded, [face]: !!face })}
        >
          {this.renderHeader()}
          {this.renderContent()}
        </section>
      );
    }
  }
);

ControlledPanel.FACE_PRIMARY = FACE_PRIMARY;
ControlledPanel.FACE_SECONDARY = FACE_SECONDARY;
ControlledPanel.FACES = FACES;

export const [Panel, PanelPropTypes, PanelDefaultProps] = withControlledProps(ControlledPanel);

Panel.FACE_PRIMARY = FACE_PRIMARY;
Panel.FACE_SECONDARY = FACE_SECONDARY;
Panel.FACES = FACES;
