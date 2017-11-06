// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */

const path = require('path');
const merge = require('lodash.merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModulePath = path.join(process.cwd(), 'node_modules');

module.exports = function (config) {
    const configWebpack = config.webpack;

    // 样式loader
    const commonLoaders = [
        {
            loader: 'cache-loader',
            options: {
                // provide a cache directory where cache items should be stored
                cacheDirectory: path.resolve('.cache')
            }
        },
        {
            loader: 'css-loader',
            options: {
                localIdentName: '[name]-[local]-[hash:base64:5]',
                module: config.webpack.cssModule,
                autoprefixer: true,
                minimize: true
            }
        },
        {
            loader: 'postcss-loader'
        }
    ];

    const styleRules = {
        css: {
            test: /\.css$/,
            // 单独抽出样式文件
            loader: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: commonLoaders
            }),
            include: [path.resolve(config.webpack.path.src)]
        },
        less: {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: merge([], commonLoaders).concat([
                    {
                        loader: 'less-loader'
                    }
                ])
            })
        },
        stylus: {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: merge([], commonLoaders).concat([
                    {
                        loader: 'stylus-loader'
                    }
                ])
            })
        },
        sass: {
            test: /\.s(a|c)ss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: merge([], commonLoaders).concat([
                    {
                        loader: 'sass-loader'
                    }
                ])
            })
        }
    };

    // vue-loader的样式loader配置
    const vueLoader = {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {}
        },
        exclude: /node_modules/
    };

    const vueStyleLoaderMap = {
        css: ExtractTextPlugin.extract({
            use: commonLoaders,
            fallback: 'vue-style-loader'
        }),
        less: ExtractTextPlugin.extract({
            use: merge([], commonLoaders).concat([
                {
                    loader: 'less-loader'
                }
            ]),
            fallback: 'vue-style-loader'
        }),
        sass: ExtractTextPlugin.extract({
            use: merge([], commonLoaders).concat([
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [path.resolve(config.webpack.path.src), nodeModulePath]
                    }
                }
            ]),
            fallback: 'vue-style-loader'
        }),
        scss: ExtractTextPlugin.extract({
            use: merge([], commonLoaders).concat([
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [path.resolve(config.webpack.path.src), nodeModulePath]
                    }
                }
            ]),
            fallback: 'vue-style-loader'
        }),
        stylus: ExtractTextPlugin.extract({
            use: merge([], commonLoaders).concat([
                {
                    loader: 'stylus-loader'
                }
            ]),
            fallback: 'vue-style-loader'
        }),
        styl: ExtractTextPlugin.extract({
            use: merge([], commonLoaders).concat([
                {
                    loader: 'stylus-loader'
                }
            ]),
            fallback: 'vue-style-loader'
        })
    };

    const rules = [];

    configWebpack.style.forEach(style => {
        vueLoader.options.loaders[style] = vueStyleLoaderMap[style];
        style = style === 'scss' ? 'sass' : style;
        const rule = styleRules[style] || '';
        rule && rules.push(rule);
    });

    rules.push(vueLoader);

    return rules;
};
