require('dotenv').config();
const webpack = require('webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const paths = require('./paths');
const cssRules = require('./rules/css');
const svgRules = require('./rules/svg');
const mdRules = require('./rules/md');
const jsRules = require('./rules/js');
const configRules = require('./rules/config');
const debugPlugins = require('./plugins/debug');

const { NODE_ENV } = process.env;
const { IgnorePlugin } = webpack;

module.exports = ({ debug } = {}) => ({
  context: paths.build,

  // In production, we only want to load the polyfills and the app code.
  entry: {
    app: [require.resolve('./polyfills'), paths.indexJS]
  },

  resolve: {
    modules: paths.modules,
    symlinks: true,
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: NODE_ENV === 'production' ? {} : { 'react-dom': '@hot-loader/react-dom' }
  },

  module: {
    rules: [
      // Url
      {
        exclude: [/\.(html)$/, /\.(js|jsx|json|ts|tsx)$/, /\.(css|less|scss)$/, /\.(svg)$/, /\.(md)$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },

      ...jsRules,
      ...cssRules,
      ...svgRules,
      ...mdRules,
      ...configRules
    ]
  },

  plugins: [
    new IgnorePlugin(/^\.\/locale$/, /moment$/),

    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new LodashModuleReplacementPlugin,

    ...(debug ? debugPlugins : [])
  ].filter(Boolean),

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
});
