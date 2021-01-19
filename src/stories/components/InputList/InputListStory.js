import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { InputList } from 'components/InputList';
import { Icon } from 'components/Icon';

const items = Icon.TYPES.map(type => ({
  key: type,
  value: type,
  label: `Icon ${type}`,
  icon: type
}));

export const InputListStory = props => <InputList {...props} items={items} />;

export default storiesOf('components/InputList', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('InputList', () => {
    const props = {
      multiple: boolean('multiple', false),
      disabled: boolean('disabled', false)
    };

    return <InputListStory {...props} />;
  });
