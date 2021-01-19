import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, color, optionsKnob as options, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { Spinner } from 'components/Spinner';
import { withLayout } from 'stories/StoryLayout';
import zipObject from 'lodash/zipObject';

const { SIZES } = Spinner;

export const SpinnerStory = () => {
  const inline = { display: 'inline-radio' };
  const size = options('size', zipObject(SIZES, SIZES), 'medium', inline);
  const centered = boolean('centered', false);
  const primaryColor = color('primaryColor', 'red');
  const secondaryColor = color('secondaryColor', 'white');

  // noinspection RequiredAttributes
  return <Spinner size={size} centered={centered} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
};

export default storiesOf('components', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Spinner', SpinnerStory);
