// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies, no-console, no-bitwise, guard-for-in, no-restricted-syntax, max-len */


const url = require('url');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');

const webpackConfig = require('./webpack.base.js');
const config = require('../config/project');

const app = express();


const configWebpack = config.webpack;
const port = configWebpack.port;
const route = Array.isArray(configWebpack.route) ? configWebpack.route : [configWebpack.route];
const apiPort = configWebpack['api-port'];
const apiRoute = configWebpack['api-route'];

function addProtocal(urlString) {
    if (!!~urlString.indexOf('http:') || !!~urlString.indexOf('https:')) {
        return urlString;
    }

    return `http:${urlString}`;
}

const urlObject = url.parse(addProtocal(configWebpack.webserver));

for (const key in webpackConfig.entry) {
    webpackConfig.entry[key].unshift('webpack-hot-middleware/client?reload=true&dynamicPublicPath=true&path=__webpack_hmr');
}

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
        colors: true
    },
    publicPath: configWebpack.webserver
}));

app.use(webpackHotMiddleware(compiler, {
    // 这里和上面的client配合，可以修正 webpack_hmr 的路径为项目路径的子路径，而不是直接成为 host 子路径（从publicPath开始，而不是根开始）
    // https://github.com/glenjamin/webpack-hot-middleware/issues/24
    path: `${urlObject.path}__webpack_hmr`
}));

// 静态资源转发
route.forEach(rt => {
    app.use(rt, proxy({ target: `http://127.0.0.1:${port}`, pathRewrite: { [`^${rt}`]: '/' } }));
});

// 后台转发
apiRoute.forEach(rt => {
    app.use(rt, proxy({ target: `http://127.0.0.1:${apiPort}` }));
});

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
