import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import bem from 'utils/bem';
import { withLayout } from 'stories/StoryLayout';
import { SelectableItem } from 'components/Selectable';

export const SelectableItemStory = props => (
  <div className={bem.block(SelectableItemStory)}>
    <SelectableItem {...props} Element="div" index={0} style={{ display: 'inline-block', padding: 16 }}>
      12334
    </SelectableItem>
  </div>
);

SelectableItemStory.className = 'SelectableStory';

export default storiesOf('components/Selectable', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('SelectableItem', () => {
    const props = {
      selected: boolean('selected', false),
      disabled: boolean('disabled', false),
      focused: boolean('focused', false),
      anchor: boolean('anchor', false),
      lead: boolean('lead', false)
    };

    return <SelectableItemStory {...props} />;
  });
