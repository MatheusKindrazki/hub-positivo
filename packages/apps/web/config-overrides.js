var path = require('path')

const { override, babelInclude, addBabelPlugin } = require('customize-cra')

module.exports = function (config, env) {
  const rewired = Object.assign(
    config,
    override(
      babelInclude([
        path.resolve('src'),
        path.resolve('../../common'),
        path.resolve('../api'),
        path.resolve('../gsc'),
        path.resolve('../chatbot')
      ]),
      addBabelPlugin([
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'src'
        }
      ]),
      addBabelPlugin([
        'babel-plugin-styled-components',
        {
          ssr: true,
          pure: true,
          fileName: false,
          displayName: false,
          namespace: 'hub',
          transpileTemplateLiterals: false
        }
      ])
    )(config, env)
  )

  if (process.env.NODE_ENV !== 'development') {
    rewired.externals = {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }

  return rewired
}
