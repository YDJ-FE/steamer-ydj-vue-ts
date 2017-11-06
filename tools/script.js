// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies, no-console */

// const utils = require('steamer-webpack-utils');
const webpack = require('webpack');
// const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';

const feature = require('./feature/feature');

function compilerRun(config) {
    const compiler = webpack(config);

    compiler.run((err, stats) => {
        if (!err) {
            // const jsonStats = stats.toJson();
            // print asset stats
            // fs.writeFileSync("stats.txt", JSON.stringify(jsonStats, " " , 4))

            console.log(
                stats.toString({
                    assets: true,
                    cached: true,
                    colors: true,
                    children: false,
                    errors: true,
                    warnings: true,
                    version: true
                })
            );

            // if (jsonStats.errors.length > 0) {
            //     console.log('Webpack compiler encountered errors.');
            //     console.log(jsonStats.errors.join('\n'));
            // }
            //    else if (jsonStats.warnings.length > 0) {
            //     console.log('Webpack compiler encountered warnings.');
            //     console.log(jsonStats.warnings.join('\n'));
            // }
        } else {
            console.log(err);
        }
    });
}

if (feature.installDependency()) {
    // return;
} else if (!isProduction) {
    require('./server');
} else {
    compilerRun(require('./webpack.base'));
}
