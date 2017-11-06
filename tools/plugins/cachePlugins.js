// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */


const WebpackMd5Hash = require('webpack-md5-hash');


module.exports = function (config, webpack) {
    const plugins = [
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 10
        }),
        new WebpackMd5Hash()
    ];

    return plugins;
};
