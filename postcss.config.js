// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies, new-cap */

const PostcssImport = require('postcss-import');
const Autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        PostcssImport(),
        Autoprefixer({
            browsers: ['iOS 7', '> 0.1%', 'android 2.1']
        })
    ]
};
