import React from 'react';
import LocaleProvider from 'antd/es/locale-provider';
import enUS from 'antd/es/locale-provider/en_US';
import { node } from 'prop-types';

import 'styles/master.less';

export const StylesProviderPropTypes = {
  children: node.isRequired
};

export const StylesProviderDefaultProps = {};

export const StylesProvider = ({ children }) => <LocaleProvider locale={enUS}>{children}</LocaleProvider>;

StylesProvider.propTypes = StylesProviderPropTypes;

StylesProvider.defaultProps = StylesProviderDefaultProps;
