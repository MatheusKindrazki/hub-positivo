var path = require('path');

const { override, babelInclude, addBabelPlugin } = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
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
      ]),
      addBabelPlugin(["babel-plugin-styled-components", {
        "minify": true,
        "transpileTemplateLiterals": true,
        "namespace": "hub"
      }])
    )(config, env)
  );
};
