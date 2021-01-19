import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { CheckGroup } from 'components/CheckBox';
import React, { useState } from 'react';
import { withLayout } from 'stories/StoryLayout';

const items = [
  { value: 'foo', label: 'Compliance' },
  { value: 'foo', label: 'Operations' },
  { value: 'foo', label: 'Relationship Manager' },
  { value: 'bar', label: 'Auditor' },
  { value: 'bar', label: 'Examiner' }
];

export const CheckGroupStory = props => {
  const [value, onChange] = useState([]);

  return <CheckGroup {...props} items={items} value={value} onChange={onChange} />;
};

export default storiesOf('components/CheckBox', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('CheckGroup', () => {
    const props = {
      disabled: boolean('disabled', false)
    };

    return <CheckGroupStory {...props} />;
  });
