import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { number as numberKnob, select, text, withKnobs } from '@storybook/addon-knobs';
import zipObject from 'lodash/zipObject';
import { any, func, number, string } from 'prop-types';
import React from 'react';
import { Switch } from 'react-router';

import { Button } from 'components/Button';
import { Dialog, DialogRoute } from 'components/Dialog';
import { Link } from 'components/Link';
import { withLayout } from 'stories/StoryLayout';
import bem from 'utils/bem';
import { SPRITE_HELP } from 'sprites';

const { FACES } = Dialog;

const DialogComponent = ({ location, match, onClose }) => (
  <div>
    <pre style={{ overflow: 'auto' }}>
      <code>
        Location: {JSON.stringify(location, null, 2)}
        <br />
        <br />
        Match: {JSON.stringify(match, null, 2)}
      </code>
    </pre>
    <Button onClick={onClose} style={{ marginTop: 20 }}>
      Close
    </Button>
  </div>
);

DialogComponent.propTypes = {
  location: any.isRequired,
  match: any.isRequired,
  onClose: func.isRequired
};

export const DialogRouteStory = ({ path, location, match, dialogStyleMaxWidth, ...props }) => (
  <div className={bem.block(DialogRouteStory)}>
    <Link to={path} icon={SPRITE_HELP} face={Link.FACE_DEFAULT}>
      Show Dialog
    </Link>
    <br />
    <pre style={{ overflow: 'auto' }}>
      <code>
        Location: {JSON.stringify(location, null, 2)}
        <br />
        <br />
        Match: {JSON.stringify(match, null, 2)}
      </code>
    </pre>

    <Switch>
      <DialogRoute
        {...props}
        path={path}
        component={DialogComponent}
        dialog-style={{ maxWidth: dialogStyleMaxWidth }}
      />
    </Switch>
  </div>
);

DialogRouteStory.className = 'DialogRouteStory';
DialogRouteStory.propTypes = {
  dialogStyleMaxWidth: number.isRequired,
  location: any.isRequired,
  match: any.isRequired,
  path: string.isRequired
};
DialogRouteStory.defaultProps = {};

export default storiesOf('components/Dialog', module)
  .addDecorator(withLayout())
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('DialogRoute', () => {
    const props = {
      path: text('path', '/path/to/dialog'),
      closePath: text('closePath', '/'),
      timeout: numberKnob('timeout', 300),
      'dialog-title': text('dialog-title', 'Dialog title'),
      'dialog-face': select('dialog-face', zipObject(FACES, FACES), Dialog.FACE_PRIMARY),
      dialogStyleMaxWidth: numberKnob('dialog-style.maxWidth', 700)
    };

    return <DialogRouteStory {...props} />;
  });
