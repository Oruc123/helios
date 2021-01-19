import { node } from 'prop-types';
import React from 'react';

import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import { prefixBy, prefixed, unprefixed } from 'utils/props';
import './Story.scss';

export const StoryPropTypes = {
  ...ElementPropTypes,
  children: node,
  title: node,
  ...prefixBy('title', ElementPropTypes)
};

export const StoryDefaultProps = {
  children: null,
  title: null
};

export const Story = ({ title, children, className, ...props }) => (
  <section {...unprefixed(props, ElementPropTypes)} className={bem.block(Story, null, className)}>
    {title ? (
      <h1 {...prefixed(props, 'title')} className={bem.element(Story, 'title')}>
        {title}
      </h1>
    ) : null}
    {children}
  </section>
);

Story.className = 'Story';
Story.propTypes = StoryPropTypes;
Story.defaultProps = StoryDefaultProps;
