/* eslint-disable import/no-extraneous-dependencies, guard-for-in, no-restricted-syntax */

const path = require('path');
const fs = require('fs');
// const os = require('os');
// const utils = require('steamer-webpack-utils');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const config = require('../config/project');

const configWebpack = config.webpack;
const configWebpackMerge = config.webpackMerge;
const configCustom = config.custom;
const isProduction = config.env === 'production';

let baseConfig = {
    context: configWebpack.path.src,
    entry: configWebpack.entry,
    output: {
        publicPath: isProduction ? configWebpack.cdn : configWebpack.webserver,
        path: isProduction ? configWebpack.path.dist : configWebpack.path.dev,
        filename: `${configWebpack.chunkhashName}.js`,
        chunkFilename: `chunk/${configWebpack.chunkhashName}.js`
    },
    module: {
        rules: []
    },
    resolve: {
        modules: [
            configWebpack.path.src,
            'node_modules',
            path.join(configWebpack.path.src, 'css/sprites')
        ],
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.css',
            '.scss',
            'sass',
            '.less',
            '.styl',
            '.png',
            '.jpg',
            '.jpeg',
            '.ico',
            '.ejs',
            '.pug',
            '.handlebars',
            '.swf',
            '.vue'
        ],
        alias: {}
    },
    plugins: [new webpack.NoEmitOnErrorsPlugin()],
    watch: !isProduction,
    devtool: isProduction
        ? configWebpack.sourceMap.production
        : configWebpack.sourceMap.development,
    performance: {
        hints: isProduction ? 'warning' : false,
        assetFilter(assetFilename) {
            return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
        }
    }
};

/** *********** 处理脚手架基础rules & plugins *************/
const rules = fs.readdirSync(path.join(__dirname, 'rules'));
const plugins = fs.readdirSync(path.join(__dirname, 'plugins'));

let baseConfigRules = [];
let baseConfigPlugins = [];

rules.forEach(rule => {
    baseConfigRules = baseConfigRules.concat(require(`./rules/${rule}`)(config));
});

plugins.forEach(plugin => {
    baseConfigPlugins = baseConfigPlugins.concat(require(`./plugins/${plugin}`)(config, webpack));
});

baseConfig.module.rules = baseConfigRules;
baseConfig.plugins = baseConfigPlugins;

// console.log(rules, plugins);

/** *********** base 与 user config 合并 *************/
const userConfig = {
    output: configCustom.getOutput(),
    module: configCustom.getModule(),
    resolve: configCustom.getResolve(),
    externals: configCustom.getExternals(),
    plugins: configCustom.getPlugins()
};

const otherConfig = configCustom.getOtherOptions();

for (const key in otherConfig) {
    userConfig[key] = otherConfig[key];
}

baseConfig = configWebpackMerge.mergeProcess(baseConfig);

const webpackConfig = webpackMerge.smartStrategy(configWebpackMerge.smartStrategyOption)(
    baseConfig,
    userConfig
);

// console.log(JSON.stringify(webpackConfig, null, 4));

module.exports = webpackConfig;
