const { src } = require('../paths');
const { NODE_ENV } = process.env;

module.exports = [
  {
    test: /\.(js|jsx)$/,
    include: src,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: NODE_ENV === 'production' ? [] : ['react-hot-loader/babel']
        }
      }
    ]
  },
  {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader'
  }
];
