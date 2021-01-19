import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import { AuthSubmitButton } from 'components/Auth';
import { withLayout } from 'stories/StoryLayout';
import { CYAN } from 'styles/variables';

export const AuthSubmitButtonStory = () => {
  const children = text('children', 'Log In');
  const isPending = boolean('isPending', false);

  // noinspection RequiredAttributes
  return <AuthSubmitButton isPending={isPending}>{children}</AuthSubmitButton>;
};

export default storiesOf('components/Auth', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withLayout({ style: { backgroundColor: CYAN } }))
  .add('AuthSubmitButton', AuthSubmitButtonStory);
