import * as React from 'react';

import * as styles from './styles.module.css';

interface Properties {
  visible: boolean;
  children: React.ReactNode;
}

const transitionAppearance = React.memo((properties: Properties) => {
  const { visible, children } = properties;
  return (<div className={`${styles.box} ${visible ? styles.visible : ''}`}>{children}</div>);
});

export { transitionAppearance as TransitionAppearance };
