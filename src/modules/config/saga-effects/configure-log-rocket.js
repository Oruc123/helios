import LogRocket from 'logrocket';

export default function configureLogRocket({ version, logRocket }) {
  LogRocket.init(logRocket.appId, {
    release: version
  });
}
