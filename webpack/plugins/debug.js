const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: 'localhost',
    analyzerPort: 7070,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
  })
];
