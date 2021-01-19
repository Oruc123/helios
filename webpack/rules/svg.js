const { sprites } = require('../paths');

module.exports = [
  // Sprites
  {
    test: /\.(svg)$/,
    include: sprites,
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          publicPath: '/static/media/',
          spriteFilename: 'sprites.[hash:8].svg'
        }
      },
      'svgo-loader'
    ]
  },

  // Svg
  {
    test: /\.(svg)$/,
    exclude: sprites,
    use: [
      {
        loader: 'file-loader',
        options: { name: 'static/media/[name].[hash:8].[ext]' }
      }
    ]
  }
];
