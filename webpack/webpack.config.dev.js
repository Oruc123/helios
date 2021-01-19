const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const baseConfig = require('./webpack.config.base');

const { EnvironmentPlugin } = webpack;

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.

module.exports = env => {
  const config = baseConfig(env);

  return {
    ...config,

    mode: 'development',

    devtool: 'inline-source-map',

    output: {
      // Next line is not used in dev but WebpackDevServer crashes without it:
      path: paths.build,

      // This is the URL that app is served from. We use "/" in development.
      publicPath: paths.publicUrl,

      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,

      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.

      filename: 'static/js/bundle.js'
    },

    module: {
      rules: [...config.module.rules]
    },

    plugins: [
      ...config.plugins,

      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.indexHTML,
        favicon: paths.favicon
      }),

      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
      new EnvironmentPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }),

      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebookincubator/create-react-app/issues/240
      new CaseSensitivePathsPlugin()
    ],

    devServer: {
      port: process.env.PORT || 7000,
      contentBase: paths.build,
      compress: true,
      historyApiFallback: true
    },

    watch: true
  };
};
