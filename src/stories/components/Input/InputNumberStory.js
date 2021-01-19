import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { InputNumber } from 'components/Input';
import React from 'react';
import { withLayout } from 'stories/StoryLayout';

export const InputNumberStory = props => <InputNumber {...props} />;

export default storiesOf('components/Input', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('InputNumber', () => {
    const props = {
      disabled: boolean('disabled', false)
    };

    return <InputNumberStory {...props} />;
  });
