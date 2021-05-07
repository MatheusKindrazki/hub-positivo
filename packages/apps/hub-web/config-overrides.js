var path = require('path');

const { override, babelInclude, addBabelPlugin } = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      babelInclude([
        path.resolve('src'),
        path.resolve('../../common'),
        path.resolve('../../gsc'),
      ]),
      addBabelPlugin([
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'src',
        },
      ]),
    )(config, env)
  );
};
