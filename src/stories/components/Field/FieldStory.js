import { withInfo } from '@storybook/addon-info';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Field } from 'components/Field';
import { InputText } from 'components/Input';
import React from 'react';
import { withLayout } from 'stories/StoryLayout';

export const FieldStory = () => {
  const invalid = boolean('invalid', false);

  const props = {
    invalid,
    label: text('label', 'Label'),
    message: text('message', 'Message')
  };

  // noinspection RequiredAttributes
  return (
    <Field {...props}>
      <InputText invalid={invalid} />
    </Field>
  );
};

export default storiesOf('components/Form', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Field', FieldStory);
