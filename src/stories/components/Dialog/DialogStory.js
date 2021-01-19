import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { number as numberKnob, select, text, withKnobs } from '@storybook/addon-knobs';
import { number } from 'prop-types';
import React, { useState } from 'react';

import bem from 'utils/bem';
import { withLayout } from 'stories/StoryLayout';
import { Dialog } from 'components/Dialog';
import { Button } from 'components/Button';
import zipObject from 'lodash/zipObject';

const { FACES } = Dialog;

export const DialogStory = ({ maxWidth, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={bem.block(DialogStory)}>
      <Button onClick={() => setVisible(true)}>Show Dialog</Button>

      <Dialog {...props} visible={visible} onVisibleChange={setVisible} style={{ maxWidth }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae arcu nec justo ultricies commodo et sed
          ligula. Nam ullamcorper purus a metus pellentesque, quis semper diam fringilla. Integer lacinia aliquam enim,
          at tempus dui sodales sit amet. Donec at vestibulum turpis. Quisque eget porttitor magna. Morbi sapien orci,
          molestie a blandit eu, sagittis et sapien. Maecenas fringilla, eros eu volutpat sagittis, dui neque
          sollicitudin nisl, sed laoreet justo quam id justo. Curabitur bibendum tortor id ipsum venenatis, vitae tempor
          ante ultrices. Vivamus suscipit ex eu ante pulvinar rutrum. Fusce id felis libero.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae arcu nec justo ultricies commodo et sed
          ligula. Nam ullamcorper purus a metus pellentesque, quis semper diam fringilla. Integer lacinia aliquam enim,
          at tempus dui sodales sit amet. Donec at vestibulum turpis. Quisque eget porttitor magna. Morbi sapien orci,
          molestie a blandit eu, sagittis et sapien. Maecenas fringilla, eros eu volutpat sagittis, dui neque
          sollicitudin nisl, sed laoreet justo quam id justo. Curabitur bibendum tortor id ipsum venenatis, vitae tempor
          ante ultrices. Vivamus suscipit ex eu ante pulvinar rutrum. Fusce id felis libero.
        </p>
      </Dialog>
    </div>
  );
};

DialogStory.className = 'DialogStory';
DialogStory.propTypes = {
  maxWidth: number
};
DialogStory.defaultProps = {
  maxWidth: 400
};

export default storiesOf('components/Dialog', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('Dialog', () => {
    const props = {
      title: text('title', 'Dialog title'),
      actions: text('actions', ''),
      face: select('face', zipObject(FACES, FACES), FACES[0]),
      maxWidth: numberKnob('style.maxWidth', 400)
    };

    return <DialogStory {...props} />;
  });
