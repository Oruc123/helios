import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_LOGIN_PATH } from 'modules/auth/constants';
import { ForgotForm } from './components/ForgotForm';
import { forgotSelector } from './selectors';
import { updateForgotForm, submitForm } from './actions';

const container = () => {
  const dispatch = useDispatch();
  const value = useSelector(forgotSelector);
  const onChange = React.useCallback(form => dispatch(updateForgotForm(form)), []);
  const onSubmit = React.useCallback(form => dispatch(submitForm(form)), []);

  return (<ForgotForm
    value={value}
    loginLink={AUTH_LOGIN_PATH}
    onChange={onChange}
    onSubmit={onSubmit}
  />);
};

export {
  container as ForgotPasswordPage,
};
