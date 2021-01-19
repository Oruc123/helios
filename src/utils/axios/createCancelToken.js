import { CancelToken } from 'axios';

const { NODE_ENV } = process.env;

const defaultCancel = () => {
  if (NODE_ENV !== 'production') {
    throw new Error('Cannot cancel request');
  }
};

/**
 * Creates cancel token and function to cancel request.
 *
 * @return { [CancelToken, function(): void] }
 */
function createCancelToken() {
  let cancel = defaultCancel;

  const cancelToken = new CancelToken(axiosCancel => {
    cancel = axiosCancel;
  });

  return [cancelToken, () => cancel()];
}

export default createCancelToken;
