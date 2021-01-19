const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV } = process.env;

const cssBaseLoaders = [
  (
    NODE_ENV === 'production'
      ? {
        loader: MiniCssExtractPlugin.loader
      }
      : {
        loader: 'style-loader',
        options: {
          insertAt: 'top',
          sourceMap: true
        }
      }
  ),
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: true
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: () => [autoprefixer()]
    }
  }
];

module.exports = [
  // Less
  {
    test: /\.less$/,
    use: [
      ...cssBaseLoaders,
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
          javascriptEnabled: true
        }
      }
    ]
  },

  // Sass
  {
    test: /.(?<!\.module)\.s?css$/,
    use: [
      ...cssBaseLoaders,
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  },

  // Pure CSS modules rule for scoped <name>.module.css files.
  {
    test: /\.module\.css$/i,
    use: [
      (NODE_ENV === 'production' ?
        { loader: MiniCssExtractPlugin.loader } :
        {
          loader: 'style-loader',
          options: {
            insertAt: 'top',
            sourceMap: true
          }
        }),
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
          modules: {
            localIdentName: '[local]__[hash:base64:5]'
          }
        }
      },
      'postcss-loader'
    ]
  }
];
