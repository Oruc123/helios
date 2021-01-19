import * as React from 'react';
import * as UrlParse from 'url-parse';
import { useSelector, useDispatch } from 'react-redux';
import { NewPasswordForm } from './components/NewPasswordForm';
import { newPasswordFormSelector } from './selectors';
import { updateNewPasswordForm, submitNewPasswordForm } from './actions';

const container = () => {
  const parsedUrl = UrlParse.default(window.location.href, true);
  const form = useSelector(newPasswordFormSelector);
  const dispatch = useDispatch();
  const value = useSelector(newPasswordFormSelector);
  const onChange =
    React.useCallback(form => dispatch(updateNewPasswordForm(form)), []);
  const onSubmit =
    React.useCallback(() => dispatch(submitNewPasswordForm(form)), [form]);

  React.useEffect(
    () => {
      const key = parsedUrl.query.key;

      if (!key) {
        dispatch(updateNewPasswordForm(form.setError(new Error('Invalid URL'))));
      } else {
        dispatch(updateNewPasswordForm(form.setValue({ key, password: '' })));
      }
    },
    []);

  return (<NewPasswordForm
    value={value}
    onChange={onChange}
    onSubmit={onSubmit}
  />);
};

export {
  container as NewPasswordPage,
};
