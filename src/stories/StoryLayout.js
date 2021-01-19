import { StylesProvider } from 'components/StylesProvider';
import Debug from 'debug';
import { createMemoryHistory } from 'history';
import { node, object, string } from 'prop-types';
import React, { cloneElement } from 'react';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import 'styles/index.less';
import 'styles/index.scss';
import bem from 'utils/bem';
import { ElementPropTypes } from 'utils/prop-types';
import WebFont from 'webfontloader';
import './StoryLayout.scss';

const history = createMemoryHistory();

Debug.enable('*,-sockjs-client:*');

WebFont.load({
  google: {
    families: ['Source Sans Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i', 'Material Icons']
  }
});

export const StoryLayoutPropTypes = {
  ...ElementPropTypes,
  children: node,
  className: string,
  style: object
};

export const StoryLayoutDefaultProps = {
  children: null,
  className: null,
  style: null
};

export const StoryLayout = ({ children, className, ...props }) => (
  <StylesProvider>
    <Router history={history}>
      <div {...props} className={bem.block(StoryLayout, null, className)}>
        <Route render={props => cloneElement(children, props)} />
      </div>
    </Router>
  </StylesProvider>
);

StoryLayout.className = 'StoryLayout';
StoryLayout.propTypes = StoryLayoutPropTypes;
StoryLayout.defaultProps = StoryLayoutDefaultProps;

export const withLayout = props => story => <StoryLayout {...props}>{story()}</StoryLayout>;
