const path = require('path');
const fs = require('fs');

const rootPath = fs.realpathSync(path.resolve(__dirname, '..'));

const resolveRoot = relativePath => path.resolve(rootPath, relativePath);

const srcPath = resolveRoot('src');

const resolveApp = relativePath => path.resolve(srcPath, relativePath);

const publicPath = resolveRoot('public');

const resolvePublic = relativePath => path.resolve(publicPath, relativePath);

// config after eject: we're in ./config/
module.exports = {
  modules: ['node_modules'],
  root: rootPath,
  src: srcPath,
  publicPath,
  publicUrl: '/',
  build: resolveRoot('build'),
  sprites: resolveApp('sprites'),
  indexJS: resolveApp('index.js'),
  indexHTML: resolvePublic('index.html'),
  favicon: resolvePublic('favicon.ico'),
  config: resolvePublic('config.json'),
  resolveRoot,
  resolveApp,
  resolvePublic
};
