import LogRocket from 'logrocket';
import { rollbar } from 'utils/logging';

function setRollbarLogRocketSessionURL(obj) {
  return { ...obj, custom: { ...obj.custom, sessionUrl: LogRocket.sessionURL } };
}

export default function configureRollbar(config) {
  const { environment, logRocket } = config;
  const rollbarConfig = { enabled: false, environment };

  if (logRocket) {
    rollbarConfig.transform = setRollbarLogRocketSessionURL;
  }

  rollbar.configure(rollbarConfig);
}
