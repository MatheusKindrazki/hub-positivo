var path = require('path');

const { override, babelInclude, addBabelPlugin } = require('customize-cra');

module.exports = function (config, env) {
  const rewired = Object.assign(
    config,
    override(
      babelInclude([
        path.resolve('src'),
        path.resolve('../../common'),
        path.resolve('../../helpers'),
      ]),
      addBabelPlugin([
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'src',
        },
      ])
    )(config, env)
  );

  if(process.env.NODE_ENV !== 'development') {
    rewired.externals = {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  }

  return rewired;
};
