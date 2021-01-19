import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { MainMenu } from 'components/Main';
import { withLayout } from 'stories/StoryLayout';

import items from './menu-items.json';

export const MainMenuStory = () => {
  const minimized = boolean('minimized', false);

  return <MainMenu items={items} minimized={minimized} />;
};

export default storiesOf('components/Main', module)
  .addDecorator(withLayout({ style: { width: 320 } }))
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('MainMenu', MainMenuStory);
