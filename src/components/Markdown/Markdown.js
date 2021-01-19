import React from 'react';
import ReactMarkdown from 'react-markdown';

import bem from 'utils/bem';
import { MarkdownCode } from './MarkdownCode';
import './Markdown.scss';

export const MarkdownPropTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...ReactMarkdown.propTypes
};

export const MarkdownDefaultProps = {
  ...ReactMarkdown.defaultProps
};

export const MarkdownRenderers = {
  code: MarkdownCode
};

export const Markdown = ({ className, ...props }) => (
  <ReactMarkdown {...props} renderers={MarkdownRenderers} className={bem.block(Markdown, null, className)} />
);

Markdown.className = 'Markdown';
Markdown.propTypes = MarkdownPropTypes;
Markdown.defaultProps = MarkdownDefaultProps;
