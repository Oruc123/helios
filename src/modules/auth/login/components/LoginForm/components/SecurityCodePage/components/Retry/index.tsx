import * as React from 'react';
import * as styles from './styles.module.css';

interface Properties {
  startedAt: number;
  onRetry: () => any;
}

const INTERVAL_IN_SECONDS = 30;

const Retry = React.memo(({ startedAt, onRetry }: Properties) => {
  const [left, setLeft] = React.useState(INTERVAL_IN_SECONDS);
  const timer = React.useRef(undefined);

  /**
   * Timer ref can hold three types of values. "undefined" means that timer never has been started.
   * "null" - means that it was started and now it's stopped. Number value means that
   * timer is currently running. We need this approach to skip initial render, because we
   * don't want user to see countdown until he pushed "retry" first time.
   */

  // Update "seconds left" value.
  const timerHandler = () => {
    const secondsLeft = INTERVAL_IN_SECONDS - Math.round((Date.now() - startedAt) / 1000);

    setLeft(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(timer.current);
      timer.current = null;
      setLeft(INTERVAL_IN_SECONDS);
    }
  };

  // Setup timer to check ability to retry challenge.
  React.useEffect(
    () => {
      // Skip initial render.
      if (typeof(timer.current) !== 'undefined') {
        timer.current = setInterval(timerHandler, 1000);
      } else {
        timer.current = null;
      }
    },
    [startedAt]);

  // Kill timer on component destroy.
  React.useEffect(() => () => clearInterval(timer.current), []);

  return (<div>
    <span
      className={`${styles.timeoutLink} ${timer.current ? styles.disabled : ''}`}
      role="button"
      tabIndex={0}
      onClick={timer.current ? undefined : onRetry}
      onKeyUp={() => {}}
    >
      Retry sending code {timer.current ? <b>{`in ${left}s`}</b> : ''}
    </span>
  </div>);
});

export {
  Retry,
};
