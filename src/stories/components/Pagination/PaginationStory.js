import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { withKnobs, number } from '@storybook/addon-knobs';

import { Pagination } from 'components/Pagination';
import { withLayout } from 'stories/StoryLayout';

export const PaginationStory = () => {
  const total = number('total', 1100);

  return <Pagination defaultCurrent={1} total={total} />;
};

export default storiesOf('components/Pagination', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withLayout())
  .add('Pagination', PaginationStory);
