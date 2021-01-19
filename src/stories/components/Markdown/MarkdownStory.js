import React from 'react';
import { storiesOf } from '@storybook/react';

import { Markdown } from 'components/Markdown';
import bem from 'utils/bem';
import { Story } from 'stories/Story';
import story from './MarkdownStory.md';

const MarkdownStory = () => (
  <Story className={bem.block(MarkdownStory)}>
    <Markdown source={story} />
  </Story>
);

MarkdownStory.className = 'MarkdownStory';

export default storiesOf('components', module).add('Markdown', () => <MarkdownStory />);
