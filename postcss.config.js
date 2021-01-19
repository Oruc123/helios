module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-css-variables': {},
    'postcss-preset-env': {
      stage: 0,
      browsers: '> 0.1%'
    },
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          },
          svgo: {
            exclude: true
          },
          normalizeUrl: {
            exclude: true
          },
          minifySelectors: {
            exclude: true
          },
          mergeRules: {
            exclude: true
          }
        }
      ]
    }
  }
};
