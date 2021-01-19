/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { bool, func, node, number, oneOf, string } from 'prop-types';
import React, { PureComponent } from 'react';

import { Icon } from 'components/Icon';
import { SPRITE_CLEAR } from 'sprites';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed, withControlledProps, withRefProps } from 'utils/props';

import { DialogPortal } from './DialogPortal';
import { Sized } from '../Sized';
import { Spinner } from '../Spinner';
import './Dialog.scss';

const FACE_PRIMARY = 'primary';
const FACE_SECONDARY = 'secondary';
const FACES = [FACE_PRIMARY, FACE_SECONDARY];

export const [ControlledDialog, ControlledDialogPropTypes, ControlledDialogDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } actionsRef
   * @property { React.Ref } closeRef
   * @property { React.Ref } contentRef
   * @property { React.Ref } headerRef
   * @property { React.Ref } selfRef
   * @property { React.Ref } titleRef
   */
  class Dialog extends PureComponent {
    static className = 'Dialog';

    static propTypes = {
      ...ElementPropTypes,
      ...prefixBy('actions', ElementPropTypes),
      ...prefixBy('content', ElementPropTypes),
      ...prefixBy('close', ElementPropTypes),
      ...prefixBy('header', ElementPropTypes),
      ...prefixBy('title', ElementPropTypes),
      ...prefixBy('subTitle', ElementPropTypes),
      actions: node,
      children: node,
      face: oneOf(FACES),
      rootId: string,
      timeout: number,
      subTitle: node,
      title: node,
      isPending: bool,
      visible: bool,
      onVisibleChange: func
    };

    static defaultProps = {
      actions: undefined,
      children: undefined,
      face: FACE_PRIMARY,
      rootId: '',
      timeout: 300,
      subTitle: undefined,
      title: undefined,
      isPending: false,
      visible: true,
      onVisibleChange: undefined
    };

    static refProps = ['actions', 'close', 'content', 'header', 'self', 'title'];

    static controlledProps = {
      visible: {}
    };

    handleCloseClick = () => {
      const { onVisibleChange } = this.props;

      if (typeof onVisibleChange === 'function') {
        onVisibleChange(false);
      }
    };

    renderClose() {
      const { actions, children, face, title, ...props } = this.props;
      const closeProps = prefixed(props, 'close');
      const className = bem.element(this, 'close', { [face]: !!face }, closeProps.className);

      return (
        <Icon
          {...filter(closeProps, ElementPropTypes)}
          ref={this.closeRef}
          type={SPRITE_CLEAR}
          onClick={this.handleCloseClick}
          className={className}
        />
      );
    }

    renderTitle() {
      const { actions, children, face, title, ...props } = this.props;
      const titleProps = prefixed(props, 'title');
      const className = bem.element(this, 'title', { [face]: !!face }, titleProps.className);

      return (
        <h1 {...filter(titleProps, ElementPropTypes)} ref={this.titleRef} className={className}>
          {title}
        </h1>
      );
    }

    renderSubTitle() {
      const { actions, face, subTitle, title, children, ...props } = this.props;
      const subTitleProps = prefixed(props, 'subTitle');
      const className = bem.element(this, 'subTitle', face, subTitleProps.className);

      return (
        <h2 {...filter(subTitleProps, ElementPropTypes)} ref={this.titleRef} className={className}>
          {subTitle}
        </h2>
      );
    }

    renderActions() {
      const { actions, children, face, title, ...props } = this.props;
      const actionsProps = prefixed(props, 'actions');
      const className = bem.element(this, 'actions', { [face]: !!face }, actionsProps.className);

      return (
        <div {...filter(actionsProps, ElementPropTypes)} ref={this.actionsRef} className={className}>
          {actions}
          {this.renderClose()}
        </div>
      );
    }

    renderHeader() {
      const { actions, children, face, title, ...props } = this.props;
      const headerProps = prefixed(props, 'header');
      const className = bem.element(this, 'header', { [face]: !!face }, headerProps.className);

      return (
        <header {...filter(headerProps, ElementPropTypes)} ref={this.headerRef} className={className}>
          <div className={bem.element(this, 'caption')}>
            {this.renderTitle()}
            {this.renderSubTitle()}
          </div>
          {this.renderActions()}
        </header>
      );
    }

    renderContent() {
      const { actions, children, face, title, isPending, ...props } = this.props;
      const contentProps = prefixed(props, 'content');
      const className = bem.element(this, 'content', { [face]: !!face }, contentProps.className);

      return (
        <div {...filter(contentProps, ElementPropTypes)} ref={this.contentRef} className={className}>
          {isPending && <Spinner centered className={bem.element(this, 'spinner')} size={Sized.SIZE_MEDIUM} />}
          {children}
        </div>
      );
    }

    handleClick = e => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    };

    renderDialog() {
      const { actions, children, face, title, ...props } = this.props;
      const dialogProps = unprefixed(props, 'actions', 'close', 'content', 'header', 'title');

      return (
        <section
          onClick={this.handleClick}
          {...filter(dialogProps, ElementPropTypes)}
          ref={this.selfRef}
          className={bem.block(this, { [face]: !!face })}
        >
          {this.renderHeader()}
          {this.renderContent()}
        </section>
      );
    }

    render() {
      const { visible, ...props } = this.props;
      const dialogPortalProps = unprefixed(props, 'rootId', 'timeout', 'onClick');

      return (
        <DialogPortal onClick={this.handleCloseClick} {...filter(dialogPortalProps, ElementPropTypes)}>
          {visible ? this.renderDialog() : null}
        </DialogPortal>
      );
    }
  }
);

ControlledDialog.FACE_PRIMARY = FACE_PRIMARY;
ControlledDialog.FACE_SECONDARY = FACE_SECONDARY;
ControlledDialog.FACES = FACES;

export const [Dialog, DialogPropTypes, DialogDefaultProps] = withControlledProps(ControlledDialog);

Dialog.FACE_PRIMARY = FACE_PRIMARY;
Dialog.FACE_SECONDARY = FACE_SECONDARY;
Dialog.FACES = FACES;
