import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs';

import { UserMenu } from 'components/User';
import { AuthUserModel } from 'components/Auth';
import { withLayout } from 'stories/StoryLayout';

const user = new AuthUserModel();

const UserMenuStory = () => {
  const name = text('nickname', 'Anakin Skywalker');
  const nickname = text('nickname', 'Darth Vader');
  const picture = text('image', 'https://images-na.ssl-images-amazon.com/images/I/81AC%2B2dqTwL._SX425_.jpg');

  // noinspection RequiredAttributes
  return <UserMenu user={user.merge({ name, nickname, picture })} settings-to="/settings" logout-to="/logout" />;
};

export default storiesOf('components/User', module)
  .addDecorator(withInfo)
  .addDecorator(withLayout())
  .addDecorator(withKnobs)
  .add('UserMenu', UserMenuStory);
