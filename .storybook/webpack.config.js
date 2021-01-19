const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const paths = require('../webpack/paths');

const svgRules = require('../webpack/rules/svg');
const mdRules = require('../webpack/rules/md');

const siteConfig = require(`../webpack/webpack.config.dev.js`);

const autoprefixer = require('autoprefixer');

const cssBaseLoaders = [
  {
    loader: 'style-loader',
    options: {
      insertAt: 'top',
      sourceMap: true
    }
  },
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

module.exports = async ({ config, mode }) => {
  return {
    ...config,

    resolve: { ...siteConfig.resolve },

    module: {
      ...config.module,

      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: require.resolve('awesome-typescript-loader')
            },
            // Optional
            {
              loader: require.resolve('react-docgen-typescript-loader')
            }
          ]
        },
        {
          test: /\.(mjs|jsx?)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: paths.resolveRoot('.cache'),
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      shippedProposals: true,
                      useBuiltIns: 'usage',
                      corejs: '3'
                    }
                  ],
                  '@babel/preset-react',
                  '@babel/preset-flow'
                ],
                plugins: [
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-syntax-dynamic-import',
                  ['babel-plugin-emotion', { sourceMap: true, autoLabel: true }],
                  'babel-plugin-macros',
                  '@babel/plugin-transform-react-constant-elements',
                  'babel-plugin-add-react-displayname',
                  ['babel-plugin-react-docgen/lib/index.js', { DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES' }]
                ]
              }
            }
          ],
          include: [paths.root],
          exclude: [paths.resolveRoot('node_modules')]
        },

        {
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
          loader: 'file-loader',
          query: { name: 'static/media/[name].[hash:8].[ext]' }
        },

        {
          test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
          loader: 'url-loader',
          query: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' }
        },

        // Less
        {
          test: /\.less$/,
          use: [...cssBaseLoaders, { loader: 'less-loader', options: { javascriptEnabled: true } }]
        },

        // Sass
        {
          test: /.(?<!\.module)\.s?css$/,
          use: [...cssBaseLoaders, { loader: 'sass-loader' }]
        },

        // Pure CSS modules rule for scoped <name>.module.css files.
        {
          test: /\.module\.css$/i,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, 'postcss-loader']
        },

        ...svgRules,
        ...mdRules
      ]
    },

    plugins: [
      ...config.plugins,

      new SpriteLoaderPlugin({
        plainSprite: true
      })
    ]
  };
};
