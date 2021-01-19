import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { text, withKnobs } from '@storybook/addon-knobs';

import { Avatar } from 'components/Avatar';
import { withLayout } from 'stories/StoryLayout';

export const AvatarStory = () => {
  const userName = text('userName', 'Darth Vader');
  const image = text('image', 'https://images-na.ssl-images-amazon.com/images/I/81AC%2B2dqTwL._SX425_.jpg');

  // noinspection RequiredAttributes
  return <Avatar userName={userName} image={image} />;
};

export default storiesOf('components', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withLayout())
  .add('Avatar', AvatarStory);
