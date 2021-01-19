import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { MainPage } from 'components/Main';
import { withLayout } from 'stories/StoryLayout';

import items from './menu-items.json';

export const MainPageStory = () => {
  const barMinimized = boolean('bar-minimized', false);

  // noinspection RequiredAttributes
  return <MainPage menu-items={items} bar-minimized={barMinimized} bar-help-to="/help" />;
};

export default storiesOf('components/Main', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withLayout({ style: { padding: 0 } }))
  .add('MainPage', MainPageStory);
