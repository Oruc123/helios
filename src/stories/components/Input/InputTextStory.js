import { withInfo } from '@storybook/addon-info';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { InputText } from 'components/Input';
import mapValues from 'lodash/mapValues';
import React, { useState } from 'react';
import sprites from 'sprites';
import { withLayout } from 'stories/StoryLayout';

// eslint-disable-next-line react/prop-types
export const InputTextStory = ({ validator, ...props }) => {
  const [value, onChange] = useState('');
  const [error, onErrorChange] = useState(null);

  return (
    <InputText
      {...props}
      validator={validator ? value => (/\D/.test(value) ? '' : null) : undefined}
      value={value}
      error={error}
      onChange={onChange}
      onErrorChange={onErrorChange}
    />
  );
};

export default storiesOf('components/Input', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('InputText', () => {
    const props = {
      disabled: boolean('disabled', false),
      clearable: boolean('clearable', false),
      validator: boolean('validator', false),
      icon: select('icon', { '---': null, ...mapValues(sprites, (value, key) => key) }, null),
      placeholder: text('placeholder', ''),
      rounded: boolean('rounded', false),
      type: select('type', { text: 'text', password: 'password', email: 'email', number: 'number' }, 'text')
    };

    return <InputTextStory {...props} />;
  });
