import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { CheckBox } from 'components/CheckBox';

export const CheckBoxStory = props => <CheckBox {...props} />;

export default storiesOf('components/CheckBox', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('CheckBox', () => {
    const props = {
      disabled: boolean('disabled', false),
      flat: boolean('flat', false),
      children: text('children', 'Test'),
      invalid: boolean('invalid', false),
      rounded: boolean('rounded', false)
    };

    return <CheckBoxStory {...props} />;
  });
