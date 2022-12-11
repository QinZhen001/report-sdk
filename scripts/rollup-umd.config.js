const external = require('rollup-plugin-peer-deps-external');
const babel = require('@rollup/plugin-babel');
const injectProcessEnv = require('rollup-plugin-inject-process-env');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');

const path = require('path');
const { ROOT_PATH, SRC_PATH, transformCamelCase } = require('./utils/index');
const { name } = require('../package.json');
const { getBabelOutputPlugin } = babel;

module.exports = {
  input: path.resolve(SRC_PATH, 'index.ts'),
  output: {
    file: `dist/index.js`,
    format: 'umd',
    name: transformCamelCase(name),
    // sourcemap: 'inline',
  },
  plugins: [
    typescript({
      compilerOptions: {
        declaration: false,
        declarationDir: null,
      },
    }),
    resolve(),
    commonjs(),
    injectProcessEnv({
      NODE_ENV: 'production',
    }),
    babel({
      babelHelpers: 'runtime',
      presets: [['@babel/preset-env']],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: false }]],
    }),
    // terser(),
  ],
};
