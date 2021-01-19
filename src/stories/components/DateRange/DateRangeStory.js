import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import bem from 'utils/bem';
import { withLayout } from 'stories/StoryLayout';
import { DateRange, DateRangeModel } from 'components/DateRange';

export const DateRangeStory = () => {
  const [value, onChange] = useState(new DateRangeModel());
  const props = {
    value,
    onChange
  };

  return (
    <div className={bem.block(DateRangeStory)}>
      <DateRange {...props} />
    </div>
  );
};

DateRangeStory.className = 'DateRangeStory';

export default storiesOf('components/DateRange', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('DateRange', () => <DateRangeStory />);
