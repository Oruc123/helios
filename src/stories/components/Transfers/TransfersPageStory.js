import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { TransfersPage } from 'components/Transfers';
import { withLayout } from 'stories/StoryLayout';

export const TransfersPageStory = props => <TransfersPage {...props} />;

export default storiesOf('components/Transfers', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('TransfersPage', () => {
    const props = {};

    return <TransfersPageStory {...props} />;
  });
