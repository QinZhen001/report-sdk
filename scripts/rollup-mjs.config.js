const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const path = require('path');

const { ROOT_PATH, SRC_PATH } = require('./utils/index');

const configs = {
  input: path.resolve(SRC_PATH, 'index.ts'),
  output: {
    file: `es/index.js`,
    format: 'es',
  },
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      presets: [['@babel/preset-env']],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
    }),
    // terser(),
  ],
};

module.exports = configs;
