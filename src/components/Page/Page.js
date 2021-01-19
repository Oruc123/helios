import { node, oneOf, bool } from 'prop-types';
import React, { PureComponent } from 'react';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, withRefProps } from 'utils/props';
import { Sized } from '../Sized';
import { Spinner } from '../Spinner';

import './Page.scss';

const FACE_PRIMARY = 'primary';
const FACE_SECONDARY = 'secondary';
const FACES = [FACE_PRIMARY, FACE_SECONDARY];

// eslint-disable-next-line import/prefer-default-export
export const [Page, PagePropTypes, PageDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } headerRef
   * @property { React.Ref } actionsRef
   * @property { React.Ref } titleRef
   */
  class Page extends PureComponent {
    static className = 'Page';

    static propTypes = {
      ...prefixBy('actions', ElementPropTypes),
      ...prefixBy('content', ElementPropTypes),
      ...prefixBy('footer', ElementPropTypes),
      ...prefixBy('header', ElementPropTypes),
      ...prefixBy('title', ElementPropTypes),
      ...prefixBy('subTitle', ElementPropTypes),
      actions: node,
      children: node,
      face: oneOf(FACES),
      footer: node,
      subTitle: node,
      title: node,
      isPending: bool
    };

    static defaultProps = {
      actions: undefined,
      children: undefined,
      face: FACE_PRIMARY,
      footer: undefined,
      subTitle: undefined,
      title: undefined,
      isPending: false
    };

    static refProps = ['header', 'actions', 'title'];

    renderTitle() {
      const { actions, face, subTitle, title, children, ...props } = this.props;
      const titleProps = prefixed(props, 'title');

      return (
        <h1
          {...filter(titleProps, ElementPropTypes)}
          ref={this.titleRef}
          className={bem.element(this, 'title', face, titleProps.className)}
        >
          {title}
        </h1>
      );
    }

    renderSubTitle() {
      const { actions, face, subTitle, title, children, ...props } = this.props;
      const subTitleProps = prefixed(props, 'subTitle');

      return (
        <h2
          {...filter(subTitleProps, ElementPropTypes)}
          ref={this.titleRef}
          className={bem.element(this, 'subTitle', face, subTitleProps.className)}
        >
          {subTitle}
        </h2>
      );
    }

    renderActions() {
      const { actions, face, title, subTitle, children, ...props } = this.props;

      if (actions) {
        const actionProps = prefixed(props, 'actions');

        return (
          <div
            {...filter(actionProps, ElementPropTypes)}
            ref={this.actionsRef}
            className={bem.element(this, 'actions', face, actionProps.className)}
          >
            {actions}
          </div>
        );
      }

      return null;
    }

    renderHeader() {
      const { actions, face, subTitle, title, children, ...props } = this.props;
      const headerProps = prefixed(props, 'header');

      return (
        <header
          {...filter(headerProps, ElementPropTypes)}
          ref={this.headerRef}
          className={bem.element(this, 'header', face, headerProps.className)}
        >
          <div className={bem.element(this, 'caption')}>
            {this.renderTitle()}
            {this.renderSubTitle()}
          </div>
          {this.renderActions()}
        </header>
      );
    }

    renderContent() {
      const { actions, face, subTitle, title, children, isPending, ...props } = this.props;
      const contentProps = prefixed(props, 'content');

      return (
        <div
          {...filter(contentProps, ElementPropTypes)}
          className={bem.element(this, 'content', face, contentProps.className)}
        >
          {isPending && <Spinner centered className={bem.element(this, 'spinner')} size={Sized.SIZE_MEDIUM} />}
          {children}
          <div id="dropdown-container" />
        </div>
      );
    }

    renderFooter() {
      const { footer, face, ...props } = this.props;

      if (footer) {
        const footerProps = prefixed(props, 'header');

        return (
          <footer
            {...filter(footerProps, ElementPropTypes)}
            ref={this.headerRef}
            className={bem.element(this, 'footer', face, footerProps.className)}
          >
            {footer}
          </footer>
        );
      }

      return null;
    }

    render() {
      const { actions, face, footer, subTitle, title, children, ...props } = this.props;

      return (
        <main {...filter(props, ElementPropTypes)} className={bem.block(this, face)}>
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderFooter()}
        </main>
      );
    }
  }
);

Page.FACE_PRIMARY = FACE_PRIMARY;
Page.FACE_SECONDARY = FACE_SECONDARY;
Page.FACES = FACES;
