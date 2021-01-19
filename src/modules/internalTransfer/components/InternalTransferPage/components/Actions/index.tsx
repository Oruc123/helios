import * as React from 'react';
import { Link } from 'components/Link';
import { Button } from 'components/Button';
import bem from 'utils/bem';

import * as styles from './styles.module.css';

interface Properties {
  editUrl: string;
}

const actions = (properties: Properties) => (<Link className={styles.link} to={properties.editUrl}>
  <Button
    face={Button.FACE_SECONDARY}
    className={bem.element(actions, 'edit')}
  >
    EDIT
  </Button>
</Link>);

actions.className = 'TransferPage';

export {
  actions as Actions,
};
