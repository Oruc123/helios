import { storiesOf } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { Markdown } from 'components/Markdown';
import bem from 'utils/bem';
import { Story } from 'stories/Story';

import LoginFormReducer from './LoginFormReducer';
import LoginFormContainer from './LoginFormContainer';
import { loginFormSaga } from './LoginFormSagas';

import story from './FormStory.md';
import './FormStory.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(LoginFormReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(loginFormSaga);

const FormStory = () => (
  <Story className={bem.block(FormStory)}>
    <Markdown source={story} />

    <Provider store={store}>
      <LoginFormContainer className={bem.element(FormStory, 'form')} />
    </Provider>
  </Story>
);

FormStory.className = 'FormStory';

export default storiesOf('components/Form', module).add('Form', () => <FormStory />);
