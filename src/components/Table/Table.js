import { bool, node } from 'prop-types';
import React, { PureComponent } from 'react';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { filter, prefixBy, prefixed, unprefixed } from 'utils/props';

import './Table.scss';

export const TablePropTypes = {
  ...ElementPropTypes,
  ...prefixBy('body', ElementPropTypes),
  ...prefixBy('caption', ElementPropTypes),
  ...prefixBy('footer', ElementPropTypes),
  ...prefixBy('header', ElementPropTypes),
  caption: node,
  children: node,
  footer: node,
  header: node,
  rounded: bool,
  shadowed: bool
};

export const TableDefaultProps = {
  caption: null,
  children: null,
  header: null,
  footer: null,
  rounded: true,
  shadowed: true
};

export class Table extends PureComponent {
  static className = 'Table';

  static propTypes = TablePropTypes;

  static defaultProps = TableDefaultProps;

  renderCaption() {
    const { caption, ...props } = this.props;
    const captionProps = prefixed(props, 'caption');

    if (caption) {
      return (
        <caption
          {...filter(captionProps, ElementPropTypes)}
          className={bem.element(this, 'caption', null, captionProps.className)}
        >
          {caption}
        </caption>
      );
    }

    return null;
  }

  renderHeader() {
    const { header, ...props } = this.props;
    const headerProps = prefixed(props, 'header');

    if (header) {
      return (
        <thead
          {...filter(headerProps, ElementPropTypes)}
          className={bem.element(this, 'header', null, headerProps.className)}
        >
          {header}
        </thead>
      );
    }

    return null;
  }

  renderFooter() {
    const { footer, ...props } = this.props;
    const footerProps = prefixed(props, 'footer');

    if (footer) {
      return (
        <tfoot
          {...filter(footerProps, ElementPropTypes)}
          className={bem.element(this, 'footer', null, footerProps.className)}
        >
          {footer}
        </tfoot>
      );
    }

    return null;
  }

  renderBody() {
    const { children, ...props } = this.props;
    const bodyProps = prefixed(props, 'body');

    if (children) {
      return (
        <tfoot
          {...filter(bodyProps, ElementPropTypes)}
          className={bem.element(this, 'body', null, bodyProps.className)}
        >
          {children}
        </tfoot>
      );
    }

    return null;
  }

  render() {
    const { rounded, shadowed, ...props } = this.props;

    return (
      <table
        {...filter(unprefixed(props, 'body', 'caption', 'footer', 'header'), ElementPropTypes)}
        className={bem.block(this, { rounded, shadowed })}
      >
        {this.renderCaption()}
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderFooter()}
      </table>
    );
  }
}
