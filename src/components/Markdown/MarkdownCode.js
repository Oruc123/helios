import React from 'react';
import { string } from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/styles/prism';

import bem from 'utils/bem';
import './MarkdownCode.scss';

export const MarkdownCodePropTypes = {
  value: string.isRequired,
  language: string
};

export const MarkdownCodeDefaultProps = {
  language: null
};

const customStyle = { padding: '1em', overflow: 'auto' };

export const MarkdownCode = ({ language, value }) => (
  <SyntaxHighlighter language={language} className={bem.block(MarkdownCode)} style={coy} customStyle={customStyle}>
    {value}
  </SyntaxHighlighter>
);

MarkdownCode.className = 'MarkdownCode';

MarkdownCode.propTypes = MarkdownCodePropTypes;

MarkdownCode.defaultProps = MarkdownCodeDefaultProps;
