const path = require('path');
const fs = require('fs');

const DIST_PATH = path.resolve(__dirname, '../../', 'dist');
const SRC_PATH = path.resolve(__dirname, '../../', 'src');
const PUBLIC_PATH = path.resolve(__dirname, '../../', 'public');
const ROOT_PATH = path.resolve(__dirname, '../../');
const DEFAULT_PORT = 3000;

const IGNORE_PATH = ['index.tsx', 'react-app-env.d.ts', 'style', '.DS_Store'];
const REG_IGNORE_PREFIX = /^_/;

const transformCamelCase = (str) => {
  return str.replace(/-\w/g, function (v) {
    return v.substring(1).toUpperCase();
  });
};

module.exports = {
  DIST_PATH,
  SRC_PATH,
  PUBLIC_PATH,
  ROOT_PATH,
  DEFAULT_PORT,
  transformCamelCase,
};
