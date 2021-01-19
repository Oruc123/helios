import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { UserPermissions } from 'components/User';
import React, { useState } from 'react';
import { withLayout } from 'stories/StoryLayout';

const UserPermissionsStory = props => {
  const [value, onChange] = useState([]);

  return <UserPermissions {...props} value={value} onChange={onChange} />;
};

export default storiesOf('components/User', module)
  .addDecorator(withInfo)
  .addDecorator(withLayout())
  .addDecorator(withKnobs)
  .add('UserPermissions', () => {
    const props = {
      disabled: boolean('disabled', false)
    };

    return <UserPermissionsStory {...props} />;
  });
