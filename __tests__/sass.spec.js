const path = require('path');
const sassTrue = require('sass-true');
const glob = require('glob');

const root = path.resolve(__dirname, '..');
const includePaths = [__dirname, path.resolve(root, 'src')];

const importer = url => ({
  file: url[0] === '~' ? path.resolve(root, 'node_modules', url.substr(1)) : url
});

describe('sass', () => {
  const sassTestFiles = glob.sync(path.resolve(__dirname, '**/*.spec.scss'));

  sassTestFiles.forEach(file => sassTrue.runSass({ importer, includePaths, file }, { describe, it }));
});
