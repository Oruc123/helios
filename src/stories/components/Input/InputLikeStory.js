import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import mapValues from 'lodash/mapValues';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { InputLike } from 'components/Input';
import sprites from 'sprites';

export const InputLikeStory = () => {
  const props = {
    disabled: boolean('disabled', false),
    focused: boolean('focused', false),
    invalid: boolean('invalid', false),
    rounded: boolean('rounded', false),
    icon: select('icon', { '---': null, ...mapValues(sprites, (value, key) => key) }, null)
  };

  // noinspection RequiredAttributes
  return (
    <InputLike {...props}>
      <div />
    </InputLike>
  );
};

export default storiesOf('components/Input', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('InputLike', InputLikeStory);
