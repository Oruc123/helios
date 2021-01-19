import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { withKnobs } from '@storybook/addon-knobs';

import { Search } from 'components/Search';
import { withLayout } from 'stories/StoryLayout';
import notes from './SearchStory.md';

export const SearchStory = () => <Search />;

export default storiesOf('components', module)
  .addDecorator(withInfo)
  .addDecorator(withLayout())
  .addDecorator(withKnobs)
  .add('Search', SearchStory, { notes: { markdown: notes } });
