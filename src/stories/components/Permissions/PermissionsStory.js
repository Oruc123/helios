import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Permissions } from 'components/Permissions';
import React, { useState } from 'react';
import { withLayout } from 'stories/StoryLayout';

export const PermissionsStory = props => {
  const [value, onChange] = useState([]);

  return <Permissions {...props} value={value} onChange={onChange} />;
};

export default storiesOf('components/Permissions', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Permissions', () => {
    const props = {
      disabled: boolean('disabled', false)
    };

    return <PermissionsStory {...props} />;
  });
