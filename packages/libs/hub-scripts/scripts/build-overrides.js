process.env.NODE_ENV = 'production';

const semver = require('semver');

const { scriptVersion } = require('./utils/paths');
const overrides = require('../config-overrides');
const scriptPkg = require(`${scriptVersion}/package.json`);

const pathsConfigPath = `${scriptVersion}/config/paths.js`;
const pathsConfig = require(pathsConfigPath);

require.cache[require.resolve(pathsConfigPath)].exports =
  overrides.paths(pathsConfig, process.env.NODE_ENV);

const isWebpackFactory = semver.gte(scriptPkg && scriptPkg.version, '1.0.3');

const webpackConfigPath = `${scriptVersion}/config/webpack.config${!isWebpackFactory ? '.prod' : ''}`;
const webpackConfig = require(webpackConfigPath);

// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports = isWebpackFactory
  ? (env) => overrides.webpack(webpackConfig(env), env)
  : overrides.webpack(webpackConfig, process.env.NODE_ENV);

// run original script
require(`${scriptVersion}/scripts/build`);
