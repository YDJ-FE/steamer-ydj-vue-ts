// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */

const os = require('os');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function (config, webpack) {
    const configWebpack = config.webpack;
    const isProduction = config.env === 'production';

    const plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin(configWebpack.injectVar)
    ];

    if (isProduction) {
        if (configWebpack.compress) {
            plugins.push(
                new UglifyJSPlugin({
                    cache: true,
                    parallel: os.cpus().length
                })
            );
        }

        if (configWebpack.manifest) {
            plugins.push(new ManifestPlugin());
        }
    } else {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plugins;
};
