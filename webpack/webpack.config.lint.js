const paths = require('./paths');

module.exports = {
  context: paths.build,

  resolve: {
    modules: paths.modules,
    symlinks: true,
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },

  module: {},

  plugins: []
};
