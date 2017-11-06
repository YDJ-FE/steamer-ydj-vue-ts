// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies, guard-for-in, no-restricted-syntax, no-underscore-dangle, max-len */

const path = require('path');
// const os = require('os');
// const webpack = require('webpack');
const utils = require('steamer-webpack-utils');
const steamerConfig = require('./steamer.config');

const __basename = path.dirname(__dirname);
const __env = process.env.NODE_ENV;
const isProduction = __env === 'production';
const APPENV = process.env.APP_ENV || 'dev';

const srcPath = path.resolve(__basename, 'src');
const devPath = path.resolve(__basename, 'dev');
const distPath = path.resolve(__basename, 'dist');
const spritePath = path.resolve(__basename, 'src/img/assets/sprites');

const hash = '[hash:6]';
const chunkhash = '[chunkhash:6]';
const contenthash = '[contenthash:6]';

// ========================= webpack快捷配置 =========================
// 基本情况下，你只需要关注这里的配置
const config = {
    // ========================= webpack环境配置 =========================
    env: __env,

    // 默认使用的npm命令行
    npm: 'npm',

    webpack: {

        useCdn: true, // 是否使用webserver, cdn 分离 html 与其它静态资源

        // ========================= webpack路径与url =========================
        // 项目路径
        path: {
            src: srcPath,
            dev: devPath,
            dist: distPath,
            sprite: spritePath,
            distCdn: 'cdn', // 生成cdn的目录，dist/cdn
            distWebserver: 'webserver' // 生成webserver的目录, dist/webserver
        },

        // ========================= webpack服务器及路由配置 =========================
        // 开发服务器配置
        webserver: steamerConfig.webserver,
        cdn: steamerConfig.cdn,
        cssCdn: steamerConfig.cssCdn || steamerConfig.cdn,
        imgCdn: steamerConfig.imgCdn || steamerConfig.cdn,
        port: steamerConfig.port, // port for local server
        route: [], // proxy route, 例如: /news/

        'api-port': steamerConfig['api-port'] || 6800, // 后台转发端口
        'api-route': steamerConfig['api-route'] || [], // 后台转发路径

        // ========================= webpack自定义配置 =========================
        // 是否显示开发环境下的生成文件
        showSource: true,

        // 是否在生产环境下生成manifest文件
        manifest: false,

        // 是否清理生成文件夹
        clean: true,

        // sourcemap, 请写具体的sourcemap名称，而不是写true
        // 参考文章： https://segmentfault.com/a/1190000004280859
        sourceMap: {
            development: false,
            production: false,
        },

        // 预编译器，默认支持css 和 less. sass, scss 和 stylus 由npm-install-webpack-plugin自动安装
        // 脚手架默认使用scss工作流，如需要使用其他预处理，请在下面添加
        style: [
            'css', 'scss',
        ],
        // 生产环境是否提取css
        extractCss: true,
        // 是否启用css模块化
        cssModule: false,

        // 合图，none (无合图), normal (仅1倍图) , retinaonly (仅2倍图), retina (包括1倍及2倍图)
        spriteMode: 'normal',
        // 默认支持less. sass, scss 和 stylus 由npm-install-webpack-plugin自动安装
        spriteStyle: 'scss',

        // html 模板. 默认支持html 和 ejs, handlebars 和 pug 由npm-install-webpack-plugin自动安装
        template: [
            'html'
        ],

        // 是否注入es6-promise包
        promise: false,

        // 生产环境下资源是否压缩
        compress: true,

        // 不经webpack打包的资源
        static: [
            {
                src: 'libs/',
                hash: true,
            }
        ],

        // 利用DefinePlugin给应用注入变量
        injectVar: {
            'process.env': {
                NODE_ENV: JSON.stringify(__env)
            }
        },

        // webpack resolve.alias 包别名
        alias: {
            utils: path.join(srcPath, '/js/common/utils'),
            sutils: 'steamer-browserutils/simple',
            env: path.join(srcPath, `env/${APPENV}`),
            assets: path.join(srcPath, 'assets')
        },

        // 文件名与哈希, hash, chunkhash, contenthash 与webpack的哈希配置对应
        hash,
        chunkhash,
        contenthash,
        hashName: isProduction ? (`[name]-${hash}`) : '[name]',
        chunkhashName: isProduction ? (`[name]-${chunkhash}`) : '[name]',
        contenthashName: isProduction ? (`[name]-${contenthash}`) : '[name]',

        // ========================= webpack entry配置 =========================
        // 根据约定，自动扫描js entry，约定是src/page/xxx/main.js 或 src/page/xxx/main.jsx
        /**
            获取结果示例
            {
                'js/simple': [path.join(configWebpack.path.src, '/page/simple/main.js')],
                'js/spa': [path.join(configWebpack.path.src, '/page/spa/main.js')],
                'js/pindex': [path.join(configWebpack.path.src, '/page/pindex/main.jsx')],
            }
         */
        entry: utils.filterJsFileByCmd(utils.getJsEntry({
            srcPath: path.join(srcPath, 'page'),
            fileName: 'index',
            extensions: ['ts', 'js', 'jsx'],
            keyPrefix: 'js/',
            level: 1
        })),

        // 自动扫描html，配合html-res-webpack-plugin
        /**
            获取结果示例
            [
                {
                    key: 'simple',
                    path: 'path/src/page/simple/simple.html'
                },
                {
                    key: 'spa',
                    path: 'path/src/page/spa/simple.html'
                },
                {
                    key: 'pindex',
                    path: 'path/src/page/pindex/simple.html'
                }
            ]
         */
        html: utils.filterHtmlFileByCmd(utils.getHtmlEntry({
            srcPath: path.join(srcPath, 'page'),
            level: 1
        })),

        // 自动扫描合图，配合webpack-spritesmith插件
        /**
            获取结果示例
            [
                {
                    key: 'btn',
                    path: 'path/src/img/sprites/btn'
                },
                {
                    key: 'list',
                    path: 'path/src/img/sprites/list'
                }
            ]
         */
        sprites: utils.getSpriteEntry({
            srcPath: spritePath
        }),

    },
};


// ========================= webpack深度配置 =========================
// 使用了webpack-merge与webpack.base.js进行配置合并
// 如果上面的配置仍未能满足你，你可以在此处对webpack直接进行配置，这里的配置与webpack的配置项目一一对应
config.custom = {
    // webpack output
    getOutput() {
        return {};
    },

    // webpack module
    getModule() {
        const module = {
            rules: []
        };

        return module;
    },

    // webpack resolve
    getResolve() {
        return {
            alias: config.webpack.alias
        };
    },

    // webpack plugins
    getPlugins() {
        const plugins = [];

        return plugins;
    },

    // webpack externals
    getExternals() {
        if (isProduction) {
            return {
                $: 'zepto',
                vue: 'Vue',
            };
        }

        return {};
    },

    // 其它 webpack 配置
    getOtherOptions() {
        return {};
    }
};

// ========================= webpack merge 的策略 =========================
config.webpackMerge = {
    // webpack-merge smartStrategy 配置
    smartStrategyOption: {
        'module.rules': 'append',
        plugins: 'append'
    },

    // 在smartStrategy merge 之前，用户可以先行对 webpack.base.js 的配置进行处理
    mergeProcess(webpackBaseConfig) {
        return webpackBaseConfig;
    }
};

module.exports = config;
