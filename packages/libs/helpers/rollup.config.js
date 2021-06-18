import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";


export default {
  input: 'src/index.ts',
  output: [
    {
      file: './lib/index.js',
      format: 'cjs'
    },
    {
      file: 'lib/index.es.js',
      format: 'esm'
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true })
  ]
}
