import { node, oneOf } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed, withRefProps } from 'utils/props';

import './PageSection.scss';

const FACE_PRIMARY = 'primary';
const FACE_SECONDARY = 'secondary';
const FACES = [FACE_PRIMARY, FACE_SECONDARY];

// eslint-disable-next-line import/prefer-default-export
export const [PageSection, PageSectionPropTypes, PageSectionDefaultProps] = withRefProps(
  /**
   * @property { React.Ref } headerRef
   * @property { React.Ref } actionsRef
   * @property { React.Ref } titleRef
   */
  class PageSection extends PureComponent {
    static className = 'PageSection';

    static propTypes = {
      ...prefixBy('actions', ElementPropTypes),
      ...prefixBy('content', ElementPropTypes),
      ...prefixBy('header', ElementPropTypes),
      ...prefixBy('title', ElementPropTypes),
      actions: node,
      children: node,
      face: oneOf(FACES),
      title: node
    };

    static defaultProps = {
      actions: undefined,
      children: undefined,
      face: FACE_PRIMARY,
      title: undefined
    };

    static refProps = ['header', 'actions', 'title'];

    renderTitle() {
      const { actions, children, face, title, ...props } = this.props;
      const titleProps = prefixed(props, 'title');

      return (
        <h3
          {...filter(titleProps, ElementPropTypes)}
          ref={this.titleRef}
          className={bem.element(this, 'title', face, titleProps.className)}
        >
          {title}
        </h3>
      );
    }

    renderActions() {
      const { actions, children, face, title, ...props } = this.props;

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
      const { actions, children, face, title, ...props } = this.props;
      const headerProps = prefixed(props, 'header');

      return (
        <header
          {...filter(headerProps, ElementPropTypes)}
          ref={this.headerRef}
          className={bem.element(this, 'header', face, headerProps.className)}
        >
          {this.renderTitle()}
          {this.renderActions()}
        </header>
      );
    }

    renderContent() {
      const { actions, children, face, title, ...props } = this.props;
      const contentProps = prefixed(props, 'content');

      return (
        <div
          {...filter(contentProps, ElementPropTypes)}
          className={bem.element(this, 'content', face, contentProps.className)}
        >
          {children}
        </div>
      );
    }

    render() {
      const { actions, children, face, title, ...props } = this.props;

      return (
        <section
          {...filter(unprefixed(props, 'actions', 'content', 'header', 'title'), ElementPropTypes)}
          className={bem.block(this, face)}
        >
          {this.renderHeader()}
          {this.renderContent()}
        </section>
      );
    }
  }
);

PageSection.FACE_PRIMARY = FACE_PRIMARY;
PageSection.FACE_SECONDARY = FACE_SECONDARY;
PageSection.FACES = FACES;
