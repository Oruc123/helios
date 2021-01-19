import * as React from 'react';
import { Search } from 'components/Search';
import { Button } from 'components/Button';

import * as styles from './styles.module.css';

const actions = React.memo(() => {
  return (<div className={styles.actions}>
    <Search />
    <Button rounded>Add New</Button>
  </div>);
});

export { actions as Actions };
