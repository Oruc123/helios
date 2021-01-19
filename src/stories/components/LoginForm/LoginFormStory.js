import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import React, { useState } from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';

import { LoginForm, LoginFormPage } from 'modules/auth/login/components/LoginForm';
import { LoginFormModel } from 'modules/auth/login/models';

import { withLayout } from 'stories/StoryLayout';

export const LoginFormStory = () => {
  const [value, onChange] = useState(new LoginFormModel());

  const message = text('message', 'We’ve just sent you an Email to reset your password.');
  const error = text('error', '');

  // noinspection RequiredAttributes
  return (
    <LoginForm
      page={LoginFormPage.Password}
      value={value}
      message={message}
      error={error}
      forgotLink="/auth/forgot"
      onChange={onChange}
      onSubmit={() => onChange(value.validate())}
    />
  );
};

export default storiesOf('components', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withLayout())
  .add('LoginForm', () => <LoginFormStory />);
