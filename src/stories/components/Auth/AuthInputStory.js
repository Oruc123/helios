import { withInfo } from '@storybook/addon-info';

import { boolean, optionsKnob as options, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { AuthInput } from 'components/Auth';
import React from 'react';
import { withLayout } from 'stories/StoryLayout';
import { CYAN } from 'styles/variables';

const inline = { display: 'inline-radio' };

export const AuthInputStory = props => <AuthInput {...props} />;

export default storiesOf('components/Auth', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator(withLayout({ style: { backgroundColor: CYAN } }))
  .add('AuthInput', () => {
    const props = {
      type: options('type', { text: 'text', email: 'email', password: 'password' }, 'text', inline),
      placeholder: text('placeholder', ''),
      error: boolean('error', false)
    };

    return <AuthInputStory {...props} />;
  });
