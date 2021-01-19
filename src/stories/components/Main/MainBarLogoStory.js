import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { MainBarLogo } from 'components/Main';

export const MainBarLogoStory = () => {
  const to = text('to', '/');
  const children = text('children', 'Helios');

  // noinspection RequiredAttributes
  return <MainBarLogo to={to}>{children}</MainBarLogo>;
};

export default storiesOf('components/Main', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('MainBarLogo', MainBarLogoStory);
