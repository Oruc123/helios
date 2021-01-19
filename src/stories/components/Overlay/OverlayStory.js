import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { withLayout } from 'stories/StoryLayout';
import { Overlay } from 'components/Overlay';
import bem from 'utils/bem';

import './OverlayStory.scss';

function OverlayStory() {
  const overlayText = text(
    'overlayText',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor arcu sapien, quis elementum ligula'
  );

  const childText = text('childText', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');

  const align = text('align', 'leftLeft topBottom rightRight');

  const overlay = (
    <div className={bem.element(OverlayStory, 'overlay')}>
      <p>{overlayText}</p>
    </div>
  );

  // noinspection HtmlDeprecatedAttribute
  return (
    <div className={bem.block(OverlayStory)}>
      <Overlay overlay={overlay} align={align}>
        <div className={bem.element(OverlayStory, 'target')}>{childText}</div>
      </Overlay>
    </div>
  );
}

OverlayStory.className = 'OverlayStory';

export default storiesOf('components/Overlay', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Overlay', OverlayStory);
