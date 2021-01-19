import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import mapValues from 'lodash/mapValues';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { InputDate } from 'components/Input';
import sprites from 'sprites';

export const InputDateStory = props => <InputDate {...props} />;

export default storiesOf('components/Input', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('InputDate', () => {
    const props = {
      format: text('format', 'YYYY/MM/DD'),
      disabled: boolean('disabled', false),
      invalid: boolean('invalid', false),
      icon: select('icon', { '---': null, ...mapValues(sprites, (value, key) => key) }, null),
      placeholder: text('placeholder', ''),
      rounded: boolean('rounded', false)
    };

    return <InputDateStory {...props} />;
  });
