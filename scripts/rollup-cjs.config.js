const terser = require('@rollup/plugin-terser');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const babel = require('@rollup/plugin-babel');

const path = require('path');
const { ROOT_PATH, SRC_PATH } = require('./utils/index');

const configs = {
  input: path.resolve(SRC_PATH, 'index.ts'),
  output: {
    file: `lib/index.js`,
    format: 'cjs',
  },
  plugins: [
    typescript({
      declaration: false,
      declarationDir: null,
    }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      presets: [['@babel/preset-env']],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: false }]],
    }),
    // terser(),
  ],
};

module.exports = configs;
