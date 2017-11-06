// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies, guard-for-in, no-restricted-syntax */

const path = require('path');

const Clean = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin-hash');
const WriteFilePlugin = require('write-file-webpack-plugin');
const FileWebpackPlugin = require('file-webpack-plugin');
const HappyPack = require('happypack');
const HtmlResWebpackPlugin = require('html-res-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (config, webpack) {
    const configWebpack = config.webpack;
    const isProduction = config.env === 'production';

    const plugins = [
        new HappyPack({
            id: 'ts',
            verbose: false,
            loaders: [
                {
                    loader: 'ts-loader',
                    options: {
                        happyPackMode: true
                    }
                }
            ]
        }),
        new ExtractTextPlugin({
            filename: getPath =>
                getPath(`css/${config.webpack.contenthashName}.css`).replace('css/js', 'css'),
            allChunks: true,
            disable: !(isProduction || config.webpack.extractCss)
            // disable: !isProduction || !config.webpack.extractCss
        })
    ];

    if (isProduction) {
        const useCdn = configWebpack.useCdn || true;

        if (useCdn) {
            plugins.push(
                new FileWebpackPlugin({
                    'after-emit': [
                        {
                            from: path.join(configWebpack.path.dist, '**/*'),
                            to: path.join(configWebpack.path.dist, configWebpack.path.distCdn),
                            action: 'move',
                            options: {
                                cwd: configWebpack.path.dist,
                                absolute: true,
                                ignore: ['*.html', '**/*.html']
                            }
                        },
                        {
                            from: path.join(configWebpack.path.dist, '*.html'),
                            to: path.join(
                                configWebpack.path.dist,
                                configWebpack.path.distWebserver
                            ),
                            action: 'move',
                            options: {
                                cwd: configWebpack.path.dist,
                                absolute: true
                            }
                        }
                    ]
                })
            );
        }
    } else if (configWebpack.showSource) {
        plugins.push(new WriteFilePlugin());
    }

    if (configWebpack.clean) {
        plugins.push(
            new Clean([isProduction ? configWebpack.path.dist : configWebpack.path.dev], {
                root: path.resolve()
            })
        );
    }

    if (config.webpack.promise) {
        plugins.push(
            new webpack.ProvidePlugin({
                Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
            })
        );
    }

    configWebpack.static.forEach(item => {
        plugins.push(
            new CopyWebpackPlugin([
                {
                    from: item.src,
                    to: `${(item.dist || item.src) +
                        (item.hash ? configWebpack.hashName : '[name]')}.[ext]`
                }
            ])
        );
    });

    config.webpack.html.forEach((page, key) => {
        plugins.push(
            new HtmlResWebpackPlugin({
                removeUnMatchedAssets: true,
                env: isProduction ? 'production' : 'development',
                mode: 'html',
                filename: `${page.key}.html`,
                template: page.path,
                favicon: 'src/favicon.ico',
                htmlMinify: null,
                entryLog: !key,
                cssPublicPath: isProduction ? config.webpack.cssCdn : config.webpack.webserver,
                templateContent(tpl) {
                    return tpl;
                }
            })
        );
    });

    return plugins;
};
