const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = require('./paths');
const baseConfig = require('./webpack.config.base');

const { NODE_ENV } = process.env;
const { DefinePlugin } = webpack;

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = env => {
  const config = baseConfig(env);

  return {
    ...config,

    mode: 'production',

    // Don't attempt to continue if there are any errors.
    bail: true,

    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    devtool: 'source-map',

    output: {
      // The build folder.
      path: paths.build,

      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: paths.publicUrl,

      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      // We don't currently advertise code splitting but Webpack supports it.
      filename: 'static/js/[name].[chunkhash:8].js',

      chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
    },

    resolve: {
      modules: paths.modules,
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
    },

    module: {
      rules: [...config.module.rules]
    },

    plugins: [
      ...config.plugins,

      new HtmlWebpackPlugin({
        inject: true,
        template: paths.indexHTML,
        favicon: paths.favicon,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),

      new DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        CODE_VERSION: process.env.CI_BUILD_REF ? JSON.stringify(process.env.CI_BUILD_REF) : 'undefined',
        DOCUMENTS_ONLY: JSON.stringify(true)
      }),

      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css',
        allChunks: true
      }),

      // Generate a manifest file which contains a mapping of all asset filenames
      // to their corresponding output file so that tools can pick it up without
      // having to parse `index.html`.
      new ManifestPlugin({
        fileName: 'asset-manifest.json'
      })
    ],

    devServer: {
      port: process.env.PORT || 8080,
      contentBase: paths.build,
      compress: true,
      historyApiFallback: true
    }
  };
};
