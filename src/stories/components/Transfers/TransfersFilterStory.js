import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { ListModel } from 'utils/list';
import { withLayout } from 'stories/StoryLayout';
import { TransfersFilter, TransfersFilterModel } from 'components/Transfers';

export const TransfersFilterStory = props => {
  const [value, onChange] = useState(new TransfersFilterModel());

  return (
    <TransfersFilter
      {...props}
      value={value}
      onChange={onChange}
      companies={new ListModel()}
      licenses={new ListModel()}
    />
  );
};

export default storiesOf('components/Transfers', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('TransfersFilter', () => {
    const props = {};

    return <TransfersFilterStory {...props} />;
  });
