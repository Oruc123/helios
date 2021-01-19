import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import { withLayout } from 'stories/StoryLayout';
import { TransferParticipant, TransferParticipantModel } from 'components/Transfers';

export const TransferParticipantStory = props => {
  const [value, onChange] = useState(new TransferParticipantModel());

  return <TransferParticipant {...props} value={value} onChange={onChange} />;
};

export default storiesOf('components/Transfers', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('TransferParticipant', () => {
    const props = {
      legend: text('legend', 'Sender')
    };

    return <TransferParticipantStory {...props} />;
  });
