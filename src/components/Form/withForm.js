/* eslint-disable react/forbid-foreign-prop-types */
import omit from 'lodash/omit';
import React from 'react';
import { getComponentName } from 'utils/react';
import { Form, FormDefaultProps, FormPropTypes } from './Form';

const { assign } = Object;

export default Component => {
  const FormComponent = props => <Form {...props} Form={Component} />;

  const displayName = `Form<${getComponentName(Component)}>`;
  const propTypes = omit({ ...Component.propTypes, ...FormPropTypes }, ['Element', 'Field', 'Form']);
  const defaultProps = { ...Component.defaultProps, ...FormDefaultProps };

  return [assign(FormComponent, { displayName, defaultProps, propTypes }), propTypes, defaultProps];
};
