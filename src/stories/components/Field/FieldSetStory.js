import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Field, FieldSet } from 'components/Field';
import { InputText } from 'components/Input';
import React from 'react';
import { withLayout } from 'stories/StoryLayout';
import bem from 'utils/bem';

export const FieldSetStory = () => {
  const props = {
    legend: text('legend', 'Legend')
  };

  return (
    <div className={bem.block(FieldSetStory)}>
      <FieldSet {...props}>
        <Field label="Label">
          <InputText />
        </Field>
      </FieldSet>
    </div>
  );
};

FieldSetStory.className = 'FieldSetStory';

export default storiesOf('components/Form', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('FieldSet', () => <FieldSetStory />);
