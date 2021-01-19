import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { Items } from 'components/Items';

const items = [
  {
    key: 'foo',
    children: 'foo'
  },
  {
    key: 'bar',
    children: 'bar'
  }
];

export const ItemsStory = props => (
  <div>
    <Items Element="div" items={items} {...props} />
  </div>
);

export default storiesOf('components/Items', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Items', () => {
    const props = {};

    return <ItemsStory {...props} />;
  });
