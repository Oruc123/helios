import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import { withLayout } from 'stories/StoryLayout';
import { MainBarButton } from 'components/Main';

export const MainBarButtonStory = () => {
  const minimized = boolean('minimized', false);

  // noinspection RequiredAttributes
  return <MainBarButton minimized={minimized} />;
};

export default storiesOf('components/Main', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('MainBarButton', MainBarButtonStory);
