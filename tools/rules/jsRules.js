// @ts-nocheck

// const path = require('path');

module.exports = function (config) {
    // const configWebpack = config.webpack;

    const rules = [
        {
            test: /\.(ts|js)$/,
            loader: 'happypack/loader?id=ts',
            exclude: /node_modules/
        }
    ];

    return rules;
};
