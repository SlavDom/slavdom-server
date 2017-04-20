import * as path from 'path';
import * as _ from 'lodash';

const rootPath = path.join(__dirname, '../..');
const defaultDataPath = path.join(rootPath, 'data');

function getDataPath() {
  if (process.env.NODE_DATA_DIR) {
    return process.env.NODE_DATA_DIR;
  }

  return defaultDataPath;
}

function getRelativePath(...paths) {
  const args = _.toArray(arguments);

  args.unshift(rootPath);

  return path.join.apply(this, args);
}

function getDataRelativePath(...paths) {
  const args = _.toArray(arguments);

  args.unshift(getDataPath());

  return path.join.apply(this, args);
}

export default {
  path,
  getRelative: getRelativePath,
  getDataRelative: getDataRelativePath,
};
