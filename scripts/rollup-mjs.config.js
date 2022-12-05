const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const { getBabelOutputPlugin } = babel;

const { ROOT_PATH, SRC_PATH, getEntry } = require('./utils/index');

const inputs = getEntry();

const configs = Object.keys(inputs).map((key) => ({
  input: inputs[key],
  output: {
    file: `es/${key}.js`,
    format: 'es',
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
    babel({
      babelHelpers: 'runtime',
      presets: [['@babel/preset-env']],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
    }),
    // terser(),
  ],
  external: ['react', 'react-dom'],
}));

module.exports = configs;
