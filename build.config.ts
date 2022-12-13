import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index'
  ],
  clean: true,
  declaration: true, // generate .d.ts files
  rollup: {
    emitCJS: true,  // generate .cjs files
    inlineDependencies: true,
  },
})
