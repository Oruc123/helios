import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { CompanySelector } from 'components/Company';
import React, { useState } from 'react';
import { withLayout } from 'stories/StoryLayout';

const items = [
  { id: 1, name: 'Kind Love, LLC' },
  { id: 2, name: 'ABC Growers' },
  { id: 3, name: 'HLHcolorado' },
  { id: 4, name: 'TestAcc3' },
  { id: 5, name: 'XYZ Medical Company' }
];

export const CompanySelectorStory = props => {
  const [value, onChange] = useState([]);

  return <CompanySelector {...props} items={items} value={value} onChange={onChange} />;
};

export default storiesOf('components/Company', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('CompanySelector', () => {
    const props = {
      disabled: boolean('disabled', false)
    };

    return <CompanySelectorStory {...props} />;
  });
