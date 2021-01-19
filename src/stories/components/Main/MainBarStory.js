import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import { withLayout } from 'stories/StoryLayout';
import { MainBar, MainMenu } from 'components/Main';

import items from './menu-items.json';

export const MainBarStory = () => {
  const minimized = boolean('minimized', false);

  // noinspection RequiredAttributes
  return (
    <MainBar minimized={minimized} help-to="/help">
      <MainMenu items={items} minimized={minimized} />
    </MainBar>
  );
};

export default storiesOf('components/Main', module)
  .addDecorator(withLayout({ style: { background: '#f5f5f5' } }))
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('MainBar', MainBarStory);
